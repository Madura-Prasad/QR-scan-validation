import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import QrReader from "react-qr-scanner";

const ScanQR = () => {
  const navigate = useNavigate();
  const [delay] = useState(100);
  const [result, setResult] = useState("No result");
  const [, setStoredUrl] = useState("");
  const [validationResult, setValidationResult] = useState(null);
  const { roleName, roleType } = useParams();

  const handleScan = (data) => {
    if (data) {
      setResult(data);

      // Make API request here
      const shortenedUrl = data.text.split("=")[1];
      axios
        .post("https://emg.textware.lk/emgapi/v1/digital/ext/check/qr", {
          qrCode: shortenedUrl,
        })
        .then((response) => {
          setValidationResult(response.data);
          if (response.data.responseCode === "00") {
            if (roleType === "Doorguard") {
              navigate(`/profile/${shortenedUrl}/${roleName}/${roleType}`);
            } else if (roleType === "Gift- Giver") {
              navigate(`/gift/${shortenedUrl}/${roleName}/${roleType}`);
            } else if (roleType === "Diner") {
              navigate(`/dine/${shortenedUrl}/${roleName}/${roleType}`);
            }
          } else {
            navigate(`/scan-error/qr=?${shortenedUrl}`);
          }
        })
        .catch((error) => {
          console.error(error);
          setValidationResult(null);
        });
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  useEffect(() => {
    const storedUrl = localStorage.getItem("shortenedUrl");
    if (storedUrl) {
      setStoredUrl(storedUrl);
    }
  }, []);

  const previewStyle = {
    width: "300px",
    maxWidth: "300px",
  };

  const url = result && result.text;
  const shortenedUrl = url ? url.split("=")[1] : "";

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row">
        <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 border rounded p-4 shadow">
          <h4 className="text-center fw-bold text-secondary">Scan QR Code</h4>
          <p className="text-center text-danger m-4 fw-bold">
            Place QR Code inside the frame to scan and please avoid shake to get
            fast result.
          </p>
          <div className="d-flex justify-content-center">
            <QrReader
              delay={delay}
              style={previewStyle}
              onError={handleError}
              onScan={handleScan}
            />
          </div>
          <br />
          <input
            className="form-control fw-bold border-0 text-center"
            type="hidden"
            value={shortenedUrl}
            disabled
          />
          {validationResult && (
            <div className="text-center mt-3">
              <p className="fw-bold">Validation Result:</p>
              <p>{JSON.stringify(validationResult)}</p>
            </div>
          )}
          <Link to={`/welcome/${roleName}/${roleType}`}>
            <button className="btn btn-dark w-100 fw-bold py-2">Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScanQR;
