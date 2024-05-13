import { Button, Checkbox, Container, Grid, Paper, TableFooter, Typography, useMediaQuery } from '@mui/material';
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
import EmployeeSideBar from '../../../components/EmployeeSidebar/employeeSidebar';

export default function ApproveApplication() {
    const isMobile = useMediaQuery('(max-width: 37.5rem)');
    const [checked, setChecked] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectMultiple, setSelectMultiple] = useState([]);
    const [applications, setApplications] = useState([]);
    const [date, setDate] = useState();
    const navigate = useNavigate();
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [updateRender, setUpdateRender] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/applicants/all");
                const filteredApplicants = response.data.filter(applicant => applicant.verified === true && applicant.paid === true && applicant.approved === false);
                setApplications(filteredApplicants);
                if (filteredApplicants.length > 0) {
                    setChecked(false);
                }
                // Set date state (assuming response.data contains a datesubmitted property)
                if (filteredApplicants.length > 0) {
                    setDate(filteredApplicants[0].datesubmitted);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [updateRender]);

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
        setSelectMultiple(newArray.filter(row => row.isChecked));
    };

    const handleVerifyClick = async () => {
        console.log('handleVerifyClick called');
        try {
            const promises = selectMultiple.map(async (user) => {
                const response = await axios.put(`http://localhost:8080/applicants/approveApplicant/${user.email}`);
                setMessage("Approval status updated successfully");
                if (response.data) {
                    const resApproved = await axios.post("http://localhost:8080/vehicles/register"
                        , {
                            username: applications.email,
                            vehicleMake: applications.vehicleMake,
                            plateNo: applications.plateNo,
                            color: applications.color,
                            isFourWheel: applications.isFourWheel
                        }
                    );
                }
                setTimeout(() => {
                    setMessage("");
                    setUpdateRender(!updateRender);
                }, 2000);

                return response.data; // Return data for each request if needed
            });

            const results = await Promise.all(promises);
            console.log('All verification requests completed:', results);
            // navigate('/verifypay');
        } catch (error) {
            console.error('Error updating verification status:', error);
        }
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
            <EmployeeSideBar />
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
                            <TableContainer component={Paper} sx={{ backgroundColor: '#D9D9D9', borderRadius: '0.5rem', height: 'clamp(20rem, 50vh, 30rem)', width: 'clamp(20rem, 70vw, 70rem)', position: 'relative' }}>
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
                                                        cursor: !checked ? 'pointer' : 'default'
                                                    }}
                                                    onClick={!checked ? () => handleRowClick(row.email) : undefined}
                                                // {!checked && (
                                                //     onClick={() => handleRowClick(row.email)}
                                                // )}
                                                >
                                                    {checked && (<TableCell align="center">
                                                        <Checkbox
                                                            checked={row.isChecked || false} // Initialize with a default value of false
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
                                {checked && (
                                    <div style={{ position: 'absolute', bottom: 0, left: '40%', }}>
                                        <TableFooter>
                                            <div style={{ color: 'red', textAlign: 'center', position: 'relative', top: '1rem' }}>
                                                {(message)}
                                            </div>
                                            <TableRow>

                                                <TableCell colSpan={4} align="center" >
                                                    <Button sx={{ textTransform: "none", color: "black", backgroundColor: "#F4C522", borderRadius: "5rem", width: 'clamp(10rem, 30vw, 10rem)', height: 'clamp(2rem, 10vh, 2.5rem)', fontSize: 'clamp(1rem, 3vw, 1.125rem)' }} onClick={handleVerifyClick}>Approve</Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableFooter>
                                    </div>
                                )}

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
