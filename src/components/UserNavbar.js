import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { signOutUser } from '../api/auth';

const settings = ['Logout'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: '#bd8633' }}>
        <Container maxWidth="l">
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                color: 'white',
                textDecoration: 'none',
                ':hover': { color: '#fbddbe' },
              }}
              style={{ marginRight: 32 }}
              component={Link}
              to="/"
            >
              Pickup Tabs
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuList>
                  <MenuItem
                    key="currently-learning"
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to="/currently-learning"
                    sx={{ ':hover': { color: '#bd8633' } }}
                  >
                    <Typography textAlign="center">
                      Currently Learning
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    key="completed"
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to="/completed"
                    sx={{ ':hover': { color: '#bd8633' } }}
                  >
                    <Typography textAlign="center">Completed</Typography>
                  </MenuItem>
                  <MenuItem
                    key="planning-to-learn"
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to="/planning-to-learn"
                    sx={{ ':hover': { color: '#bd8633' } }}
                  >
                    <Typography textAlign="center">
                      Planning to Learn
                    </Typography>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
                color: 'white',
                textDecoration: 'none',
                ':hover': { color: '#fbddbe' },
              }}
              component={Link}
              to="/"
            >
              Pickup Tabs
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                key="currently-learning"
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  textTransform: 'none',
                  fontSize: '16px',
                  ':hover': { color: '#fbddbe' },
                }}
                style={{ marginRight: 16 }}
                component={Link}
                to="/currently-learning"
              >
                Currently Learning
              </Button>
              <Button
                key="completed"
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  textTransform: 'none',
                  fontSize: '16px',
                  ':hover': { color: '#fbddbe' },
                }}
                style={{ marginRight: 16 }}
                component={Link}
                to="/completed"
              >
                Completed
              </Button>
              <Button
                key="planning-to-learn"
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  textTransform: 'none',
                  fontSize: '16px',
                  ':hover': { color: '#fbddbe' },
                }}
                style={{ marginRight: 16 }}
                component={Link}
                to="/planning-to-learn"
              >
                Planning to Learn
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
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
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" onClick={signOutUser}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default ResponsiveAppBar;
