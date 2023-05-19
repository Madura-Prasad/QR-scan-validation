import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import ProfileImg from "../assets/profile.png";

const GiftDetails = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row">
        <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 border rounded p-4 shadow">
          <h4 className="text-center mt-4 fw-bold text-secondary text-decoration-underline">Profile</h4>
          <div className="mt-5">
            <img
              className="w-25 rounded mx-auto d-block"
              src={ProfileImg}
              alt="User Profile"
            />
          </div>

          <div class="row justify-content-center ">
            <div class="col-auto">
              <table class="table table-borderless mt-5">
                <tbody>
                  <tr>
                    <th scope="row" className="fw-bold">
                      Name
                    </th>
                    <td className="fw-bold">:- Mr. Alexander</td>
                  </tr>
                  <tr>
                    <th scope="row" className="fw-bold">
                      Occupation
                    </th>
                    <td className="fw-bold">:- Doctor</td>
                  </tr>
                  <tr>
                    <th scope="row" className="fw-bold">
                      Date
                    </th>
                    <td className="fw-bold">:- 16 May 2023</td>
                  </tr>
                  <tr>
                    <th scope="row" className="fw-bold">
                      Time
                    </th>
                    <td className="fw-bold">:- 11.00 AM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-5 text-center text-success ">
            <button className="btn btn-success">Gift Collect</button>
          </div>

          <div className="mb-3 text-center text-danger fw-bold">
            <h3>Gift Already Delivered</h3>
          </div>
          <Link
            to={"/scan"}
            className="float-end text-secondary fw-bold mb-3 mt-4"
          >
            Scan Another QR Code
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GiftDetails;
