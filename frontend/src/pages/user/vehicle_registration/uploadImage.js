import React, { useState } from "react";
import { Button, Typography } from "@mui/material";

export default function FileUpload({ label, onChange }) {
  const [fileName, setFileName] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    onChange(file);
  };

  const handleRemoveFile = () => {
    setFileName(null);
    onChange(null);
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
    </div>
  );
}
