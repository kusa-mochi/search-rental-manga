import "../types/app.d.ts";
import { IMangaSearcher } from "./IMangaSearcher";
import { BasicSearcher } from "./BasicSearcher";

export class GanganOnlineSearcher implements IMangaSearcher {
    async Search(query: string, site: SiteSettings): Promise<SearchResult> {
        console.log(`start searching @ ${this.constructor.name}`);
        const searcher = new BasicSearcher();
        const result = await searcher.Search(
            `https://www.ganganonline.com/search/result?keyword=${query}`,
            '//div[@id="__next"]//main[contains(@class, "Base_main")]//a[contains(@class, "SearchTitle_title")]//p[contains(@class, "SearchTitle_title__name")]',
            '//div[@id="__next"]//main[contains(@class, "Base_main")]//a[contains(@class, "SearchTitle_title")]/@href',
            'https://www.ganganonline.com'
        );
        result.siteName = site.title;
        console.log(`fin searching @ ${this.constructor.name}`);
        return result;
    }
}