import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "./PaymentInstructionsModal.css";
import Invoice from "./Invoice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(60vw)",
  maxWidth: "1080px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
  border: 0,
};

export default function PaymentInstructionsModal({
  isModalOpen,
  setIsModalOpen,
}) {
  const [showInvoiceModal, setShowInvoiceModal] = React.useState(false); // State for controlling the Invoice modal

  const handleClick = () => {
    setIsModalOpen(false);
    // proceed to next page...
  };
  const handleSeeInvoice = () => {
    setShowInvoiceModal(true);
  };

  const handleCloseInvoiceModal = () => {
    setShowInvoiceModal(false);
  };
  const handleClose = () => {
    setIsModalOpen(false);
    // proceed to next page...
  };

  return (
    <div>
      
      <Modal
        open={isModalOpen ?? false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Modal Content */}
          <Button onClick={handleClose}>Close</Button> {/* Close button */}
          <div className="pay-ins-container">
            <h1>Payment through Cash via Cashier</h1>
            <span>Pay through cashier and submit proof of payment below</span>
            <Button
              variant="contained"
              color="inherit"
              sx={{ background: "#F4C522", color: "black", fontWeight: 'bold' }}
              onClick={handleSeeInvoice}
            >
              See Invoice
            </Button>
          </div>
        </Box>
      </Modal>
      <Invoice open={showInvoiceModal} handleClose={handleCloseInvoiceModal} /> {/* Render the Invoice modal */}
    </div>
  );
}
