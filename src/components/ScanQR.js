import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import QrReader from "react-qr-scanner";



const ScanQR = () => {
  const navigate = useNavigate();
  const [delay] = useState(100);
  const [result, setResult] = useState("No result");
  const [, setStoredUrl] = useState("");
  const [validationResult, setValidationResult] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleResultClick = () => {
    if (result) {
      console.log("Result clicked:", result);
      localStorage.setItem("shortenedUrl", result.text);
      setStoredUrl(result.text);

      // Make API request here
      const shortenedUrl = result.text.split("=")[1];
      axios
        .post("https://emg.textware.lk/emgapi/v1/digital/ext/check/qr", {
          qrCode: shortenedUrl,
        })
        .then((response) => {
          setValidationResult(response.data);
          if (response.data.responseCode ==='00') {
            navigate(`/scan-success/${shortenedUrl}`); // Redirect to success page
          } else {
            navigate(`/scan-error/${shortenedUrl}`); // Redirect to error page
          }
        })
        .catch((error) => {
          console.error(error);
          setValidationResult(null);
        });
    }
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
            value={shortenedUrl}
            disabled
          />
          {validationResult && (
            <div className="text-center mt-3">
              <p className="fw-bold">Validation Result:</p>
              <p>{JSON.stringify(validationResult)}</p>
            </div>
          )}
          <div className="mb-5 mt-4">
            <button
              className="btn btn-dark w-100 fw-bold py-2"
              onClick={handleResultClick}
            >
              Validate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanQR;
