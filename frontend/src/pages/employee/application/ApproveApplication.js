import { Checkbox, Container, Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import Header from '../../../components/Navbar/UserHeader';
import Footer from '../../../components/Navbar/UserFooter';
import HP_background from '../../../assets/HP_Background.jpg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from "axios";


export default function ApproveApplication() {
    const isMobile = useMediaQuery('(max-width: 37.5rem)');
    const [checked, setChecked] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [applications, setApplications] = useState([]);
    const [date, setDate] = useState();
    const navigate = useNavigate();
    const [selectedEmail, setSelectedEmail] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/applicants/all");
                const filteredApplicants = response.data.filter(applicant => applicant.verified === true && applicant.paid === true && applicant.approved === false);
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

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
        setSelectedRows([]);
    };


    const handleCheckboxRow = (event, firstName) => {
        event.stopPropagation(); // Stop propagation to prevent row click
        const rowIndex = applications.findIndex(applicant => applicant.firstName === firstName);
        const newArray = [...applications];
        newArray[rowIndex].isChecked = !newArray[rowIndex].isChecked;
        setSelectedRows(newArray.filter(row => row.isChecked).map(row => row.firstName));
        console.log("Selected rows:", newArray.filter(row => row.isChecked));
    };
    

    const isSelected = (name) => selectedRows.indexOf(name) !== -1;

    const handleRowClick = (email) => {
        // Update state or props to store the selected email
        setSelectedEmail(email);

        // Navigate to 'selectorcr' page
        navigate('/appchoice', { state: { email } });
    };

    return (
        <div className='verifyPay' style={{
            backgroundImage: `url(${HP_background})`,
            backgroundSize: '100% 100%',
            minHeight: '100vh',
        }}>
            <Header />
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <br />
                        <Typography align="center" sx={{ fontWeight: 'bold', fontSize: isMobile ? 'clamp(1.5rem, 5vw, 2rem)' : '2rem' }}>Approve Application</Typography>
                    </Grid>
                    <Grid item xs={2} > </Grid>
                    <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ margin: '1rem 0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                    <Paper sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem', padding: 'clamp(0.125rem, 1vw, 0.5rem)', backgroundColor: '#8A252C', borderRadius: '0.5rem 0 0 0', }}>
                                        <Typography style={{ fontWeight: 'bold', fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: 'white' }}>New Registrations</Typography>
                                    </Paper>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Typography style={{ fontWeight: 'bold', fontSize: 'clamp(1rem, 2vw, 1.125rem)', display: 'flex', alignItems: 'center' }}>
                                        <Checkbox checked={checked} onChange={handleCheckboxChange} />
                                        Select Multiple
                                    </Typography>
                                </div>
                            </div>
                            <TableContainer component={Paper} sx={{ backgroundColor: '#D9D9D9', borderRadius: '0.5rem', height: 'clamp(20rem, 50vh, 30rem)', width: 'clamp(20rem, 70vw, 70rem)' }}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            {checked && (
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Select</TableCell>
                                            )}
                                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Applicant Type</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Date of Application</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {applications.map((row) => {
                                            const submittedDate = new Date(row.datesubmitted);
                                            const month = submittedDate.toLocaleString('default', { month: 'long' });
                                            const day = submittedDate.getDate();
                                            const year = submittedDate.getFullYear();
                                            const formattedDate = `${month} ${day}, ${year}`;

                                            return (
                                                <TableRow
                                                    key={row.applicantid}
                                                    sx={{
                                                        backgroundColor: isSelected(row.email) ? '#EBEBEB' : 'transparent',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => handleRowClick(row.email)}
                                                >
                                                    {checked && (<TableCell align="center">
                                                        <Checkbox
                                                            checked={row.isChecked}
                                                            onChange={(event) => handleCheckboxRow(event, row.firstName)}
                                                            onClick={(event) => event.stopPropagation()} // Stop propagation on checkbox click
                                                        />
                                                    </TableCell>

                                                    )}
                                                    <TableCell align="center">{row.firstName} {row.lastName}</TableCell>
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
