import React, { useState } from 'react';
import { Button, Container, FormGroup } from '@mui/material';
import { Form, Input } from 'reactstrap';
import { styled, alpha } from '@mui/material/styles';
// import Toolbar from '@mui/material/Toolbar';
// import InputBase from '@mui/material/InputBase';
import Home from '../views/Home';

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: '10px',
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       width: '40ch',
//     },
//   },
//   '@media (max-width: 768px)': {
//     width: '100%',
//     input: {
//       '&::placeholder': {
//         fontSize: '14px',
//       },
//     },
//   },
// }));

const StyledButton = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

// const StyledSearch = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   border: '1px solid black',
//   marginLeft: 'auto',
//   '@media (max-width: 768px)': {
//     width: '100%',
//     marginRight: '5px',
//   },
// }));

const initialState = {
  tab: '',
};

export default function SearchBar() {
  const [input, setInput] = useState(initialState);

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      <Home input={input} />;
  };

  return (
    <Container maxWidth="xl">
      {/* <Toolbar>
        <StyledSearch>
          <StyledInputBase
            placeholder="Enter artist name or song title"
            inputProps={{ 'aria-label': 'search' }}
            type="text"
            name="tab"
            id="tab"
            value={input.tab || ''}
            onChange={handleChange}
            required
          />
        </StyledSearch>
        <StyledButton>
          <Button variant="outlined" onClick={handleClick()}>
            Search
          </Button>
        </StyledButton>
      </Toolbar> */}
      <>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="text"
              name="tab"
              id="tab"
              placeholder="Enter artist name or song title"
              value={input.tab || ''}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <StyledButton>
            <Button variant="outlined" type="submit">
              Search
            </Button>
          </StyledButton>
        </Form>
      </>
    </Container>
  );
}
