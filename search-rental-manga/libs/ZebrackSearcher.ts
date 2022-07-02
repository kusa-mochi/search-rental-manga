import "../types/app.d.ts";
import { IMangaSearcher } from "./IMangaSearcher";
import { BasicSearcher } from "./BasicSearcher";

// TODO: This implementation has not been completed because
// the manga site renders the HTML dynamically but this tool has not supported to 
// read it yet.
export class ZebrackSearcher implements IMangaSearcher {
    async Search(query: string, site: SiteSettings): Promise<SearchResult> {
        const searcher = new BasicSearcher();
        const result = await searcher.Search(
            `https://zebrack-comic.shueisha.co.jp/search?keyword=${query}`,
            '//div[@class="react-swipeable-view-container"]//p[contains(@class, "sc-kDTinF")]',
            '//div[@class="react-swipeable-view-container"]//img/@src',
            ''
        );
        const newList: MangaItem[] = [];
        result.mangaList.forEach(mangaItem => {
            // TODO: urlを書籍ページに飛べるように調整する。
            const devidedUrl = mangaItem.url.split("/");
            const mangaId = devidedUrl[5];
            const newItem: MangaItem = {
                title: mangaItem.title,
                id: mangaItem.id,
                url: `https://zebrack-comic.shueisha.co.jp/title/${mangaId}`
            }
            newList.push(newItem);
        });
        result.mangaList = newList;
        result.siteName = site.title;
        return result;
    }
}