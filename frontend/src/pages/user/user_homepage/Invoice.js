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
import ProofMod from './ProofMod';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import axios from "axios";

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


export default function Invoice({ open, handleClose }) {
    // const [open, setOpen] = React.useState(false); // Start with modal closed
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    // React.useEffect(() => {
    //     handleOpen(); // Open the modal when the component mounts
    // }, []);
    const token = localStorage.getItem("token");
    const [applications, setApplications] = useState({});
    const [date, setDate] = useState();
    const decondedToken = jwtDecode(token);
    const email = decondedToken.sub;
    const [prices, setPrices] = useState();
    const [description, setDescription] = useState('');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${months[date.getMonth()]}, ${date.getFullYear()}`;
        return formattedDate;
      };

      const formattedDate = formatDate(date);

      const oneWeekFromNow = new Date();
oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
const formattedOneWeekFromNow = formatDate(oneWeekFromNow);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
            "http://localhost:8080/applicants/get-by-email/" + email
            );
            if (response.data) {
              console.log('asdasdasd',response.data);
              setApplications(response.data);
              setDate(response.data.datesubmitted);
            }
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, []);

    useEffect(() => {
        const fetchData = async () => {
            
            try {
                const response = await axios.get('http://localhost:8080/prices/get-prices');
                console.log('Prices',response.data);
                if(applications.isStaff && applications.vehicleType && applications.isParking){
                    setPrices(response.data.staffFourWheelParking)
                    setDescription("4-Wheel Parking Sticker")
                } else if(applications.isStaff && applications.vehicleType && applications.isParking === false){
                    setPrices(response.data.staffFourWheelPickup)
                    setDescription("4-Wheel Pickup Sticker")
                } else if(applications.isStaff && applications.vehicleType === false && applications.isParking){
                    setPrices(response.data.staffTwoWheelParking)
                    setDescription("2-Wheel Parking Sticker")
                } else if(applications.isStaff && applications.vehicleType === false && applications.isParking===false){
                    setPrices(response.data.staffTwoWheelPickup)
                    setDescription("2-Wheel Pickup Sticker")
                }
                
                else if(applications.isStaff === false && applications.vehicleType && applications.isParking){
                    setPrices(response.data.studentFourWheelParking)
                    setDescription("4-Wheel Parking Sticker")
                } else if(applications.isStaff === false && applications.vehicleType && applications.isParking === false){
                    setPrices(response.data.studentFourWheelPickup)
                    setDescription("4-Wheel Pickup Sticker")
                } else if(applications.isStaff ===false && applications.vehicleType === false && applications.isParking){
                    setPrices(response.data.studentTwoWheelParking)
                    setDescription("2-Wheel Parking Sticker")
                } else if(applications.isStaff === false && applications.vehicleType === false && applications.isParking===false){
                    setPrices(response.data.studentTwoWheelPickup)
                    setDescription("2-Wheel Pickup Sticker")
                }
                
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        
        
        fetchData();
      }, [applications]); // Empty dependency array means this effect will only run once
    

    return (
        <div>

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
                                    {formattedDate}
                                </Typography>
                            </div>
                            &nbsp;
                            <div style={{ paddingLeft: "2rem", paddingRight: "2rem", width: "7rem" }}>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ textAlign: "left", fontSize: "1.125rem", fontWeight: "bold" }}>
                                    Due
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ textAlign: "left", fontSize: "1rem" }}>
                                    {formattedOneWeekFromNow}
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
                                            <TableCell align="center" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem', fontSize: "1rem" }}>{applications.isFourWheel ? "4-Wheel Sticker" : "2-Wheel Sticker"}</TableCell>
                                            <TableCell align="center" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem', fontSize: "1rem" }}>{prices}</TableCell>
                                            <TableCell align="center" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem', fontSize: "1rem" }}>1</TableCell>
                                            <TableCell align="center" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem', fontSize: "1rem" }}>{prices}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        {/* <div >
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
                        </div> */}
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
                                            <TableCell align="right" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem', fontSize: "1rem" }}>{prices}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center",}}>
                            <Button sx={{  bottom: '-2rem', padding: '.2rem 2rem .2rem 2rem', borderRadius: '5rem', backgroundColor: '#F4C522', color: 'black', fontWeight: 'bold', textTransform: 'none', fontSize: '1.125rem', '&:hover': { backgroundColor: '#8A252C' }, '&:br': { padding: '50rem' } }}>Submit Proof of <br/>Payment</Button>
                        
                        </div> */}
                        <div style={{ position: 'absolute', bottom: '5rem', left: '0', right: '0', display: "flex", justifyContent: "center", alignItems: "center",}}><ProofMod/></div>

                    </Box>

                </Modal>
            </Container>
        </div>
    );
}
