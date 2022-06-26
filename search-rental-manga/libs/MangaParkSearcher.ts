import "../types/app.d.ts";
import { IMangaSearcher } from "./IMangaSearcher";
import axios from "axios";
import { BasicSearcher } from "./BasicSearcher";

export class MangaParkSearcher implements IMangaSearcher {
    async Search(query: string, site: SiteSettings): Promise<SearchResult> {
        const searcher = new BasicSearcher();
        const result = await searcher.Search(
            `https://manga-park.com/search/freeword?key=${query}`,
            '//div[@class="search-result"]/ul[@class="common-list pc-only"]//div[@class="info"]/h3',
            '//div[@class="search-result"]/ul[@class="common-list pc-only"]//a/@href',
            'https://manga-park.com'
        );
        return result;
    }
}