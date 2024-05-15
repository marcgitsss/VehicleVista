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

export default function ChooseUserTypeModal(props) {
  // change useState to a prop to use this modal
  const [open, setOpen] = useState(false);

  const [guidelinesModal, setGuidelinesModal] = useState(false);

  const handleSubmit = () => {
    setOpen(false)
    setGuidelinesModal(true)
  };

  return (
    <div>
      <Button onClick={setOpen}>Close</Button>
      {/* Guidelines Modal */}
      <GuidelinesModal
        isModalOpen={guidelinesModal}
        toggleModal={setGuidelinesModal}
      />

      <Modal
        open={open ?? false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Modal Content */}
          <div className="choose-user-header">Choose Type Of User</div>
          <div onClick={handleSubmit} className="choose-user-buttons">
            <Button variant="contained" style={{ background: "#8A252C" }}>
              Student
            </Button>
            <Button variant="contained" style={{ background: "#F4C522" }}>
              Personnel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
