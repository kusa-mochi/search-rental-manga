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
    id: number; // this is used to render each item of manga list using React.
}

type BodyItem = {
    siteName: string;
    number: number;
    mangaList: MangaItem[];
    error: string | null;
};

type SearchResult = {
    siteName: string;
    mangaList: MangaItem[];
    error: string | null;
}

export as namespace AppTypes;
