import React, { useState } from "react";
import { Button, Typography, Snackbar } from "@mui/material";

export default function FileUpload({ label, onChange }) {
  const [fileName, setFileName] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    // Check if file is not an image
    if (file && !file.type.startsWith("image")) {
      setSnackbarMessage("Only images are allowed");
      setSnackbarOpen(true);
    } else {
      setFileName(file.name);
      onChange(file);
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
    onChange(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ml: "1rem" }}>
      <Typography style={{ fontSize: "1.125rem", fontWeight: 'bold', ml: '2' }}>
        {label}:
      </Typography>
      {fileName ? (
        <>
          <Typography style={{ ml: "0.5rem" }}>{fileName}</Typography>
          <Button
            variant="contained"
            onClick={handleRemoveFile}
            sx={{
              ml: '1rem',
              borderRadius: "1rem",
              backgroundColor: '#8A252C',
              color: '#F4C522' // Use color property to change font color
            }}
          >
            Remove
          </Button>
        </>
      ) : (
        <>
          <input
            accept="image/*"
            id={`${label.toLowerCase()}-upload`}
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <label htmlFor={`${label.toLowerCase()}-upload`}>
            <Button
              variant="contained"
              component="span"
              sx={{
                ml: '1rem',
                borderRadius: "1rem",
                backgroundColor: '#8A252C',
                color: '#F4C522' // Use color property to change font color
              }}
            >
              Upload
            </Button>
          </label>
        </>
      )}
      {/* Snackbar for displaying validation errors */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
}
