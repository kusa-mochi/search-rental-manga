import styles from "./DenseTable.module.scss";
import '../../types/app.d.ts';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button } from "@mui/material";

type DenseTableInput = {
    data: MangaItem[];
};

const DenseTable = (props: DenseTableInput) => {
    return (
        <TableContainer component={Paper} className={styles.tableContainer}>
            <Table size="small" aria-label="a dense table">
                <TableHead className={styles.tableHead}>
                    <TableRow>
                        <TableCell className={styles.tableHeadCell}>タイトル</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((manga) => (
                        <TableRow
                            key={manga.id}
                            className={styles.bodyRow}
                        >
                            <TableCell component="th" scope="row">
                                {manga.title}
                            </TableCell>
                            <TableCell align="right">
                                <Button href={manga.url} variant="contained" target="_blank">読む</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DenseTable;