import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from "axios";
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
    const [applications, setApplications] = React.useState({});
    const email = "ludivicombalaterojr@gmail.com";
    const [date, setDate] = React.useState();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    React.useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              "http://localhost:8080/applicants/" + email
            );
            if (response.data) {
              console.log('Invoice',response.data);
              setApplications(response.data);
              setDate(response.data.datesubmitted);
    
    
            }
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, []);

      const dateObject = new Date(date);
      const oneWeekLater = new Date(dateObject.getTime() + 7 * 24 * 60 * 60 * 1000);
      const formattedDate = `${dateObject.getDate().toString().padStart(2, '0')} ${months[dateObject.getMonth()]}, ${dateObject.getFullYear()}`;
      const formattedOneWeekLater = `${oneWeekLater.getDate().toString().padStart(2, '0')} ${months[oneWeekLater.getMonth()]}, ${oneWeekLater.getFullYear()}`;


    React.useEffect(() => {
        handleOpen(); // Open the modal when the component mounts
    }, []);

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
                        <div style={{ marginTop: "1rem" }}>
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
                                    {formattedOneWeekLater}
                                </Typography>
                            </div>

                        </div>
                        <div>
                            <TableContainer  >
                                <Table sx={{ width: '100%' }} aria-label="caption table" style={{ borderCollapse: 'separate', borderSpacing: '0 1em', marginTop: "2.5rem" }}>
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
                                            <TableCell align="center" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem', fontSize: "1rem" }}> {applications.isFourWheel ? "4-wheel sticker" : "2-wheel sticker"}</TableCell>
                                            <TableCell align="center" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem', fontSize: "1rem" }}>{applications.isFourWheel ? (applications.isParking ? "php 2000.00" : "php 400.00") : (applications.isParking ? "php 750.00" : "php 200.00")}</TableCell>
                                            <TableCell align="center" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem', fontSize: "1rem" }}>1</TableCell>
                                            <TableCell align="center" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem', fontSize: "1rem" }}>{applications.isFourWheel ? (applications.isParking ? "php 2000.00" : "php 400.00") : (applications.isParking ? "php 750.00" : "php 200.00")}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <div >
                            <TableContainer style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "2.5rem" }}>
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
                                            <TableCell align="right" sx={{ borderBottom: 'none', padding: '0rem', paddingTop: '0rem', fontSize: "1rem" }}>{applications.isFourWheel ? (applications.isParking ? "php 2000.00" : "php 400.00") : (applications.isParking ? "php 750.00" : "php 200.00")}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2.5rem" }}>
                            <Button sx={{  bottom: '-2rem', padding: '.2rem 2rem .2rem 2rem', borderRadius: '5rem', backgroundColor: '#F4C522', color: 'black', fontWeight: 'bold', textTransform: 'none', fontSize: '1.125rem', '&:hover': { backgroundColor: '#F4C522' }, '&:br': { padding: '50rem' } }}>Submit Proof of <br/>Payment</Button>
                        
                        </div>

                        </div>
                    </Box>

                </Modal>
            </Container>
        </div>
    );
}
