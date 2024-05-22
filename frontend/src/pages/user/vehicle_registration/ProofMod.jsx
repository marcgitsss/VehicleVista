import * as React from 'react'; // Import React and its hooks
import Box from '@mui/material/Box'; // Import Box component from Material-UI
import Button from '@mui/material/Button'; // Import Button component from Material-UI
import Typography from '@mui/material/Typography'; // Import Typography component from Material-UI
import Modal from '@mui/material/Modal'; // Import Modal component from Material-UI
import { jwtDecode } from 'jwt-decode' 
import axios from 'axios';

const style = { // Define the style for the modal
    position: 'absolute', // Set the position to absolute
    top: '50%', // Align the top to the middle
    left: '50%', // Align the left to the middle
    transform: 'translate(-50%, -50%)', // Center the modal horizontally and vertically
    width: 'clamp(20rem, 90%, 50rem)', // Set the width with a clamp function
    height: 'clamp(15rem, 90%, 30rem)', // Set the height with a clamp function
    bgcolor: 'background.paper', // Set the background color
    boxShadow: 0, // Remove the box shadow
    p: '2rem', // Set padding to 2rem
};

export default function ProofMod() { // Define the ProofMod functional component
    const [open, setOpen] = React.useState(false); // Initialize the state for the modal open status
    const handleOpen = () => setOpen(true); // Define a function to open the modal
    const handleClose = () => setOpen(false); // Define a function to close the modal
    const [name, setName] = React.useState(null); // Initialize the state for the ORCR name

    const [orcr, setOrcr] = React.useState(); // Initialize the state for the modal

    const handleUploadClick = () => { // Define a function to trigger file input click
        document.getElementById('fileInput').click(); // Programmatically click the file input element
    };

    const handleFileChange = (event) => { // Define a function to handle file input change
        console.log(event.target.files[0]); // Log the selected file
        setOrcr(event.target.files[0]);
    };

    const handleSubmitClick = () => { // Define a function to handle the submit button click
        console.log(orcr); // Log the selected file

        // const token = localStorage.getItem('token'); //@TODO: PLEASE ALILI THE BELOW TOKEN TO THIS FUNCTION IF NAA NAY LOGIN
        const token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJqZXNzcmV5Z2FycmlkbzIyQGdtYWlsLmNvbSIsImlhdCI6MTcxNDU3OTU5NywiZXhwIjoxNzE0NjY1OTk3fQ.-eULwUZPOrCw7jgj6q-0yDlEnaWCFxoRhAcZ_TtFQJ-qOlNUsQMlFOdEB0H0xN7Z"
        const decodedToken = jwtDecode(token); // decode your token here
        const user = decodedToken.sub;
        setName(`${user}:proof_of_payment`);

        const config2 = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };

        console.log(name);

        const formData = new FormData();
            formData.append('image', orcr); // Assuming imageFile is a File object from an input type="file" element
            formData.append('name', name);
            formData.append('email',user);
        axios.post(`http://localhost:8080/photo/gdrive-upload`, formData, config2)
            .then(res => {
                console.log(res.json());
            })
            .catch(err => {
                console.log(err);
            });
    };

    return ( // Return the JSX for the component
        <div>
            <Button onClick={handleOpen}>Open modal</Button> {/* Button to open the modal */}
            <Modal // Modal component
                open={open} // Modal open status
                onClose={handleClose} // Function to close the modal
                aria-labelledby="modal-modal-title" // ARIA label for modal title
                aria-describedby="modal-modal-description" // ARIA label for modal description
            >
                <Box sx={style}> {/* Box component with custom style for modal */}
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold" }}>
                        Submit Proof of Payment {/* Modal title */}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: '2rem' }}> {/* Modal description */}
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}> {/* Center content */}
                            <div style={{ marginBottom: "1.875rem", marginTop: "11.25rem" }}> {/* Margin for file input */}
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <Button
                                    onClick={handleUploadClick}
                                    style={{ backgroundColor: '#D9D9D9', borderRadius: '1.25rem', color: 'black', fontWeight: 'bold', width: 'clamp(12rem, 90%, 19.1rem)', height: '3.7rem', fontSize: '2rem', textTransform: 'none' }}
                                >
                                    Upload
                                </Button> {/* Button to trigger file upload */}
                            </div>
                            <div>
                                <Button
                                    onClick={handleSubmitClick}
                                    style={{ backgroundColor: '#8A252C', borderRadius: '1.25rem', color: 'white', fontWeight: 'bold', width: 'clamp(12rem, 90%, 19.1rem)', height: '3.7rem', fontSize: '2rem', textTransform: 'none' }}>Submit</Button> {/* Button to submit */}
                            </div>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
