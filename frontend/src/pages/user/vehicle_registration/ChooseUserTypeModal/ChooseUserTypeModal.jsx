import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Checkbox, FormControlLabel, FormGroup, Snackbar } from "@mui/material";
import "./ChooseUserTypeModal.css";
import GuidelinesModal from "../GuidelinesModal/GuidelinesModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(50vw - 4em)",
  maxWidth: "500px",
  maxHeight: "400px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ChooseUserTypeModal({ isOpen, toggleModal }) {
  const [guidelinesModal, setGuidelinesModal] = useState(false);
 

  const handleStudent = () => {
    localStorage.setItem("isStaff",false);
    toggleModal(false);
    setGuidelinesModal(true);
  };
  const handleStaff = () => {
    localStorage.setItem("isStaff",true);
    toggleModal(false);
    setGuidelinesModal(true);
  };

  const handleClose = () => {
    toggleModal(false); // Close the modal when the close button is clicked
  };

  const handleIsStaff = () => {
    
  };

  return (
    <>
      {/* Guidelines Modal */}
      <GuidelinesModal
        isModalOpen={guidelinesModal}
        toggleModal={setGuidelinesModal}
      />

      <Modal
        open={isOpen ?? false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Modal Content */}
          <div className="choose-user-header">Choose Type Of User</div>
          {/* Close button */}
          <Button onClick={handleClose} style={{ position: 'absolute', top: '8px', right: '8px' }}>Close</Button>
          <div  className="choose-user-buttons">
            <Button variant="contained" onClick={handleStudent} style={{ background: "#8A252C" }}>
              Student
            </Button>
            <Button variant="contained" onClick={handleStaff} style={{ background: "#F4C522" }}>
              Personnel
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
