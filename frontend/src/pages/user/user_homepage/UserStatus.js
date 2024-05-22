import { Button, Container, Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import background from "../../../assets/HP_Background.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../../context/AuthProvider";
import { jwtDecode } from "jwt-decode";
import PaymentInstructionsModal from "./PaymentInstructionsModal";

export default function UserStatus() {
  // const { token } = useUser();
  const token = localStorage.getItem("token");
  const isMobile = useMediaQuery("(max-width: 37.5rem)");
  const [applications, setApplications] = useState([]);
  const [isApplicant, setIsApplicant] = useState(false);
  const [date, setDate] = useState();
  const decondedToken = jwtDecode(token);
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Decoding token
  useEffect(() => {
    const decodeJwt = async () => {
      if (token) {
        try {
          const response = await axios.post('http://localhost:8080/jwt/decode', null, {
            params: { token: token },
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const decoded = response.data.payload;
          setEmail(decoded.sub);
        } catch (error) {
          console.error('Error decoding token:', error);
          localStorage.removeItem('token');
        }
      }
    };

    decodeJwt();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/applicants/get-all-by-email/" + email
        );
        if (response.data) {
          setIsApplicant(true);
          setApplications(response.data);
          setDate(response.data.datesubmitted);
        } else{

        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [email]);

  

  const dateObject = new Date(date);
  const formattedDate = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${dateObject.getFullYear().toString().slice(-2)}`;

  return (
    <div
      className="verifyPay"
      // style={{
      //   backgroundImage: `url(${background})`,
      //   backgroundSize: "100% 100%",
      //   height: "100vh",
      // }}
    >
      <Container maxWidth="lg" >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <br />
            <Typography
              align="center"
              sx={{
                fontWeight: "bold",
                fontSize: isMobile ? "clamp(1.5rem, 5vw, 2rem)" : "2rem",
              }}
            >
              Registration/Renewal
            </Typography>
          </Grid>
          <Grid item xs={2}>
            {" "}
          </Grid>
          <Grid
            item
            xs={8}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ margin: "1rem 0" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                <Paper
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "3rem",
                    width: "clamp(12rem, 1vw, 0.5rem)",
                    padding: "clamp(0.125rem, 1vw, 0.5rem)",
                    backgroundColor: "#8A252C",
                    borderRadius: "0.5rem 0 0 0",
                    zIndex: 0,
                  }}
                >
                  <Typography
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      fontWeight: "bold",
                      fontSize: "clamp(1rem, 2vw, 1.125rem)",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    New Registrations
                  </Typography>
                </Paper>
              </div>
              <TableContainer
                component={Paper}
                sx={{
                  position: "relative",
                  backgroundColor: "#D9D9D9",
                  borderRadius: "0.5rem",
                  height: "clamp(20rem, 50vh, 30rem)",
                  width: "clamp(20rem, 70vw, 70rem)",
                }}
              >
                <Table aria-label="simple table"  >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Date of Application
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Applicant Type
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Verification
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Payment
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: "bold" }}>
                        Approval
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: "bold",
                          paddingLeft: "clamp(.25rem, 5vw, 3rem)",
                          paddingRight: "clamp(.25rem, 5vw, 3rem)",
                        }}
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {applications
                      .filter((application) => !application.rejected)
                      .map((application) => (
                        <TableRow key={application.id}>
                          <TableCell align="center">
                            {new Date(application.datesubmitted).toLocaleDateString("en-US", {
                              month: "long",
                              day: "2-digit",
                              year: "numeric",
                            })}
                          </TableCell>
                          <TableCell align="center">{application.isStaff ? 'Staff' : 'Student'}</TableCell>
                          <TableCell align="center">{application.verified ? 'Verified' : 'Pending'}</TableCell>
                          <TableCell align="center">{application.paid ? 'Paid' : 'Pending'}</TableCell>
                          <TableCell align="center">{application.approved ? 'Approved' : 'Pending'}</TableCell>
                          <TableCell align="center">{application.verified && application.paid && application.approved ? 'Success' : 'Pending'}</TableCell>
                          {application.verified === true && application.paid === false &&(
                            <Button
                              sx={{
                                backgroundColor: "#F4C522",
                                color: "black",
                                textTransform: "none",
                                fontWeight: "bold",
                                "&:hover": { backgroundColor: "#F4C522" },
                              }}
                              onClick={() => setIsModalOpen(true)} // Open modal on click
                            >
                              Proceed to Payment
                            </Button>
                          )}
                          {/* {isApplicant && (
                            <TableCell align="center">You are an applicant</TableCell>
                          )} */}
                        </TableRow>
                      ))}
                  </TableBody>

                </Table>
                {applications.verified === true && applications.paid === false &&(
                 <Button
                 sx={{
                   position: "absolute",
                   bottom: "1rem",
                   right: "1rem",
                   backgroundColor: "#F4C522",
                   color: "black",
                   textTransform: "none",
                   fontWeight: "bold",
                   "&:hover": { backgroundColor: "#F4C522" },
                 }}
                 onClick={() => setIsModalOpen(true)} // Open modal on click
               >
                 Proceed to Payment
               </Button>
                )}
                {/* <Button
                  sx={{
                    position: "absolute",
                    bottom: "1rem",
                    right: "1rem",
                    backgroundColor: "#F4C522",
                    color: "black",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#F4C522" },
                  }}
                  onClick={() => setIsModalOpen(true)} // Open modal on click
                >
                  Proceed to Payment
                </Button> */}
              </TableContainer>
            </div>
          </Grid>
          <Grid item xs={2}>
            {" "}
          </Grid>
        </Grid>
      </Container>
      <PaymentInstructionsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
