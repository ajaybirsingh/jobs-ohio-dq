import React, { useState } from 'react';
import { makeStyles } from '/styles';
import { Button } from '@mui/material';
import { Popover } from '@mui/material';
import { MenuList } from '@mui/material';
import { MenuItem } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));

function IndustrySectorDropdown({ data }) {
    const dataBreak = data?.split(',');
    const firstItem = dataBreak?.[0];
    const remainingCategories = dataBreak?.slice(1);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <Button
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                {firstItem}
                {remainingCategories?.length > 0 && ` +${remainingCategories.length}`}
            </Button>
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <MenuList>
                    {
                        remainingCategories?.map((item, index) => {
                            return (
                                <MenuItem key={index} onClick={handlePopoverClose}>{item}</MenuItem>
                            )
                        })
                    }
                </MenuList>
            </Popover>
        </div>
    );
}

export default IndustrySectorDropdown;
