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
  //const [mobile, setMobile] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [isAdded, setIsAdded] = useState(false);


  useEffect(() => {
    // Check if data already exists in the database
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/entrance/getRefCode`)
      .then((response) => {
        const columnData = response.data.map((item) => item.ref_code);
        //console.log("Column Data:", columnData);
        if (columnData.includes(shortenedUrl)) {
          //console.log("Data already exists in the database");
          setError("User already Exists!");
        }
      })
      .catch((error) => {
        console.error("Error fetching data from the database:", error);
        // Handle error
      });
  }, []);

  useEffect(() => {
    // Make API request to check QR code
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

  const handleSaveData = () => {
    if (!isAdded) {
      setIsAdded(true);
      const dateTime = moment()
        .tz("Asia/Kolkata")
        .format("YYYY-MM-DD HH:mm:ss");
      const data = {
        ref_code: shortenedUrl,
        entrance_date_time: dateTime,
        doctor_name: doctorName,
        scan_person_name: roleName,
        mobile_number:certificateData.msisdn,
        register_date_time:certificateData.createdDatetime,
        invitation_id:certificateData.digitalCertificateId,
        dine_date_time: "",
        gift_date_time: "",
      };

      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/entrance/getRefCode`)
        .then((response) => {
          const columnData = response.data.map((item) => item.ref_code);
          if (columnData.includes(shortenedUrl)) {
            const existingUser = response.data.find(
              (item) => item.ref_code === shortenedUrl
            );
            const existingDateTime = existingUser.entrance_date_time;
            setError(`User already exists! Entered on: ${existingDateTime}`);
            console.log(existingDateTime);
          } else {
            axios
              .post(
                `${process.env.REACT_APP_API_BASE_URL}/entrance/save_entrance`,
                data
              )
              .then((response) => {})
              .catch((error) => {
                console.error("Error adding data to the database:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching data from the database:", error);
        });
    }
  };

  useEffect(() => {
    if (doctorName) {
      handleSaveData();
    }
  }, [doctorName]);

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row">
        <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 border rounded p-4 shadow">
          <h4 className="text-center mt-4 fw-bold text-secondary text-decoration-underline">
            Entrance Profile
          </h4>
          <div className="mt-5">
            <img
              className="w-25 rounded mx-auto d-block mt-2 mb-5"
              src={ProfileImg}
              alt="Sri Lanka Medical Association"
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
          <div className="mb-5">
            <Link
              to={`/scan/${roleName}/${roleType}`}
              className="float-end text-secondary fw-bold mb-3 mt-4"
            >
              Scan Another QR Code
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
