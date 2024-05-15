import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function ParkingManagement() {
  return (
    <>
      <AdminHeader />
      <AdminSidebar />
      <main className="admin-container">
        {/* Breadcrumbs Navigation */}
        <div role="presentation">
          <Breadcrumbs
            aria-label="breadcrumb"
            style={{ fontSize: "2em", marginTop: "1em" }}
          >
            <Link
              underline="hover"
              color="inherit"
              href="/configuration"
              style={{ color: "#8A252C" }}
            >
              Configuration
            </Link>
            <span>Parking Management</span>
          </Breadcrumbs>
        </div>

        {/* Vehicle Allowance */}
        <div className="vehicle-allowance">
          <div className="vehicle-allowance-header">Vehicle Allowance</div>
          <div className="vehicle-allowance-info">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil quos
            culpa recusandae dolore optio at adipisci totam reprehenderit
            molestias, beatae veritatis aliquam sit suscipit eligendi labore cum
            enim assumenda. Quae.
          </div>
          <div className="vehicle-allowance-input-container">
            <div className="vehicle-allowance-input">
              <label htmlFor="vehicleAllowanceFaculty">Faculty</label>
              <input type="number" name="" id="vehicleAllowanceFaculty" />
            </div>
            <div className="vehicle-allowance-input">
              <label htmlFor="vehicleAllowanceStudent">Student</label>
              <input type="number" name="" id="vehicleAllowanceStudent" />
            </div>
          </div>
        </div>

        {/* Parking Capacity */}
        <div className="parking-capacity">
          <div className="parking-capacity-header">Parking Capacity</div>
          <div className="parking-capacity-info">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil quos
            culpa recusandae dolore optio at adipisci totam reprehenderit
            molestias, beatae veritatis aliquam sit suscipit eligendi labore cum
            enim assumenda. Quae.
          </div>
          <div className="parking-capacity-input-container">
            <div className="parking-area-container">
              <div className="parking-area-input">
                <label htmlFor="parkingArea1">Parking Area 1</label>
                <input type="number" name="" id="parkingArea1" />
              </div>

              <div className="parking-area-input">
                <label htmlFor="parkingArea2">Parking Area 2</label>
                <input type="number" name="" id="parkingArea2" />
              </div>

              <div className="parking-area-input">
                <label htmlFor="parkingArea3">Parking Area 3</label>
                <input type="number" name="" id="parkingArea3" />
              </div>

              <div className="parking-area-input">
                <label htmlFor="parkingArea4">In Campus Capacity</label>
                <input type="number" name="" id="parkingArea4" />
              </div>
            </div>

            <div className="create-new-parking-container">
              <div className="create-new-parking-header">
                <span>Create New Parking</span>
                <AddCircleIcon />
              </div>
              <Box className="create-new-parking-box" component="section">
                <div className="create-new-parking-input">
                  <label htmlFor="nameOfArea">Name of Area</label>
                  <input type="text" name="" id="nameOfArea" />
                </div>

                <div className="create-new-parking-input">
                  <label htmlFor="capacity">Capacity</label>
                  <input type="number" name="" id="capacity" />
                </div>

                <div className="parking-buttons">
                  <Button
                    style={{ backgroundColor: "#cccccc", color: "#333333" }}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                  <Button variant="contained">Save</Button>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ParkingManagement;
