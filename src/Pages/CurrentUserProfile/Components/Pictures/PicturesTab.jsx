import React, { useRef, useState } from 'react'

import dummyImage from "../../../../assets/ViwCardImags/img/profileimg.png";
import fullScreen from "../../../../assets/icons/fullScreen.png";
import trash from "../../../../assets/icons/trash.png";
import ProfileImageFullPopup from '../../../../components/ProfileImageFullPopup/ProfileImageFullPopup';
import { uploadImage } from '../../../../helper/cloudinary/uploadFile';

const PicturesTab = () => {

    const [image, setImage] = useState(null);
    const [showGallery, setShowGallery] = useState(false);
    const inputRef = useRef();
    
    const submitHandler = () => {
        uploadImage(image)
        .then(res => {
            console.log(res);
            setImage(null);
        })
        .catch(err => {
            console.log(err);            
        })
    }

    return (
        <>
            <div className="d-flex flex-column gap-4 align-items-center">

                <ProfileImageFullPopup
                    show={showGallery}
                    handleClose={() => setShowGallery(false)}
                    image={image ? URL.createObjectURL(image) : null}
                />

                {
                    image && <>
                        <div className="">
                            {/* <img src={dummyImage} alt="image" /> */}

                            <img
                                src={URL.createObjectURL(image)}
                                alt="preview"
                                style={{
                                    height: "316px",
                                    width: "389px",
                                    objectFit: "cover",
                                    borderRadius: "5px",
                                }}
                            />
                        </div>

                        <div className="d-flex gap-5">
                            <div
                                className="d-flex gap-lg-2"
                                onClick={() => setImage(null)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={trash} alt="trash" width={"25px"} height={"25px"} />
                                <p className='mb-0 text-decoration-underline text-danger'>Delete</p>
                            </div>
                            <div
                                className="d-flex gap-2"
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowGallery(true)}
                            >
                                <img src={fullScreen} alt="full view" width={"25px"} height={"25px"} />
                                <p className='mb-0 text-decoration-underline' style={{ color: "#096BFF" }}>Full View</p>
                            </div>
                        </div>
                    </>
                }

                {
                    image &&
                    <div className="">
                        <button className='custom-button py-1 px-4 rounded-4 border-0' onClick={submitHandler}>Submit</button>
                    </div>
                }

                {
                    !image &&
                    <div className="">
                        <button
                            className='custom-button py-1 px-4 rounded-4 border-0'
                            onClick={() => inputRef.current.click()}
                        >
                            Add Picture
                        </button>
                        <input
                            type="file"
                            accept='image/*'
                            ref={inputRef}
                            style={{ display: "none" }}
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                }

                <p className='mb-0 text-center' style={{ fontSize: "14px" }}>Your primary picture has to be a vanilla (non-adult) picture. Due to Google & Apple policy we do not allow adult pictures as primary profile pictures.</p>

            </div>
        </>
    )
}

export default PicturesTab