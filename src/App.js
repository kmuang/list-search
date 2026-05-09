import React, { useState } from "react";
import { Container, TextField, Box, Typography, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { DataGrid } from "@mui/x-data-grid";
import { data } from "./data";

function App() {
  const [search, setSearch] = useState("");

  const boldHeaderStyle = {
    fontWeight: "bold",
    color: "#333", // Darker text for sharp visibility
    fontSize: "16px", // Adjust font size as needed
  };

  const columns = [
    {
      field: "first_name",
      headerName: "First Name",
      flex: 1,
    },
    { field: "last_name", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
  ];

  // Convert your data for DataGrid usage
  // const rows = data.map((item, index) => ({
  //   id: index, // DataGrid requires a unique 'id' for each row
  //   ...item,
  // }));
  // console.log("rows", rows);

  const filteredRows = data.filter((row) => {
    const searchLowerCase = search.toLowerCase();
    return (
      searchLowerCase === "" ||
      row.first_name.toLowerCase().includes(searchLowerCase) ||
      row.last_name.toLowerCase().includes(searchLowerCase)
    );
  });
  console.log("filteredRows", filteredRows);

  return (
    <Box sx={{ maxWidth: "80%", margin: "auto", my: 5, textAlign: "center" }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="div" sx={{ my: 3 }}>
          Contact List
        </Typography>
        <TextField
          fullWidth
          label="Search contacts"
          variant="outlined"
          sx={{ mb: 2 }} // Add margin below the search field
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Paper sx={{ height: 440, width: "100%" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            // checkboxSelection
            sx={{
              "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeaderTitle":
                boldHeaderStyle,
              padding: "10px",
            }}
          />
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
