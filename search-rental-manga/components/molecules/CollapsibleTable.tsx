import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CollapsibleTableRow from '../atoms/CollapsibleTableRow';
import '../../types/app.d.ts'
import styles from './CollapsibleTable.module.scss'

type CollapsibleTableInput = {
    headItems: Array<HeadItem>;
    bodyItems: Array<BodyItem>;
};

const CollapsibleTable = (props: CollapsibleTableInput) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead className={styles.tableHead}>
                    <TableRow>
                        <TableCell></TableCell>
                        {
                            props.headItems.map(item => (
                                <TableCell key={item.columnId}>{item.title}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.bodyItems.map(item => (
                            <CollapsibleTableRow key={item.siteName} rowData={item}></CollapsibleTableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CollapsibleTable;