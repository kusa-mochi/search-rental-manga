import "../types/app.d.ts";
import { IMangaSearcher } from "./IMangaSearcher";
import { BasicSearcher } from "./BasicSearcher";

export class MangaParkSearcher implements IMangaSearcher {
    async Search(query: string, site: SiteSettings): Promise<SearchResult> {
        console.log(`start searching @ ${this.constructor.name}`);
        const searcher = new BasicSearcher();
        const result = await searcher.Search(
            `https://manga-park.com/search/freeword?key=${query}`,
            '//div[@class="search-result"]/ul[@class="common-list pc-only"]//div[@class="info"]/h3',
            '//div[@class="search-result"]/ul[@class="common-list pc-only"]//a/@href',
            'https://manga-park.com'
        );
        result.siteName = site.title;
        console.log(`fin searching @ ${this.constructor.name}`);
        return result;
    }
}