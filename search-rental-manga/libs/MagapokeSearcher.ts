import "../types/app.d.ts";
import { IMangaSearcher } from "./IMangaSearcher";
import { BasicSearcher } from "./BasicSearcher";

export class MagapokeSearcher implements IMangaSearcher {
    async Search(query: string, site: SiteSettings): Promise<SearchResult> {
        const searcher = new BasicSearcher();
        const result = await searcher.Search(
            `https://pocket.shonenmagazine.com/search?q=${query}`,
            '//ul[@class="series-list"]//p[@class="series-title"]',
            '//ul[@class="series-list"]//div[@class="thmb-container"]/a/@href',
            ''
        );
        return result;
    }
}