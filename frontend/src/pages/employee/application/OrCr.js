import { Container, Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom'; 
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import HP_background from '../../../assets/HP_Background.jpg';
import { useState, useEffect } from 'react';
import Header from '../../../components/Navbar/UserHeader';
import Footer from '../../../components/Navbar/UserFooter';
import EmployeeSideBar from '../../../components/EmployeeSidebar/employeeSidebar';
import axios from "axios";


export default function OrCr() {
    const isMobile = useMediaQuery('(max-width: 37.5rem)');
    const [applications, setApplications] = useState([]);
    const [date, setDate] = useState();
    const navigate = useNavigate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [selectedEmail, setSelectedEmail] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/applicants/all");
                    const filteredApplicants = response.data.filter(applicant => applicant.verified === false);
                    setApplications(filteredApplicants);
            
                    // Set date state (assuming response.data contains a datesubmitted property)
                    if (filteredApplicants.length > 0) {
                        setDate(filteredApplicants[0].datesubmitted);
                    }
                    
                   
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    
    const handleRowClick = (email) => {
        // Update state or props to store the selected email
        setSelectedEmail(email);
    
        // Navigate to 'selectorcr' page
        navigate('/selectorcr', { state: { email } });
    };

    return (
        <div className='verifyPay' style={{
            backgroundImage: `url(${HP_background})`,
            backgroundSize: '100% 100%',
            minHeight: '100vh',
        }}>
            {/* <AdminHeader /> */}
            <Header />
            <EmployeeSideBar />
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <br />
                        <Typography align="center" sx={{ fontWeight: 'bold', fontSize: isMobile ? 'clamp(1.5rem, 5vw, 2rem)' : '2rem' }}>Verify OR/CR and License</Typography>
                    </Grid>
                    <Grid item xs={2} > </Grid>
                    <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ margin: '1rem 0' }}>
                            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                <Paper sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem', padding: 'clamp(0.125rem, 1vw, 0.5rem)', backgroundColor: '#8A252C', borderRadius: '0.5rem 0 0 0', }}>
                                    <Typography style={{ fontWeight: 'bold', fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: 'white' }}>New Registrations</Typography>
                                </Paper>


                            </div>
                            <TableContainer component={Paper} sx={{ backgroundColor: '#D9D9D9', borderRadius: '0.5rem', height: 'clamp(20rem, 50vh, 30rem)', width: 'clamp(20rem, 70vw, 70rem)', position: 'relative' }}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Applicant Type</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Date of Application</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {applications.map((row) => {
                                            // Parse the date string into a Date object
                                            const submittedDate = new Date(row.datesubmitted);

                                            // Get the month, day, and year components
                                            const month = submittedDate.toLocaleString('default', { month: 'long' });
                                            const day = submittedDate.getDate();
                                            const year = submittedDate.getFullYear();

                                            // Construct the formatted date string
                                            const formattedDate = `${month} ${day}, ${year}`;

                                            return (
                                                <TableRow key={row.applicantid} sx={{ backgroundColor: '#EBEBEB', cursor: 'pointer' }} onClick={() => handleRowClick(row.email)}>
                                                    <TableCell align="center">{row.email}</TableCell>
                                                    <TableCell align="center">{row.isStaff ? 'Staff' : 'Student'}</TableCell>
                                                    <TableCell align="center">{formattedDate}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>

                                </Table>
                            </TableContainer>
                        </div>
                    </Grid>
                    <Grid item xs={2} > </Grid>
                </Grid>
            </Container>
            <div style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
                <Footer />
            </div>
        </div>
    )
}
