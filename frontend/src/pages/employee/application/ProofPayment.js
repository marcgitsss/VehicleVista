import { Box, Button, Container, Grid, Modal, Paper, Typography } from '@mui/material';
import backButton from '../../../assets/backButton.jpg';
import Header from '../../../components/Navbar/EmployeeHeader';
import Footer from '../../../components/Navbar/UserFooter';
import HP_background from '../../../assets/HP_Background.jpg';
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import EmployeeSideBar from '../../../components/Navbar/EmployeeSidebar/employeeSidebar';
import RejectModal from '../../../components/Modal/rejectModal';


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

export default function ProofPayment() {
    const location = useLocation();
    const email = location.state?.email;
    const [applications, setApplications] = useState({});
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
    const [currentPhotoUrl, setCurrentPhotoUrl] = useState('');
    const [proofPhotoUrl, setProofPhotoUrl] = useState('');

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleClosePhotoModal = () => {
        setIsPhotoModalOpen(false);
    };

    const handleVerifyClick = async () => {
        console.log('handleVerifyClick called');
        try {
            const response = await axios.put(
                `http://localhost:8080/applicants/updatePaidStatus/${email}`);
            setMessage("Payment status updated successfully");
            setTimeout(() => {
                navigate('/verifypay');
            }, 2000);
        } catch (error) {
            console.error('Error updating verification status:', error);
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMessage('');
        }, 3000);
        return () => clearTimeout(timeout);
    }, [message]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/applicants/get-by-email/" + email
                );
                if (response.data) {
                    console.log(response.data);
                    setApplications(response.data);
                    console.log('handleVerifyClick called', applications.verified);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [email]);

    const fetchPhoto = async (photoType) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/photos/get-photo-by-name/${email}:${photoType}`,
                { responseType: 'arraybuffer' }
            );
            if (response.data) {
                const blob = new Blob([response.data], { type: 'image/jpeg' });
                const url = URL.createObjectURL(blob);
                return url;
            }
        } catch (error) {
            console.error('Error fetching photo:', error);
            return null;
        }
    };

    const handleOpenPhotoModal = (photoUrl) => {
        setCurrentPhotoUrl(photoUrl);
        setIsPhotoModalOpen(true);
    };

    const handlePaymentClick = async () => {
        const url = await fetchPhoto('proof_of_payment');
        if (url) {
            setProofPhotoUrl(url);
            handleOpenPhotoModal(url);
        }
    };

    return (
        <>
            <Header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }} />
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <EmployeeSideBar style={{ position: 'fixed', top: '4rem', left: 0, bottom: 0 }} />
                <div style={{
                    paddingTop: '5rem', // Padding to create space for the fixed header
                    paddingLeft: '10rem', // Padding to create space for the fixed sidebar
                    paddingBottom: '10rem', // Add padding to the bottom to create space for the footer
                    backgroundImage: `url(${HP_background})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                }}>

                    <div>
                        <Container maxWidth="lg">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <br />
                                </Grid>

                                <Grid item xs={2}>
                                </Grid>
                                <Grid item xs={8} >
                                    <div>
                                        <Grid item xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <Grid item xs={1} sx={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <Link to="/verifypay" style={{ textDecoration: "none" }}> <img src={backButton} alt="Logo" style={{ width: "3rem", height: "3rem", }} /> </Link>
                                                    <h1 style={{ textAlign: "center", fontSize: 'clamp(1.5rem, 5vw, 2rem)', flex: 1 }}>Select Application</h1>
                                                </div>
                                            </Grid>
                                            <Grid item xs={1}>
                                            </Grid>
                                        </Grid>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Paper sx={{ width: 'clamp(25rem, 40vw, 100%)', height: 'clamp(20rem, 50vh, 100%)', borderRadius: '5rem 5rem 5rem 5rem', padding: '3rem', backgroundColor: 'rgba(228, 228, 228, 0.5)', }}>
                                                <div>
                                                    <Typography component="div" sx={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}>
                                                        <div style={{ display: "flex", alignItems: "center", }}>
                                                            <h3>Application Name:</h3>&nbsp;<p style={{ textAlign: "left" }}>{applications.firstName} {applications.middleInitial}. {applications.lastName}</p>
                                                        </div>
                                                    </Typography>
                                                    <Typography component="div" sx={{ marginLeft: 'clamp(2rem, 10%, 20rem)' }}>
                                                        <div style={{ display: "flex", alignItems: "center", margin: "-1rem" }}>
                                                            <h3 style={{ textAlign: "left" }}>User Type:</h3>&nbsp;<p>{applications.isStaff ? 'Staff' : 'Student'}</p>
                                                        </div>
                                                        <div style={{ display: "flex", alignItems: "center", margin: "-1rem" }}>
                                                            <h3 style={{ textAlign: "left" }}>Affiliated ID Number:</h3>&nbsp;<p style={{ textAlign: "left" }}>{applications.idNumber}</p>
                                                        </div>
                                                        <div style={{ display: "flex", alignItems: "center", margin: "-1rem" }}>
                                                            <h3 style={{ textAlign: "left" }}>Address:</h3>&nbsp;<p style={{ textAlign: "left" }}>{applications.address}</p>
                                                        </div>
                                                        <div style={{ display: "flex", alignItems: "center", margin: "-1rem" }}>
                                                            <h3 style={{ textAlign: "left" }}>Contact Number:</h3>&nbsp;<p style={{ textAlign: "left" }}>{applications.contactNumber}</p>
                                                        </div>
                                                        <div style={{ display: "flex", alignItems: "center", margin: "-1rem" }}>
                                                            <h3 style={{ textAlign: "left" }}>Proof of Payment:</h3>&nbsp;
                                                            <Button
                                                                onClick={handlePaymentClick}
                                                                sx={{ textTransform: "none", color: "#8A252C" }}>Click to View Image</Button>
                                                        </div>
                                                    </Typography>
                                                </div>
                                                <div style={{ color: 'red', textAlign: 'center', position: 'relative', top: '1rem' }}>
                                                    {(message)}
                                                </div>
                                            </Paper>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem", padding: "1rem" }}>
                                            <div>
                                                <Button sx={{
                                                    textTransform: "none",
                                                    color: "white",
                                                    backgroundColor: "#8A252C",
                                                    borderRadius: "5rem",
                                                    width: 'clamp(6rem, 10vw, 15rem)',
                                                    height: 'clamp(3rem, 4vh, 5rem)',
                                                    fontSize: 'clamp(1rem, 1.5vw, 2rem)',
                                                }} onClick={handleOpenModal}>Reject</Button>
                                                <RejectModal
                                                    isOpen={isModalOpen}
                                                    onClose={handleCloseModal}
                                                    email={applications.email}
                                                    onRejectSuccess={() => {
                                                        setMessage("Rejected successfully");
                                                        setIsModalOpen(false);
                                                        setTimeout(() => {
                                                            navigate('/verifypay');
                                                        }, 2000);
                                                    }}
                                                />
                                            </div>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <div>
                                                <Button sx={{
                                                    textTransform: "none",
                                                    color: "white",
                                                    backgroundColor: "#8A252C",
                                                    borderRadius: "5rem",
                                                    width: 'clamp(6rem, 10vw, 15rem)',
                                                    height: 'clamp(3rem, 4vh, 5rem)',
                                                    fontSize: 'clamp(1rem, 1.5vw, 2rem)',
                                                }} onClick={handleVerifyClick}>Verify</Button>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                </div>
                <Footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} />
            </div>
            <Modal open={isPhotoModalOpen} onClose={handleClosePhotoModal}>
                <Box sx={{ ...style, width: '100%', height: '100%' }}>
                    <img src={currentPhotoUrl} alt="Proof of Payment" style={{ height: '100%', overflow:'scroll' }} />
                    <Button onClick={handleClosePhotoModal}>Close</Button>
                </Box>
            </Modal>
        </>
    );
}
