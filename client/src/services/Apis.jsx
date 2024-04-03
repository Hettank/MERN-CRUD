import { commonRequest } from "./ApiCall";
import { BASE_URL } from "./Helper";

// Register Employee
export const registerUser = async (data, header) => {
  return await commonRequest("POST", `${BASE_URL}/api/employees`, data, header);
};

// Get All Employees
export const allEmployees = async (search, sort) => {
  return await commonRequest(
    "GET",
    `${BASE_URL}/api/employees?search=${search}&sort=${sort}`,
    ""
  );
};

// Get Single User
export const getSingleUser = async (id) => {
  return await commonRequest(
    "GET",
    `${BASE_URL}/api/employees/userProfile/${id}`,
    ""
  );
};

// Update Employee
export const updateEmployee = async (id, data, header) => {
  return await commonRequest(
    "PATCH",
    `${BASE_URL}/api/employees/edit/${id}`,
    data,
    header
  );
};

// Delete Employee
export const deleteEmployee = async (id) => {
  return await commonRequest("DELETE", `${BASE_URL}/api/employees/${id}`, {});
};
