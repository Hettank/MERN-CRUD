import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link, useParams } from "react-router-dom";
import "./profile.css";
import { getSingleUser } from "../../services/Apis";
import { BASE_URL } from "../../services/Helper";
import moment from "moment";
import { BsArrowLeft } from "react-icons/bs";

const Profile = () => {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getSingleUser(id);

      if (response.status === 200) {
        setUserDetail(response.data.employee);
      } else {
        console.log("Error");
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div className="container mt-5">
      <Link to="/" className="back-link">
        <BsArrowLeft className="back-icon" />
        Back to Home
      </Link>
      <Card className="shadow profile-card">
        <Card.Body>
          <div className="profile-image">
            <img src={`${BASE_URL}/uploads/${userDetail.image}`} alt="" />
          </div>
          <Card.Title className="text-center mt-3 profile-title">
            {userDetail.name}
          </Card.Title>
          <Card.Text className="text-center profile-text">
            <strong>Age:</strong> {userDetail.age}
          </Card.Text>
          <Card.Text className="text-center profile-text">
            <strong>Email:</strong> {userDetail.email}
          </Card.Text>
          <Card.Text className="text-center profile-text">
            <strong>Created At:</strong>{" "}
            {moment(userDetail.createdAt).format("DD-MM-YYYY")}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
