import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import background from '../assets/background.jpg';
import backButton from '../assets/backButton.jpg';
import AdminHeader from '../components/AdminHeader/AdminHeader';
import AdminSidebar from '../components/AdminSidebar/AdminSidebar';
import UserSidebar from '../components/User_SideBar/UserSideBar';
import sample from '../assets/sample.jpg';

function createData(appName, appType, dateApp) {
    return { appName, appType, dateApp };
}

const exampleData = [
    { name: 'John Doe', type: 'Individual', date: 'December 12, 2012' },
    { name: 'Jane Smith', type: 'Organization', date: 'June 21, 2021' },
    { name: 'Alice Johnson', type: 'Individual', date: 'August 19, 2024' }
];

const rows = exampleData.map(({ name, type, date }) =>
    createData(name, type, date)
);

console.log(rows);

export default function ProofPayment() {
    return (
        <div className='verifyPay' style={{
            backgroundImage: `url(${background})`,
            backgroundSize: '100% 100%',
            minHeight: '100vh',
            fontSize: '16px', // Set base font size
        }}>
            <AdminHeader />
            <UserSidebar />
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
                                        <img src={backButton} alt="Logo" style={{ width: "3rem", height: "3rem",  }} />
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
                                                <h3>Application Name:</h3>&nbsp;<p style={{ textAlign: "left" }}>John E. Doe</p>
                                            </div>
                                        </Typography>
                                        <Typography component="div" sx={{ marginLeft:  'clamp(2rem, 10%, 20rem)' }}>
                                            <div style={{ display: "flex", alignItems: "center", margin: "-1rem" }}>
                                                <h3 style={{ textAlign: "left" }}>User Type:</h3>&nbsp;<p>Student</p>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", margin: "-1rem" }}>
                                                <h3 style={{ textAlign: "left" }}>Affiliated ID Number:</h3>&nbsp;<p style={{ textAlign: "left" }}>20-3464-185</p>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", margin: "-1rem" }}>
                                                <h3 style={{ textAlign: "left" }}>Address:</h3>&nbsp;<p style={{ textAlign: "left" }}>Purok Dos, Barangay San Juan, California, 6000</p>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", margin: "-1rem" }}>
                                                <h3 style={{ textAlign: "left" }}>Contact Number:</h3>&nbsp;<p style={{ textAlign: "left" }}>09171234567</p>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", margin: "-1rem" }}>
                                                <h3 style={{ textAlign: "left" }}>Proof of Payment:</h3>&nbsp;<Button sx={{ textTransform: "none", color: "#8A252C" }}>Click to View Image</Button>
                                            </div>
                                        </Typography>
                                    </div>

                                </Paper>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem", padding: "1rem" }}>
                                <div>
                                    <Button sx={{ textTransform: "none", color: "white", backgroundColor: "#8A252C", borderRadius: "5rem", width: 'clamp(10rem, 30vw, 13.25rem)', height: 'clamp(2rem, 10vh, 3.44rem)', fontSize: 'clamp(1rem, 3vw, 1.5rem)' }}>Reject</Button>
                                </div>
                                &nbsp;
                                <div>
                                    <Button sx={{ textTransform: "none", color: "black", backgroundColor: "#F4C522", borderRadius: "5rem", width: 'clamp(10rem, 30vw, 13.25rem)', height: 'clamp(2rem, 10vh, 3.44rem)', fontSize: 'clamp(1rem, 3vw, 1.5rem)' }}>Verify</Button>
                                </div>
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
