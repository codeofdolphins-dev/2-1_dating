import React, { useEffect, useState } from "react";
import GlobalPageWrapper from "../../components/GlobalPageWrapper";
import FilterBar from "../../components/FilterBar/FilterBar";

import img1 from "../../assets/ViwCardImags/img/couple.avif";
import img2 from "../../assets/ViwCardImags/img/coupleImg.jpeg";
import img3 from "../../assets/ViwCardImags/img/profileImg.png";
import img4 from "../../assets/ViwCardImags/img/profileImg.webp";
import ViewPageCard from "../../components/ViewPageCard/ViewPageCard";
import httpService from "../../helper/httpService";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/customToast/CustomToast";
import { useAuth } from "../../context/AuthContextAPI";
import ItemsPerPageSelector from "../../components/Pagination/ItemsPerPageSelector";
import Pagination from "../../components/Pagination/Pagination";
import DeviceInfoPopup from "../../components/DeviceInfoPopup/DeviceInfoPopup";
import PaginationWithSelector from "../../components/Pagination/PaginationWithSelector";

const images = [img1, img2, img3, img4];

const filterName = [
  "Likes given",
  "Mutual",
  "Received",
  "Not Interested",
  "Latest",
  "Distance",
  "All",
  "Couple & Females",
  "Couples",
  "Females",
  "Males",
  "Transgender",
  "Business",
];

const LikeDislike = () => {
  const { filterOption } = useAuth();

  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalCount, setTotalCount] = useState(0)
  const [apiTotalPages, setApiTotalPages] = useState(0)

  // Fetch data based on filter, page, and limit
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let endpoint = "/interactions";

        if (filterOption === "Not Interested") {
          endpoint = "/interactions/my-dislikes";
        } else if (filterOption === "Likes given") {
          endpoint = "/interactions/my-likes";
        }

        const response = await httpService(endpoint, "GET", {}, {
          page: currentPage,
          limit: itemsPerPage,
        });

        console.log("Fetched Data:", response?.targetUserId?.profile?.photos);

        showSuccessToast(response?.message);

        setUser(response?.data || []); // adjust if API returns different structure

        setTotalCount(response?.data?.meta?.pagination?.total ?? null);
        setApiTotalPages(response?.data?.meta?.pagination?.pageCount ?? null);

      } catch (err) {
        console.error("Failed to fetch Like/Dislike:", err);
        showErrorToast(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filterOption, currentPage, itemsPerPage]); // watch for pagination + filter changes

  return (
    <GlobalPageWrapper>
      <FilterBar
        pageName={"Likes / Dislikes"}
        filterName2={"Filter"}
        filter2={filterName}
        okButton={true}
      />

      <div className="container-fluid">
        <div className="row g-4 pt-4">
          {user.length > 0 ? (
            user.map((card, index) => (
              <div
                className="col-12 col-sm-6 col-lg-6 col-xl-4"
                key={index}
              >
                <ViewPageCard
                  card={card}
                  index={index}
                  images={images}
                  likeIcon={true}
                  showlikeDislike={false}
                />
              </div>
            ))
          ) : (
            <p className="text-white">No results found.</p>
          )}
        </div>

        <PaginationWithSelector
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}

          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}

          totalCount={totalCount}
          apiTotalPages={apiTotalPages}
        />

      </div>
      <DeviceInfoPopup />
    </GlobalPageWrapper>
  );
};

export default LikeDislike;
