import { Chip, Collapse, IconButton, TableCell, TableRow } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useState } from 'react';
import DenseTable from './DenseTable';
import styles from './CollapsibleTableRow.module.scss';
import '../../types/app.d.ts';

type CollapsibleTableRowInput = {
    rowData: BodyItem
}

const CollapsibleTableRow = (props: CollapsibleTableRowInput) => {
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow className={`${styles.summary} ${props.rowData.error != null ? styles.error : ""}`}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <div className={styles.siteNameContainer}>
                        <div>{props.rowData.siteName}</div>
                        <Chip className={`${styles.errorBadge} ${props.rowData.error != null ? "" : styles.hidden}`} label="エラー" size="small"></Chip>
                    </div>
                </TableCell>
                <TableCell>{props.rowData.mangaList.length}件</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className={styles.detail} colSpan={3}>
                    <Collapse in={open}>
                        <DenseTable data={props.rowData.mangaList}></DenseTable>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export default CollapsibleTableRow;