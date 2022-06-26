import "../types/app.d.ts";
import { IMangaSearcher } from "./IMangaSearcher";
import { sites } from "../public/settings.json";
import axios from "axios";

export class PiccomaSearcher implements IMangaSearcher {
    Search(query: string, site: SiteSettings): SearchResult {
        const output: SearchResult = {
            count: 0,
            mangaList: []
        };

        axios.post('https://2x3l3tl4c5jsxzplozj6mahgtq0iscls.lambda-url.ap-northeast-1.on.aws/', {
            url: `https://piccoma.com/web/search/result?word=${query}`
        }).then(response => {
            const doc = new DOMParser().parseFromString(response.data, "text/html");
            const titleIterator = doc.evaluate('//ul[@id="js_infScroll"]//div[@class="PCM-productCoverImage_title"]/span', doc, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
            const urlIterator = doc.evaluate('//ul[@id="js_infScroll"]//a[contains(@class, "PCM-product js_hoverDescription")]/@href', doc, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);

            let titleNode = titleIterator.iterateNext();
            let urlNode = urlIterator.iterateNext();
            let mangaId = 0;
            while (titleNode && urlNode) {
                output.mangaList.push({
                    title: titleNode.textContent == null ? "＜タイトル不明＞" : titleNode.textContent,
                    url: urlNode.textContent == null ? "#" : `https://piccoma.com${urlNode.textContent}`,
                    id: mangaId
                });
                output.count++;
                mangaId++;
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