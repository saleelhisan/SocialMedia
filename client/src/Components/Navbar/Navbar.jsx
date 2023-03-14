import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import Mail from "@mui/icons-material/Mail";
import Pets from "@mui/icons-material/Pets";
import Notification from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import LeftToggle from '../LeftToggle/LeftToggle';
import { setMode } from '../../state';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLogout } from '../../state';
import { useTheme } from '@mui/material';





const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: "10px",
  width: "40%"
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "2rem",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    display: "flex"
  }
}));

const MobileIcons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    display: "none"
  }
}));



const Navbar = () => {

  const user = useSelector((state) => state.user);


  const theme = useTheme();


  const [open, setOpen] = useState(false);
  const [state, setState] = useState(false);
  const toggleDrawer = (open) => () => {
    setState(open);
  };
  const dispatch = useDispatch();
  
  

  return (
    <AppBar sx={{ backgroundColor: "#111" }} position='sticky' >
      <StyledToolbar>
        <Typography variant='h6' sx={{ display: { xs: "none", md: "block" } }}>
          Sociolog
        </Typography>
          <Pets sx={{ display: { xs: "block", md: "none" } }} onClick={toggleDrawer(true)} />
         <LeftToggle state={state} setState={setState} />
         <Search sx={{ display: { xs: "none", sm: "none", md: "flex" } }}><InputBase placeholder='Search...' /></Search>
        <Typography sx={{ display:{md:"none"}}} >Sociolog</Typography>
        <Icons>
          <DarkModeIcon onClick={() => dispatch(setMode())} color='white' />
          <Link to="/chats" style={{ color: 'white' }}>
          <Badge  color="error">
            <Mail color="white" />
          </Badge>
          </Link>
          <Link to="/notifications" style={{ color: 'white' }}>
          <Badge  color="error">
            <Notification color="white" />
          </Badge>
          </Link>
          <Avatar src={user.profilePic} sx={{ width: 30, height: 30 }} onClick={e => setOpen(true)} />
        </Icons>
        <MobileIcons>
          <DarkModeIcon color='white'  />
          <Link to="/chats" style={{ color: 'white' }}>
            <Badge  color="error">
              <Mail color="white" />
            </Badge>
          </Link>
          <Link to="/notificatios" style={{ color: 'white' }}>
            <Badge color="error">
              <Notification color="white" />
            </Badge>
          </Link>
          <Avatar src={user.profilePic} sx={{ width: 30, height: 30 }} onClick={e => setOpen(true)} />
      </MobileIcons>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={e => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => dispatch(setLogout())} >Logout</MenuItem>
        <MenuItem >Profile</MenuItem>
        <MenuItem >My account</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
