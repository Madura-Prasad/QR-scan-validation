import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  let navigate = useNavigate();
  const [user, SetUser] = useState({
    email: "",
  });

  const [error, setError] = useState({
    email: "",
  });
  const { email } = user;

  const onInputChange = (e) => {
    SetUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      navigate("/");
    }
  };

  const validateFields = () => {
    let isValid = true;
    let emailError = "";

    // Mobile number validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      isValid = false;
      emailError = "Please Enter a Valid Email Address";
    }

    setError({
      email: emailError,
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
          20th Annual Academic Sessions of the
          </h4>
          <h4 className="text-center fw-bold text-secondary">
          Sri Lanka College of Psychiatrists
          </h4>

          <h5 className="text-center m-4 fw-bold">Forgot Password</h5>
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

            <div className="mb-5 mt-5">
              <button style={{backgroundColor:'#ffc107',border:'none'}} className="w-100 fw-bold py-2">
                Reset Password
              </button>
            </div>

            <div className="mb-5">
              <Link to={"/"} className="float-end text-secondary fw-bold">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
