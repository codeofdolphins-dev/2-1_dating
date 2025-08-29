import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import ReportMessagePopup from "../ReportMessagePopup/ReportMessagePopup";
import WarningPopup from "../WarningPopup/WarningPopup";

const ProfileReportPopup = ({ username = "RDUSTAGVIXEN", show, setShow }) => {
  const [reportMessagePopupShow, setReportMessagePopupShow] = useState(false);
  const [warningShowPopup, setWarningShowPopup] = useState(false);

  const handleReportClick = () => {
    setReportMessagePopupShow(true);
    setShow(false); // close dropdown when opening modal
  };

  const handleBlockClick = () => {
    alert(`Blocked ${username}`);
    setShow(false); // close dropdown
  };

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

      <WarningPopup warningShowPopup={warningShowPopup} setWarningShowPopup={setWarningShowPopup}/>
    </>
  );
};

export default ProfileReportPopup;
