import React, { useEffect, useState } from "react";
import GlobalPageWrapper from "../../components/GlobalPageWrapper";
import FilterBar from "../../components/FilterBar/FilterBar";
import { useAuth } from "../../context/AuthContextAPI";
import ViewPageCard from "../../components/ViewPageCard/ViewPageCard";
import { useLocation } from "react-router-dom";
import OverlayLoader from "../../helper/OverlayLoader";
import axios from "axios";
import ItemsPerPageSelector from "../../components/Pagination/ItemsPerPageSelector";
import { Pagination } from "react-bootstrap";
import { showErrorToast } from "../../components/customToast/CustomToast"; // ✅ import error toast

const OtherUserFriendListpage = () => {
  const { userNameFromFriendListPage } = useAuth();

  const apiUrl = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [cards, setCards] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("i");

  const fetchMembers = async (page, limit) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("jwtToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit },
      };

      const response = await axios.get(`${apiUrl}/friends/${userId}`, config);
      const members = response?.data?.data?.friends || [];

      const totalCount = response?.data?.data?.pagination?.total ?? null;
      const apiTotalPages = response?.data?.data?.pagination?.pageCount ?? null;

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
      showErrorToast(
        `Please login again. ${
          error?.response?.data?.message || "An error occurred."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMembers(currentPage, itemsPerPage);
    }
  }, [currentPage, itemsPerPage, userId]);

  console.log("qqqq",cards)

  // ✅ Build Bootstrap Pagination
  const renderPagination = () => {
    let items = [];
    for (let page = 1; page <= totalPages; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </Pagination.Item>
      );
    }
    return <Pagination>{items}</Pagination>;
  };

  return (
    <GlobalPageWrapper>
      <OverlayLoader show={loading} text="Please wait..." />
      <FilterBar pageName={`${userNameFromFriendListPage} Friend List`} />
      <div
        className="container-fluid client-page-background"
        style={{ minHeight: "100vh" }}
      >
        <div className="row g-4 pt-4">
          {cards.length === 0 ? (
            <div className="text-white">No Profile Friends Found</div>
          ) : (
            cards.map((card, index) => (
              <div
                className="col-12 col-sm-6 col-lg-6 col-xl-4"
                key={index}
              >
                <ViewPageCard index={index} card={card}  />
              </div>
            ))
          )}
        </div>

        {/* Items per page selector */}
        <ItemsPerPageSelector
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
        />

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-4">
          {renderPagination()}
        </div>
      </div>
    </GlobalPageWrapper>
  );
};

export default OtherUserFriendListpage;
