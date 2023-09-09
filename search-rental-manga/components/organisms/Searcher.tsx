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

    // const [isLoading, setIsLoading] = useState<boolean[]>(
    //     GenerateIsLoadingArrayWithAllSameValue(false, settings.sites.length)
    // );

    const [isAnySearcherLoading, setIsAnySearcherLoading] = useState<boolean>(false);

    const currentBodyItems: BodyItem[] = [];
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

    // function GenerateIsLoadingArrayWithAllSameValue(v: boolean, num: number): boolean[] {
    //     const isL: boolean[] = [];
    //     for (let iSite = 0; iSite < num; iSite++) {
    //         isL.push(v);
    //     }
    //     return isL;
    // }

    // function GenerateIsLoadingArrayUpdated(v: boolean, num: number, targetIndex: number): boolean[] {
    //     const isL: boolean[] = [];
    //     for (let iSite = 0; iSite < num; iSite++) {
    //         if (iSite === targetIndex) {
    //             isL.push(v);
    //         } else {
    //             isL.push(isLoading[iSite]);
    //         }
    //     }
    //     return isL;
    // }

    function OnInputChange(e: ChangeEvent<HTMLInputElement>) {
        setInputString(e.target.value);
    }

    function StartSearchByButton() {
        // setIsLoading(
        //     GenerateIsLoadingArrayWithAllSameValue(true, settings.sites.length)
        // );
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
        // const newBodys: BodyItem[] = [];
        // const threads: Promise<SearchResult>[] = [];
        for (let iSite = 0; iSite < props.siteSettings.length; iSite++) {
            const site = props.siteSettings[iSite];
            const searcher: IMangaSearcher = searcherFactory.Create(site.id);
            // threads.push(searcher.Search(query, site));
            searcher.Search(query, site)
                .then(
                    (result) => {
                        // get index of a site
                        // const siteIndex: number = settings.sites.findIndex((siteData) => siteData.id === site.id);
                        // console.log("site name:" + site.title + ", site id:" + site.id);
                        // console.log("siteIndex:" + siteIndex);

                        currentBodyItems[iSite] = {
                            siteName: result.siteName,
                            number: result.mangaList.length,
                            mangaList: result.mangaList,
                            error: result.error,
                            omitted: result.omitted,
                            isSearching: false,
                        };

                        setBodys(currentBodyItems);

                        console.log(bodys);

                        // setIsLoading(
                        //     GenerateIsLoadingArrayUpdated(false, settings.sites.length, iSite)
                        // );

                        numActiveSearchers--;
                        if (numActiveSearchers === 0) {
                            setIsAnySearcherLoading(false);
                        }
                    }
                )
                .catch(
                    (err) => {
                        console.log(err);

                        currentBodyItems[iSite] = {
                            siteName: site.title,
                            number: 0,
                            mangaList: [],
                            error: err,
                            omitted: false,
                            isSearching: false,
                        };

                        setBodys(currentBodyItems);

                        // setIsLoading(
                        //     GenerateIsLoadingArrayUpdated(false, settings.sites.length, iSite)
                        // );

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
            {/* <div className={isLoading === true ? styles.loadingMask : styles.hidden}>
                <div className={styles.progressContainer}>
                    <span className={styles.progress}>
                        <svg className={styles.progressSvg} viewBox="22 22 44 44">
                            <circle className={styles.progressCircle} cx="44" cy="44" r="20.2" fill="none" strokeWidth="4.0"></circle>
                        </svg>
                    </span>
                </div>
            </div> */}
        </div>
    );
};

export default Searcher