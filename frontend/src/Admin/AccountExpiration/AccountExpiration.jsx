import AdminHeader from "../../components/AdminHeader/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

function AccountExpiration() {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  return (
    <>
      <AdminHeader />
      <AdminSidebar />
      <main className="admin-container">

        {/* Breadcrumbs Navigation */}
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs
            aria-label="breadcrumb"
            style={{ fontSize: "2em", marginTop: "1em" }}
          >
            <Link
              underline="hover"
              color="inherit"
              href="/"
              style={{ color: "#8A252C" }}
            >
              Configuration
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              Account Expiration
            </Link>
          </Breadcrumbs>
        </div>

        {/* Some Text */}
        <div className="accexp-info">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at massa
          non libero suscipit placerat a non ipsum. Aenean tempor nec enim vel
          feugiat. Pellentesque a malesuada dolor. Nullam malesuada scelerisque
          elit in sagittis. Etiam bibendum lobortis sapien sit amet consequat.
          Pellentesque vitae congue neque, vitae finibus nisl. Vivamus turpis
          diam, sodales quis venenatis
        </div>

        <div className="accexp-input-container">
          <Box className="accexp-input-group">
            <div className="accexp-input-header">
              <span>Set Expiration</span>
              <EditIcon />
            </div>

            <div className="accexp-input">
              <label htmlFor="type">Type</label>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">type</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Faculty</MenuItem>
                  <MenuItem value={20}>Student</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="accexp-input">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" name="date" />
            </div>

            <div className="accexp-buttons">
              <Button
                style={{ backgroundColor: "#cccccc", color: "#333333" }}
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                style={{ backgroundColor: "#8A252C", color: "white" }}
                variant="contained"
              >
                Save
              </Button>
            </div>
          </Box>

          {/* Student */}
          <Box className="accexp-current-set-group">
            <div className="accexp-current-set-header">Current Set</div>

            <div className="accexp-current-set-text">
              <span>Faculty:</span> Oct 8, 2024
            </div>

            <div className="accexp-current-set-text">
              <span>Student:</span> Sept 30, 2024
            </div>
          </Box>    
        </div>
      </main>
    </>
  );
}

export default AccountExpiration;
