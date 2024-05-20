import { Button, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState } from "react";

export default function DeleteApplicantModal({
  isOpen,
  setIsOpen,
  applicant,
  denieApplicant,
}) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async () => {
    if (message === "") {
      setSnackbarMessage("Please State Reason For Denial");
      setSnackbarOpen(true);
    }
    setIsOpen(false);
    denieApplicant(applicant.email, message);
  };

  return (
    <div>
      <Modal
        open={isOpen ?? false}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <Box className="applist-modal applist-modal-delete">
          {/* Modal Content */}
          <h2>Denie Applicant</h2>
          <span>State the reason for Denied Application</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <Button variant="contained" color="error" onClick={onSubmit}>
            Delete
          </Button>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
}
