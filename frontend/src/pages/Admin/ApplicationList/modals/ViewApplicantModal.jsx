import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export default function ViewApplicantModal({ isOpen, setIsOpen, applicant }) {
  console.log("applicant", applicant);
  return (
    <div>
      <Modal
        open={isOpen ?? false}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <Box className="applist-modal applist-modal-view">
          {/* Modal Content */}
          <h2>Applicant</h2>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width="10%"></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">Name:</TableCell>
                  <TableCell align="left">{applicant.studentName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Email: </TableCell>
                  <TableCell align="left">{applicant.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Applicant ID: </TableCell>
                  <TableCell align="left">{applicant.applicantid}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Grade Level: </TableCell>
                  <TableCell align="left">{applicant.gradeLevel}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Contact Number: </TableCell>
                  <TableCell align="left">{applicant.contactNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Address:</TableCell>
                  <TableCell align="left">{applicant.address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">User Type:</TableCell>
                  <TableCell align="left">
                    {applicant.isStaff ? "Employee" : "Student"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Vehicle Make:</TableCell>
                  <TableCell align="left">{applicant.vehicleMake}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Plate No.:</TableCell>
                  <TableCell align="left">{applicant.plateNo}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Color:</TableCell>
                  <TableCell align="left">{applicant.color}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Wheels:</TableCell>
                  <TableCell align="left">
                    {applicant.isFourWheel ? "4" : "2"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">OR/CR:</TableCell>
                  <TableCell align="left">
                    <a href={applicant.orcrimg} target="_blank">
                      <Button sx={{ textTransform: "none", color: "#8A252C" }}>
                        Click to View Image
                      </Button>
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">License</TableCell>
                  <TableCell align="left">
                    <a href={applicant.licenseimg} target="_blank">
                      <Button sx={{ textTransform: "none", color: "#8A252C" }}>
                        Click to View Image
                      </Button>
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Proof of Payment</TableCell>
                  <TableCell align="left">
                    <a href={applicant.proofofpayment} target="_blank">
                      <Button sx={{ textTransform: "none", color: "#8A252C" }}>
                        Click to View Image
                      </Button>
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Date Submitted</TableCell>
                  <TableCell align="left">
                    {new Date(applicant.datesubmitted).toLocaleDateString("en-PH", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                    </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Verified</TableCell>
                  <TableCell align="left">
                    {applicant.verified ? "Yes" : "No"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Approved</TableCell>
                  <TableCell align="left">
                    {applicant.approved ? "Yes" : "No"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Paid</TableCell>
                  <TableCell align="left">
                    {applicant.paid ? "Yes" : "No"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
}
