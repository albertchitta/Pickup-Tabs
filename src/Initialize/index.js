import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/auth';
import PublicNavbar from '../components/PublicNavbar';
import PublicRoutes from '../routes/PublicRoutes';
import UserNavbar from '../components/UserNavbar';
import UserRoutes from '../routes/UserRoutes';
import Footer from '../components/Footer';

const StyledContainer = styled.div`
  position: relative;
  min-height: 100vh;
  padding-bottom: 2.5rem;
`;

function Initialize() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          email: authed.email,
        };
        setUser(userInfoObj);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <StyledContainer>
      {user ? (
        <>
          <UserNavbar user={user} />
          <UserRoutes />
        </>
      ) : (
        <>
          <PublicNavbar />
          <PublicRoutes />
        </>
      )}
      <Footer />
    </StyledContainer>
  );
}

export default Initialize;
