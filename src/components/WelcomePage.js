/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link,useParams } from "react-router-dom";
import Logo from "../assets/logo.png";

const WelcomePage = () => {
  const { roleName,roleType } = useParams();
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row">
        <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 border rounded p-4 shadow">
          <h4 className="text-center mt-4 fw-bold text-secondary">Welcome</h4>
          <h6 className="text-center mt-4 fw-bold text-secondary">{roleName} ( {roleType} )</h6>
          <div>
            <img className="w-25 rounded mx-auto d-block mt-5" src={Logo} alt="Sri Lanka Medical Association" />
          </div>

          <h5 className="text-center mt-5 fw-bold">
            Sri Lanka Medical Association
          </h5>
          <div className="mb-5 mt-5">
            <Link to={`/scan/${roleName}/${roleType}`}>
              <button className="btn btn-success w-100 fw-bold py-2">
                Scan QR Code
              </button>
            </Link>
          </div>
          <div className="mb-5 mt-5">
             <Link to={"/"}>
                <p className="float-end text-secondary fw-bold">Log Out</p> 
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
