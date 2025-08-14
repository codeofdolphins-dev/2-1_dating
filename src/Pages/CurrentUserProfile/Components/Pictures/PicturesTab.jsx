import React from 'react'

import dummyImage from "../../../../assets/ViwCardImags/img/profileimg.png";
import fullScreen from "../../../../assets/icons/fullScreen.png";
import trash from "../../../../assets/icons/trash.png";

const PicturesTab = () => {
    return (
        <>
            <div className="d-flex flex-column gap-4 align-items-center">
                <div className="">
                    <img src={dummyImage} alt="image" />
                </div>

                <div className="d-flex gap-5">
                    <div className="d-flex gap-lg-2">
                        <img src={trash} alt="trash" width={"25px"} height={"25px"} />
                        <p className='mb-0 text-decoration-underline text-danger'>Delete</p>
                    </div>
                    <div className="d-flex gap-2">
                        <img src={fullScreen} alt="full view" width={"25px"} height={"25px"} />
                        <p className='mb-0 text-decoration-underline' style={{ color: "#096BFF" }}>Full View</p>
                    </div>
                </div>

                <div className="">
                    <button className='custom-button py-1 px-4 rounded-4 border-0'>Add Picture</button>
                </div>

                <p className='mb-0 text-center' style={{ fontSize: "14px" }}>Your primary picture has to be a vanilla (non-adult) picture. Due to Google & Apple policy we do not allow adult pictures as primary profile pictures.</p>

            </div>
        </>
    )
}

export default PicturesTab