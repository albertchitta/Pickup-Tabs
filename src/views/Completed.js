/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCurrentUsersUid, getTrackers } from '../api/data/trackerData';
import Tracker from '../components/Tracker';

const StyledComplete = styled.div``;

export default function Completed() {
  const [trackers, setTrackers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getTrackers(getCurrentUsersUid()).then(setTrackers);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <StyledComplete>
      <h1>Completed</h1>
      <div className="card-container">
        {trackers.length ? (
          trackers.map((tracker) => {
            if (tracker.status === 'Completed') {
              return (
                <Tracker
                  key={tracker.firebaseKey}
                  tracker={tracker}
                  setTrackers={setTrackers}
                />
              );
            }
          })
        ) : (
          <h3>No Trackers Added</h3>
        )}
      </div>
    </StyledComplete>
  );
}
