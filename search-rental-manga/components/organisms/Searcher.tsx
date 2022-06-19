import { TextField } from '@mui/material';
import styles from './Searcher.module.scss'

const Searcher = () => {
    return (
        <div className={styles.container}>
            <TextField className={styles.inputField} label="マンガのタイトル　作者名　など"></TextField>
        </div>
    );
};

export default Searcher