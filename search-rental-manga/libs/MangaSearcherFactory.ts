import { IMangaSearcher } from "./IMangaSearcher";
import { PiccomaSearcher } from "./PiccomaSearcher";
import "../types/app.d.ts";

export class MangaSearcherFactory {
    Create(siteId: string): IMangaSearcher {
        switch (siteId) {
            case "mangaPark":
                return new PiccomaSearcher();   // TODO
            case "magapoke":
                return new PiccomaSearcher();   // TODO
            case "sundayWebry":
                return new PiccomaSearcher();   // TODO
            case "jumpPlus":
                return new PiccomaSearcher();   // TODO
            case "ganganOnline":
                return new PiccomaSearcher();   // TODO
            case "zebrack":
                return new PiccomaSearcher();   // TODO
            case "lineManga":
                return new PiccomaSearcher();   // TODO
            case "piccoma":
                return new PiccomaSearcher();
            default:
                // TODO: change to exception ?
                return new PiccomaSearcher();
        }
    }
}