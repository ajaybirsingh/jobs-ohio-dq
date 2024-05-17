
import * as React from 'react';
import './style.css';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function ToolTip({ data }) {
    const dataBreak = data?.split(',');
    const firstItem = dataBreak?.[0];
    const remainingCategories = dataBreak?.slice(1);

    return (
        <Tooltip title={remainingCategories?.join(', ')} arrow>
            <IconButton className='tooltip-main-section-button'>
                {firstItem}
                {remainingCategories?.length > 0 && ` +${remainingCategories.length}`}
            </IconButton>
        </Tooltip>
    );
}

