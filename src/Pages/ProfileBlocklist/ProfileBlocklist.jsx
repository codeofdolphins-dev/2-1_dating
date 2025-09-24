import React, { useEffect, useState } from "react";
import FilterBar from "../../components/FilterBar/FilterBar";
import GlobalPageWrapper from "../../components/GlobalPageWrapper";

import img1 from "../../assets/ViwCardImags/img/couple.avif";
import img2 from "../../assets/ViwCardImags/img/coupleImg.jpeg";
import img3 from "../../assets/ViwCardImags/img/profileImg.png";
import img4 from "../../assets/ViwCardImags/img/profileImg.webp";

import ViewPageCard from "../../components/ViewPageCard/ViewPageCard";
import httpService from "../../helper/httpService.js";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/customToast/CustomToast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OverlayLoader from "../../helper/OverlayLoader.jsx";
import PaginationWithSelector from "../../components/Pagination/PaginationWithSelector.jsx";
import { useAuth } from "../../context/AuthContextAPI.jsx";

const images = [img1, img2, img3, img4];

const ProfileBlocklist = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalCount, setTotalCount] = useState(0)
  const [apiTotalPages, setApiTotalPages] = useState(0)

  // Fetch blocklist

  const { filterOption } = useAuth()
  useEffect(() => {
    if (filterOption) {
      httpService(`/interactions/blocks?search=${filterOption}`, "GET")
        .then((res) => {
          console.log("blockList", res);
          setUser(res?.data?.blocks || []);
          // showSuccessToast("Blocklist fetched successfully ✅");
          setLoading(false)
        })
        .catch((err) => {
          console.error(err);
          showErrorToast(err.message || "Failed to fetch blocklist ❌");
          setLoading(false)
        });
    } else {
      httpService(`/interactions/blocks`, "GET")
        .then((res) => {
          console.log("blockList", res);
          setUser(res?.data?.blocks || []);
          // showSuccessToast("Blocklist fetched successfully ✅");
          setLoading(false)
        })
        .catch((err) => {
          console.error(err);
          showErrorToast(err.message || "Failed to fetch blocklist ❌");
          setLoading(false)
        });
    }
  }, [filterOption]);

  // Delete handler
  const handleeDeleteFunction = (card) => {
    console.log("Deleting blocklist card:", card);

    // Example API call (unblock/delete)
    httpService(`/interactions/${card._id}`, "DELETE")
      .then(() => {
        // Remove from UI
        setUser((prev) => prev.filter((u) => u._id !== card._id));
        showSuccessToast(`${card.username || "User"} removed from blocklist ✅`);
      })
      .catch((err) => {
        console.error(err);
        showErrorToast(err.message || "Failed to remove from blocklist ❌");
      });
  };

  // setTotalCount();
  // setApiTotalPages();

  console.log("erty", user)

  return (
    <>
      <GlobalPageWrapper>
        <ToastContainer />
        <OverlayLoader show={loading} text="Please wait..." />
        <FilterBar filter2={[]} pageName={"Blocklist"} filterName2={"Filter"} friendsFilterTopSearchBar={true} />
        <div className="container-fluid">
          <div className="row g-4 pt-4">
            {user?.length === 0 ? <div className='text-white'>No Users Found </div> : user.map((card, index) => (
              <div className="col-12 col-sm-6 col-lg-6 col-xl-4" key={index}>
                <ViewPageCard
                  card={card}
                  index={index}
                  images={card?.targetUserId?.profile?.photos}
                  showFriendOptions={false}
                  timestamp={false}
                  deleteOption={true}
                  handleeDeleteFunction={handleeDeleteFunction}
                  showTime={false}
                  userName={card?.targetUserId?.username}
                />
              </div>
            ))}
          </div>
        </div>

        {
          user?.length !== 0 && <PaginationWithSelector
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}

            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}

            totalCount={totalCount}
            apiTotalPages={apiTotalPages}
          />
        }




        {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      </GlobalPageWrapper>
    </>
  );
};

export default ProfileBlocklist;
