import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Success from "../assets/success.gif";
const QrSuccess = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
    <div className="row">
      <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 border rounded p-4 shadow">
        <h4 className="text-center fw-bold text-success">QR Code Scan Successfully !!!</h4>
        <div>
          <img className="w-50 rounded mx-auto d-block mt-5 mb-5" src={Success} alt="Success" />
        </div>
        {/* <p className="text-center m-4 fw-bold text-success">Valid QR Code </p> */}
        <div className="mb-5 mt-5">
          <Link to={"/profile"}>
            <button className="btn btn-success w-100 fw-bold">
              Go
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default QrSuccess