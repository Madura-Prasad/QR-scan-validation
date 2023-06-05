import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from "react-router-dom";
import ProfileImg from "../assets/profile.png";

const GiftDetails = () => {
  const { shortenedUrl, roleName, roleType } = useParams();
  const [, setValidationResult] = useState(null);
  const [certificateData, setCertificateData] = useState(null);
  const [doctorName, setDoctorName] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    // Make API request here
    axios
      .post("https://emg.textware.lk/emgapi/v1/digital/ext/check/qr", {
        qrCode: shortenedUrl,
      })
      .then((response) => {
        setValidationResult(response.data);
        setCertificateData(response.data.digitalCertificate);

        const certificateDataJson =
          response.data.digitalCertificate.certificateDataJson;
        const parsedData = JSON.parse(certificateDataJson);
        setDoctorName(parsedData.doctorname);
        setCategory(parsedData.category);
      })
      .catch((error) => {
        console.error(error);
        setValidationResult(null);
        setCertificateData(null);
      });
  }, [shortenedUrl]);
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row">
        <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 border rounded p-4 shadow">
          <h4 className="text-center mt-4 fw-bold text-secondary text-decoration-underline">
            Gift Given Profile
          </h4>
          <div className="mt-5">
            <img
              className="w-25 rounded mx-auto d-block mb-5 mt-2"
              src={ProfileImg}
              alt="User Profile"
            />
          </div>

          {certificateData && (
            <div className="row justify-content-center ">
              <div className="col-auto">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th scope="row" className="fw-bold">
                        Certificate Name:
                      </th>
                      <td className="fw-bold">
                        :- {certificateData.certificateName}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-bold">
                        Issue Date
                      </th>
                      <td className="fw-bold">
                        :- {certificateData.issueDate}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-bold">
                        Expiry Date
                      </th>
                      <td className="fw-bold">
                        :- {certificateData.expiryDate}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-bold">
                        Doctor Name
                      </th>
                      <td className="fw-bold">:- {doctorName}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="fw-bold">
                        Category
                      </th>
                      <td className="fw-bold">:- {category}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mb-5 text-center text-success ">
            <button className="btn btn-success py-2">Gift Collect</button>
          </div>

          <div className="mb-3 text-center text-danger fw-bold">
            <h3>Gift Already Delivered</h3>
          </div>
          <Link
            to={`/scan/${roleName}/${roleType}`}
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
