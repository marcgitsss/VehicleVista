import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon from Material-UI
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useUser } from '../../../context/AuthProvider';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'clamp(20rem, 90%, 45rem)',
    height: 'clamp(15rem, 90%, 25rem)',
    bgcolor: 'background.paper',
    boxShadow: 0,
    p: '2rem',
};

export default function ProofMod() {
    const [open, setOpen] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false); // State to track submission status
    // const { token } = useUser();
    const navigate = useNavigate();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setName] = React.useState(null);
    const [submitProofOfPayment, setSubmitProofOfPayment] = React.useState();
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const decodedToken = jwtDecode(token);
    const username = decodedToken.sub;
    const [loading, setLoading] = React.useState(false);

    const handleUploadClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleFileChange = (event) => {
        console.log(event.target.files[0]);
        setSubmitProofOfPayment(event.target.files[0]);
    };

    const handleDeleteClick = () => {
        setSubmitProofOfPayment(null); // Clear the uploaded file
    };

    const handleSubmitClick = async () => {
        console.log(submitProofOfPayment);

        
        console.log('token: ', token);
        console.log('email: ', username);
        const decodedToken = jwtDecode(token,{header: true});
        const user = decodedToken.sub;
        setName(`${user}:proof_of_payment`);

        const config2 = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };

        console.log(name);

        const formData = new FormData();
        formData.append('image', submitProofOfPayment);
        formData.append('email', username);
        
        const payres = await axios.post(`http://localhost:8080/applicants/uploadPay`, formData, config2);
        if (payres.data) {
            setSubmitted(true); // Set submitted state to true
        } else {
            alert("Failed to Submit Proof of Payment");
        }
    };

    const handleSubmitClickNew = async () => {
        console.log(submitProofOfPayment);
        setLoading(true);
        
        console.log('token: ', token);
        console.log('email: ', username);
        const decodedToken = jwtDecode(token,{header: true});
        const user = decodedToken.sub;
        setName(`${user}:proof_of_payment`);

        const config2 = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };

        console.log(name);

        const formData = new FormData();
        formData.append('image', submitProofOfPayment);
        formData.append('email', username);
        
        const payres = await axios.post(`http://localhost:8080/applicants/uploadPay`, formData, config2);
        
        if (payres.data) {
            setSubmitted(true); // Set submitted state to true
            setLoading(false);
        } else {
            alert("Failed to Submit Proof of Payment");
        }
    };

    const handleModalButtonClick = () => {
        window.location.reload();
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button sx={{ bottom: '-2rem', padding: '.2rem 2rem .2rem 2rem', borderRadius: '5rem', backgroundColor: '#F4C522', color: 'black', fontWeight: 'bold', textTransform: 'none', fontSize: '1.125rem', '&:hover': { backgroundColor: '#8A252C' }, '&:br': { padding: '50rem' } }} onClick={handleOpen}>
                    Submit Proof of <br />Payment
                </Button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold" }}>
                        Submit Proof of Payment
                    </Typography>
                    {submitProofOfPayment ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
                            <Typography variant="body1" style={{ marginBottom: "1rem" }}>Uploaded File: {submitProofOfPayment.name}</Typography>
                            <Button onClick={handleDeleteClick} startIcon={<DeleteIcon />} style={{ backgroundColor: '#8A252C', borderRadius: '1.25rem', color: 'white', fontWeight: 'bold', width: 'clamp(12rem, 90%, 19.1rem)', height: '3.7rem', fontSize: '2rem', textTransform: 'none' }}>Delete</Button>
                            <Button onClick={handleSubmitClickNew} style={{ marginTop: "1rem", backgroundColor: '#8A252C', borderRadius: '1.25rem', color: 'white', fontWeight: 'bold', width: 'clamp(12rem, 90%, 19.1rem)', height: '3.7rem', fontSize: '2rem', textTransform: 'none' }}>{loading ? <CircularProgress size={30} /> : 'Submit'}</Button>
                        </div>
                    ) : (
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ marginBottom: "1.875rem", marginTop: "11.25rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <Button
                                    onClick={handleUploadClick}
                                    style={{ backgroundColor: '#D9D9D9', borderRadius: '1.25rem', color: 'black', fontWeight: 'bold', width: 'clamp(8rem, 90%, 15.1rem)', height: '3.7rem', fontSize: '1.125rem', textTransform: 'none' }}
                                >
                                    Upload
                                </Button>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Button
                                    onClick={handleSubmitClick}
                                    style={{ backgroundColor: '#8A252C', borderRadius: '1.25rem', color: 'white', fontWeight: 'bold', width: 'clamp(8rem, 90%, 15.1rem)', height: '3.7rem', fontSize: '1.125rem', textTransform: 'none' }}>Submit</Button>
                            </div>
                        </div>
                    )}
                </Box>
            </Modal>
            {/* Modal for submission confirmation */}
            <Modal
                open={submitted} // Open modal when submission is successful
                onClose={() => setSubmitted(false)} // Close modal when clicked outside
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold" }}>
                        Submission Successful
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
                        <Button onClick={handleModalButtonClick} style={{ backgroundColor: '#8A252C', borderRadius: '1.25rem', color: 'white', fontWeight: 'bold', width: 'clamp(12rem, 90%, 19.1rem)', height: '3.7rem', fontSize: '2rem', textTransform: 'none' }}>OK</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
