import React from 'react'

import GlobalPageWrapper from '../../components/GlobalPageWrapper';
import FilterBar from '../../components/FilterBar/FilterBar';
import NotesCard from './components/NotesCard';


const Notes = () => {
    return (
        <>
            <GlobalPageWrapper>
                <FilterBar clas pageName={"Notes"} filterName2={"Filter"} />

                <div className="container-fluid">
                    <div className="row g-4 pt-4">
                        {
                            [1,2,3,4,5,6,7,8].map((i) => (
                                <div className="col-12, col-sm-6 col-lg-6 col-xl-4 mt-0" key={i}>
                                    <NotesCard index={ i } />
                                </div>
                            ))
                        }
                    </div>
                </div>

            </GlobalPageWrapper>
        </>
    )
}

export default Notes;