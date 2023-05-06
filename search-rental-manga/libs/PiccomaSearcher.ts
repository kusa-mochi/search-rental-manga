import "../types/app.d.ts";
import { IMangaSearcher } from "./IMangaSearcher";
import { BasicSearcher } from "./BasicSearcher";
import axios from "axios";
import settings from '../public/settings.json';

export class PiccomaSearcher implements IMangaSearcher {

    readonly TARGET_BASE_URL: string = "https://piccoma.com/web/search/result_ajax/list?tab_type=T";
    readonly MAX_PAGE: number = 3;

    GetNumberOfPages(rawData: any): number {
        return rawData.data.total_page;
    }

    GetTargetUrl(query: string, page: number): string {
        return `${this.TARGET_BASE_URL}&word=${query}&page=${page}`;
    }

    async GetMangaList(targetUrl: string): Promise<MangaItem[]> {
        // return value
        const mangaList: MangaItem[] = [];

        const rawJsonData = await axios.post(settings.proxyUrl, {
            url: targetUrl,
        });

        const products = rawJsonData.data.data.products;
        console.log(products);
        products.forEach((product: any) => {
            mangaList.push({
                id: product.id,
                title: product.title,
                url: `https://piccoma.com/web/product/${product.id}`,
            });
        });
        return mangaList;
    }

    async Search(query: string, site: SiteSettings): Promise<SearchResult> {
        console.log(`start searching @ ${this.constructor.name}`);
        const result: SearchResult = {
            siteName: site.title,
            mangaList: [],
            error: null,
            omitted: false,
        };

        // get a number of total pages.
        await axios.post(settings.proxyUrl, {
            url: this.GetTargetUrl(query, 0),
        }).then(async response => {
            let nPage: number = 0;
            console.log("got json data:");
            nPage = this.GetNumberOfPages(response.data);
            console.log(`number of pages:${nPage}`);
            // if there are over MAX_PAGE pages,
            if(nPage > this.MAX_PAGE) {
                // load only the first MAX_PAGE pages.
                nPage = this.MAX_PAGE;
                result.omitted = true;
            } else {
                result.omitted = false;
            }

            // get each manga info.
            const mangaList: MangaItem[] = [];
            for(let iPage = 0; iPage < nPage; iPage++) {
                const currentPageUrl: string = this.GetTargetUrl(query, iPage + 1);
                console.log(`load ${currentPageUrl}`);
                const currentMangaList: MangaItem[] = await this.GetMangaList(currentPageUrl);
                mangaList.push(...currentMangaList);
            }

            // // reassign ids to each manga.
            // const nManga: number = mangaList.length;
            // for(let iManga = 0; iManga < nManga; iManga++) {
            //     mangaList[iManga].id = iManga;
            // }

            result.mangaList = mangaList;
        }).finally(() => {
            return result;
        });
        
        console.log(`fin searching @ ${this.constructor.name}`);
        return result;
    }
}