import "../types/app.d.ts";
import { IMangaSearcher } from "./IMangaSearcher";
import { BasicSearcher } from "./BasicSearcher";

export class MangaDxPlusSearcher implements IMangaSearcher {
    async Search(query: string, site: SiteSettings): Promise<SearchResult> {
        console.log(`start searching @ ${this.constructor.name}`);
        const searcher = new BasicSearcher();
        const tmpResult = await searcher.Search(
            `https://mangadx-plus.com/`,
            '//div[@class="main_contents"]//li[@class="comic_category_list_item"]//div[@class="comic_info_details"]/h3',
            '//div[@class="main_contents"]//li[@class="comic_category_list_item"]/a/@href',
            ''
        );

        const result: SearchResult = {
            siteName: site.title,
            mangaList: [],
            error: null
        };
        
        if(tmpResult.error != null) {
            result.error = tmpResult.error;
            return result;
        }

        tmpResult.mangaList.forEach(manga => {
            if (manga.title.indexOf(query) !== -1) {
                result.mangaList.push(manga);
            }
        });
        console.log(`fin searching @ ${this.constructor.name}`);
        return result;
    }
}