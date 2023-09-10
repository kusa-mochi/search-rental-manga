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
                        <Chip className={`${styles.errorBadge} ${props.rowData.error != null ? "" : styles.noDisplay}`} label="エラー" size="small"></Chip>
                    </div>
                </TableCell>
                <TableCell>{props.rowData.mangaList.length}件{props.rowData.omitted ? "以上" : ""}</TableCell>
                <TableCell>
                    <div className={`${styles.overlayWrapper} ${props.rowData.isSearching === false ? styles.hidden : ""}`}>
                        <div className={styles.overlayContent}>
                        <div className={styles.progressContainer}>
                            <span className={styles.progress}>
                                <svg className={styles.progressSvg} viewBox="22 22 44 44">
                                    <circle className={styles.progressCircle} cx="44" cy="44" r="20.2" fill="none" strokeWidth="4.0"></circle>
                                </svg>
                            </span>
                        </div>
                        </div>
                    </div>
                </TableCell>
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