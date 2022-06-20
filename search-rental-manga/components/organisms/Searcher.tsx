import { TextField } from '@mui/material'
import CollapsibleTable from '../molecules/CollapsibleTable'
import '../../types/app.d.ts'
import styles from './Searcher.module.scss'

const Searcher = () => {
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
    const bodys = [
        {
            siteName: "マンガPark",
            number: 12
        },
        {
            siteName: "マガポケ",
            number: 24
        },
        {
            siteName: "少年ジャンプ＋",
            number: 35
        },
        {
            siteName: "マンガPark",
            number: 12
        },
        {
            siteName: "マガポケ",
            number: 24
        },
        {
            siteName: "少年ジャンプ＋",
            number: 35
        },
        {
            siteName: "マンガPark",
            number: 12
        },
        {
            siteName: "マガポケ",
            number: 24
        },
        {
            siteName: "少年ジャンプ＋",
            number: 35
        },
        {
            siteName: "マンガPark",
            number: 12
        },
        {
            siteName: "マガポケ",
            number: 24
        },
        {
            siteName: "少年ジャンプ＋",
            number: 35
        },
        {
            siteName: "マンガPark",
            number: 12
        },
        {
            siteName: "マガポケ",
            number: 24
        },
        {
            siteName: "少年ジャンプ＋",
            number: 35
        }
    ];
    // <-- debugging data

    return (
        <div className={styles.container}>
            <div className={styles.textFieldContainer}>
                <TextField className={styles.inputField} label="マンガのタイトル　作者名　など"></TextField>
            </div>
            <CollapsibleTable headItems={heads} bodyItems={bodys}></CollapsibleTable>
        </div>
    );
};

export default Searcher