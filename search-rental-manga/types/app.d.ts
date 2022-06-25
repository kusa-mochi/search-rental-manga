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

type BodyItem = {
    siteName: string;
    number: number;
};

type MangaItem = {
    title: string;
    url: string;
    id: number;
}

type SearchResultItem = {
    title: string;
    url: string;
}

type SearchResult = {
    count: number;
    mangaList: SearchResultItem[];
}

export as namespace AppTypes;
