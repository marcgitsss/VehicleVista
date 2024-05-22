import React from 'react'
import './AdminHeader.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Avatar, Typography, IconButton, Tooltip, Menu, Box, MenuItem } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import CITLogo from '../../assets/cit-logo 1.png'
import { useNavigate } from 'react-router-dom';
const settings = ['Profile', 'Settings'];
export default function AdminHeader() {
  const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
      localStorage.removeItem("token");
      window.location.href = '/login';
    }
  return (
    <>
    <div className="admin-header">
      <div className="admin-logo">
        <img src={CITLogo} alt="" height={45}/>
      </div>
      <div className="admin-controls">
        <div className='admin-username'>
            <Typography> <span className='admin-username-text'>Hello</span>, Admin</Typography>
        </div>
        <div className='admin-pic'>
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp0J0F_5w-2n4HotHSW18iVR0KcR6lJLPxfYQ7rDxEgA&s" />
                <KeyboardArrowDownIcon  sx ={{ color: "black" }}/>
              </IconButton>
            </Tooltip>
              <IconButton sx={{ ml: '2rem' }} onClick={handleLogout} >
                <LogoutIcon sx ={{ color: "black" }}/>
              </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              disableScrollLock={true}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}

            </Menu>
          </Box>
        </div>
        
      </div>
    </div>
    </>
  )
}