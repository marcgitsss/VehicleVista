import AdminHeader from "../../components/AdminHeader/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";

function StickerPricing() {
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  return (
    <>
      <AdminHeader />
      <AdminSidebar />
      <main className="admin-container">
        {/* Breadcrumbs Navigation */}
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs
            aria-label="breadcrumb"
            style={{ fontSize: "2em", marginTop: "1em" }}
          >
            <Link
              underline="hover"
              color="inherit"
              href="/"
              style={{ color: "#8A252C" }}
            >
              Configuration
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              Sticker Pricing
            </Link>
          </Breadcrumbs>
        </div>

        {/* Some Text */}
        <div className="sticker-info">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at massa
          non libero suscipit placerat a non ipsum. Aenean tempor nec enim vel
          feugiat. Pellentesque a malesuada dolor. Nullam malesuada scelerisque
          elit in sagittis. Etiam bibendum lobortis sapien sit amet consequat.
          Pellentesque vitae congue neque, vitae finibus nisl. Vivamus turpis
          diam, sodales quis venenatis
        </div>

        <div className="sticker-input-container">
          {/* Faculty */}
          <Box className="sticker-input-group">
            <div className="sticker-input-header">
              <span>Faculty</span>
              <EditIcon />
            </div>

            <div className="sticker-input">
              <label htmlFor="price">Price</label>
              <input type="text" name="price" />
            </div>

            <div className="sticker-input">
              <label htmlFor="startDate">Start Date (annual)</label>
              <input type="date" id="startDate" name="startDate" />
            </div>

            <div className="sticker-input">
              <label htmlFor="endDate">End Date (annual)</label>
              <input type="date" id="endDate" name="endDate" />
            </div>

            <div className="sticker-buttons">
              <Button
                style={{ backgroundColor: "#cccccc", color: "#333333" }}
                variant="contained"
              >
                Cancel
              </Button>
              <Button variant="contained">Save</Button>
            </div>
          </Box>

          {/* Student */}
          <Box className="sticker-input-group">
            <div className="sticker-input-header">
              <span>Student</span>
              <EditIcon />
            </div>

            <div className="sticker-input">
              <label htmlFor="price">Price</label>
              <input type="text" name="price" />
            </div>

            <div className="sticker-input">
              <label htmlFor="startDate">Start Date (annual)</label>
              <input type="date" id="startDate" name="startDate" />
            </div>

            <div className="sticker-input">
              <label htmlFor="endDate">End Date (annual)</label>
              <input type="date" id="endDate" name="endDate" />
            </div>

            <div className="sticker-buttons">
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
      </main>
    </>
  );
}

export default StickerPricing;
