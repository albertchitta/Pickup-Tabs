import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { signInUser } from '../api/auth';

const StyledButton = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'black',
  borderColor: 'black',
  '&:hover': {
    backgroundColor: '#a99d9d',
    border: '1px solid black',
  },
  padding: '0 8px',
  marginLeft: 0,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const ResponsiveAppBar = () => (
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
          <div className="space" style={{ flex: 1 }} />
          <Box sx={{ flexGrow: 0 }}>
            <StyledButton>
              <Button
                variant="text"
                sx={{ color: 'white', borderColor: 'black' }}
                onClick={signInUser}
              >
                Log in
              </Button>
            </StyledButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  </>
);
export default ResponsiveAppBar;
