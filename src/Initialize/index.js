import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import PublicNavbar from '../components/PublicNavbar';
import PublicRoutes from '../routes/PublicRoutes';
import UserNavbar from '../components/UserNavbar';
import UserRoutes from '../routes/UserRoutes';

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
    <div className="App">
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
    </div>
  );
}

export default Initialize;
