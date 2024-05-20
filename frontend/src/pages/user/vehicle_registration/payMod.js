//payMod

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Checkbox, Snackbar } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'calc(90vw - 2rem)', 
    maxWidth: '80rem', 
    minHeight: '45rem', 
    bgcolor: 'background.paper',
    borderRadius: '0.5rem',
    boxShadow: 0,
    p: '1rem', 
};

export default function PayMod(props) {
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleSubmit = () => {
        if (checked) {
            const formData = { ...props.registrationData }; // Copy props to formData
            // Use formData as needed
            setOpen(false); // Close the modal upon successful submission
            setSnackbarOpen(true); // Open the snackbar
        } else {
            setSnackbarOpen(true); // Open the snackbar if the checkbox is not checked
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button> 
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{...style, maxWidth: '100%', maxHeight: '100%', overflow: 'auto', m:"5rem"}}>
                    <div style={{ paddingLeft: 'clamp(2rem, 5vw, 5rem)', paddingRight: 'clamp(2rem, 5vw, 5rem)' }}>
                    <Typography  component={'span'}>
                    <br />
                       <div style={{ textAlign: "center", fontSize: "clamp(1rem, 4vw, 1.5rem)", fontWeight: "bold" }}>
                        ASSUMPTION OF LIABILITY, UNDERTAKING & GRANT AUTHORITY TO SEARCH VEHICLE
                        </div>
                        
                    </Typography>
                    <Typography  component={'span'} style={{ textAlign: "justify", fontSize: "clamp(0.8rem, 3vw, 1.125rem)", fontWeight: "bold" }}>
                        <p>
                        <br />
                        By completing this form, you acknowledge that you have read the University Guidelines for Campus Access of Vehicles and affirm that you fully understand and agree
                        to the provisions and stipulations stated therein. You undertake to comply with these guidelines voluntarily and completely.
                        <br /><br />
                        You release the  University from any liability arising from the loss of or damage to your vehicle or items stolen from it, as well as from any losses resulting from
                        weather or other natural causes or conditions.
                        <br /><br />
                        Furthermore, you authorize school authorities to assess the reasonable existence of public risk and to inspect and search your vehicle, including its contents. You
                        also grant permission for the removal of any unauthorized or illegal items that might jeopardize the health, welfare, or safety of students or school personnel.
                        <br /><br />
                        You understand and agree that such articles may be retained and utilized as evidence in  disciplinary proceedings by school authorities, or they may be turned over to
                        appropriate law enforcement officials at the sole discretion of the school authorities.
                        <br /><br />
                        You have fully comprehended the contents of this application and express your consent for CIT-U SSD to collect, record, organize, update/modify, retrieve, consult, consolidate,
                        and use your personal data as part of the evaluation and archiving process of the office. You also acknowledge CIT-U's authority to process your personal information in accordance
                        with the Data Privacy Act and other applicable laws.
                        </p>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: '1rem' }} component={'span'}>
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ marginBottom: "1rem", marginTop: "3rem" }}>
                                <Typography  component={'span'} sx={{ textAlign: "justify", fontSize: "clamp(0.8rem, 3vw, 1rem)", fontWeight: "bold" }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox checked={checked} onChange={handleCheckboxChange} /> I have read and agreed to the terms and conditions of the registration
                                    </div>
                                </Typography>
                            </div>
                            <div>
                                <Button
                                    onClick={handleSubmit}
                                    sx={{ backgroundColor: '#8A252C', borderRadius: '2rem', color: 'white', fontWeight: 'bold', width: 'clamp(8rem, 20vw, 10rem)', height: 'clamp(2.5rem, 10vw, 3rem)', fontSize: 'clamp(1rem, 3vw, 1.5rem)', textTransform: 'none' }}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </Typography>
                    </div>
                </Box>
            </Modal>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message="Please agree to the terms and conditions before submitting"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            />
        </div>
    );
}
