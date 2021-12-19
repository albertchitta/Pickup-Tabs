import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  color: #586f7c;
  text-align: center;
  height: 3rem;
  position: absolute;
  font-size: 12px;
  background-color: white;
  padding-top: 14px;

  i {
    margin-right: 5px;
    margin-left: 5px;
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <span>Copyright</span>
      <i className="far fa-copyright" />
      <span>2021 Albert Chittaphong. All rights reserved.</span>
    </StyledFooter>
  );
}
