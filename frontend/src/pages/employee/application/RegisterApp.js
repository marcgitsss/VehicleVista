import { Button, Container, Grid, Paper, Typography, useMediaQuery } from '@mui/material';
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

function createData(date, appType, verify, payment, approval, status) {
    return { date, appType, verify, payment, approval, status };
}

const exampleData = [
    { date: '05/01/24', appType: 'Student', verify: 'Verified', payment: 'Pending', approval: 'Pending', status: 'Pending' },
    { date: '06/22/24', appType: 'Faculty', verify: 'Verified', payment: 'Paid', approval: 'Approved', status: 'Success' },
    { date: '02/21/24', appType: 'Faculty', verify: 'Verified', payment: 'Paid', approval: 'Approved', status: 'Success' },
];

const sortedData = exampleData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
});

const rows = sortedData.map(({ date, appType, verify, payment, approval, status }) =>
    createData(date, appType, verify, payment, approval, status)
);


export default function RegisterApp() {
    const isMobile = useMediaQuery('(max-width: 37.5rem)');
    const [open, setOpen] = useState(false);

    const handleFalseOption = () => {
        setOpen(false);
    };

    const handleTrueOption = () => {
        setOpen(true);
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
                        <Typography align="center" sx={{ fontWeight: 'bold', fontSize: isMobile ? 'clamp(1.5rem, 5vw, 2rem)' : '2rem' }}>Registration/Renewal</Typography>
                    </Grid>
                    <Grid item xs={2} > </Grid>
                    <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ margin: '1rem 0' }}>
                            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3rem', width: 'clamp(12rem, 1vw, 0.5rem)', padding: 'clamp(0.125rem, 1vw, 0.5rem)', backgroundColor: '#8A252C', borderRadius: '0.5rem 0 0 0', }}>
                                    <Typography onClick={() => handleFalseOption()} style={{ fontWeight: 'bold', fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: 'white', cursor: 'pointer' }}>New Registrations</Typography>
                                </Paper>

                            </div>
                            {open === false && (
                                <TableContainer component={Paper} sx={{ position: 'relative', backgroundColor: '#D9D9D9', borderRadius: '0.5rem', height: 'clamp(20rem, 50vh, 30rem)', width: 'clamp(20rem, 70vw, 70rem)' }}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Date of Application</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Applicant Type</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Verification</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Payment</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Approval</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 'bold', paddingLeft: '7rem', paddingRight: '7rem' }}>Status</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.name} sx={{ backgroundColor: '#EBEBEB' }}>
                                                    <TableCell align="center">{row.date}</TableCell>
                                                    <TableCell align="center">{row.appType}</TableCell>
                                                    <TableCell align="center">{row.verify}</TableCell>
                                                    <TableCell align="center">{row.payment}</TableCell>
                                                    <TableCell align="center">{row.approval}</TableCell>
                                                    <TableCell align="center">{row.status}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <Button sx={{ position: 'absolute', bottom: '1rem', right: '1rem', backgroundColor: '#8A252C', color: 'white', '&:hover': { backgroundColor: '#8A252C' } }}>Proceed to Payment</Button>                                </TableContainer>
                            )}
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
