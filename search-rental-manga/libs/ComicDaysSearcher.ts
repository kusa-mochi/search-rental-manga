import "../types/app.d.ts";
import { IMangaSearcher } from "./IMangaSearcher";
import { BasicSearcher } from "./BasicSearcher";

export class ComicDaysSearcher implements IMangaSearcher {
    async Search(query: string, site: SiteSettings): Promise<SearchResult> {
        console.log(`start searching @ ${this.constructor.name}`);
        const searcher = new BasicSearcher();
        const result = await searcher.Search(
            `https://comic-days.com/search?q=${query}`,
            '//ul[@class="series-list"]//p[@class="series-title"]',
            '//ul[@class="series-list"]//div[@class="thmb-container"]/a/@href',
            ''
        );
        result.siteName = site.title;
        console.log(`fin searching @ ${this.constructor.name}`);
        return result;
    }
}