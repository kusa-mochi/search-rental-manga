import "../types/app.d.ts";
import { IMangaSearcher } from "./IMangaSearcher";
import { PiccomaSearcher } from "./PiccomaSearcher";
import { MangaParkSearcher } from "./MangaParkSearcher";
import { MagapokeSearcher } from "./MagapokeSearcher";
import { JumpPlusSearcher } from "./JumpPlusSearcher";
import { SundayWebrySearcher } from "./SundayWebrySearcher";
import { GanganOnlineSearcher } from "./GanganOnlineSearcher";

export class MangaSearcherFactory {
    Create(siteId: string): IMangaSearcher {
        switch (siteId) {
            case "mangaPark":
                return new MangaParkSearcher();
            case "magapoke":
                return new MagapokeSearcher();
            case "sundayWebry":
                return new SundayWebrySearcher();
            case "jumpPlus":
                return new JumpPlusSearcher();
            case "ganganOnline":
                return new GanganOnlineSearcher();
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