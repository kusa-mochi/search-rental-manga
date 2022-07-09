import "../types/app.d.ts";
import axios, { AxiosRequestConfig } from "axios";
import settings from '../public/settings.json';
import { IMangaSearcher } from "./IMangaSearcher";

// TODO: This implementation has not been completed because
// the manga site renders the HTML dynamically but this tool has not supported to 
// read it yet.
export class ZebrackSearcher implements IMangaSearcher {
    CanDecode3BytesToUtf8(rawData: string): boolean {
        console.log(rawData);
        if (rawData == null) return false;
        if (rawData.length !== 6) return false;

        const MINs: string[] = ['E0', '80', '80'];
        const MAXs: string[] = ['EF', 'BF', 'BF'];
        const MIN_VALUES: number[] = MINs.map(code => parseInt(code, 16));
        const MAX_VALUES: number[] = MAXs.map(code => parseInt(code, 16));
        console.log(MIN_VALUES);
        console.log(MAX_VALUES);

        const rawCode = [
            rawData.substring(0, 2),
            rawData.substring(2, 4),
            rawData.substring(4, 6)
        ];
        const values: number[] = rawCode.map<number>(code => parseInt(code, 16));
        console.log(values);

        const areValid: boolean[] = values.map((v, idx) => MIN_VALUES[idx] <= v && v <= MAX_VALUES[idx]);
        console.log(areValid);
        return !areValid.includes(false);
    }

    ExtractMangaList(rawData: string): MangaItem[] {
        const output: MangaItem[] = [];
        const urlPrefix = 'https://zebrack-comic.shueisha.co.jp/title/';
        const minNumberCharCode = 48;
        const maxNumberCharCode = 57;

        const data = rawData.toUpperCase();
        // "garaku://title_detail?titleId=" in utf-8
        const bookIdPrefix: string = "676172616B753A2F2F7469746C655F64657461696C3F7469746C6549643D";
        const splitData: string[] = data.split(bookIdPrefix);
        const maxIdStringLength = 10;

        let mangaCount = -1;
        splitData.forEach(oneBookData => {
            if (mangaCount === -1) {
                mangaCount++;
                return;
            }

            const mangaItem: MangaItem = {
                title: "",
                url: "",
                id: mangaCount++
            };

            let bookId: number = 0;
            // read IDs one letter at a time from left to right.
            for (let idStringCounter = 0; idStringCounter < maxIdStringLength; idStringCounter += 2) {
                const valueToValidate: string = oneBookData.substring(idStringCounter, idStringCounter + 2);
                const numberValue: number = parseInt(valueToValidate, 16);
                if (minNumberCharCode <= numberValue && numberValue <= maxNumberCharCode) {
                    bookId = (bookId * 10) + (numberValue - minNumberCharCode);
                } else {
                    break;
                }
            }
            // make a book url using book ID.
            mangaItem.url = `${urlPrefix}${bookId}`;
            console.log(bookId);

            // TODO: extract a title from raw data.
            let titleRawData = oneBookData.substring(bookId.toString().length * 2).split('22')[0];
            for (let iSeek = 0; iSeek < titleRawData.length; iSeek += 2) {
                if (this.CanDecode3BytesToUtf8(titleRawData.substring(iSeek, iSeek + 6)) === true) {
                    const title = Buffer.from(titleRawData.substring(2), 'hex').toString('utf-8');
                    mangaItem.title = title;
                    break;
                }
            }

            output.push(mangaItem);
        });
        return output;
    }

    async Search(query: string, site: SiteSettings): Promise<SearchResult> {
        console.log(`start searching @ ${this.constructor.name}`);
        // const newList: MangaItem[] = [];
        // result.mangaList.forEach(mangaItem => {
        //     // TODO: urlを書籍ページに飛べるように調整する。
        //     const devidedUrl = mangaItem.url.split("/");
        //     const mangaId = devidedUrl[5];
        //     const newItem: MangaItem = {
        //         title: mangaItem.title,
        //         id: mangaItem.id,
        //         url: `https://zebrack-comic.shueisha.co.jp/title/${mangaId}`
        //     }
        //     newList.push(newItem);
        // });
        // result.mangaList = newList;
        // result.siteName = site.title;



        const result: SearchResult = {
            siteName: site.title,
            mangaList: [],
            error: null
        };

        await axios.post(settings.proxyUrl, {
            url: `https://api.zebrack-comic.com/api/v3/title_search?os=browser&search_order=related&keyword=${query}`
        }).then(response => {
            console.log(response.data);
            result.mangaList = this.ExtractMangaList(response.data);
        }).finally(() => {
            return result;
        });

        console.log(`fin searching @ ${this.constructor.name}`);
        return result;
    }
}