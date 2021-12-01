import React from 'react';
import UserNavbar from '../components/UserNavbar';
import UserRoutes from '../routes/UserRoutes';

function Initialize() {
  return (
    <div className="App">
      <UserNavbar />
      <UserRoutes />
    </div>
  );
}

export default Initialize;
