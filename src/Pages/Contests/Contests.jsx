import React, { useState } from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper'
import { Button, ButtonGroup, Nav, Container, Row, Col } from 'react-bootstrap';
import FilterBar from "../../components/FilterBar/FilterBar"
import WritingContestTabContainer from '../../components/ContestTabContainers/WritingContestTabContainer';
import PastContestContainer from '../../components/pastContestContainer/PastContestContainer';
import ContestPrizeContainer from '../../components/ContestPrizeContainer/ContestPrizeContainer';
import VideoContestTabContainer from '../../components/ContestTabContainers/VideoContestTabContainer';
import PhotoContestTabContainer from '../../components/ContestTabContainers/PhotoContestTabContainer';

const Contests = () => {
    const [activeTab, setActiveTab] = useState('writing');
    return (
        <>
            <div style={{ backgroundColor: "var(--color-background)" }}>
                <GlobalPageWrapper>
                    <FilterBar pageName={"Contests"} />
                    <div>
                        <div className=" text-white py-3 px-4 rounded">
                            {/* Tabs */}
                            <Nav variant="underline" className="mb-3">
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="writing"
                                        onClick={() => setActiveTab('writing')}
                                        className={activeTab === 'writing' ? 'text-primary' : 'text-white'}
                                    >
                                        Writing Contest
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="photo"
                                        onClick={() => setActiveTab('photo')}
                                        className={activeTab === 'photo' ? 'text-primary' : 'text-white'}
                                    >
                                        Photo Contest
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey="video"
                                        onClick={() => setActiveTab('video')}
                                        className={activeTab === 'video' ? 'text-primary' : 'text-white'}
                                    >
                                        Video Contest
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <hr />
                            {/* Buttons */}


                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 py-3">
                                <div className='d-flex align-items-center gap-5'>
                                    <div className="d-flex gap-2">
                                        <Button variant="primary" className="rounded-pill px-4" onClick={() => setActiveTab('Past Contests')}>
                                            Past Contests
                                        </Button>
                                        <Button variant="outline-primary" className="rounded-pill px-4 text-white border-primary" onClick={() => setActiveTab('contest prize')}>
                                            Prizes
                                        </Button>
                                    </div>
                                    <div>12 Entries | 844 total vote(s)</div>
                                </div>

                                <div className="d-flex gap-2">
                                    <button className="rounded-pill px-4 text-white bg-danger">
                                        Submit
                                    </button>
                                    <Button variant="outline-danger" className="rounded-pill px-4 text-white border-danger">
                                        Filter
                                    </Button>
                                </div>
                            </div>




                            {/* Tab Content */}
                            {activeTab === 'writing' && <WritingContestTabContainer />}
                            {activeTab === 'photo' && <PhotoContestTabContainer />}
                            {activeTab === 'video' && <VideoContestTabContainer />}
                            {activeTab === 'Past Contests' && <PastContestContainer />}
                            {activeTab === 'contest prize' && <ContestPrizeContainer />}
                            
                        </div>
                    </div>
                </GlobalPageWrapper>
            </div>
        </>
    )
}

export default Contests