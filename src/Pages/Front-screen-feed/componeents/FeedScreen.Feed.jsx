import BirthdayEventCard from "./cards/BirthdayEventCard.feed";
import FriendConnectionCard from "./cards/FriendConnectionCard ";
import UserJoinedCard from "./cards/GroupJoinCard.Feed";

import GroupJoinCard from "./cards/GroupJoinCard.Feed";
import GroupJoinCardNoImg from "./cards/GroupJoinCardNoImg";
import UserProfileCard from "./cards/UserProfileCard.feed";



const FeedScreen = () => {
  // console.log(user);

  return (
    <>
      <div className="container py-4 z-0">
        <UserProfileCard />
        <GroupJoinCard />
        <GroupJoinCardNoImg/>
        <BirthdayEventCard />
        <FriendConnectionCard/>
        {/* <EveentCard/> */}
      </div>
    </>
  );
};

export default FeedScreen;
