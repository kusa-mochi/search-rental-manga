type SiteSettings = {
    id: string;
    title: string;
    url: string;
};

type AppSettings = {
    sites: Array<SiteSettings>;
};

type HeadItem = {
    title: string;
    columnId: string;
};

type MangaItem = {
    title: string;
    url: string;
    id: number;
}

type BodyItem = {
    siteName: string;
    number: number;
    mangaList: MangaItem[];
};

type SearchResult = {
    siteName: string;
    mangaList: MangaItem[];
}

export as namespace AppTypes;
