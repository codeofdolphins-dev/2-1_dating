import React from 'react'
import ContestVideoCard from '../contestVideoCard/ContestVideoCard'

const cards = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]

const VideoContestTabContainer = () => {
  return (
    <>
    <div className='client-page-background' style={{cursor:"pointer"}}>
        <div className="container-fluid">
          <div className="row g-4 pt-4">
            {
              cards.map((card, index) => (
                <div className="col-12 col-sm-6 col-lg-4 col-xl-2 d-flex justify-content-center" key={index}>
                 <ContestVideoCard username={"LOVESTOWATCH12"} title={"I LOve To Be Black Bred"}/>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default VideoContestTabContainer