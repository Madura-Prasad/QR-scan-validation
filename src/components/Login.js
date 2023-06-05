/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  let navigate = useNavigate();
  const [user, SetUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const onInputChange = (e) => {
    SetUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, user);
        const responseData = response.data.data;
        const roleType = responseData.role_type;
        const roleName = responseData.email;
        navigate(`/welcome/${roleType}/${roleName}`);
      } catch (error) {
        console.log(error.response.data);
        setError({
          ...error,
          errorLogging: "Invalid Login Credentials",
        });
      }
    }
  };

  const validateFields = () => {
    let isValid = true;
    let emailError = "";
    let passwordError = "";

    // Mobile number validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      isValid = false;
      emailError = "Please Enter a Valid Email Address";
    }

    // Name validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      isValid = false;
      passwordError =
        "Password must contain at least 8 characters, including letters and numbers";
    }

    setError({
      email: emailError,
      password: passwordError,
    });
    return isValid;
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row">
        <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 border rounded p-4 shadow">
          <div>
            <img
              className="w-25 rounded mx-auto d-block"
              src={Logo}
              alt="Sri Lanka Medical Association"
            />
          </div>
          <h4 className="text-center mt-4 fw-bold text-secondary">
            Sri Lanka Medical Association
          </h4>
          <h4 className="text-center fw-bold text-secondary">
            136th Anniversary International Medical Congress
          </h4>

          <h5 className=" text-center m-4 fw-bold">Sign In</h5>

          {error.errorLogging && (
  <p className="bg-danger text-light text-center fw-semibold rounded p-1">{error.errorLogging}</p>
)}

          <form onSubmit={(e) => onSubmit(e)} method="post">
            <div className="mb-4 mt-5 text-start">
              <label className="form-label fw-bold">Email Address </label>
              <input
                type={"text"}
                className="form-control fw-bold text-capitalize"
                id="exampleFormControlInput1"
                placeholder="Enter Your Email Address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
              {error.email && (
                <p className="text-danger fw-semibold ">{error.email}</p>
              )}
            </div>

            <div className="mb-4 text-start">
              <label className="form-label fw-bold">Password </label>
              <input
                type={"password"}
                className="form-control fw-bold"
                id="exampleFormControlInput1"
                placeholder="Enter Your Password"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
              {error.password && (
                <p className="text-danger fw-semibold ">{error.password}</p>
              )}
            </div>

            <div className="mb-5 mt-5">
              <button
                type="submit"
                className="btn btn-success w-100 fw-bold py-2"
              >
                Sign In
              </button>
            </div>

            <div className="mb-5">
              <Link
                to={"/forgot-password"}
                className="float-end text-secondary fw-bold"
              >
                Forgot Password
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
