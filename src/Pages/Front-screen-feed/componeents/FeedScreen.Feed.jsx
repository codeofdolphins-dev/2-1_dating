import React from 'react'
import UserJoinedCard from './cards/UserJoinedCard.Feed'
import EventCard from './cards/EventCard.Feed'


const FeedScreen = ({user,handler}) => {

    // console.log(user);

    
    return (
        <>
           <EventCard />
           <UserJoinedCard />
        </>
    )
}

export default FeedScreen