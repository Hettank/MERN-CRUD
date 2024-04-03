import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./edit.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSingleUser, updateEmployee } from "../../services/Apis";
import { BASE_URL } from "../../services/Helper";
import toast, { Toaster } from "react-hot-toast";
import { updateData } from "../../components/Context/ContextProvider";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState("");
  const [imageData, setImageData] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const { userUpdate, setUserUpdate } = useContext(updateData);

  const inputDataHandle = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  // Get single user
  const fetchUser = async () => {
    const response = await getSingleUser(id);

    if (response.status === 200) {
      setInputData(response.data.employee);
      setImageData(response.data.employee.image);
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    if (image) {
      setPreviewImage(URL.createObjectURL(image));
    }
    fetchUser();
  }, [image]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", inputData.name);
    data.append("age", inputData.age);
    data.append("email", inputData.email);
    data.append("password", inputData.password);
    data.append("user_profile", image || imageData);

    const config = {
      "Content-Type": "multipart/form-data",
    };

    try {
      const response = await updateEmployee(id, data, config);

      console.log(response.data);
      if (response.status === 201) {
        setUserUpdate(response.data.employee);
        toast.success("Employee Updated Successfully", {
          position: "top-center",
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container d-flex align-items-center flex-column justify-content-center">
        <Toaster
          toastOptions={{
            style: {
              padding: "10px",
              color: "#212227",
              backgroundColor: "#F0F5FA",
            },
          }}
        />
        <h3 className="text-center mt-5">Update your details</h3>
        <Card className="shadow mt-3 p-3" style={{ maxWidth: "450px" }}>
          <div className="profile_div text-center">
            <img
              src={image ? previewImage : `${BASE_URL}/uploads/${imageData}`}
              alt=""
            />
          </div>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter Name"
                onChange={inputDataHandle}
                value={inputData.name}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                placeholder="Enter Age"
                onChange={inputDataHandle}
                value={inputData.age}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={inputDataHandle}
                value={inputData.email}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={inputDataHandle}
                value={inputData.password}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                name="profile_image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="submit">
                Update
              </Button>
            </div>
            <div className="text-center mt-3">
              <Link to="/" className="backhome">
                Go back to Home
              </Link>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Edit;
