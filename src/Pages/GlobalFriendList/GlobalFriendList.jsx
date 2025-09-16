import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalPageWrapper from '../../components/GlobalPageWrapper';
import ViewPageCard from '../../components/ViewPageCard/ViewPageCard';
import httpService from '../../helper/httpService';
import FrontScreenTopBar from '../../components/FrontScreenTopBar/FrontScreenTopBar';
import FilterBar from '../../components/FilterBar/FilterBar';

const GlobalFriendList = () => {
    const { id } = useParams();

    const [userFriends, setUserFriends] = useState([])
    const [user, setUser] = useState([])
    useEffect(() => {
        httpService(`/friends/${id}`, "GET")
            .then((res) => {
                setUserFriends(res?.data?.friends)
                setUser(res?.data?.user?.username)
            })
    }, [])

    return (
        <GlobalPageWrapper>
            <FilterBar pageName={`${user} Friendlist`}  />
            {
                userFriends.map((userData,index)=>(
                    <div className='mt-5'>
                        <ViewPageCard card={userData} images={userData?.profile?.photos}/>
                    </div>
                ))
            }
            
        </GlobalPageWrapper>
    )
}

export default GlobalFriendList