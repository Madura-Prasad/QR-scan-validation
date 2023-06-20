// import * as React from "react";
// import { useEffect, useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { Link } from "react-router-dom";

// const columns = [
//   { field: "invitation_id", headerName: "Invitation ID", width: 150 },
//   { field: "doctor_name", headerName: "Doctor's Name", width: 200 },
//   {
//     field: "register_date_time",
//     headerName: "Registered Date & Time",
//     width: 170,
//   },
//   {
//     field: "mobile_number",
//     headerName: "Mobile Number",
//     width: 130,
//   },
//   {
//     field: "entrance_date_time",
//     headerName: "Entrance Date & Time",
//     width: 150,
//   },
//   {
//     field: "dine_date_time",
//     headerName: "Dinner Date & Time",
//     width: 150,
//   },
//   {
//     field: "gift_date_time",
//     headerName: "Gift Date & Time",
//     width: 150,
//   },
//   {
//     field: "ref_code",
//     headerName: "Invitation Link",
//     sortable: false,
//     width: 600,
//     valueGetter: (params) =>
//       `https://verify.certificate.lk/view?ref=${params.row.ref_code || ""}`,
//     renderCell: (params) => (
//       <a href={params.value} target="_blank" rel="noopener noreferrer">
//         {params.value}
//       </a>
//     ),
//   },
// ];

// export default function DataTable() {
//   const [rows, setRows] = useState([]);
//   const [search, setSearch] = useState("");
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   useEffect(() => {
//     fetchData();

//     // Fetch data every 10 seconds (adjust the interval as needed)
//     const interval = setInterval(fetchData, 300000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   const fetchData = () => {
//     const startDateParam = startDate
//       ? `startDate=${startDate.toISOString()}`
//       : "";
//     const endDateParam = endDate ? `endDate=${endDate.toISOString()}` : "";
//     const queryParams = [startDateParam, endDateParam]
//       .filter(Boolean)
//       .join("&");

//     fetch(`${process.env.REACT_APP_API_BASE_URL}/all/data?${queryParams}`)
//       .then((response) => response.json())
//       .then((data) => {
//         // Remove duplicate rows based on invitation_id
//         const uniqueRows = Array.from(
//           new Set(data.map((row) => row.ref_code))
//         ).map((refCode) => {
//           return data.find((row) => row.ref_code === refCode);
//         });
//         setRows(uniqueRows);
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   };

//   const handleSearchChange = (event) => {
//     setSearch(event.target.value);
//   };

//   const handleStartDateChange = (event) => {
//     setStartDate(new Date(event.target.value));
//   };

//   const handleEndDateChange = (event) => {
//     setEndDate(new Date(event.target.value));
//   };

//   const filteredRows = rows.filter((row) => {
//     const searchFields = Object.values(row).join(" ").toLowerCase();
//     const registerDateTime = new Date(row.register_date_time)
//       .toISOString()
//       .split("T")[0];
//     const isMatch = searchFields.includes(search.toLowerCase());
//     const isDateInRange =
//       (!startDate ||
//         registerDateTime >= startDate.toISOString().split("T")[0]) &&
//       (!endDate || registerDateTime <= endDate.toISOString().split("T")[0]);
//     return isMatch && isDateInRange;
//   });

//   return (
//     <div className="container align-items-center justify-content-center vh-100">
//       <div className="row">
//         <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 rounded p-4">
//           <h4 className="text-center mt-4 fw-bold text-secondary text-decoration-underline mb-5">
//             Entrance Details
//           </h4>

//           <div className="row mb-3">
//             <div className="col-md-6">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search..."
//                 value={search}
//                 onChange={handleSearchChange}
//               />
//             </div>
//             <div className="col-md-3">
//               <input
//                 type="date"
//                 id="start-date"
//                 className="form-control"
//                 value={startDate ? startDate.toISOString().split("T")[0] : ""}
//                 onChange={handleStartDateChange}
//               />
//               <label htmlFor="start-date" className="form-label">
//                 Start Date (Register Date)
//               </label>
//             </div>
//             <div className="col-md-3">
//               <input
//                 type="date"
//                 id="end-date"
//                 className="form-control"
//                 value={endDate ? endDate.toISOString().split("T")[0] : ""}
//                 onChange={handleEndDateChange}
//               />
//               <label htmlFor="end-date" className="form-label ">
//                 End Date (Register Date)
//               </label>
//             </div>
//           </div>
//           <DataGrid
//             rows={filteredRows}
//             columns={columns}
//             autoHeight
//             pageSize={5}
//             disableSelectionOnClick
//             className="p-4"
//           />
//           <Link to={"/"} className="float-end text-secondary fw-bold mb-3 mt-4">
//             Log Out
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const YourComponent = () => {
  const [certificateList, setCertificateList] = useState([]);
  const [existingCertificates, setExistingCertificates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          userId: 239,
          digitalContentId: 89,
          page: 1,
          pageCount: 10,
        };

        const allCertificates = [];

        let currentPage = 1;
        let totalPage = 1;

        while (currentPage <= totalPage) {
          const pageData = { ...data, page: currentPage };

          const response = await fetch(
            "https://emg.textware.lk/emgapi/v1/digital/ext/certificate",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(pageData),
            }
          );

          const responseData = await response.json();

          if (currentPage === 1) {
            totalPage = responseData.totalPage;
          }

          const certificates = responseData.digitalCertificateList;
          allCertificates.push(...certificates);

          currentPage++;
        }

        setCertificateList(allCertificates);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch data every 1 minute
    const interval = setInterval(fetchData, 60000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkDataExistence = async () => {
      const promises = certificateList.map(async (certificate) => {
        const uniqueId = certificate.uniqueId;
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}/all/data`
          );
          const rowData = await response.json();
          const matchingRow = rowData.find((row) => row.ref_code === uniqueId);
          if (matchingRow) {
            // console.log("Data exists for uniqueId:", uniqueId);
            // console.log("Row data:", matchingRow.entrance_date_time);
            setExistingCertificates((prevCertificates) => [
              ...prevCertificates,
              matchingRow,
            ]);
          } else {
            // console.log("Data does not exist for uniqueId:", uniqueId);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      });

      await Promise.all(promises);
    };

    checkDataExistence();
  }, [certificateList]);

  const columns = [
    { field: "id", headerName: "Invitation ID", width: 150 },
    { field: "doctorname", headerName: "Doctor Name", width: 200 },
    {
      field: "createdDatetime",
      headerName: "Registered Date & Time",
      width: 200,
    },
    { field: "mobile", headerName: "Mobile Number", width: 170 },
    { field: "entrance", headerName: "Entrance Date & Time", width: 200 },
    { field: "gift", headerName: "Gift Date & Time", width: 200 },
    { field: "dine", headerName: "Dine Date & Time", width: 200 },
    {
      field: "link",
      headerName: "Invitation Link",
      sortable: false,
      width: 600,
      valueGetter: (params) =>
        `https://verify.certificate.lk/view?ref=${params.row.uniqueId || ""}`,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
      ),
    },
  ];

  const rows = certificateList.map((certificate) => {
    const certificateData = JSON.parse(certificate.certificateDataJson);
    const matchingCertificate = existingCertificates.find(
      (cert) => cert.ref_code === certificate.uniqueId
    );

    return {
      id: certificate.digitalCertificateId,
      doctorname: certificateData.doctorname,
      createdDatetime: certificate.createdDatetime,
      mobile: certificate.msisdn,
      entrance: matchingCertificate?.entrance_date_time || "No data available",
      gift: matchingCertificate?.gift_date_time || "No data available",
      dine: matchingCertificate?.dine_date_time || "No data available",
      uniqueId: certificate.uniqueId,
    };
  });

  return (
    <div className="container align-items-center justify-content-center vh-100">
      <div className="row">
        <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 rounded p-4">
          <h4 className="text-center mt-4 fw-bold text-secondary text-decoration-underline mb-5">
            Entrance Details
          </h4>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              columns={columns}
              rows={rows}
              autoHeight
              pagination
              pageSize={10}
            />
            <Link
              to={"/"}
              className="float-end text-secondary fw-bold mb-3 mt-4"
            >
              Log Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
