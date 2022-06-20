type HeadItem = {
    title: string;
    columnId: string;
};

type BodyItem = {
    siteName: string;
    number: number;
};

type TableData = {
    headItems: Array<HeadItem>;
    bodyItems: Array<BodyItem>;
};

export as namespace AppTypes;
