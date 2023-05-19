import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Error from "../assets/error.gif";

const QrError = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
    <div className="row">
      <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 border rounded p-4 shadow">
        <h4 className="text-center fw-bold text-danger">QR Code Scan Invalid!!!</h4>
        <div>
          <img className="w-25 rounded mx-auto d-block mt-5" src={Error} alt="QR Code" />
        </div>
        {/* <p className="text-center m-4 fw-bold">Invalid QR Code </p> */}
        <div className="mb-5 mt-5">
          <Link to={"/scan"}>
            <button className="btn btn-warning w-100 fw-bold">
              Scan Another QR Code
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default QrError