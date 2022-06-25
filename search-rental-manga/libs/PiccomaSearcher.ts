import "../types/app";
import { IMangaSearcher } from "./IMangaSearcher";

export class PiccomaSearcher implements IMangaSearcher {
    Search(query: string): SearchResult {
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