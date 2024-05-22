import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  Button,
  Checkbox,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

function PermissionsTab() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const [approver, setApprover] = useState(false);
  const [verifier, setVerifier] = useState(false);
  const [logger, setLogger] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(()=>{
    setApprover(selectedUser.isApprover);
    setVerifier(selectedUser.isVerifier);
    setLogger(selectedUser.isViewLogger);
  },[selectedUser])

  const updateEmployee = async () => {
    try {
      await axios.post(
        "http://localhost:8080/jwt/updateapprover",
        {
          username: selectedUser.username,
          action: approver,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await axios.post(
        "http://localhost:8080/jwt/updateverifier",
        {
          username: selectedUser.username,
          action: verifier,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // 
      await axios.post(
        "http://localhost:8080/jwt/updatelogger",
        {
          username: selectedUser.username,
          action: verifier,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSnackbarMessage("Successfully Updated Employee");
      setSnackbarOpen(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const getAllEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:8080/jwt/getallemployee");
        setUsers(res.data);
        if (res.data?.length) {
          setSelectedUser(res.data[0]);
        }
        console.log("res", res);
      } catch (error) {
        console.log("error", error);
      }
    };

    getAllEmployees();
  }, []);

  useEffect(() => {
    setVerifier(!!selectedUser.isVerifier);
    setApprover(!!selectedUser.isApprover);
    console.log("selectedUser", selectedUser);
  }, [selectedUser]);

  return (
    <div className="userm-tab-container">
      <div className="userm-search">
        <FormControl>
          <InputLabel id="user-filter-select-label1">Select User</InputLabel>
          <Select
            labelId="user-filter-select-label1"
            id="user-filter-select1"
            label="user-filter"
            sx={{ width: "300px", padding: "0" }}
            defaultValue=""
            MenuProps={{
              disableScrollLock: true,
            }}
            value={selectedUser.username ?? ""}
            onChange={(e) => {
              const selectedName = e.target.value;
              const selected = users.find((x) => x.username === selectedName);
              setSelectedUser(selected);
            }}
          >
            {users.map((user) => (
              <MenuItem key={user.username} value={user.username}>
                {user.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="userm-user">
        <div className="userm-name">{selectedUser.username}</div>
        <div className="userm-permissions">
          <FormGroup>
            <FormLabel id="demo-radio-buttons-group-label">
              Permissions
            </FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  checked={verifier}
                  onChange={(e) => setVerifier(!verifier)}
                />
              }
              label="Verifier"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={approver}
                  onChange={(e) => setApprover(!approver)}
                />
              }
              label="Approver"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={logger}
                  onChange={(e) => setLogger(!logger)}
                />
              }
              label="Logger"
            />
          </FormGroup>
        </div>
      </div>

      <Button
        variant="contained"
        sx={{ marginTop: "2em" }}
        onClick={updateEmployee}
      >
        Update
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
}

export default PermissionsTab;
