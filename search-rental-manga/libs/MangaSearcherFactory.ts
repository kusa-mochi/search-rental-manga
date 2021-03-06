import "../types/app.d.ts";
import { IMangaSearcher } from "./IMangaSearcher";
import { PiccomaSearcher } from "./PiccomaSearcher";
import { MangaParkSearcher } from "./MangaParkSearcher";
import { MagapokeSearcher } from "./MagapokeSearcher";
import { JumpPlusSearcher } from "./JumpPlusSearcher";
import { SundayWebrySearcher } from "./SundayWebrySearcher";
import { GanganOnlineSearcher } from "./GanganOnlineSearcher";
import { ZebrackSearcher } from "./ZebrackSearcher";
import { LineMangaSearcher } from "./LineMangaSearcher";
import { ComicDaysSearcher } from "./ComicDaysSearcher";
import { CycomiSearcher } from "./CycomiSearcher";
import { MangaDxPlusSearcher } from "./MangaDxPlusSearcher";

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
                return new ZebrackSearcher();
            case "lineManga":
                return new LineMangaSearcher();
            case "piccoma":
                return new PiccomaSearcher();
            case "comicDays":
                return new ComicDaysSearcher();
            case "cycomi":
                return new CycomiSearcher();
            case "mangaDxPlus":
                return new MangaDxPlusSearcher();
            default:
                throw "no searchar is found.";
        }
    }
}