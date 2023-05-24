import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import QrReader from "react-qr-scanner";

class ScanQR extends React.Component {
  state = {
    delay: 100,
    result: "No result",
  };

  handleScan = (data) => {
    this.setState({
      result: data,
    });
  };

  handleError = (err) => {
    console.error(err);
  };

  render() {
    const previewStyle = {
      // Define the CSS styles for the preview container
      width: "300px",
      maxWidth: "300px",
    };
    return (
      <div className="container d-flex align-items-center justify-content-center vh-100">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 border rounded p-4 shadow">
            <h4 className="text-center fw-bold text-secondary">Scan QR Code</h4>
            <p className="text-center text-danger m-4 fw-bold">
              Place QR Code inside the frame to scan and please avoid shake to
              get fast result.
            </p>
            <div className="d-flex justify-content-center">
              <QrReader
                delay={this.state.delay}
                style={previewStyle}
                onError={this.handleError}
                onScan={this.handleScan}
              />
            </div>
            <br />
              <p className="text-center fw-bold">{this.state.result && this.state.result.text}</p>
            <p className="text-center m-4 fw-bold">Scanning QR Code...</p>
            <div className="mb-5 mt-5">
              <Link to={"/welcome"}>
                <button className="btn btn-dark w-100 fw-bold py-2">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ScanQR;
