import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const columns = [
  { field: "invitation_id", headerName: "Invitation ID", width: 150 },
  { field: "doctor_name", headerName: "Doctor's Name", width: 200 },
  { field: "register_date_time", headerName: "Registered Date & Time", width: 170 },
  {
    field: "mobile_number",
    headerName: "Mobile Number",
    width: 130,
  },
  {
    field: "entrance_date_time",
    headerName: "Entrance Date & Time",
    width: 150,
  },
  {
    field: "dine_date_time",
    headerName: "Dinner Date & Time",
    width: 150,
  },
  {
    field: "gift_date_time",
    headerName: "Gift Date & Time",
    width: 150,
  },
  {
    field: "ref_code",
    headerName: "Invitation Link",
    sortable: false,
    width: 600,
    valueGetter: (params) =>
      `https://verify.certificate.lk/view?ref=${params.row.ref_code || ""}`,
    renderCell: (params) => (
      <a href={params.value} target="_blank" rel="noopener noreferrer">
        {params.value}
      </a>
    ),
  },
];

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();

    // Fetch data every 10 seconds (adjust the interval as needed)
    const interval = setInterval(fetchData, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/all/data`)
      .then((response) => response.json())
      .then((data) => {
        // Remove duplicate rows based on invitation_id
        const uniqueRows = Array.from(new Set(data.map((row) => row.ref_code)))
          .map((refCode) => {
            return data.find((row) => row.ref_code === refCode);
          });
        setRows(uniqueRows);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    const searchFields = Object.values(row).join(" ").toLowerCase();
    return searchFields.includes(search.toLowerCase());
  });

  return (
    <div className="container align-items-center justify-content-center vh-100">
      <div className="row">
        <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 rounded p-4">
          <h4 className="text-center mt-4 fw-bold text-secondary text-decoration-underline mb-5">
            Entrance Details
          </h4>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            autoHeight
            pageSize={5}
            disableSelectionOnClick
            className="p-4"
          />
          <Link to={"/"} className="float-end text-secondary fw-bold mb-3 mt-4">
            Log Out
          </Link>
        </div>
      </div>
    </div>
  );
}
