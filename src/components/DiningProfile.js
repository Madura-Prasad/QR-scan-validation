import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from "react-router-dom";
import ProfileImg from "../assets/profile.png";
import moment from "moment-timezone";

const Profile = () => {
  const { shortenedUrl, roleName, roleType } = useParams();
  const [, setValidationResult] = useState(null);
  const [certificateData, setCertificateData] = useState(null);
  const [doctorName, setDoctorName] = useState("");
  const [category, setCategory] = useState("");
  const [giftDelivered, setGiftDelivered] = useState(false);

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


  const handleGift = () => {
    // Prepare the data to be sent to the server
    const dateTime = moment().tz("Asia/Kolkata").format("YYYY-MM-DDTHH:mm:ss");
    const data = {
      date_time: dateTime,
      dine_issue: "1",
      ref_code: shortenedUrl, // Replace with the actual reference code
    };

    // Example API request to save data in the datatable
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/dine/save_dine`, data)
      .then((response) => {
        console.log("Data saved successfully...");
        setGiftDelivered(true);
        // Perform any necessary actions after saving the data
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        // Handle error
      });
  };
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row">
        <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 border rounded p-4 shadow">
          <h4 className="text-center mt-4 fw-bold text-secondary text-decoration-underline">
            Dining Profile
          </h4>
          <div className="mt-5">
            <img
              className="w-25 rounded mx-auto d-block mb-5 mt-2"
              src={ProfileImg}
              alt="Sri Lanka Medical Association"
            />
          </div>

          {certificateData && (
            <div Name="row justify-content-center ">
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

          {!giftDelivered && (
            <div className="mb-5 text-center text-success ">
              <button onClick={handleGift} className="btn btn-success py-2">
                Dine Issue
              </button>
            </div>
          )}

          {giftDelivered && (
            <div className="mb-3 text-center text-danger fw-bold">
              <h3>Dine Already Issued ...</h3>
            </div>
          )}

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

export default Profile;
