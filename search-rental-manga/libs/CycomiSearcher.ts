import "../types/app.d.ts";
import { IMangaSearcher } from "./IMangaSearcher";
import { BasicSearcher } from "./BasicSearcher";
import axios from "axios";
import settings from "../public/settings.json";

export class CycomiSearcher implements IMangaSearcher {
    readonly TARGET_BASE_URL: string = "https://web.cycomi.com/api/search/list/1?word=";

    GetTargetUrl(query:string): string {
        return `${this.TARGET_BASE_URL}${query}`;
    }

    async GetMangaList(targetUrl: string): Promise<MangaItem[]> {
        // return value
        const mangaList: MangaItem[] = [];
        
        const rawJsonData = await axios.post(settings.proxyUrl, {
            url: targetUrl,
        });

        const titles = rawJsonData.data.data.titles;
        console.log(titles);

        titles.forEach((product: any) => {
            mangaList.push({
                id: product.titleId,
                title: product.titleName,
                url: `https://cycomi.com/title/${product.titleId}`,
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

        const targetUrl: string = this.GetTargetUrl(query);
        const mangaList: MangaItem[] = await this.GetMangaList(targetUrl);
        result.mangaList.push(...mangaList);
        
        console.log(`fin searching @ ${this.constructor.name}`);
        return result;
    }
}