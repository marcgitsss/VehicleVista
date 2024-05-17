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
  const [applications, setApplications] = useState({});
  const [isApplicant, setIsApplicant] = useState(false);
  const [date, setDate] = useState();
  const decondedToken = jwtDecode(token);
  const email = decondedToken.sub;
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/applicants/" + email
        );
        if (response.data) {
          setIsApplicant(true);
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

  const dateObject = new Date(date);
  const formattedDate = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${dateObject.getFullYear().toString().slice(-2)}`;

  console.log("Email:", email);
  console.log("Token: ",token)
  return (
    <div
      className="verifyPay"
      // style={{
      //   backgroundImage: `url(${background})`,
      //   backgroundSize: "100% 100%",
      //   height: "100vh",
      // }}
    >
      <Container maxWidth="lg">
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
                <Table aria-label="simple table">
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
                    <TableRow>
                      {isApplicant ? (<>
                        <TableCell align="center">{formattedDate}</TableCell>
                      <TableCell align="center">{applications.isStaff ? 'Staff' : 'Student'}</TableCell>
                      <TableCell align="center">{applications.verified ? 'Verified' : 'Pending'}</TableCell>
                      <TableCell align="center">{applications.paid ? 'Paid' : 'Pending'}</TableCell>
                      <TableCell align="center">{applications.approved ? 'Approved' : 'Pending'}</TableCell>
                      <TableCell align="center">{applications.verified && applications.paid && applications.approved ? 'Success' : 'Pending'}</TableCell>
                      </>) : <></>}
                      
                    </TableRow>
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
