import CardContainer from "../../../components/cards/CardContainer";
/* import BirthdayEventCard from "./cards/BirthdayEventCard.feed";
import FriendConnectionCard from "./cards/FriendConnectionCard ";
import UserJoinedCard from "./cards/GroupJoinCard.Feed";

import GroupJoinCard from "./cards/GroupJoinCard.Feed";
import GroupJoinCardNoImg from "./cards/GroupJoinCardNoImg"; */
import UserProfileCard from "../../../components/cards/userProfileCard";
import CardAction from "../../../components/cards/CardAction";
import GroupDetailsCard from "../../../components/cards/GroupDetailsCard";
import EventInformationCard from "../../../components/cards/EventInformationCard";
import JoinRequestCard from "../../../components/cards/JoinRequestCard";
import ActivityCard from "../../../components/cards/ActivityCard";

import yelloMiddleLogo from "../../../assets/cardImgs/Images/middle-logo-yellow.png"
import likeLogo from "../../../assets/cardImgs/Images/like.png"
import peopleLogo from "../../../assets/cardImgs/Images/middle-logo.png"
import partyLogo from "../../../assets/cardImgs/Images/party.png"

const FeedScreen = () => {
  // console.log(user);

  return (
    <>
      <div className="container py-4 z-0">
        <CardContainer
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
        </CardContainer>

        <CardContainer headerText="CLUBELATION would like you to join their event."
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
        </CardContainer>

        <CardContainer headerText="MEMB3RSONLY would like you to join their event."
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
        </CardContainer>

        <CardContainer headerText="ANASDF2020 in your area has a birthday"
          dateText="08 hours, 22 min">
          <div className="row g-3">
            <div className="col-md-6">
              <UserProfileCard />
            </div>
            <div className="col-md-6">
              <ActivityCard eventIcon={`bi bi-cake`} eventName={"BirthDay"} />
            </div>
          </div>
        </CardContainer>

        <CardContainer
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
        </CardContainer>

        <CardContainer headerText="ANASDF2020 is posted a travel date"
          dateText="08 hours, 22 min">
          <div className="row g-3">
            <div className="col-md-6">
              <UserProfileCard />
            </div>
            <div className="col-md-6">
              <ActivityCard eventIcon={`bi bi-calendar`} eventName={"ANASDF2020 is posted a travel date"} />
            </div>
          </div>
        </CardContainer>

        <CardContainer
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
        </CardContainer>

        <CardContainer headerText="ANASDF2020 is posted a Hotdate"
          dateText="08 hours, 22 min">
          <div className="row g-3">
            <div className="col-md-6">
              <UserProfileCard />
            </div>
            <div className="col-md-6">
              <ActivityCard eventIcon={`fa-solid fa-glass-cheers`} eventName={"ANASDF2020 is posted a Hotdate"} />
            </div>
          </div>
        </CardContainer>

        <CardContainer headerText="ANASDF2020 started livestream"
          dateText="08 hours, 22 min">
          <div className="row g-3">
            <div className="col-md-6">
              <UserProfileCard />
            </div>
            <div className="col-md-6">
              <ActivityCard eventIcon={`bi bi-camera-video-fill`} eventName={"ANASDF2020 started livestream"} />
            </div>
          </div>
        </CardContainer>


        {/* <UserProfileCard />
        {/* <GroupJoinCard />
        <GroupJoinCardNoImg/>
        <BirthdayEventCard />
        <FriendConnectionCard/> */}
        {/* <EveentCard/> */}
      </div>
    </>
  );
};

export default FeedScreen;
