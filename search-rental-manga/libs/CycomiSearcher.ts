import "../types/app.d.ts";
import { IMangaSearcher } from "./IMangaSearcher";
import { BasicSearcher } from "./BasicSearcher";
import { stringify } from "querystring";

export class CycomiSearcher implements IMangaSearcher {
    async Search(query: string, site: SiteSettings): Promise<SearchResult> {
        const searcher = new BasicSearcher();
        const searchUrlPrefix: string = "https://cycomi.com/fw/cycomibrowser/title/serialization/";
        const searchUrls: string[] = [];
        for (let page = 0; page < 8; page++) {
            searchUrls.push(`${searchUrlPrefix}${page}`);
        }
        const titleXPath = '//div[contains(@class, "section-content")]//p[@class="card-texts-title"]';
        const urlXPath = '//div[contains(@class, "section-content")]/a/@href';
        const urlPrefix = 'https://cycomi.com';

        const results: SearchResult[] = await Promise.all<SearchResult[]>([
            await searcher.Search(searchUrls[0], titleXPath, urlXPath, urlPrefix),
            await searcher.Search(searchUrls[1], titleXPath, urlXPath, urlPrefix),
            await searcher.Search(searchUrls[2], titleXPath, urlXPath, urlPrefix),
            await searcher.Search(searchUrls[3], titleXPath, urlXPath, urlPrefix),
            await searcher.Search(searchUrls[4], titleXPath, urlXPath, urlPrefix),
            await searcher.Search(searchUrls[5], titleXPath, urlXPath, urlPrefix),
            await searcher.Search(searchUrls[6], titleXPath, urlXPath, urlPrefix),
            await searcher.Search(searchUrls[7], titleXPath, urlXPath, urlPrefix)
        ]);

        const result: SearchResult = {
            mangaList: []
        };
        results.forEach(res => {
            res.mangaList.forEach(manga => {
                if (manga.title.indexOf(query) !== -1) {
                    result.mangaList.push(manga);
                }
            });
        });
        return result;
    }
}