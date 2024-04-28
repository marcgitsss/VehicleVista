import { Checkbox, Container, Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AdminHeader from '../components/AdminHeader/AdminHeader';
import UserSidebar from '../components/User_SideBar/UserSideBar';
import background from '../assets/background.jpg';
import { useState } from 'react';
import { CheckBox } from '@mui/icons-material';

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

export default function ApproveApplication() {
    const isMobile = useMediaQuery('(max-width: 37.5rem)');
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
        setSelectedRows([]);
    };

    const handleRowCheckboxChange = (event, name) => {
        const selectedIndex = selectedRows.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedRows, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedRows.slice(1));
        } else if (selectedIndex === selectedRows.length - 1) {
            newSelected = newSelected.concat(selectedRows.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedRows.slice(0, selectedIndex),
                selectedRows.slice(selectedIndex + 1)
            );
        }

        setSelectedRows(newSelected);
    };

    const isSelected = (name) => selectedRows.indexOf(name) !== -1;

    return (
        <div className='verifyPay' style={{
            backgroundImage: `url(${background})`,
            backgroundSize: '100% 100%',
            minHeight: '100vh',
        }}>
            <AdminHeader />
            <UserSidebar />
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <br />
                        <Typography align="center" sx={{ fontWeight: 'bold', fontSize: isMobile ? 'clamp(1.5rem, 5vw, 2rem)' : '2rem' }}>Approve Application</Typography>
                    </Grid>
                    <Grid item xs={2} > </Grid>
                    <Grid item xs={8}  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ margin: '1rem 0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                    <Paper sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem', padding: 'clamp(0.125rem, 1vw, 0.5rem)', backgroundColor: '#8A252C', borderRadius: '0.5rem 0 0 0', }}>
                                        <Typography onClick={() => setOpen(false)} style={{ fontWeight: 'bold', fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: 'white', cursor: 'pointer' }}>New Registrations</Typography>
                                    </Paper>

                                    <Paper sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem', padding: 'clamp(0.125rem, 1vw, 0.5rem)', backgroundColor: '#F4C522', borderRadius: '0 0.5rem 0 0', }}>
                                        <Typography onClick={() => setOpen(true)} style={{ fontWeight: 'bold', fontSize: 'clamp(1rem, 2vw, 1.125rem)', cursor: 'pointer' }}>Renewing Registrations</Typography>
                                    </Paper>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Typography style={{ fontWeight: 'bold', fontSize: 'clamp(1rem, 2vw, 1.125rem)', display: 'flex', alignItems: 'center' }}>
                                        <Checkbox checked={checked} onChange={handleCheckboxChange} />
                                        Select Multiple
                                    </Typography>
                                </div>
                            </div>
                            {open === false && (
                                <TableContainer component={Paper} sx={{ backgroundColor: '#D9D9D9', borderRadius: '0.5rem', height: 'clamp(20rem, 50vh, 30rem)', width: 'clamp(20rem, 70vw, 70rem)' }}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Select</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Applicant Type</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Date of Application</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow
                                                    key={row.name}
                                                    sx={{ backgroundColor: isSelected(row.name) ? '#EBEBEB' : 'transparent' }}
                                                    onClick={(event) => handleRowCheckboxChange(event, row.name)}
                                                >
                                                    <TableCell align="center">
                                                        {checked && (
                                                            <Checkbox checked={isSelected(row.name)} />
                                                        )}
                                                    </TableCell>
                                                    <TableCell align="center">{row.appName}</TableCell>
                                                    <TableCell align="center">{row.appType}</TableCell>
                                                    <TableCell align="center">{row.dateApp}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                            {open === true && (
                                <TableContainer component={Paper} sx={{ backgroundColor: '#D9D9D9', borderRadius: '0.5rem', height: 'clamp(20rem, 50vh, 30rem)', width: 'clamp(20rem, 70vw, 70rem)' }}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Select</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Applicant Type</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Date of Application</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow
                                                    key={row.name}
                                                    sx={{ backgroundColor: isSelected(row.name) ? '#EBEBEB' : 'transparent' }}
                                                    onClick={(event) => handleRowCheckboxChange(event, row.name)}
                                                >
                                                    <TableCell align="center">
                                                        {checked && (
                                                            <Checkbox checked={isSelected(row.name)} />
                                                        )}
                                                    </TableCell>
                                                    <TableCell align="center">{row.appName}</TableCell>
                                                    <TableCell align="center">{row.appType}</TableCell>
                                                    <TableCell align="center">{row.dateApp}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </div>
                    </Grid>
                    <Grid item xs={2} > </Grid>
                </Grid>
            </Container>
        </div>
    )
}
