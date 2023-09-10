import { KeyboardEvent, useState, ChangeEvent } from 'react'
import { Button, CircularProgress, TextField } from '@mui/material'
import '../../types/app.d.ts'
import CollapsibleTable from '../molecules/CollapsibleTable'
import { IMangaSearcher } from '../../libs/IMangaSearcher'
import { MangaSearcherFactory } from "../../libs/MangaSearcherFactory"
import styles from './Searcher.module.scss'
import settings from "../../public/settings.json"

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

    const [isAnySearcherLoading, setIsAnySearcherLoading] = useState<boolean>(false);

    let currentBodyItems: BodyItem[] = [];
    const sites: SiteSettings[] = settings.sites;
    sites.forEach(site => {
        currentBodyItems.push({
            siteName: site.title,
            number: 0,
            mangaList: [],
            error: null,
            omitted: false,
            isSearching: false,
        });
    });

    const [bodys, setBodys] = useState<BodyItem[]>(currentBodyItems);
    const [inputString, setInputString] = useState<string>("");
    const [composing, setComposing] = useState<boolean>(false);

    function OnInputChange(e: ChangeEvent<HTMLInputElement>) {
        setInputString(e.target.value);
    }

    function StartSearchByButton() {
        setIsAnySearcherLoading(true);  // disable input UIs
        for (let iSite = 0; iSite < props.siteSettings.length; iSite++) {
            currentBodyItems[iSite].isSearching = true; // visible searching effects.
        }
        setBodys(currentBodyItems);

        let numActiveSearchers: number = settings.sites.length;

        const query: string = inputString;
        if (query == null || query == "") {
            setIsAnySearcherLoading(false);
            return;
        }

        console.log(`query: ${query}`);
        const searcherFactory: MangaSearcherFactory = new MangaSearcherFactory();
        for (let iSite = 0; iSite < props.siteSettings.length; iSite++) {
            const site = props.siteSettings[iSite];
            const searcher: IMangaSearcher = searcherFactory.Create(site.id);
            searcher.Search(query, site)
                .then(
                    (result) => {
                        currentBodyItems = currentBodyItems.map((b, idx) => {
                            if (idx === iSite) {
                                return {
                                    siteName: result.siteName,
                                    number: result.mangaList.length,
                                    mangaList: result.mangaList,
                                    error: result.error,
                                    omitted: result.omitted,
                                    isSearching: false,
                                };
                            } else {
                                return b;
                            }
                        });

                        setBodys(currentBodyItems);

                        console.log(currentBodyItems.map((b) => b.isSearching));

                        numActiveSearchers--;
                        if (numActiveSearchers === 0) {
                            setIsAnySearcherLoading(false);
                        }
                    }
                )
                .catch(
                    (err) => {
                        console.log(err);

                        currentBodyItems = currentBodyItems.map((b, idx) => {
                            if (idx === iSite) {
                                return {
                                    siteName: site.title,
                                    number: 0,
                                    mangaList: [],
                                    error: err,
                                    omitted: false,
                                    isSearching: false,
                                };
                            } else {
                                return b;
                            }
                        });

                        setBodys(currentBodyItems);

                        console.log(currentBodyItems.map((b) => b.isSearching));

                        numActiveSearchers--;
                        if (numActiveSearchers === 0) {
                            setIsAnySearcherLoading(false);
                        }
                    }
                )
        }
    }

    async function StartSearch(e: KeyboardEvent<HTMLElement>) {
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
                <TextField className={styles.inputField} label="マンガのタイトル　作者名　など" value={inputString} disabled={isAnySearcherLoading} onChange={OnInputChange} onKeyDown={StartSearch} onCompositionStart={OnCompositionStart} onCompositionEnd={OnCompositionEnd}></TextField>
                <Button className={styles.searchButton} variant="contained" color="primary" disabled={isAnySearcherLoading} onClick={StartSearchByButton}>検索</Button>
            </div>
            <CollapsibleTable headItems={heads} bodyItems={bodys}></CollapsibleTable>
        </div>
    );
};

export default Searcher