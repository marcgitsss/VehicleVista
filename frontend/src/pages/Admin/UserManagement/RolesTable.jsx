import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  Paper,
  TableRow,
  FormControl,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";

function RolesTable({ users }) {
  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users ?? []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) => user.username.includes(searchValue))
    );
  }, [searchValue, users]);

  return (
    <>
      {/* Search */}
      <div className="userm-query">
        <FormControl variant="standard">
          <Input
            id="input-with-icon-adornment"
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </FormControl>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="user table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "rgb(255 236 160)" }}>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Role
              </TableCell>
              {/* <TableCell align="center" sx={{ fontWeight: 600 }}>
                Assigned Office
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Last Active
              </TableCell> */}
              <TableCell align="center" sx={{ fontWeight: 600 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers?.map((row) => (
              <TableRow key={row.username}>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">
                  {row.role === "USER"
                    ? row.isStaff
                      ? "Faculty"
                      : "Student"
                    : row.role}
                </TableCell>
                {/* <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center"></TableCell> */}
                <TableCell align="center">
                  <div 
                    className="more-horizontal-button"
                    
                    onClick={()=>console.log("yeah")}><MoreHorizIcon/></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default RolesTable;
