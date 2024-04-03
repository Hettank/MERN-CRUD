import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tables from "../../components/Tables/Tables";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CustomCard from "../../components/Cards/CustomCard";
import Dropdown from "react-bootstrap/Dropdown";
import "./home.css";
import { Link } from "react-router-dom";
import { allEmployees } from "../../services/Apis";

const Home = () => {
  const [allData, setAllData] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("new");
  // const [page, setPage] = useState(1);
  // const [pageCount, setPageCount] = useState(0);

  const fetchAllUsers = async () => {
    const response = await allEmployees(search, sort);

    if (response.status === 200) {
      setAllData(response.data.employee);
      // setPageCount(response.data.Pagination.pageCount);
    }
  };

  // pagination
  // handle prev button
  // const handlePrev = () => {
  //   setPage(() => {
  //     if (page === 1) return page
  //     return page - 1
  //   })
  // }

  // handle next btn
  // const handleNext = () => {
  //   setPage(() => {
  //     if (page === pageCount) return page
  //     return page + 1
  //   })
  // }

  useEffect(() => {
    fetchAllUsers();
  }, [search, sort]);

  return (
    <>
      <div className="container">
        <div className="main_div">
          {/* search add btn */}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="dropdown-sort">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Sort
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        href="#/action-1"
                        onClick={(e) => setSort("new")}
                      >
                        New
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-2"
                        onClick={(e) => setSort("old")}
                      >
                        Old
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Form>
            </div>
            <div className="add_btn">
              <Link to={"/register"}>
                <Button variant="primary">Add User</Button>
              </Link>
            </div>
          </div>
          <div className="view-toggler mt-4">
            <Tabs
              defaultActiveKey="card"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="card" title="Card">
                <CustomCard userData={allData} />
              </Tab>
              <Tab eventKey="table" title="Table">
                <Tables allData={allData} />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
