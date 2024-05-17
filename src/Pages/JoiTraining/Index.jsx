import React, { useState } from "react";
import './Style.css'
import Layout from "../../Components/Layout/Layout";
import JoiOverview from '../../Assets/JOI_overview 1.png';
import JoiTutorial from '../../Assets/JOI_tutorial.png';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
const JoiTraining = () => {
    const [videoOpen, setVideoOpen] = useState(false);
    const [overviewVideoModal, setOverviewVideoModal] = React.useState(false);
    const [overViewTutorial, setOverViewTutorial] = React.useState(false);
    const handleOpenOverview = () => setOverviewVideoModal(true);
    const handleCloseOverview = () => setOverviewVideoModal(false);

    const handleOpenTraining = () => setOverViewTutorial(true);
    const handleCloseTraining = () => setOverViewTutorial(false);

    const openVideoOverview = () => {
        handleOpenOverview();
    };

    const openVideoTraining = () => {
        handleOpenTraining();
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #ffffff',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Layout>
                <div className="Faqscreen-parent parent-joiTraining">
                    <img src={JoiOverview} alt="joi-overview-img" onClick={openVideoOverview}
                        style={{ cursor: 'pointer' }}></img>
                    <img src={JoiTutorial} alt="joi-tutorial-img" className="joi-tutorial-img" onClick={openVideoTraining} style={{ cursor: 'pointer' }}></img>
                </div>
                {/* overview video modal */}
                <Modal
                    open={overviewVideoModal}
                    onClose={handleCloseOverview}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="modal-joiTraining-videos"
                >
                    <Box sx={style} className="box-video-modals">
                        <div className="box-section-relative">
                            <div className="cross-icon-section" onClick={handleCloseOverview}>
                                <CloseIcon />
                            </div>
                            <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                                <iframe
                                    src="https://player.vimeo.com/video/943726104?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                                    frameBorder="0"
                                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                                    style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
                                    title="JOI PILOT Overview"
                                ></iframe>
                            </div>
                        </div>
                    </Box>
                </Modal>

                {/*training video modal */}
                <Modal
                    open={overViewTutorial}
                    onClose={handleCloseTraining}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="modal-joiTraining-videos"
                >
                    <Box sx={style} className="box-video-modals">
                        <div className="cross-icon-section" onClick={handleCloseTraining}>
                            <CloseIcon />
                        </div>
                        <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                            <iframe
                                src="https://player.vimeo.com/video/943726224?
                                badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                                style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
                                title="JOI PILOT Training"
                            ></iframe>
                        </div>
                    </Box>
                </Modal>
            </Layout>
        </>
    )
}
export default JoiTraining;