import { Container, Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import Header from '../../../components/Navbar/EmployeeHeader';
import Footer from '../../../components/Navbar/UserFooter';
import HP_background from '../../../assets/HP_Background.jpg';
import { useEffect } from 'react';
import axios from "axios";
import EmployeeSideBar from '../../../components/Navbar/EmployeeSidebar/employeeSidebar';
import { useNavigate } from 'react-router-dom';
import EmployeeProfilePage from './employee_profilepage';

export default function EmployeeProfileFinal() {
    const isMobile = useMediaQuery('(max-width: 37.5rem)');
    const [applications, setApplications] = useState([]);
    const [date, setDate] = useState();
    const [selectedEmail, setSelectedEmail] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/applicants/all");
                const filteredApplicants = response.data.filter(applicant => applicant.verified === true && applicant.paid === false);
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
        navigate('/proofpay', { state: { email } });
    };

    return (
        <>
        <Header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }} />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <EmployeeSideBar style={{ position: 'fixed', top: '4rem', left: 0, bottom: 0, zIndex: 500 }} />
            <div className='verifyPay' style={{
                paddingTop: '5rem', // Padding to create space for the fixed header
                paddingLeft: '10rem', // Padding to create space for the fixed sidebar
                // paddingBottom: '10rem', // Add padding to the bottom to create space for the footer
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

                            </Grid>
                            <Grid item xs={2} > </Grid>
                            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div >
                                   <EmployeeProfilePage   />
                                </div>
                            </Grid>
                            <Grid item xs={2} > </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
            <Footer style={{ zIndex: 1000}} />
        </div>
        </>
    )
}
