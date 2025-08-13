import React from 'react'
import CurrentProfileCard from '../../../../components/cards/CurrentProfileCard'

const PicturesTab = () => {
  return (
    <>
            <div className="row">
                <div className="col-lg-6">
                    <div className="">
                        <CurrentProfileCard />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="">
                        <div className="d-flex justify-content-between align-items-center border px-4 py-2 rounded-4 mb-4" style={{ backgroundColor: "var(--color-border)", }}>
                            <p className='mb-0'>Looking for:</p>
                            <button className='custom-button rounded-4 px-3 py-1 border-0'>Edit Profile</button>
                        </div>
                        <div className="d-flex flex-column align-items-start justify-content-center">
                            <p>all desi couples join the group "usa-desi-couples" </p>
                            <p> well educated couple from nc , looking to meet decent, respectful couple friends</p>
                            <p>Desi married couples ....</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default PicturesTab