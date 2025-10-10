import { useEffect, useState } from "react";
import httpService from "../../../helper/httpService";

// Components
import CardContainer from "../../../components/cards/CardContainer";
import UserProfileCard from "../../../components/cards/UserProfileCard";
import CardAction from "../../../components/cards/CardAction";
import GroupDetailsCard from "../../../components/cards/GroupDetailsCard";
import EventInformationCard from "../../../components/cards/EventInformationCard";
import JoinRequestCard from "../../../components/cards/JoinRequestCard";
import ActivityCard from "../../../components/cards/ActivityCard";

// Images
import yelloMiddleLogo from "../../../assets/cardImgs/Images/middle-logo-yellow.png";
import likeLogo from "../../../assets/cardImgs/Images/like.png";
import peopleLogo from "../../../assets/cardImgs/Images/middle-logo.png";
import partyLogo from "../../../assets/cardImgs/Images/party.png";
import OverlayLoader from "../../../helper/OverlayLoader";

const FeedScreen = () => {
  const [feedData, setFeedData] = useState([]);
  const [show, setShow] = useState(true)
  useEffect(() => {
    httpService("/feed", "GET")
      .then((res) => {
        console.log("Feed data:", res?.data);
        setFeedData(res?.data || []);
      })
      .catch((err) => {
        console.error("Error fetching feed:", err);
      })
      .finally(() => {
        setShow(false)
      })
  }, []);

  // Format timestamp -> "08 hours, 24 min"
  const getTimeDifference = (timestamp) => {
    if (!timestamp) return "Just now";

    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;

    if (diffMs < 0) return "Just now"; // safeguard for future timestamps

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffDays > 0) {
      return diffDays === 1
        ? `${diffDays} day`
        : `${diffDays} days`;
    }

    return `${String(diffHours).padStart(2, "0")} hours, ${String(diffMinutes).padStart(2, "0")} min`;
  };


  return (
    <>
      <OverlayLoader show={show} />
      <div className="container py-4 z-0">
        {feedData.length === 0 ? (
          <p className="text-center text-white">No feed items available.</p>
        ) : (
          feedData.map((data, index) => {
            console.log("Feed item:", data);

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
                    headerText={data?.title || "New Friend Request"}
                    dateText={getTimeDifference(data?.createdAt)}
                    middleIcon={yelloMiddleLogo}
                  >
                    <div className="row g-3">
                      <div className="col-md-6">
                        <UserProfileCard dataFirstUserId={data?.relatedUserId} />
                      </div>
                      <div className="col-md-6">
                        <CardAction data={data} />
                      </div>
                    </div>
                  </CardContainer>
                );

              case "friend_request_accepted":
                return (
                  <CardContainer
                    key={index}
                    headerText={data?.title || "New Friend Request"}
                    dateText={getTimeDifference(data?.createdAt)}
                    middleIcon={yelloMiddleLogo}
                  >
                    <div className="row g-3">
                      <div className="col-md-6">
                        <UserProfileCard dataFirstUserId={data} />
                      </div>
                      <div className="col-md-6">
                        <UserProfileCard dataSecondUserId={data?.relatedUserId} />
                      </div>
                    </div>
                  </CardContainer>
                );

              // Example placeholders for future feed types
              case "group_joined":
                return (
                  <>
                    <CardContainer
                      headerText={data?.title || "Joined a group"}
                      dateText={getTimeDifference(data?.createdAt)}
                      middleIcon={peopleLogo}
                    >
                      <div className="row g-3">
                        <div className="col-md-6">
                          <UserProfileCard />
                        </div>
                        <div className="col-md-6">
                          <GroupDetailsCard data={data} joinButton={false}/>
                        </div>
                      </div>
                    </CardContainer>
                  </>
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

              default:
                return null;
            }
          })
        )}
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