import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./register.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/Apis";
import { addData } from "../../components/Context/ContextProvider";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [inputData, setInputData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const { userAdd, setUserAdd } = useContext(addData);

  const inputDataHandle = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    if (image) {
      setPreviewImage(URL.createObjectURL(image));
    }
  }, [image]);

  console.log(inputData);
  const submitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", inputData.name);
    data.append("age", inputData.age);
    data.append("email", inputData.email);
    data.append("password", inputData.password);
    data.append("user_profile", image);

    const config = {
      "Content-Type": "multipart/form-data",
    };

    try {
      const response = await registerUser(data, config);
      console.log(response);

      if (response.data) {
        setInputData({
          ...inputData,
          name: "",
          age: "",
          email: "",
          password: "",
        });
        setImage("");

        setUserAdd(response.data);
        toast.success("Employee Added Successfully", {
          position: "top-center",
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
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
      <h3 className="text-center mt-5">Register your details</h3>
      <Card className="shadow mt-3 p-3" style={{ maxWidth: "450px" }}>
        <div className="profile_div text-center">
          <img src={previewImage ? previewImage : `/man.png`} alt="" />
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
              name="user_profile"
              onChange={imageHandler}
            />
          </Form.Group>
          <div className="d-grid">
            <Button variant="primary" type="submit">
              Submit
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
  );
};

export default Register;
