import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CollapsibleTableRow from '../atoms/CollapsibleTableRow';
import '../../types/app.d.ts'
import './CollapsibleTable.module.scss'

const CollapsibleTable = (props: TableData) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
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
                            <CollapsibleTableRow key={item.siteName}></CollapsibleTableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CollapsibleTable;