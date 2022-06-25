import { TextField } from '@mui/material'
import CollapsibleTable from '../molecules/CollapsibleTable'
import '../../types/app.d.ts'
import styles from './Searcher.module.scss'

type SearcherInput = {
    siteSettings: SiteSettings[];
}

const Searcher = (props: SearcherInput) => {

    // debugging data -->
    const heads: Array<HeadItem> = [
        {
            title: "漫画アプリ",
            columnId: "appName"
        },
        {
            title: "見つかった数",
            columnId: "number"
        }
    ];

    const bodys: Array<BodyItem> = [];
    props.siteSettings.forEach(site => {
        bodys.push({
            siteName: site.title,
            number: 0
        });
    });

    function StartSearch() {
        console.log("あばばばｂ");
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