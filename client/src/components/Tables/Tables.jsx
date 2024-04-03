import React from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../../services/Helper";
import { deleteEmployee } from "../../services/Apis";
import { Link } from "react-router-dom";
import "./tables.css";

const Tables = ({ allData }) => {
  const removeEmployee = async (id) => {
    await deleteEmployee(id);
    window.location.reload();
  };

  return (
    <div className="container mt-5">
      <Row>
        <div className="col mt-0">
          <Card className="shadow">
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead className="thead-dark">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Profile</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allData && allData.length > 0 ? (
                    allData.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td className="profile_td">
                          <img
                            src={`${BASE_URL}/uploads/${item.image}`}
                            alt="Profile"
                            className="profile_img"
                          />
                        </td>
                        <td>{item.age}</td>
                        <td>{item.email}</td>
                        <td className="d-flex gap-3">
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
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-2">
                        No Data Available To Show
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card>
        </div>
      </Row>
    </div>
  );
};

export default Tables;
