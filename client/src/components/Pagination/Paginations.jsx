import React from "react";
import Pagination from "react-bootstrap/Pagination";

const Paginations = () => {
  return (
    <>
      <div className="pagination d-flex justify-content-end mx-5">
        <Pagination>
          <Pagination.Prev />
          <Pagination.Item active={true}>{1}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </div>
    </>
  );
};

export default Paginations;
