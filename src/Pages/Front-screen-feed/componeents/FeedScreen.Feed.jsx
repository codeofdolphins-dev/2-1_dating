import React from 'react'
import UserJoinedCard from './cards/UserJoinedCard.Feed'
import EventCard from './cards/EventCard.Feed'
import LifeEventCard from './cards/LifeEventCard.feed'


const FeedScreen = ({user,handler}) => {

    // console.log(user);

    
    return (
        <>
           <EventCard />
           <UserJoinedCard />
           <LifeEventCard/>
        </>
    )
}

export default FeedScreen