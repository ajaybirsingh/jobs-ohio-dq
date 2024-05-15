import React, { useState } from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import "./TwitterFeed.css"
import { CircularProgress } from '@mui/material';
const TwitterFeed = () => {
    const [loading, setLoading] = useState(true);
    const handleTwitter = () => {
        setLoading(false);
    };
    return (
        <>
            {
                loading ?
                    <div className='progress-bar-section'>
                        <CircularProgress className='progress-bar' />
                    </div>
                    : null
            }
            <div className='outer-object-for-twitter-timeline'>
                <TwitterTimelineEmbed
                    screenName="JobsOhio"
                    className="inner-object-for-twitter-timeline"
                    options={{ width: '99%' }}
                    onLoad={handleTwitter}
                />
            </div>
        </>
    )
}
export default TwitterFeed;