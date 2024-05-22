import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';

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

export default function RejectModal({ open, handleClose, email, relocate, setIsRejected  }) {
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true); // Start loading
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
      setSnackbarMessage('Denied Application');
      setIsRejected(true);
      setSnackbarOpen(true);
      setTimeout(() => {
        
        
        navigate(relocate); 
      }, 3000); // Hide notification after 3 seconds and then navigate
    } catch (error) {
      console.error('Error sending email:', error);
      setSnackbarMessage('Failed to send email.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false); // End loading
      handleClose();
    }
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
          {snackbarOpen && (
            <div className="employee-snackbar">{snackbarMessage}</div>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: '0.5rem', borderRadius: '5rem', backgroundColor: '#F4C522', color: 'black' }}
            disabled={loading} // Disable button while loading
          >
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Box>
      </>
    </Modal>
  );
}
