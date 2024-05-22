import React, { useState } from "react";
import login_background from "../../../assets/login_background.jpeg";
import loginWheel from "../../../assets/loginWheel.jpg";
import { Grid, Snackbar } from "@mui/material";
import LoginCard from "./LoginCard";
import VVLogo from "../../../assets/VVLogo.png";

export default function AdminPage() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLoginSuccess = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  return (
    <main className="main-content">
      <div>
        <Grid container item xs={12}>
          <div
            style={{ position: "absolute", top: 0, width: "95%", zIndex: 1 }}
          >
            <div className="header">
              <div className="logo-container">
                <img
                  src={VVLogo}
                  alt="HeaderLogo"
                  className="headerImage"
                  style={{ width: "12.5rem" }}
                />
              </div>
            </div>
          </div>
          <Grid
            item
            xs={7}
            style={{
              backgroundImage: `url(${login_background})`,
              filter: "blur(.1rem)",
              backgroundSize: "100% 100%",
              minHeight: "100vh",
            }}
          ></Grid>
          <Grid
            item
            xs={5}
            style={{
              backgroundImage: `url(${loginWheel})`,
              backgroundSize: "100% 100%",
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LoginCard onLoginSuccess={handleLoginSuccess} />
          </Grid>
        </Grid>

        {/* </Container> */}
        <div>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        </div>
      </div>
    </main>
  );
}
