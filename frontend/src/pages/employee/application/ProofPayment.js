import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import backButton from '../../../assets/backButton.jpg';
import Header from '../../../components/Navbar/UserHeader';
import Footer from '../../../components/Navbar/UserFooter';
import HP_background from '../../../assets/HP_Background.jpg';
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import EmployeeSideBar from '../../../components/EmployeeSidebar/employeeSidebar';

export default function ProofPayment() {
    const location = useLocation();
    const email = location.state?.email;
    const [applications, setApplications] = useState({});
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

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
                    "http://localhost:8080/applicants/" + email
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
    }, []);

    return (
        <div className='verifyPay' style={{
            backgroundImage: `url(${HP_background})`,
            backgroundSize: '100% 100%',
            minHeight: '100vh',
            fontSize: '16px', // Set base font size
        }}>
            <Header />
            <EmployeeSideBar />
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <br />

                    </Grid>

                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={8} >
                        <div >
                            <Grid item xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Grid item xs={1} sx={{ display: "flex", justifyContent: "right", alignItems: "center" }} >

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
                                                <h3 style={{ textAlign: "left" }}>Proof of Payment:</h3>&nbsp; <a href={applications.proofofpayment} target="_blank"><Button sx={{ textTransform: "none", color: "#8A252C" }}>Click to View Image</Button></a>
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
                                        width: 'clamp(10rem, 30vw, 13.25rem)',
                                        height: 'clamp(2rem, 10vh, 3.44rem)',
                                        fontSize: 'clamp(1rem, 3vw, 1.5rem)'
                                    }}>Reject</Button>
                                </div>
                                &nbsp;
                                <div>
                                    <Button sx={{
                                        textTransform: "none",
                                        color: "black",
                                        backgroundColor: "#F4C522",
                                        borderRadius: "5rem",
                                        width: 'clamp(10rem, 30vw, 13.25rem)',
                                        height: 'clamp(2rem, 10vh, 3.44rem)',
                                        fontSize: 'clamp(1rem, 3vw, 1.5rem)'
                                    }}
                                        onClick={handleVerifyClick}>Verify</Button>
                                </div>
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                </Grid>
            </Container>
            <div style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
                <Footer />
            </div>
        </div>
    )
}
