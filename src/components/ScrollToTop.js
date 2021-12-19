import React, { useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styled from 'styled-components';
import classNames from '../utils/classNames';

const StyledBtn = styled.div`
  button {
    position: fixed;
    right: 24px;
    bottom: 64px;
    background-color: #f39766;
  }

  button:hover {
    background-color: #a99d9d;
  }
`;

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <StyledBtn>
      <Fab
        color="secondary"
        size="small"
        aria-label="scroll back to top"
        onClick={scrollToTop}
        className={classNames(isVisible ? 'opacity-100' : 'opacity-0')}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </StyledBtn>
  );
}
