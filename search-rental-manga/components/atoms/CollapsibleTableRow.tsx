import { Collapse, IconButton, TableCell, TableRow } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useState } from 'react';
import styles from './CollapsibleTableRow.module.scss';
import '../../types/app.d.ts';

type CollapsibleTableRowInput = {
    rowData: BodyItem
}

const CollapsibleTableRow = (props: CollapsibleTableRowInput) => {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow className={styles.summary}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{props.rowData.siteName}</TableCell>
                <TableCell>{props.rowData.number}件</TableCell>
            </TableRow>
            <TableRow>
                <TableCell className={styles.detail} colSpan={3}>
                    <Collapse in={open}>
                        スパイファミリー　アプリを開く
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export default CollapsibleTableRow;