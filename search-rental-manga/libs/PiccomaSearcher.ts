import "../types/app.d.ts";
import { IMangaSearcher } from "./IMangaSearcher";
import { sites } from "../public/settings.json";
import axios from "axios";

export class PiccomaSearcher implements IMangaSearcher {
    Search(query: string, site: SiteSettings): SearchResult {
        axios.post('https://2x3l3tl4c5jsxzplozj6mahgtq0iscls.lambda-url.ap-northeast-1.on.aws/', {
            url: `https://piccoma.com/web/search/result?word=${query}`
        }).then(response => {
            // console.log(response.data);
            const doc = new DOMParser().parseFromString(response.data, "text/html");
            // const iterator = doc.evaluate('//ul[@id="js_infScroll"]/li[@class="PCM-slotProducts_list"]//div[@class="PCM-productCoverImage_title"]/span', doc, null, XPathResult.STRING_TYPE, null);//doc.getElementById("js_infScroll");
            const iterator = doc.evaluate('//ul[@id="js_infScroll"]//div[@class="PCM-productCoverImage_title"]/span', doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);//doc.getElementById("js_infScroll");
            const nextItem = iterator.iterateNext();
            console.log(nextItem?.textContent);
        }).catch(error => {
            console.log("error occured.");
            console.log(error);
        });
        return {
            count: 123,
            mangaList: [
                {
                    title: "てすてす",
                    url: "https://slash-mochi.net/"
                },
                {
                    title: "てすてす",
                    url: "https://slash-mochi.net/"
                },
                {
                    title: "てすてす",
                    url: "https://slash-mochi.net/"
                },
                {
                    title: "てすてす",
                    url: "https://slash-mochi.net/"
                },
                {
                    title: "てすてす",
                    url: "https://slash-mochi.net/"
                }
            ]
        };
    }
}