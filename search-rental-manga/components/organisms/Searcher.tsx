import { TextField } from '@mui/material'
import CollapsibleTable from '../molecules/CollapsibleTable'
import { MangaSearcherFactory } from "../../libs/MangaSearcherFactory"
import '../../types/app.d.ts'
import styles from './Searcher.module.scss'
import { IMangaSearcher } from '../../libs/IMangaSearcher'
import { KeyboardEventHandler, useState } from 'react'

type SearcherInput = {
    siteSettings: SiteSettings[];
}

const Searcher = (props: SearcherInput) => {

    // TODO: only for test
    while(props.siteSettings.length > 1) {
        props.siteSettings.pop();
    }

    const [heads, setHeads] = useState<HeadItem[]>([
        {
            title: "漫画アプリ",
            columnId: "appName"
        },
        {
            title: "見つかった数",
            columnId: "number"
        }
    ]);
    const [bodys, setBodys] = useState<BodyItem[]>([]);

    function StartSearch(e) {
        if (e.code !== "Enter") return;
        const query: string = e.target.value;
        console.log(`query: ${query}`);
        const searcherFactory: MangaSearcherFactory = new MangaSearcherFactory();
        const newBodys: BodyItem[] = [];
        props.siteSettings.forEach(site => {
            const searcher: IMangaSearcher = searcherFactory.Create(site.id);
            const result: SearchResult = searcher.Search(query, site);
            newBodys.push({
                siteName: site.title,
                number: result.count,
                mangaList: result.mangaList
            });
            setBodys(newBodys);
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.textFieldContainer}>
                <TextField className={styles.inputField} label="マンガのタイトル　作者名　など" onKeyDown={StartSearch}></TextField>
            </div>
            <CollapsibleTable headItems={heads} bodyItems={bodys}></CollapsibleTable>
        </div>
    );
};

export default Searcher