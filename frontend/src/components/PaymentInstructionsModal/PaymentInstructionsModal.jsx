import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "./PaymentInstructionsModal.css";

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
  const handleClick = () => {
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
          <div className="pay-ins-container">
            <h1>Payment through Cash via Cashier</h1>
            <span>Pay through cashier and submit proof of payment below</span>
            <Button
              variant="contained"
              color="inherit"
              sx={{ background: "#F4C522", color: "black", fontWeight: 'bold' }}
              onClick={handleClick}
            >
              Submit proof of payment
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
