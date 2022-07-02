import { Box, Button, CircularProgress, TextField } from '@mui/material'
import CollapsibleTable from '../molecules/CollapsibleTable'
import { MangaSearcherFactory } from "../../libs/MangaSearcherFactory"
import '../../types/app.d.ts'
import styles from './Searcher.module.scss'
import settings from "../../public/settings.json"
import { IMangaSearcher } from '../../libs/IMangaSearcher'
import { KeyboardEvent, useState } from 'react'

type SearcherInput = {
    siteSettings: SiteSettings[];
}

const Searcher = (props: SearcherInput) => {
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
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const initialBodyItems: BodyItem[] = [];
    const sites: SiteSettings[] = settings.sites;
    sites.forEach(site => {
        initialBodyItems.push({
            siteName: site.title,
            number: 0,
            mangaList: [],
            error: null
        });
    });

    const [bodys, setBodys] = useState<BodyItem[]>(initialBodyItems);
    const [inputString, setInputString] = useState<string>("");
    const [composing, setComposing] = useState<boolean>(false);

    function OnInputChange(e) {
        setInputString(e.target.value);
    }

    function StartSearchByButton() {
        setIsLoading(true);
        const query: string = inputString;
        if (query == null || query == "") return;
        console.log(`query: ${query}`);
        const searcherFactory: MangaSearcherFactory = new MangaSearcherFactory();
        const newBodys: BodyItem[] = [];
        const threads: Promise<SearchResult>[] = [];
        for (let iSite = 0; iSite < props.siteSettings.length; iSite++) {
            const site = props.siteSettings[iSite];
            const searcher: IMangaSearcher = searcherFactory.Create(site.id);
            threads.push(searcher.Search(query, site));
        }
        Promise.all(threads)
            .then(results => {
                results.forEach(currentResult => {
                    const newBodyItem: BodyItem = {
                        siteName: currentResult.siteName,
                        number: currentResult.mangaList.length,
                        mangaList: currentResult.mangaList,
                        error: currentResult.error
                    };
                    newBodys.push(newBodyItem);
                });
                setBodys(newBodys);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setIsLoading(false);
            });
    }

    async function StartSearch(e) {
        if (e.code !== "Enter" || composing === true) return;
        StartSearchByButton();
    }

    function OnCompositionStart() {
        setComposing(true);
    }

    function OnCompositionEnd() {
        setComposing(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.textFieldContainer}>
                <TextField className={styles.inputField} label="マンガのタイトル　作者名　など" value={inputString} onChange={OnInputChange} onKeyDown={StartSearch} onCompositionStart={OnCompositionStart} onCompositionEnd={OnCompositionEnd}></TextField>
                <Button className={styles.searchButton} variant="contained" color="primary" onClick={StartSearchByButton}>検索</Button>
            </div>
            <CollapsibleTable headItems={heads} bodyItems={bodys}></CollapsibleTable>
            <div className={isLoading === true ? styles.loadingMask : styles.hidden}>
                <div className={styles.progressContainer}>
                    <CircularProgress color="primary" />
                </div>
            </div>
        </div>
    );
};

export default Searcher