import "../types/app.d.ts";
import { IMangaSearcher } from "./IMangaSearcher";
import { BasicSearcher } from "./BasicSearcher";

export class LineMangaSearcher implements IMangaSearcher {
    async Search(query: string, site: SiteSettings): Promise<SearchResult> {
        const searcher = new BasicSearcher();
        const result = await searcher.Search(
            `https://manga.line.me/search_product/list?word=${query}`,
            '//div[@class="LyMain"]//span[@class="mdCMN07Ttl"]',
            '//div[@class="LyMain"]//li[@class="mdCMN07Li"]/a/@href',
            'https://manga.line.me'
        );
        return result;
    }
}