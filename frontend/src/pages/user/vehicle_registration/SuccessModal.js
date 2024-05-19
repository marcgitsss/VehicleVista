import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { Navigate, useHistory, useNavigate } from 'react-router-dom'; // Import useHistory hook


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalComponent({ open, onClose }) {

  const navigate = useNavigate();
  const handleProceed = () => {
    onClose(); // Close the modal
    navigate('/homepage'); // Navigate to '/homepage'
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Successful Registration
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'justify', wordSpacing: '0rem' }}>
            Your vehicle registration request has been submitted successfully. Please wait for approval before proceeding to payment.
          </Typography>
          <Button onClick={handleProceed}>Proceed</Button> {/* Call handleProceed on button click */}
        </Box>
      </Modal>
    </div>
  );
}
