import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'clamp(20rem, 90%, 60rem)',
    height: 'clamp(15rem, 90%, 40rem)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '0.5rem',
    outline: 'none',
    p: 4,
};


export default function Invoice() {
    const [open, setOpen] = React.useState(false); // Start with modal closed
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useEffect(() => {
        handleOpen(); // Open the modal when the component mounts
    }, []);

    return (
        <div>

            <Button onClick={handleOpen}>Open modal</Button>
            <Container maxWidth="lg">
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: "left", fontSize: "2rem", fontWeight: "bold" }}>
                            Invoice
                        </Typography>
                        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", }}>
                            <div style={{ paddingLeft: "2rem", paddingRight: "2rem", width: "7rem" }}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ fontSize: "1.125rem", fontWeight: "bold" }}>
                                    Issued
                                </Typography>

                                <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ fontSize: "1rem" }}>
                                    01 Jan, 2022
                                </Typography>
                            </div>
                            &nbsp;
                            <div style={{ paddingLeft: "2rem", paddingRight: "2rem", width: "7rem" }}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ textAlign: "left", fontSize: "1.125rem", fontWeight: "bold" }}>
                                    Due
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ textAlign: "left", fontSize: "1rem" }}>
                                    07 Jan, 2022
                                </Typography>
                            </div>

                        </div>
                        <div>
                            <TableContainer  >
                                <Table sx={{ width: '100%' }} aria-label="caption table" style={{ borderCollapse: 'separate', borderSpacing: '0 1em', }}>
                                    <TableHead>
                                        <TableRow >
                                            <TableCell align="center" sx={{ borderBottom: '.15rem solid black', width: '12rem', fontSize: "1.125rem", fontWeight: 'bold' }}>Item</TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '.15rem solid black', width: '12rem', fontSize: "1.125rem", fontWeight: 'bold' }}>Cost</TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '.15rem solid black', width: '12rem', fontSize: "1.125rem", fontWeight: 'bold' }}>Qty</TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '.15rem solid black', width: '12rem', fontSize: "1.125rem", fontWeight: 'bold' }}>Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody >
                                        <TableRow   >
                                            <TableCell align="center" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem', fontSize: "1rem" }}>2-wheel sticker</TableCell>
                                            <TableCell align="center" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem', fontSize: "1rem" }}>php 400.00</TableCell>
                                            <TableCell align="center" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem', fontSize: "1rem" }}>1</TableCell>
                                            <TableCell align="center" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem', fontSize: "1rem" }}>php 400.00</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <div >
                            <TableContainer style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", }}>
                                <Table sx={{ width: 350 }} aria-label="caption table" style={{ borderCollapse: 'separate', borderSpacing: '0 1em', }}>
                                    <TableHead >
                                        <TableRow >
                                            <TableCell align="center" sx={{ borderBottom: '.15rem solid black' }}></TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '.15rem solid black' }}></TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '.15rem solid black' }}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody >
                                        <TableRow >
                                            <TableCell align="left" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem', fontWeight: 'bold', fontSize: "1.125rem" }}>Subtotal</TableCell>
                                            <TableCell align="center" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem' }}></TableCell>
                                            <TableCell align="right" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem', fontSize: "1rem" }}>php 400.00</TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell align="left" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem', fontWeight: 'bold', fontSize: "1.125rem" }}>Discount (20%)</TableCell>
                                            <TableCell align="center" sx={{ borderBottom: 'none', }}></TableCell>
                                            <TableCell align="right" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem', fontSize: "1rem" }}>0</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <div >
                            <TableContainer style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", }}>
                                <Table sx={{ width: 350 }} aria-label="caption table" style={{ borderCollapse: 'separate', borderSpacing: '0 1em', }}>
                                    <TableHead >
                                        <TableRow >
                                            <TableCell align="center" sx={{ borderBottom: '.15rem solid black' }}></TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '.15rem solid black' }}></TableCell>
                                            <TableCell align="center" sx={{ borderBottom: '.15rem solid black' }}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody >
                                        <TableRow >
                                            <TableCell align="left" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem', fontWeight: 'bold', fontSize: "1.125rem" }}>Total</TableCell>
                                            <TableCell align="center" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem' }}></TableCell>
                                            <TableCell align="right" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem', fontSize: "1rem" }}>php 400.00</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center",}}>
                            <Button sx={{  bottom: '-2rem', padding: '.2rem 2rem .2rem 2rem', borderRadius: '5rem', backgroundColor: '#F4C522', color: 'black', fontWeight: 'bold', textTransform: 'none', fontSize: '1.125rem', '&:hover': { backgroundColor: '#8A252C' }, '&:br': { padding: '50rem' } }}>Submit Proof of <br/>Payment</Button>
                        
                        </div>

                    </Box>

                </Modal>
            </Container>
        </div>
    );
}
