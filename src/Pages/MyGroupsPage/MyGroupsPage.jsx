import React, { useEffect, useState } from 'react'
import GlobalPageWrapper from '../../components/GlobalPageWrapper'
import FilterBar from '../../components/FilterBar/FilterBar'
import { useNavigate } from 'react-router-dom'
import Groups from '../../components/profilePageBottomCards/groupCard/Groups'
import CreateGroupPopup from '../../components/CreateGroupPopup/CreateGroupPopup'
import httpService from '../../helper/httpService'


const cards = [
  { title: "Card One" },
  { title: "Card Two" },
  { title: "Card Three" },
  { title: "Card Four" },
  { title: "Card Five" },
  { title: "Card Six" },
  { title: "Card Seven" },
  // ...
];

const MyGroupsPage = () => {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [loading, setLoading] = useState(false)

  const [myGroupData, setMyGroupData] = useState([]);

  // ✅ Fetch my group data
  useEffect(() => {
    setLoading(true);
    httpService("/groups/my-groups", "GET")
      .then((res) => {
        console.log("group fetch res:", res?.data?.groups );
        setMyGroupData(res?.data?.groups || []);
      })
      .catch((err) => {
        console.error("Error fetching groups:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const navigate = useNavigate()

  const handleNavigationPage1 = () => {
    navigate("/my-groups")
  }

  const handleNavigatePage2 = () => {
    setShowGroupModal(true);
  }
  return (
    <>
      <GlobalPageWrapper>
        <FilterBar pageName={"My Groups"} navigationPageName1={"My Groups"} navigationPageName2={"+Create A Group"} navigationToAnotherPage={handleNavigationPage1} navigationToAnotherPage2={handleNavigatePage2} filterName2={"Filter"} />

        <div className='client-page-background'>
          <div className="container-fluid">
            <div className="row g-4 pt-4">
              {
                myGroupData.map((card, index) => (
                  <div className="col-12 col-sm-12  col-lg-12 col-xl-4 mt-0" key={index}>
                    <Groups index={index} groupData={card}/>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        <CreateGroupPopup show={showGroupModal}
          handleClose={() => setShowGroupModal(false)} />
      </GlobalPageWrapper>
    </>
  )
}

export default MyGroupsPage