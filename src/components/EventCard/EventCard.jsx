import React from "react";
import { Card, Badge } from "react-bootstrap";
import {
    BsGeoAlt,
    BsPeopleFill,
    BsCalendarEvent,
} from "react-icons/bs";
import { FaMars, FaVenus, FaTransgenderAlt } from "react-icons/fa";

import manIcon from "../../assets/ViwCardImags/img/male.png"
import femaleIcon from "../../assets/ViwCardImags/img/female.png"

const EventCard = ({handlEtakeToEventInfo,card}) => {
    const {image,
    title,
    kind,
    host,
    date,
    city,
    genders,
    distanceLeft,
    distanceRight,
    attendees}=card
    return (
        <Card className=" text-white rounded-4 shadow-sm border-0 overflow-hidden custom-background" onClick={handlEtakeToEventInfo}>
            {/* Cover */}
            <div className="position-relative p-2">
                <img
                    src={image}
                    alt={title}
                    className="w-100"
                    style={{
                        height: "300px",
                        objectFit: "cover",
                        borderBottom: "1px solid #333",
                        borderRadius:"10px"
                    }}
                />
            </div>

            <Card.Body className="px-3 pt-3 pb-2">
                {/* Title + Date */}
                <div className="d-flex justify-content-between align-items-start">
                    <div className="fw-semibold text-uppercase lh-sm" style={{ fontSize: "1.4rem" }}>
                        {title}
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-1">
                    <div className="text-danger">
                        {kind}
                    </div>
                    <div className="text-danger small">
                        {date}
                    </div>
                </div>

                <div className="small mt-1">
                    by{" "}
                    <a href="#!" className=" text-decoration-none fw-semibold" style={{color:"var(--color-primary-green)"}}>
                        {host}
                    </a>
                </div>

                {/* Location + Distances */}
                <div className="d-flex justify-content-between align-items-center mt-1 small">
                    <div className="text-white-50 d-flex align-items-center gap-1">
                        <BsGeoAlt />
                        {city} | {distanceLeft}
                    </div>
                    <div className="text-secondary">{distanceRight}</div>
                </div>

                {/* Genders + Attendees */}
                <div className="d-flex justify-content-between align-items-center mt-1">
                    <div className="d-flex align-items-center gap-1 fs-5">
                        {
                            genders.map((data,index)=>(
                             <img src={data} height={15} alt="" srcset="" />
                            ))
                        }
                    </div>
                    <div className="d-flex align-items-center gap-1 text-white-50">
                        <BsPeopleFill /> {attendees}
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default EventCard;
