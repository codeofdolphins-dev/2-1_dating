import React from 'react'
import UserJoinedCard from './cards/UserJoinedCard.Feed'


const FeedScreen = ({user,handler}) => {

    // console.log(user);

    
    return (
        <>
           <UserJoinedCard />
           <UserJoinedCard />
           <UserJoinedCard />
           
        </>
    )
}

export default FeedScreen