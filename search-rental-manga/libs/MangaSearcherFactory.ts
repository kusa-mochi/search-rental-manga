import {IMangaSearcher} from "./IMangaSearcher";
import { PiccomaSearcher } from "./PiccomaSearcher";

export class MangaSearcherFactory {
    Create(siteName: string): IMangaSearcher {
        switch(siteName) {
            case "piccoma":
                return new PiccomaSearcher();
            default:
                throw "invalid argument: siteName";
        }
    }
}