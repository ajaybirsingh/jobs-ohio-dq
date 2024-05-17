
import React from 'react';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';

const PDFSample = () => {
    const options = {
        method: 'open',
        resolution: Resolution.MEDIUM,
        page: {
            margin: Margin.MEDIUM,
            format: 'letter',
            orientation: 'landscape',
        },
    };
    const getTargetElement = () => document.getElementById('content-id');

    return (
        <div>
            <div id="content-id">
                <p>This is some content with a</p>
            </div>
            <button onClick={() => generatePDF(getTargetElement, options)}>Download PDF</button>
        </div>
    );
};

export default PDFSample;
