import CardContainer from "../../../components/cards/CardContainer";
/* import BirthdayEventCard from "./cards/BirthdayEventCard.feed";
import FriendConnectionCard from "./cards/FriendConnectionCard ";
import UserJoinedCard from "./cards/GroupJoinCard.Feed";

import GroupJoinCard from "./cards/GroupJoinCard.Feed";
import GroupJoinCardNoImg from "./cards/GroupJoinCardNoImg"; */
import UserProfileCard from "../../../components/cards/userProfileCard";
import CardAction from "../../../components/cards/CardAction";
import GroupDetailsCard from "../../../components/cards/GroupDetailsCard";

const FeedScreen = () => {
  // console.log(user);

  return (
    <>
      <div className="container py-4 z-0">
        <CardContainer
          headerText="CPLSUEPAUL has joined Georgia For Chocolate 🍫"
          dateText="Dec 12, 2024 | 24 Members"
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

        <CardContainer
          headerText="CPLSUEPAUL has joined Georgia For Chocolate 🍫"
          dateText="Dec 12, 2024 | 24 Members"
        >
          <div className="row g-3">
            <div className="col-md-6">
              <UserProfileCard />
            </div>
            <div className="col-md-6">
              <CardAction />
            </div>
          </div>
        </CardContainer>

        <CardContainer
          headerText="CPLSUEPAUL has joined Georgia For Chocolate 🍫"
          dateText="Dec 12, 2024 | 24 Members"
        >
          <div className="row g-3">
            <div className="col-md-6">
              <UserProfileCard />
            </div>
            <div className="col-md-6">
              <CardAction />
            </div>
          </div>
        </CardContainer>

        <CardContainer
          headerText="CPLSUEPAUL has joined Georgia For Chocolate 🍫"
          dateText="Dec 12, 2024 | 24 Members"
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
