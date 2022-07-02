import "../types/app.d.ts";
import { IMangaSearcher } from "./IMangaSearcher";
import { BasicSearcher } from "./BasicSearcher";

// TODO: This implementation has not been completed because
// the manga site treats this as an access from overseas and denies access.
export class LineMangaSearcher implements IMangaSearcher {
    async Search(query: string, site: SiteSettings): Promise<SearchResult> {
        console.log(`start searching @ ${this.constructor.name}`);
        const searcher = new BasicSearcher();
        const result = await searcher.Search(
            `https://manga.line.me/search_product/list?word=${query}`,
            '//div[@class="LyMain"]//span[@class="mdCMN07Ttl"]',
            '//div[@class="LyMain"]//li[@class="mdCMN07Li"]/a/@href',
            'https://manga.line.me'
        );
        result.siteName = site.title;
        console.log(`fin searching @ ${this.constructor.name}`);
        return result;
    }
}