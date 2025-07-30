import React, { useState } from 'react'
import "./search.css";
import PageWrapper from '../../components/PageWrapper'
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    return (
        <>
            <PageWrapper>
                <div className="container-fluid py-5 px-5 d-flex flex-column align-items-start justify-content-start gap-2" style={{ backgroundColor: "var(--color-background)", minHeight: "100vh" }}>
                    {/* row 1 */}
                    <div className="d-flex justify-content-start align-items-center gap-3">
                        <i 
                            className="bi bi-chevron-left fs-5 back-icon"
                            onClick={() => navigate("/feed")}
                        ></i>
                        <h4 className='text-white mb-0'>Search</h4>
                    </div>
                    {/* row 2 */}
                    <div className="d-flex justify-content-start align-items-center gap-5">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Profile Name / Keyword'
                        />
                        <button className="searchBtn">Advanced Member Search</button>
                    </div>
                    {/* row 3 */}
                    <div className="text-white d-flex flex-column">
                        <p>in:</p>
                        <div className="">
                            <div className="">
                                <p className='searchSuggestion'>All</p>
                                <p className='searchSuggestion'>Login name</p>
                                <p className='searchSuggestion'>Profile Text</p>
                                <p className='searchSuggestion'>Parties & Events</p>
                            </div>
                            <div className="">
                                <p className='searchSuggestion'>Business</p>
                                <p className='searchSuggestion'>Groups/Communities</p>
                                <p className='searchSuggestion'>Member Service</p>
                                <p className='searchSuggestion'>Forum</p>
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </>
    )
}

export default Search