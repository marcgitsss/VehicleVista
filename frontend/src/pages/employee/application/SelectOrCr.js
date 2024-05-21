import { Button, Container, Grid, Paper, Typography, Modal, Box } from '@mui/material';
import backButton from '../../../assets/backButton.jpg';
import Header from '../../../components/Navbar/EmployeeHeader';
import Footer from '../../../components/Navbar/UserFooter';
import HP_background from '../../../assets/HP_Background.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
import EmployeeSideBar from '../../../components/Navbar/EmployeeSidebar/employeeSidebar';
import RejectModal from '../../../components/Modal/rejectModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SelectOrCr() {
  const location = useLocation();
  const email = location.state?.email;
  const [applications, setApplications] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orcrPhotoUrl, setOrcrPhotoUrl] = useState('');
  const [licensePhotoUrl, setLicensePhotoUrl] = useState('');
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenPhotoModal = (photoUrl) => {
    setCurrentPhotoUrl(photoUrl);
    setIsPhotoModalOpen(true);
  };

  const handleClosePhotoModal = () => {
    setIsPhotoModalOpen(false);
  };

  const handleVerifyClick = async () => {
    console.log('handleVerifyClick called');
    try {
      const response = await axios.put(
        `http://localhost:8080/applicants/updateVerifiedStatus/${email}`);
      setMessage("Verification status updated successfully");
      setTimeout(() => {
        navigate('/orcr');
      }, 2000);
    } catch (error) {
      console.error('Error updating verification status:', error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage('');
    }, 3000);
    return () => clearTimeout(timeout);
  }, [message]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/applicants/get-by-email/" + email
        );
        if (response.data) {
          console.log(response.data);
          setApplications(response.data);
          console.log('handleVerifyClick called', applications.verified);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [email]);

  const fetchPhoto = async (photoType) => {
    try {
    // const [footer, setFooter] = useState('')

      const response = await axios.get(
        `http://localhost:8080/photos/get-photo-by-name/${email}:${photoType}`,
        { responseType: 'arraybuffer' }
      );
      if (response.data) {
        const blob = new Blob([response.data], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        return url;
      }
    } catch (error) {
      console.error('Error fetching photo:', error);
      return null;
    }
  };

  const handleViewOrcrClick = async () => {
    const url = await fetchPhoto('orcr');
    if (url) {
      setOrcrPhotoUrl(url);
      handleOpenPhotoModal(url);
    }
  };

  const handleViewLicenseClick = async () => {
    const url = await fetchPhoto('license');
    if (url) {
      setLicensePhotoUrl(url);
      handleOpenPhotoModal(url);
    }
  };

  return (
    <>
      <Header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }} />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <EmployeeSideBar style={{ position: 'fixed', top: '4rem', left: 0, bottom: 0, zIndex: 500 }} />
        <div className='verifyPay' style={{
          flex: 1,
          paddingTop: '5rem',
          paddingLeft: '15rem',
          paddingBottom: '10rem',
          backgroundImage: `url(${HP_background})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}>
          <EmployeeSideBar style={{ position: 'fixed', top: '4rem', left: 0, bottom: 0, zIndex: 0 }} />
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <br />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <div>
                  <Grid item xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Grid item xs={1} sx={{ display: "flex", justifyContent: "right", alignItems: "center" }}></Grid>
                    <Grid item xs={10}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Link to="/orcr" style={{ textDecoration: "none" }}>
                          <img src={backButton} alt="Logo" style={{ width: "3rem", height: "3rem" }} />
                        </Link>
                        <h1 style={{ textAlign: "center", fontSize: 'clamp(1.5rem, 5vw, 2rem)', flex: 1 }}>Select Application</h1>
                      </div>
                    </Grid>
                    <Grid item xs={1}></Grid>
                  </Grid>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Paper sx={{ width: 'clamp(25rem, 40vw, 100%)', height: 'clamp(20rem, 50vh, 100%)', borderRadius: '5rem 5rem 5rem 5rem', padding: '3rem', backgroundColor: 'rgba(228, 228, 228, 0.5)' }}>
                      <div>
                        <Typography component="div" sx={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}>
                          <div style={{ display: "flex", alignItems: "center", }}>
                            <h3>Application Name:</h3>&nbsp;<p style={{ textAlign: "left" }}>{applications.firstName} {applications.middleInitial}. {applications.lastName}</p>
                          </div>
                        </Typography>
                        <Typography component="div" sx={{ marginLeft: 'clamp(2rem, 10%, 20rem)' }}>
                          <div style={{ display: "flex", alignItems: "center", margin: "-1rem" }}>
                            <h3 style={{ textAlign: "left" }}>User Type:</h3>&nbsp;<p>{applications.isStaff ? 'Staff' : 'Student'}</p>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", margin: "-1rem" }}>
                            <h3 style={{ textAlign: "left" }}>Affiliated ID Number:</h3>&nbsp;<p style={{ textAlign: "left" }}>{applications.idNumber}</p>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", margin: "-1rem" }}>
                            <h3 style={{ textAlign: "left" }}>Address:</h3>&nbsp;<p style={{ textAlign: "left" }}>{applications.address}</p>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", margin: "-1rem" }}>
                            <h3 style={{ textAlign: "left" }}>Contact Number:</h3>&nbsp;<p style={{ textAlign: "left" }}>{applications.contactNumber}</p>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", margin: "-1rem" }}>
                            <h3 style={{ textAlign: "left" }}>License:</h3>&nbsp;
                            <Button
                              onClick={handleViewLicenseClick}
                              sx={{ textTransform: "none", color: "#8A252C" }}
                            >
                              Click to View Image
                            </Button>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", margin: "-1rem" }}>
                            <h3 style={{ textAlign: "left" }}>OR/CR:</h3>&nbsp;
                            <Button
                              onClick={handleViewOrcrClick}
                              sx={{ textTransform: "none", color: "#8A252C" }}
                            >
                              Click to View Image
                            </Button>
                          </div>
                        </Typography>
                      </div>
                      <div style={{ color: 'red', textAlign: 'center', position: 'relative', top: '1rem' }}>
                        {message}
                      </div>
                    </Paper>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem", padding: "1rem" }}>
                    <div>
                      <Button
                        sx={{
                          textTransform: "none",
                          color: "white",
                          backgroundColor: "#8A252C",
                          borderRadius: "5rem",
                          width: 'clamp(10rem, 30vw, 13.25rem)',
                          height: 'clamp(2rem, 10vh, 3.44rem)',
                          fontSize: 'clamp(1rem, 3vw, 1.5rem)'
                        }}
                        onClick={handleOpenModal}
                      >
                        Reject
                      </Button>
                    </div>
                    <RejectModal open={isModalOpen} handleClose={handleCloseModal} email={email} relocate="/orcr" />
                    &nbsp;
                    <div>
                      <Button
                        sx={{
                          textTransform: "none",
                          color: "black",
                          backgroundColor: "#F4C522",
                          borderRadius: "5rem",
                          width: 'clamp(10rem, 30vw, 13.25rem)',
                          height: 'clamp(2rem, 10vh, 3.44rem)',
                          fontSize: 'clamp(1rem, 3vw, 1.5rem)'
                        }}
                        onClick={handleVerifyClick}
                      >
                        Verify
                      </Button>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          </Container>
        </div>
        <Footer style={{ zIndex: 1001 }} />
      </div>
      <Modal
        open={isPhotoModalOpen}
        onClose={handleClosePhotoModal}
        aria-labelledby="photo-modal-title"
        aria-describedby="photo-modal-description"
        >
        <Box sx={{ ...style, width: '100%', height: '100%' }}>
            <Typography id="photo-modal-title" variant="h6" component="h2">
            Photo
            </Typography>
            {currentPhotoUrl && (
            <img src={currentPhotoUrl} alt="Fetched Photo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            )}
        </Box>
        </Modal>
    </>
  );
}
