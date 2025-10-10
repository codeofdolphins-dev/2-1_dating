import { useEffect, useState, useCallback } from "react";
import httpService from "../../../helper/httpService";

// Components
import CardContainer from "../../../components/cards/CardContainer";
import UserProfileCard from "../../../components/cards/UserProfileCard";
import CardAction from "../../../components/cards/CardAction";
import GroupDetailsCard from "../../../components/cards/GroupDetailsCard";
import EventInformationCard from "../../../components/cards/EventInformationCard";
import FeedNotificationCard from "../../../components/FeedNotificationCard/FeedNotificationCard";
import PaginationWithSelector from "../../../components/Pagination/PaginationWithSelector";
import OverlayLoader from "../../../helper/OverlayLoader";
import { useAuth } from "../../../context/AuthContextAPI";

// Images
import yelloMiddleLogo from "../../../assets/cardImgs/Images/middle-logo-yellow.png";
import likeLogo from "../../../assets/cardImgs/Images/like.png";
import peopleLogo from "../../../assets/cardImgs/Images/middle-logo.png";
import partyLogo from "../../../assets/cardImgs/Images/party.png";

const FeedScreen = () => {
  const { globalToggle } = useAuth();

  const [feedData, setFeedData] = useState([]);
  const [show, setShow] = useState(false);

  const [page, setPage] = useState(1); // for load more
  const [itemsPerPage] = useState(6);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [totalCount, setTotalCount] = useState(0);
  const [apiTotalPages, setApiTotalPages] = useState(0);

  /** 🧠 Fetch feed data */
  const fetchFeed = useCallback(async () => {
    if (loading || !hasMore) return;

    setShow(true);
    setLoading(true);

    try {
      const res = await httpService(`/feed?page=${page}&limit=${itemsPerPage}`, "GET");
      const responseData = res?.data;

      if (responseData?.length > 0) {
        setFeedData(prev => [...prev, ...responseData]);
      } else {
        setHasMore(false);
      }

      setTotalCount(res?.meta?.pagination?.total || 0);
      setApiTotalPages(res?.meta?.pagination?.pageCount || 0);

      console.log("Feed data fetched:", responseData);
    } catch (err) {
      console.error("Error fetching feed:", err);
    } finally {
      setShow(false);
      setLoading(false);
    }
  }, [page, itemsPerPage, hasMore, loading, globalToggle]);

  /** 🚀 Fetch data when page changes */
  useEffect(() => {
    fetchFeed();
  }, [page]);

  /** 🕒 Format timestamp to "08 hours, 24 min" */
  const getTimeDifference = (timestamp) => {
    if (!timestamp) return "Just now";

    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    if (diffMs < 0) return "Just now";

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);

    if (diffDays > 0) return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
    return `${String(diffHours).padStart(2, "0")} hours, ${String(diffMinutes).padStart(2, "0")} min`;
  };


  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && hasMore && !loading) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  /** 🧩 Render each feed card */
  const renderFeedItem = (data, index) => {
    switch (data?.type) {
      case "like_received":
        return (
          <CardContainer
            key={index}
            headerText={data?.title || `${data?.relatedUserId?.username || "Someone"} liked your post`}
            dateText={getTimeDifference(data?.createdAt)}
            middleIcon={likeLogo}
          >
            <div className="row g-3">
              <div className="col-md-6">
                <UserProfileCard dataSecondUserId={data?.relatedUserId} />
              </div>
              <div className="col-md-6">
                <UserProfileCard dataFirstUserId={data} />
              </div>
            </div>
          </CardContainer>
        );

      case "friend_request":
        return (
          <CardContainer
            key={index}
            headerText={data?.message || "New Friend Request"}
            dateText={getTimeDifference(data?.createdAt)}
            middleIcon={yelloMiddleLogo}
          >
            <div className="row g-3">
              <div className="col-md-6">
                <UserProfileCard dataFirstUserId={data?.relatedUserId} metaData={data?.metadata} />
              </div>
              <div className="col-md-6">
                <CardAction
                  data={data}
                  friendRequestId={data?.metadata?.friendRequestId}
                  feedId={data?._id}
                />
              </div>
            </div>
          </CardContainer>
        );

      case "friend_request_accepted":
        return (
          <CardContainer
            key={index}
            headerText={data?.title || "Friend Request Accepted"}
            dateText={getTimeDifference(data?.createdAt)}
            middleIcon={yelloMiddleLogo}
          >
            <div className="row g-3">
              <div className="col-md-6">
                <UserProfileCard dataFirstUserId={data} />
              </div>
              <div className="col-md-6">
                <UserProfileCard dataSecondUserId={data?.relatedUserId} feedId={data?._id} />
              </div>
            </div>
          </CardContainer>
        );

      case "group_joined":
        return (
          <CardContainer
            key={index}
            headerText={data?.title || "Joined a group"}
            dateText={getTimeDifference(data?.createdAt)}
            middleIcon={peopleLogo}
          >
            <div className="row g-3">
              <div className="col-md-6">
                <UserProfileCard />
              </div>
              <div className="col-md-6">
                <GroupDetailsCard data={data} joinButton={false} />
              </div>
            </div>
          </CardContainer>
        );

      case "event_invite":
        return (
          <CardContainer
            key={index}
            headerText={data?.title || "Event Invitation"}
            dateText={getTimeDifference(data?.createdAt)}
            middleIcon={partyLogo}
          >
            <EventInformationCard data={data} />
          </CardContainer>
        );

      case "profile_view":
      case "new_post":
      case "system_announcement":
        return (
          <FeedNotificationCard
            key={index}
            notification={{
              type: data?.type,
              title: data?.title,
              message: data?.message,
              isRead: data?.isRead || false,
              createdAt: getTimeDifference(data?.createdAt),
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <OverlayLoader show={show} />

      <div className="container py-4 z-0">
        {feedData.length === 0 ? (
          <p className="text-center text-white">No feed items available.</p>
        ) : (
          feedData.map(renderFeedItem)
        )}

        {/* Load More */}
        {/* {!loading && hasMore && (
          <button className="btn btn-primary w-100 mt-2 py-3 h3 mt-2" onClick={() => setPage(prev => prev + 1)}>
            Load More
          </button>
        )} */}
        {!hasMore && <p className="text-white text-center mt-5 h1">No more data</p>}

        {/* Pagination (if needed) */}
        {/* <PaginationWithSelector
          currentPage={page}
          setCurrentPage={setPage}
          itemsPerPage={itemsPerPage}
          totalCount={totalCount}
          apiTotalPages={apiTotalPages}
        /> */}
      </div>
    </>
  );
};

export default FeedScreen;






{/* Group joined card */ }
{/* <CardContainer
          headerText="CPLSUEPAUL has joined Georgia For Chocolate ??"
          dateText="Dec 12, 2024 | 24 Members"
          middleIcon={peopleLogo}
        >
          <div className="row g-3">
            <div className="col-md-6">
              <UserProfileCard />
            </div>
            <div className="col-md-6">
              <GroupDetailsCard />
            </div>
          </div>
        </CardContainer> */}

{/* Group Invitation card */ }
{/* <CardContainer headerText="CLUBELATION would like you to join their event."
          dateText="Dec 12, 2024 | 24 Members"
          middleIcon={yelloMiddleLogo}>
          <div className="row g-3">
            <div className="col-md-6">
              <EventInformationCard />
            </div>
            <div className="col-md-6">
              <CardAction />
            </div>
          </div>
        </CardContainer> */}

{/* Group Invitation card */ }
{/* <CardContainer headerText="MEMB3RSONLY would like you to join their event."
          dateText="Dec 12, 2024 | 24 Members"
          middleIcon={partyLogo}>
          <div className="row g-3">
            <div className="col-md-6">
              <JoinRequestCard />
            </div>
            <div className="col-md-6">
              <CardAction />
            </div>
          </div>
        </CardContainer> */}

{/* Birthday Card */ }
{/* <CardContainer headerText="ANASDF2020 in your area has a birthday"
          dateText="08 hours, 22 min">
          <div className="row g-3">
            <div className="col-md-6">
              <UserProfileCard />
            </div>
            <div className="col-md-6">
              <ActivityCard eventIcon={`bi bi-cake`} eventName={"BirthDay"} />
            </div>
          </div>
        </CardContainer> */}

{/* Friends/like card */ }
{/* <CardContainer
          headerText="AARAVMAYA and KEEPUGRINNING are friends"
          dateText="08 hours, 24 min"
          middleIcon={likeLogo}
        >
          <div className="row g-3">
            <div className="col-md-6">
              <UserProfileCard />
            </div>
            <div className="col-md-6">
              <UserProfileCard />
            </div>
          </div>
        </CardContainer> */}

{/* Travel date card */ }
{/* <CardContainer headerText="ANASDF2020 is posted a travel date"
          dateText="08 hours, 22 min">
          <div className="row g-3">
            <div className="col-md-6">
              <UserProfileCard />
            </div>
            <div className="col-md-6">
              <ActivityCard eventIcon={`bi bi-calendar`} eventName={"ANASDF2020 is posted a travel date"} />
            </div>
          </div>
        </CardContainer> */}

{/* Certification Card */ }
{/* <CardContainer
          headerText="AARAVMAYA   has certified KEEPUGRINNING"
          dateText="08 hours, 24 min"
        >
          <div className="row g-3">
            <div className="col-md-6">
              <UserProfileCard />
            </div>
            <div className="col-md-6">
              <UserProfileCard />
            </div>
          </div>
        </CardContainer> */}

{/* Hotdate Card */ }
{/* <CardContainer headerText="ANASDF2020 is posted a Hotdate"
          dateText="08 hours, 22 min">
          <div className="row g-3">
            <div className="col-md-6">
              <UserProfileCard />
            </div>
            <div className="col-md-6">
              <ActivityCard eventIcon={`fa-solid fa-glass-cheers`} eventName={"ANASDF2020 is posted a Hotdate"} />
            </div>
          </div>
        </CardContainer> */}

{/* Livestream Card */ }
{/* <CardContainer headerText="ANASDF2020 started livestream"
          dateText="08 hours, 22 min">
          <div className="row g-3">
            <div className="col-md-6">
              <UserProfileCard />
            </div>
            <div className="col-md-6">
              <ActivityCard eventIcon={`bi bi-camera-video-fill`} eventName={"ANASDF2020 started livestream"} />
            </div>
          </div>
        </CardContainer> */}


{/* <UserProfileCard />
        {/* <GroupJoinCard />
        <GroupJoinCardNoImg/>
        <BirthdayEventCard />
        <FriendConnectionCard/> */}
{/* <EveentCard/> */ }