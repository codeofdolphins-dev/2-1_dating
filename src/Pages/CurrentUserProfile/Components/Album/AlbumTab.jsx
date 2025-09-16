import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NewAlbumModalPopup from "../../../../components/NewAlbumModalPopup/NewAlbumModalPopup";
import AlbumCard from "../../../../components/AlbumCard/AlbumCard";
import httpService from "../../../../helper/httpService";
import AlbumContainer from "../../../AlbumContainer/AlbumContainer";

const AlbumPage = () => {
  const [toggle, setToggle] = useState(false);
  const [album, setAlbum] = useState([])
  const [load, setLoad] = useState(false)
  const [albumInfoShowToggler, setAlbumInfoShowToggler] = useState(false)
  const [albumId,setAlbumId] = useState()



  useEffect(() => {
    httpService("/albums", "GET")
      .then((res) => {
        console.log("ert", res)
        setAlbum(res?.data?.albums)
      })
      .catch((err) => {
        console.log("ert", err)
      })
  }, [toggle, load])

  return (
    <>
      {
        !albumInfoShowToggler && <div className="min-vh-100 p-3 ">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="text-white fw-bold mb-0">
              ALBUMS <i className="bi bi-question-circle-fill text-primary"></i>
            </h5>
            <button
              className="btn btn-primary btn-sm rounded-pill"
              onClick={() => setToggle(true)}
            >
              Add Album
            </button>
          </div>

          {/* Albums Grid */}
          <div className="d-flex flex-wrap gap-3">
            {album.map((album) => (
              <AlbumCard key={album.id} {...album} setLoad={setLoad} load={load} setAlbumInfoShowToggler={setAlbumInfoShowToggler} setAlbumId={setAlbumId}/>
            ))}
          </div>
        </div>
      }


      {/* Modal */}
      <NewAlbumModalPopup show={toggle} handleClose={() => setToggle(false)} />
        {
          albumInfoShowToggler && <AlbumContainer albumId={albumId} setAlbumInfoShowToggler={setAlbumInfoShowToggler}/>
        }
      
    </>
  );
};

export default AlbumPage;


