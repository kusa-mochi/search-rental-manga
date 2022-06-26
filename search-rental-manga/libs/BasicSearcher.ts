import "../types/app.d.ts";
import axios from "axios";
import settings from '../public/settings.json';

export class BasicSearcher {
    async Search(
        searchUrl: string,
        titleSearchXPath: string,
        urlSearchXPath: string,
        urlPrefix: string
    ): Promise<SearchResult> {
        const output: SearchResult = {
            mangaList: []
        };

        await axios.post(settings.proxyUrl, {
            url: searchUrl
        }).then(response => {
            const doc = new DOMParser().parseFromString(response.data, "text/html");
            const titleIterator = doc.evaluate(titleSearchXPath, doc, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
            const urlIterator = doc.evaluate(urlSearchXPath, doc, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);

            let titleNode = titleIterator.iterateNext();
            let urlNode = urlIterator.iterateNext();
            let count = 0;
            while (titleNode && urlNode) {
                output.mangaList.push({
                    title: titleNode.textContent == null ? "＜タイトル不明＞" : titleNode.textContent,
                    url: urlNode.textContent == null ? "#" : `${urlPrefix}${urlNode.textContent}`,
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