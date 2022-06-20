import { Collapse, IconButton, TableCell, TableRow } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useState } from 'react';
import styles from './CollapsibleTableRow.module.scss';

const CollapsibleTableRow = () => {
    const [open, setOpen] = React.useState(true);

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
                <TableCell>サンデーうぇぶり</TableCell>
                <TableCell>12件</TableCell>
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