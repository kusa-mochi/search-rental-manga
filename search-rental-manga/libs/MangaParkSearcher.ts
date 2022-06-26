import "../types/app.d.ts";
import { IMangaSearcher } from "./IMangaSearcher";
import axios from "axios";

export class MangaParkSearcher implements IMangaSearcher {
    async Search(query: string, site: SiteSettings): Promise<SearchResult> {
        const output: SearchResult = {
            mangaList: []
        };

        await axios.post('https://2x3l3tl4c5jsxzplozj6mahgtq0iscls.lambda-url.ap-northeast-1.on.aws/', {
            url: `https://manga-park.com/search/freeword?key=${query}`
        }).then(response => {
            const doc = new DOMParser().parseFromString(response.data, "text/html");
            const titleIterator = doc.evaluate('//div[@class="search-result"]/ul[@class="common-list pc-only"]//div[@class="info"]/h3', doc, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
            const urlIterator = doc.evaluate('//div[@class="search-result"]/ul[@class="common-list pc-only"]//a/@href', doc, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);

            let titleNode = titleIterator.iterateNext();
            let urlNode = urlIterator.iterateNext();
            let count = 0;
            while (titleNode && urlNode) {
                output.mangaList.push({
                    title: titleNode.textContent == null ? "＜タイトル不明＞" : titleNode.textContent,
                    url: urlNode.textContent == null ? "#" : `https://manga-park.com${urlNode.textContent}`,
                    id: count++
                });
                titleNode = titleIterator.iterateNext();
                urlNode = urlIterator.iterateNext();
            }
        }).catch(error => {
            console.log("error occured.");
            console.log(error);
        });

        return output;
    }
}