/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Logo from "../assets/qr.png";

const ScanQR = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row">
        <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 border rounded p-4 shadow">
          <h4 className="text-center fw-bold text-secondary">Scan QR Code</h4>
          <p className="text-center text-danger m-4 fw-bold">
            Place QR Code inside the frame to scan and please avoid shake to get
            fast result.
          </p>
          <div>
            <img className="w-25 rounded mx-auto d-block" src={Logo} alt="QR Code" />
          </div>
          <p className="text-center m-4 fw-bold">Scanning QR Code...</p>
          <div className="mb-5 mt-5">
            <Link to={"/welcome"}>
              <button className="btn btn-dark w-100 fw-bold py-2">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanQR;
