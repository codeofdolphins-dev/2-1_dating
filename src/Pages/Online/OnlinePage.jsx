import React, { useEffect, useState } from "react";
import GlobalPageWrapper from "../../components/GlobalPageWrapper";
import FilterBar from "../../components/FilterBar/FilterBar";
import ViewPageCard from "../../components/ViewPageCard/ViewPageCard";
import SpeedDateCheckBoxPopup from "../../components/SpeedDateCheckBoxPopup/SpeedDateCheckBoxPopup";
// import Pagination from "../../components/Pagination";
import axios from "axios";

import img1 from "../../assets/ViwCardImags/img/couple.avif";
import img2 from "../../assets/ViwCardImags/img/coupleImg.jpeg";
import img3 from "../../assets/ViwCardImags/img/profileImg.png";
import img4 from "../../assets/ViwCardImags/img/profileImg.webp";
import Pagination from "../../components/Pagination/Pagination";
import { toast, ToastContainer } from "react-toastify";
import { showErrorToast } from "../../components/customToast/CustomToast";
import { useNavigate } from "react-router-dom";
import OverlayLoader from "../../helper/OverlayLoader";

const filter = [
  "Couples",
  "Female",
  "Male",
  "Business",
  "Transgender",
  "Looking for me / us",
];

const images = [img1, img2, img3, img4];

const SpeedDateCheckBoxPopupOptions = {
  heading: "FEATURES",
  options: ["Birthday", "Speed Date", "Videos", "Profile Picture"],
};

const OnlinePage = () => {
  const [showSpeeddateCheckBox, setShowSpeeddateCheckBox] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_BASE_URL;

  const handleFeaturePopup = () => {
    setShowSpeeddateCheckBox(true);
  };

  const fetchMembers = async (page, limit) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("jwtToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: { page, limit },
      };

      const response = await axios.get(`${apiUrl}/users`, config);
      const members = response?.data?.data || [];
      console.log("onlnile response",response)

      const totalCount = response?.data?.meta?.pagination?.total || null;
      const apiTotalPages =
        response?.data?.meta?.pagination?.pageCount || null;

      setCards(members);

      if (totalCount !== null) {
        setTotalPages(Math.ceil(totalCount / limit));
      } else if (apiTotalPages !== null) {
        setTotalPages(apiTotalPages);
      } else {
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Failed to fetch members:", error);
      showErrorToast(`Please login again. ${error?.response?.data?.message || "An error occurred."}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);



  return (
    <>
      <GlobalPageWrapper>
        <OverlayLoader show={loading} text="Please wait..." />
        <FilterBar
          filter2={filter}
          handleSpedDatePopup={true}
          handleFeaturePopup={handleFeaturePopup}
          showLocationForm={true}
          filterName2={"Filter"}
          showTab={false}
          pageName={"Online Now"}
          distanceSlider={false}
          bottomForm={false}
          width={"280px"}
          checkbox={false}
        />

        <div
          className="container-fluid client-page-background"
          style={{ minHeight: "100vh" }}
        >
          <div className="row g-4 pt-4">
            { cards.length === 0 ? <div className="text-white">No one is online now</div>:
            cards.map((card, index) => (
              <div
                className="col-12 col-sm-6 col-lg-6 col-xl-4"
                key={index}
              >
                {
                  card?.settings?.showOnline && <ViewPageCard  index={index} images={images} card={card} />
                }
              </div>
            ))}
          </div>

          <SpeedDateCheckBoxPopup
            show={showSpeeddateCheckBox}
            handleClose={() => setShowSpeeddateCheckBox(false)}
            SpeedDateCheckBoxPopupOptions={SpeedDateCheckBoxPopupOptions}
          />

          {/* Items per page selector */}
          <div className="d-flex justify-content-start align-items-center gap-2 my-3">
            <label className="text-white mb-0">Items per page:</label>
            <select
              className="form-select form-select-sm w-auto"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {[3, 6, 9].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Capsule-style Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
        <ToastContainer />
      </GlobalPageWrapper>
    </>
  );
};

export default OnlinePage;
