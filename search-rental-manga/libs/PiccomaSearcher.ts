import "../types/app.d.ts";
import { IMangaSearcher } from "./IMangaSearcher";
import {sites} from "../public/settings.json";

export class PiccomaSearcher implements IMangaSearcher {
    Search(site: SiteSettings): SearchResult {
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