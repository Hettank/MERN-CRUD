import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { BASE_URL } from "../../services/Helper";
import { deleteEmployee } from "../../services/Apis";
import { Link } from "react-router-dom";
import "./card.css";

const CustomCard = ({ userData }) => {
  const removeEmployee = async (id) => {
    await deleteEmployee(id);
    window.location.reload();
  };

  return (
    <div className="container mt-4">
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {userData && userData.length > 0 ? (
          userData.map((item, index) => (
            <Col key={index}>
              <Card className="custom-card">
                <Card.Img
                  variant="top"
                  src={`${BASE_URL}/uploads/${item.image}`}
                  alt="User Image"
                  className="custom-card-img"
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Email: {item.email}</Card.Text>
                  <Card.Text>Age: {item.age}</Card.Text>
                  <div className="button-group" style={{ gap: "4px" }}>
                    <Link to={`/edit/${item._id}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>

                    <Button
                      variant="danger"
                      onClick={() => removeEmployee(item._id)}
                    >
                      Delete
                    </Button>

                    <Link to={`/profile/${item._id}`}>
                      <Button variant="info">View</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No data available</p>
        )}
      </Row>
    </div>
  );
};

export default CustomCard;
