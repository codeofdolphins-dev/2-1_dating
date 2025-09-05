import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaStar,
  FaMapMarkerAlt,
  FaThumbsUp,
  FaComment,
  FaCheck,
  FaPhotoVideo,
} from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import httpService from "../../helper/httpService";

const members = [
  {
    id: 1,
    name: "NCCUPL",
    age: 40,
    location: "Cary, NC, USA",
    distance: "0 mi",
    img: "https://via.placeholder.com/300x200",
    stats: { photos: 1, likes: 131, comments: 211, checkins: 3 },
  },
  {
    id: 2,
    name: "JAMAL213",
    age: 37,
    location: "Christiansted, VI, USA",
    distance: "1515 mi",
    img: "https://via.placeholder.com/300x200",
    stats: { photos: 4, likes: 39, comments: 20, checkins: 5 },
  },
  {
    id: 3,
    name: "JOKER239",
    age: 37,
    location: "Fort Myers, FL, USA",
    distance: "658 mi",
    img: "https://via.placeholder.com/300x200",
    stats: { photos: 9, likes: 3, comments: 4, checkins: 0 },
  },
  {
    id: 4,
    name: "DIEGO4U",
    age: 42,
    location: "Fort Lauderdale, FL, USA",
    distance: "673 mi",
    img: "https://via.placeholder.com/300x200",
    stats: { photos: 18, likes: 194, comments: 8, checkins: 6 },
  },
  {
    id: 5,
    name: "KETCHUPANDFRIES",
    age: "35 | 38",
    location: "Fort Myers, FL, USA",
    distance: "658 mi",
    img: "https://via.placeholder.com/300x200",
    stats: { photos: 6, likes: 1232, comments: 11, checkins: 1 },
  },
];



export default function IndividualGroup() {

  const [groupData, setGroupdata] = useState(null)
  const [members,setMembers]=useState([])
  // Get the searchParams from the URL
  const [searchParams] = useSearchParams();
  const id = searchParams.get('user');
  console.log("groupId", id);

  

  useEffect(() => {
    httpService(`/groups/${id}`, "GET")
      .then((res) => {
        console.log(res)
        setGroupdata(res?.data?.group)
        setMembers(res?.data?.group?.recentMembers)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const timestamp = groupData?.updatedAt;
  const date = new Date(timestamp);

  // Format: Sep 04, 2025
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="text-white bg-dark p-3 rounded mb-3">
        <h5>
          <img
            src="https://via.placeholder.com/100x40"
            alt="logo"
            className="me-2"
          />
          | since {formattedDate} | {groupData?.memberCount} members
        </h5>
        <h3 className="fw-bold mt-2">{groupData?.name}</h3>
        <div className="text-info">
          <a href="#" className="me-3">
            Leave group
          </a>
          <a href="#" className="me-3">
            Block Notifications
          </a>
          <a href="#">Share</a>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <a className="nav-link" href="#">
            FORUM
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            VISUALS
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#">
            MEMBERS
          </a>
        </li>
      </ul>

      {/* Member Grid */}
      <div className="row g-3">
        {members.map((m) => (
          <div className="col-md-3" key={m.id}>
            <div className="card bg-dark text-white h-100 border-primary">
              <img src={m?.user?.profile?.photos} className="card-img-top" alt={m.name} />
              <div className="card-body">
                <h5 className="card-title">
                  <FaStar className="text-warning me-1" />
                  {m?.user?.username}
                </h5>
                <p className="card-text">{m.age}</p>
                <p className="card-text small">
                  <FaMapMarkerAlt className="me-1" />
                  {m.location} | {m.distance}
                </p>
                <div className="d-flex justify-content-between small">
                  <span>
                    <FaPhotoVideo className="me-1" /> {m.stats.photos}
                  </span>
                  <span>
                    <FaThumbsUp className="me-1" /> {m.stats.likes}
                  </span>
                  <span>
                    <FaComment className="me-1" /> {m.stats.comments}
                  </span>
                  <span>
                    <FaCheck className="me-1" /> {m.stats.checkins}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
