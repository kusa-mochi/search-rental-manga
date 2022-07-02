import "../types/app.d.ts";
import { IMangaSearcher } from "./IMangaSearcher";
import { BasicSearcher } from "./BasicSearcher";

export class PiccomaSearcher implements IMangaSearcher {
    async Search(query: string, site: SiteSettings): Promise<SearchResult> {
        console.log(`start searching @ ${this.constructor.name}`);
        const searcher = new BasicSearcher();
        const result = await searcher.Search(
            `https://piccoma.com/web/search/result?word=${query}`,
            '//ul[@id="js_infScroll"]//div[@class="PCM-productCoverImage_title"]/span',
            '//ul[@id="js_infScroll"]//a[contains(@class, "PCM-product js_hoverDescription")]/@href',
            'https://piccoma.com'
        );
        result.siteName = site.title;
        console.log(`fin searching @ ${this.constructor.name}`);
        return result;
    }
}