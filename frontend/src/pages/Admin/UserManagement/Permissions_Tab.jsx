import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function Permissions_Tab() {
  const users = [
    {
      name: "Bill Gates",
    },
    {
      name: "Elon Musk",
    },
    {
      name: "Ash Ketchup",
    },
  ];

  return (
    <>
      <div className="userm-tab-container">
        {users.map((user) => (
          <>
            <div className="userm-user">
              <div className="userm-name">{user.name}</div>
              <div className="userm-permissions">
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Permissions
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="admin"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label="Admin"
                    />
                    <FormControlLabel
                      value="student"
                      control={<Radio />}
                      label="Student"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <hr />
          </>
        ))}
      </div>
    </>
  );
}

export default Permissions_Tab;
