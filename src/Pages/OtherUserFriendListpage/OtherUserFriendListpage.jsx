import React from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper'
import FilterBar from '../../components/FilterBar/FilterBar'
import { useAuth } from '../../context/AuthContextAPI'
import ViewPageCard from '../../components/ViewPageCard/ViewPageCard'

const OtherUserFriendListpage = () => {
  const { userNameFromFriendListPage, userNameFromFriendList } = useAuth()

  console.log("userNameFromFriendListPage", userNameFromFriendListPage)
  console.log("userNameFromFriendList", userNameFromFriendList)

  return (
    <GlobalPageWrapper>
      <FilterBar pageName={`${userNameFromFriendListPage} Friend List`} />
      <div
        className="container-fluid client-page-background"
        style={{ minHeight: "100vh" }}
      >
        <div className="row g-4 pt-4">
          {userNameFromFriendList.length === 0 ? <div className="text-white">No Profile Friends Found</div> :
            userNameFromFriendList.map((card, index) => (
              <div
                className="col-12 col-sm-6 col-lg-6 col-xl-4"
                key={index}
              >
                {
                  <ViewPageCard index={index}  card={card} />
                }
              </div>
            ))}
        </div>

      </div>
    </GlobalPageWrapper>
  )
}

export default OtherUserFriendListpage
