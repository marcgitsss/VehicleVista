import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '1rem'
};

const notificationStyle = {
  position: 'absolute',
  top: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 'fit-content',
  padding: '1rem',
  borderRadius: '5px',
  backgroundColor: '#f44336',
  color: '#fff',
  zIndex: 9999
};

export default function RejectModal({ open, handleClose, email, relocate }) {
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:8080/applicants/rejectApplicant', null, {
        params: {
          email: email,
          message: message
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Response:', res.data);
      setNotificationMessage('Denied Application');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
      navigate(relocate); // Navigate to the specified destination
    } catch (error) {
      console.error('Error sending email:', error);
      setNotificationMessage('Failed to send email.');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
    }
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <Box sx={style}>
          <Typography id="modal-modal-title" sx={{ fontSize: '1.125rem', fontWeight: 'bold' }}>
            Reject Application
          </Typography>
          <Typography variant="body1" mt={2}>
            Please provide a reason for rejection:
          </Typography>
          <TextField
            label="Reason"
            multiline
            rows={4}
            value={message}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            mt={2}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: '0.5rem', borderRadius: '5rem', backgroundColor: '#F4C522', color: 'black' }}
          >
            Submit
          </Button>
          {showNotification && (
          <div style={notificationStyle}>
            {notificationMessage}
          </div>
        )}
        </Box>
       
      </>
    </Modal>
  );
}
