import "../types/app.d.ts";
import { IMangaSearcher } from "./IMangaSearcher";
import { BasicSearcher } from "./BasicSearcher";

export class PiccomaSearcher implements IMangaSearcher {
    async Search(query: string, site: SiteSettings): Promise<SearchResult> {
        console.log(`start searching @ ${this.constructor.name}`);
        // const searcher = new BasicSearcher();
        // const result = await searcher.Search(
        //     `https://piccoma.com/web/search/result?word=${query}`,
        //     '//ul[@id="ajax_infScroll"]//div[@class="PCM-productCoverImage_title"]/span',
        //     '//ul[@id="ajax_infScroll"]//a[contains(@class, "PCM-product js_hoverDescription")]/@href',
        //     'https://piccoma.com'
        // );
        const result = {
            siteName: site.title,
            mangaList: [],
            error: null,
        };
        // 総ページ数を取得する。
        // 総ページ数が4以上の場合、
        console.log(`fin searching @ ${this.constructor.name}`);
        return result;
    }
}