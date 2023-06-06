import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from "react-router-dom";
import ProfileImg from "../assets/profile.png";
import moment from "moment-timezone";

const GiftDetails = () => {
  const { shortenedUrl, roleName, roleType } = useParams();
  const [, setValidationResult] = useState(null);
  const [certificateData, setCertificateData] = useState(null);
  const [doctorName, setDoctorName] = useState("");
  const [category, setCategory] = useState("");
  const [giftDelivered, setGiftDelivered] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the data from the API endpoint
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/gift/getRefCode`)
      .then((response) => {
        const columnData = response.data.map((item) => item.ref_code); // Replace "ref_code" with the actual column name
        //console.log("Column Data:", columnData);
        if (columnData.includes(shortenedUrl)) {
          //console.log("ref_code already exists in the database");
          setError("Gift Already Issued!");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle error
      });
  }, []);

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

        // Check if the gift has already been delivered
        if (response.data.giftDelivered || error !== "") {
          setGiftDelivered(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setValidationResult(null);
        setCertificateData(null);
      });
  }, [shortenedUrl]);

  const handleGift = () => {
    // Prepare the data to be sent to the server
    const dateTime = moment().tz("Asia/Kolkata").format("YYYY-MM-DDT HH:mm:ss");
    const data = {
      date_time: dateTime,
      gift_issue: "1",
      gift_issue_person_name: roleName,
      gift_owner_name: doctorName, // Replace with the actual gift owner's name
      ref_code: shortenedUrl, // Replace with the actual reference code
    };

    // Fetch the ref_codes from the API endpoint
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/gift/getRefCode`)
      .then((response) => {
        const columnData = response.data.map((item) => item.ref_code);
        //console.log("Column Data:", columnData);

        // Check if ref_code already exists in the columnData
        if (columnData.includes(shortenedUrl)) {
          console.log("ref_code already exists in the database");
          setError("Gift Already Issued!");
          // Disable "Gift Collect" button and show error message
          setGiftDelivered(true);
          // Perform any additional error handling or display logic
        } else {
          // Example API request to save data in the datatable
          axios
            .post(`${process.env.REACT_APP_API_BASE_URL}/gift/save_gift`, data)
            .then((response) => {
              //console.log("Data saved successfully...");
              setGiftDelivered(true);
              // Perform any necessary actions after saving the data
            })
            .catch((error) => {
              console.error("Error saving data:", error);
              // Handle error
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching ref_codes:", error);
        // Handle error
      });
  };

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

          {error && (
            <div className="mb-3 text-center text-danger fw-bold">
              <h3>{error}</h3>
              {/* Add additional error message or display logic */}
            </div>
          )}

          {!giftDelivered && !error && (
            <div className="mb-5 text-center text-success ">
              <button onClick={handleGift} className="btn btn-success py-2">
                Gift Issue
              </button>
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

export default GiftDetails;
