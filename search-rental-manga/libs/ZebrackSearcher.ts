import "../types/app.d.ts";
import axios, { AxiosRequestConfig } from "axios";
import settings from '../public/settings.json';
import { IMangaSearcher } from "./IMangaSearcher";

// TODO: This implementation has not been completed because
// the manga site renders the HTML dynamically but this tool has not supported to 
// read it yet.
export class ZebrackSearcher implements IMangaSearcher {
    CanDecode1ByteToAscii(rawData: string): boolean {
        // console.log(rawData);
        if (rawData == null) return false;
        if (rawData.length !== 2) return false;

        const MIN: string = '20';
        const MAX: string = '7E';
        const MIN_VALUE: number = parseInt(MIN, 16);
        const MAX_VALUE: number = parseInt(MAX, 16);
        const value: number = parseInt(rawData, 16);
        const isValid: boolean = MIN_VALUE <= value && value <= MAX_VALUE;

        return isValid;
    }

    CanDecode3BytesToUtf8(rawData: string): boolean {
        // console.log(rawData);
        if (rawData == null) return false;
        if (rawData.length !== 6) return false;

        const MINs: string[] = ['E0', '80', '80'];
        const MAXs: string[] = ['EF', 'BF', 'BF'];
        const MIN_VALUES: number[] = MINs.map(code => parseInt(code, 16));
        const MAX_VALUES: number[] = MAXs.map(code => parseInt(code, 16));
        // console.log(MIN_VALUES);
        // console.log(MAX_VALUES);

        const rawCode = [
            rawData.substring(0, 2),
            rawData.substring(2, 4),
            rawData.substring(4, 6)
        ];
        const values: number[] = rawCode.map<number>(code => parseInt(code, 16));
        // console.log(values);

        const areValid: boolean[] = values.map((v, idx) => MIN_VALUES[idx] <= v && v <= MAX_VALUES[idx]);
        // console.log(areValid);
        return !areValid.includes(false);
    }

    CanDecode3Bytes(rawData: string): number | null {
        // console.log(rawData);
        if (rawData == null) return null;
        if (rawData.length !== 6) return null;

        if (this.CanDecode3BytesToUtf8(rawData.substring(0, 6)) === true) return 3;
        if (this.CanDecode1ByteToAscii(rawData.substring(0, 2)) === true) return 1;
        return 0;
    }

    ExtractMangaList(rawData: string): MangaItem[] {
        const output: MangaItem[] = [];
        const urlPrefix: string = 'https://zebrack-comic.shueisha.co.jp/title/';
        const minNumberCharCode: number = 48;
        const maxNumberCharCode: number = 57;

        const data: string = rawData.toUpperCase();
        // "garaku://title_detail?titleId=" in utf-8
        const bookIdPrefix: string = "676172616B753A2F2F7469746C655F64657461696C3F7469746C6549643D";
        const splitData: string[] = data.split(bookIdPrefix);
        const maxIdStringLength: number = 10;

        let mangaCount: number = -1;
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

            let iSeek: number = 0;
            let bookId: number = 0;
            // read IDs one letter at a time from left to right.
            for (let idStringCounter: number = 0; idStringCounter < maxIdStringLength; idStringCounter += 2) {
                const valueToValidate: string = oneBookData.substring(idStringCounter, idStringCounter + 2);
                const numberValue: number = parseInt(valueToValidate, 16);
                if (minNumberCharCode <= numberValue && numberValue <= maxNumberCharCode) {
                    bookId = (bookId * 10) + (numberValue - minNumberCharCode);
                    iSeek += 2;
                } else {
                    break;
                }
            }
            // make a manga url using book ID.
            mangaItem.url = `${urlPrefix}${bookId}`;

            if (oneBookData.substring(iSeek, iSeek + 2).toUpperCase() !== "1A") throw "unknown error.";
            iSeek += 2;
            const tmpCode = oneBookData.substring(iSeek, iSeek + 2).toUpperCase();
            const tmpCodeValue = parseInt(tmpCode, 16);
            if (tmpCodeValue <= parseInt('80', 16)) {
                iSeek += 2;
            } else {
                iSeek += 4;
            }

            const titleStartIndex: number = iSeek;
            let titleEndIndex: number = -1;
            let prevISeek = iSeek;
            for (; iSeek < oneBookData.length;) {
                if(oneBookData.substring(iSeek, iSeek + 2) === "22") {
                    titleEndIndex = iSeek;
                    break;
                }
                const bytesToRead: number | null = this.CanDecode3Bytes(oneBookData.substring(iSeek, iSeek + 6));
                if (bytesToRead == null) throw "there might be no data to decode.";
                if (bytesToRead > 0) {
                    prevISeek = iSeek;
                    iSeek += bytesToRead << 1;
                } else if (bytesToRead === 0) {
                    titleEndIndex = iSeek;
                    break;
                }
            }

            const title: string = Buffer.from(oneBookData.substring(titleStartIndex, titleEndIndex), 'hex').toString('utf-8');
            mangaItem.title = title;

            output.push(mangaItem);
        });
        return output;
    }

    async Search(query: string, site: SiteSettings): Promise<SearchResult> {
        console.log(`start searching @ ${this.constructor.name}`);

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