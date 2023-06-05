import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import Success from "../assets/success.gif";
import { useNavigate } from "react-router-dom";

const QrSuccess = () => {
  let navigate = useNavigate();
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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (roleType === "Doorguard") {
      navigate(`/profile/${shortenedUrl}/${roleName}/${roleType}`);
    } else if (roleType === "GiftGiver") {
      navigate(`/gift/${shortenedUrl}/${roleName}/${roleType}`);
    } else if (roleType === "Diner") {
      navigate(`/dine/${shortenedUrl}/${roleName}/${roleType}`);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row">
        <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 border rounded p-4 shadow">
          <h4 className="text-center fw-bold text-success">
            QR Code Scan Successfully !!!
          </h4>
          <div>
            <img
              className="w-50 rounded mx-auto d-block mt-2 mb-2"
              src={Success}
              alt="Success"
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
          <form onSubmit={(e) => onSubmit(e)} method="post">
            <div className="mb-5 mt-5">
              <button className="btn btn-success w-100 fw-bold py-2">Go</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QrSuccess;
