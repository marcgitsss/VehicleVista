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

function createData(appName, appType, dateApp, isChecked = false) {
    return { appName, appType, dateApp, isChecked };
}

function createDataNew(appNameNew, appTypeNew, dateAppNew, isCheckedNew = false) {
    return { appNameNew, appTypeNew, dateAppNew, isCheckedNew };
}

const exampleData = [
    { name: 'John Doe', type: 'Individual', date: 'December 12, 2012' },
    { name: 'Jane Smith', type: 'Organization', date: 'June 21, 2021' },
    { name: 'Alice Johnson', type: 'Individual', date: 'August 19, 2024' }
];

const exampleDataNew = [
    { name: 'Ludivico Balatero', type: 'student', date: 'December 12, 2012' },
    { name: 'Jessrey Garrido', type: 'teacher', date: 'June 21, 2021' },
    { name: 'Marc Gomolon', type: 'staff', date: 'August 19, 2024' }
];

const rows = exampleData.map(({ name, type, date }) =>
    createData(name, type, date)
);

const rowsNew = exampleDataNew.map(({ name, type, date }) =>
    createDataNew(name, type, date)
);

export default function ApproveApplication() {
    const isMobile = useMediaQuery('(max-width: 37.5rem)');
    const [checked, setChecked] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
        setSelectedRows([]);
    };

    const handleCheckboxRow = (event, name, isNew) => {
        event.stopPropagation(); // Stop propagation to prevent row click
        const rowIndex = isNew ? rowsNew.findIndex(row => row.appNameNew === name) : rows.findIndex(row => row.appName === name);
        const newArray = isNew ? [...rowsNew] : [...rows];
        newArray[rowIndex].isChecked = !newArray[rowIndex].isChecked;
        if (isNew) {
            newArray[rowIndex].isCheckedNew = !newArray[rowIndex].isCheckedNew; // Toggle isCheckedNew
        }
        setSelectedRows(newArray.filter(row => row.isChecked || row.isCheckedNew).map(row => row.appName || row.appNameNew));
        console.log("Selected rows:", newArray.filter(row => row.isChecked || row.isCheckedNew));
    };

    const isSelected = (name) => selectedRows.indexOf(name) !== -1;

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
                                        <Typography  style={{ fontWeight: 'bold', fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: 'white' }}>New Registrations</Typography>
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
                                            {rows.map((row) => (
                                                <TableRow
                                                    key={row.appName}
                                                    sx={{ backgroundColor: isSelected(row.appName) ? '#EBEBEB' : 'transparent' }}
                                                >
                                                    {checked && (<TableCell align="center">
                                                        <Checkbox
                                                            checked={row.isChecked}
                                                            onChange={(event) => handleCheckboxRow(event, row.appName)}
                                                            onClick={(event) => event.stopPropagation()} // Stop propagation on checkbox click
                                                        />
                                                    </TableCell>

                                                    )}
                                                    <TableCell align="center">{row.appName}</TableCell>
                                                    <TableCell align="center">{row.appType}</TableCell>
                                                    <TableCell align="center">{row.dateApp}</TableCell>
                                                </TableRow>
                                            ))}
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
