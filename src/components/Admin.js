// import React, { useEffect, useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { Link } from "react-router-dom";

// const YourComponent = () => {
//   const [certificateList, setCertificateList] = useState([]);
//   const [existingCertificates, setExistingCertificates] = useState([]);
//   const [dataFetched, setDataFetched] = useState(false); // Flag variable
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = {
//           userId: 239,
//           digitalContentId: 89,
//           page: 0,
//           pageCount: 1,
//         };

//         const allCertificates = [];

//         let currentPage = 1;
//         let totalPage = 1;

//         while (currentPage <= totalPage) {
//           const pageData = { ...data, page: currentPage };

//           const response = await fetch(
//             "https://emg.textware.lk/emgapi/v1/digital/ext/certificate",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify(pageData),
//             }
//           );

//           const responseData = await response.json();

//           if (currentPage === 1) {
//             totalPage = responseData.totalPage;
//           }

//           const certificates = responseData.digitalCertificateList;
//           allCertificates.push(...certificates);

//           currentPage++;
//         }

//         setCertificateList(allCertificates);
//         setDataFetched(true); // Update the flag variable after fetching data
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     // Fetch data initially if not fetched already
//     if (!dataFetched) {
//       fetchData();
//     }
//   }, [dataFetched]);

//   useEffect(() => {
//     const checkDataExistence = async () => {
//       for (const certificate of certificateList) {
//         const uniqueId = certificate.uniqueId;
//         try {
//           const response = await fetch(
//             `${process.env.REACT_APP_API_BASE_URL}/all/data`
//           );
//           const rowData = await response.json();
//           const matchingRow = rowData.find((row) => row.ref_code === uniqueId);
//           if (matchingRow) {
//             setExistingCertificates((prevCertificates) => [
//               ...prevCertificates,
//               matchingRow,
//             ]);
//           }
//         } catch (error) {
//           console.error("Error:", error);
//         }
//       }
//     };

//     if (certificateList.length > 0) {
//       checkDataExistence();
//     }
//   }, [certificateList]);

//   const columns = [
//     { field: "id", headerName: "Invitation ID", width: 100 },
//     { field: "doctorname", headerName: "Doctor Name", width: 200 },
//     {
//       field: "createdDatetime",
//       headerName: "Registered Date & Time",
//       width: 170,
//     },
//     { field: "mobile", headerName: "Mobile Number", width: 120 },
//     { field: "entrance", headerName: "Entrance Date & Time", width: 170 },
//     { field: "gift", headerName: "Gift Date & Time", width: 170 },
//     { field: "dine", headerName: "Dine Date & Time", width: 170 },
//     {
//       field: "link",
//       headerName: "Invitation Link",
//       sortable: false,
//       width: 100,
//       valueGetter: (params) =>
//         `https://verify.certificate.lk/view?ref=${params.row.uniqueId || ""}`,
//       renderCell: (params) => (
//         <a href={params.value} target="_blank" rel="noopener noreferrer">
//           Click Here
//         </a>
//       ),
//     },
//   ];

//   const rows = certificateList.map((certificate) => {
//     const certificateData = JSON.parse(certificate.certificateDataJson);
//     const matchingCertificate = existingCertificates.find(
//       (cert) => cert.ref_code === certificate.uniqueId
//     );

//     return {
//       id: certificate.digitalCertificateId,
//       doctorname: certificateData.doctorname,
//       createdDatetime: certificate.createdDatetime,
//       mobile: certificate.msisdn,
//       entrance: matchingCertificate?.entrance_date_time || "No data available",
//       gift: matchingCertificate?.gift_date_time || "No data available",
//       dine: matchingCertificate?.dine_date_time || "No data available",
//       uniqueId: certificate.uniqueId,
//     };
//   });

//   const filteredRows = rows.filter((row) =>
//     Object.values(row).some((value) =>
//       value.toString().toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );

//   return (
//     <div className="container align-items-center justify-content-center vh-100">
//       <div className="row">
//         <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 rounded p-4">
//           <h4 className="text-center mt-4 fw-bold text-secondary text-decoration-underline mb-5">
//             Entrance Details
//           </h4>
//           <div className="row mb-3">
//             <div className="col-md-12">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search Here ..."
//                 className="form-control"
//               />
//             </div>
//           </div>
//           <div style={{ height: 400, width: "100%" }}>
//             <DataGrid
//               columns={columns}
//               rows={filteredRows}
//               autoHeight
//               pagination
//               pageSize={10}
//             />
//             <Link
//               to={"/"}
//               className="float-end text-secondary fw-bold mb-3 mt-4"
//             >
//               Log Out
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default YourComponent;
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const YourComponent = () => {
  const [certificateList, setCertificateList] = useState([]);
  const [existingCertificates, setExistingCertificates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [allData, setAllData] = useState([]);

  const fetchCertificateData = async () => {
    try {
      const data = {
        userId: 239,
        digitalContentId: 89,
        page: 0,
        pageCount: 1000,
      };

      const response = await fetch(
        "https://emg.textware.lk/emgapi/v1/digital/ext/certificate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();
      const certificates = responseData.digitalCertificateList;

      setCertificateList(certificates);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAllData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/all/data`
      );
      const data = await response.json();
      setAllData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchCertificateData();
    fetchAllData();

    const intervalId = setInterval(() => {
      fetchCertificateData();
      fetchAllData();
    }, 300000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const checkDataExistence = async () => {
      for (const certificate of certificateList) {
        const uniqueId = certificate.uniqueId;
        const matchingRow = allData.find((row) => row.ref_code === uniqueId);
        if (matchingRow) {
          setExistingCertificates((prevCertificates) => [
            ...prevCertificates,
            matchingRow,
          ]);
        }
      }
    };

    checkDataExistence();
  }, [certificateList, allData]);

  const columns = [
    { field: "id", headerName: "Invitation ID", width: 100 },
    { field: "doctorname", headerName: "Doctor Name", width: 200 },
    { field: "createdDatetime", headerName: "Registered Date & Time", width: 170 },
    { field: "mobile", headerName: "Mobile Number", width: 120 },
    { field: "entrance", headerName: "Entrance Date & Time", width: 170 },
    { field: "gift", headerName: "Gift Date & Time", width: 170 },
    { field: "dine", headerName: "Dine Date & Time", width: 170 },
    {
      field: "link",
      headerName: "Invitation Link",
      sortable: false,
      width: 100,
      valueGetter: (params) =>
        `https://verify.certificate.lk/view?ref=${params.row.uniqueId || ""}`,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          Click Here
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

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="container align-items-center justify-content-center vh-100">
      <div className="row">
        <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 rounded p-4">
          <h4 className="text-center mt-4 fw-bold text-secondary text-decoration-underline mb-5">
            Entrance Details
          </h4>
          <div className="row mb-3">
            <div className="col-md-12">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Here ..."
                className="form-control"
              />
            </div>
          </div>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              columns={columns}
              rows={filteredRows}
              autoHeight
              pagination
              pageSize={10}
            />
            <Link to={"/"} className="float-end text-secondary fw-bold mb-3 mt-4">
              Log Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
