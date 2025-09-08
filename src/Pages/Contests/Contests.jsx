import React, { useState } from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper'
import { Button, Nav, Dropdown } from 'react-bootstrap';
import FilterBar from "../../components/FilterBar/FilterBar"
import WritingContestTabContainer from '../../components/ContestTabContainers/WritingContestTabContainer';
import PastContestContainer from '../../components/pastContestContainer/PastContestContainer';
import ContestPrizeContainer from '../../components/ContestPrizeContainer/ContestPrizeContainer';
import VideoContestTabContainer from '../../components/ContestTabContainers/VideoContestTabContainer';
import PhotoContestTabContainer from '../../components/ContestTabContainers/PhotoContestTabContainer';

const Contests = () => {
    const [activeTab, setActiveTab] = useState('writing');
    const [showForm, setShowForm] = useState(false);
    const [selectedLang, setSelectedLang] = useState("English");
    const [story, setStory] = useState("");
    const [title, setTitle] = useState("");
    const [agree, setAgree] = useState(false);

    const maxWords = 1250;
    const minWords = 350;

    const languages = [
        "Nederlands",
        "Deutsch",
        "Français",
        "Español",
        "Italiano",
        "English",
        "Português",
        "Türkçe",
        "Norsk"
    ];

    const handleSubmitClick = () => {
        setShowForm((prev) => !prev); // toggle form slide
    };

    // ✅ Count words dynamically
    const wordCount = story.trim() === "" ? 0 : story.trim().split(/\s+/).length;
    const wordsLeft = maxWords - wordCount;

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
                                    <button
                                        className="rounded-pill px-4 text-white bg-danger"
                                        onClick={handleSubmitClick}
                                    >
                                        Submit
                                    </button>
                                    <Button variant="outline-danger" className="rounded-pill px-4 text-white border-danger">
                                        Filter
                                    </Button>
                                </div>
                            </div>

                            {/* Slide Down Form */}
                            <div className={`submission-form ${showForm ? "show" : ""}`}>
                                <div>
                                    <h3>What To Do:</h3>
                                    <p className='fs-6 mb-0'>- Describe your personal real-life experience (not fantasy or fiction, please).</p>
                                    <p className='fs-6 mb-0'>- Submissions must be between 350 - 1250 words.</p>
                                    <p>- Please check your grammar before submitting.</p>

                                    <h2>What Not To Do:</h2>
                                    <p className='fs-6 mb-0'>- Don't use real names (use aliases) in your story.</p>
                                    <p>- Don't be too graphic with your language and sexual details.</p>

                                    <h2>Add Your Erotic Story Below</h2>

                                    <div className="my-3">
                                        <Dropdown className="w-100">
                                            <Dropdown.Toggle
                                                variant=""
                                                className="w-100 text-start rounded-0 text-white"
                                                style={{ backgroundColor: "var(--color-border)" }}
                                            >
                                                {selectedLang}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="w-100">
                                                {languages.map((lang, index) => (
                                                    <Dropdown.Item
                                                        key={index}
                                                        onClick={() => setSelectedLang(lang)}
                                                        active={selectedLang === lang}
                                                    >
                                                        {lang}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>

                                {/* Submission Form */}
                                <div className=" text-white p-4 rounded">
                                    <h5>Submit Your Entry</h5>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        className="form-control my-2"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <textarea
                                        placeholder="Write your story here..."
                                        rows="6"
                                        className="form-control my-2"
                                        // style={{backgroundColor:"var(--color-border)"}}
                                        value={story}
                                        onChange={(e) => setStory(e.target.value)}
                                    ></textarea>

                                    {/* ✅ Word Counter */}
                                    <div className="small text-white mb-2">
                                        {wordCount} Written Words / {wordsLeft} Words Left
                                    </div>

                                    {/* ✅ Radio Disclaimer */}
                                    <div className="form-check mb-3">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id="agree"
                                            checked={agree}
                                            onChange={() => setAgree(true)}
                                        />
                                        <label className="form-check-label small text-light" htmlFor="agree">
                                            By submitting this story, you are asserting that this is original content created by you,
                                            and allow SDC to use the story any way they choose (while keeping your profile / member
                                            information private and anonymous).
                                        </label>
                                    </div>

                                    <Button
                                        variant="primary"
                                        className="mt-2 rounded-pill px-4"
                                    // disabled={!agree || wordCount < minWords || wordCount > maxWords}
                                    >
                                        Submit Entry
                                    </Button>
                                    &nbsp;
                                    <Button
                                        className="mt-2 bg-white text-dark border-0 rounded-pill px-4"
                                    // disabled={!agree || wordCount < minWords || wordCount > maxWords}
                                    >
                                        Cancel
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

            {/* ✅ CSS for Slide Animation */}
            <style jsx>{`
                .submission-form {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.5s ease, opacity 0.5s ease;
                    opacity: 0;
                }
                .submission-form.show {
                    max-height: 900px; /* enough to fit form */
                    opacity: 1;
                }
            `}</style>
        </>
    )
}

export default Contests;
