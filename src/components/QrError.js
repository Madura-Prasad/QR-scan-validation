import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link,useParams } from "react-router-dom";
import Error from "../assets/error.gif";

const QrError = () => {
  const { roleName, roleType } = useParams();
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
    <div className="row">
      <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 border rounded p-4 shadow">
        <h4 className="text-center fw-bold text-danger">QR Code Scan Invalid!!!</h4>
        <div>
          <img className="w-50 rounded mx-auto d-block mt-5" src={Error} alt="QR Code" />
        </div>
        <div className="mb-5 mt-5">
          <Link to={`/scan/${roleName}/${roleType}`}>
            <button style={{backgroundColor:'#ffc107',border:'none'}} className="w-100 fw-bold py-2">
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