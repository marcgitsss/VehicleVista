import { Button, Container, Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import background from "../../assets/HP_Background.jpg";
import { useState, useEffect } from "react";
import Header from "../../components/Navbar/UserHeader";
import StudentSidebar from "../../components/StudentSidebar/StudentSidebar";
import Footer from "../../components/Navbar/UserFooter";
import axios from "axios";

const email = "ludivicombalaterojr@gmail.com";

export default function UserStatus() {
  const isMobile = useMediaQuery("(max-width: 37.5rem)");
  const [open, setOpen] = useState(false);
  const [applications, setApplications] = useState({});
  const [date, setDate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/applicants/" + email
        );
        if (response.data) {
          console.log(response.data);
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

  const handleFalseOption = () => {
    setOpen(false);
  };

  const handleTrueOption = () => {
    setOpen(true);
  };

  return (
    <div
      className="verifyPay"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "100% 100%",
        height: "100vh",
      }}
    >
      <Header />
      <StudentSidebar />
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
                    onClick={() => handleFalseOption()}
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
              {open === false && (
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

                      <TableCell align="center">{formattedDate}</TableCell>
                      <TableCell align="center">{applications.isStaff ? 'Staff' : 'Student'}</TableCell>
                      <TableCell align="center">{applications.verified ? 'Verified' : 'Pending'}</TableCell>
                      <TableCell align="center">{applications.paid ? 'Paid' : 'Pending'}</TableCell>
                      <TableCell align="center">{applications.approved ? 'Approved' : 'Pending'}</TableCell>
                      <TableCell align="center">{applications.verified && applications.paid && applications.approved ? 'Success' : 'Pending'}</TableCell>
                    </TableBody>
                  </Table>
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
                  >
                    Proceed to Payment
                  </Button>{" "}
                </TableContainer>
              )}
            </div>
          </Grid>
          <Grid item xs={2}>
            {" "}
          </Grid>
        </Grid>
      </Container>
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <Footer />
      </div>
    </div>
  );
}
