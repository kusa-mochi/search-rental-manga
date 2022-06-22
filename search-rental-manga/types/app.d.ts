type SiteSettings = {
    id: string;
    title: string;
    url: string;
}

type AppSettings = {
    sites: Array<SiteSettings>;
}

type HeadItem = {
    title: string;
    columnId: string;
};

type BodyItem = {
    siteName: string;
    number: number;
};

export as namespace AppTypes;
