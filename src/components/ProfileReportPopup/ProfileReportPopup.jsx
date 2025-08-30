import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import ReportMessagePopup from "../ReportMessagePopup/ReportMessagePopup";
import WarningPopup from "../WarningPopup/WarningPopup";
import httpService from "../../helper/httpService"
import { showErrorToast, showSuccessToast } from "../customToast/CustomToast";

const ProfileReportPopup = ({ username = "RDUSTAGVIXEN", show, setShow,userId }) => {
  const [reportMessagePopupShow, setReportMessagePopupShow] = useState(false);
  const [warningShowPopup, setWarningShowPopup] = useState(false);
  const [isSendBlock,setIsBlock]=useState(false)

  const handleReportClick = () => {
    setReportMessagePopupShow(true);
    setShow(false); // close dropdown when opening modal
  };

  useEffect(()=>{
    if(isSendBlock){
      httpService(`/interactions`, "POST", { "targetUserId": userId,"interactionType": "block" })
      .then((res)=>{
        if(res?.message ==="Interaction created successfully"){
          showSuccessToast(`You successfuly blocked ${username}`)
        }
      })
      .catch((err)=>{
        console.log("block response",err)
        showErrorToast(err?.message)
      })
    }

  },[isSendBlock])

  
  return (
    <>
      <Dropdown show={show} onToggle={(isOpen) => setShow(isOpen)}>
        <Dropdown.Menu
          align="end"
          style={{
            backgroundColor: "var(--color-background)",
            color: "white",
            borderRadius: "6px",
            padding: "6px 0",
            marginLeft: "150px",
          }}
        >
          <Dropdown.Item
            onClick={()=>setWarningShowPopup(true)}
            className="d-flex align-items-center text-white"
            style={{ background: "transparent" }}
          >
            <AiOutlineExclamationCircle className="me-2" />
            Block {username}
          </Dropdown.Item>

          <Dropdown.Item
            onClick={handleReportClick}
            className="d-flex align-items-center text-white"
            style={{ background: "transparent" }}
          >
            <AiOutlineExclamationCircle className="me-2" />
            Report {username}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Report Message Popup */}
      <ReportMessagePopup
        username={username}
        reportMessagePopupShow={reportMessagePopupShow}
        setReportMessagePopupShow={setReportMessagePopupShow}
      />

      <WarningPopup warningShowPopup={warningShowPopup} setWarningShowPopup={setWarningShowPopup} setIsBlock={setIsBlock}/>
    </>
  );
};

export default ProfileReportPopup;
