/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCurrentUsersUid, getTrackers } from '../api/data/trackerData';
import Tracker from '../components/Tracker';

const StyledPlanning = styled.div``;

export default function Planning() {
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
    <StyledPlanning>
      <h1>Planning to Learn</h1>
      <div className="card-container">
        {trackers.length ? (
          trackers.map((tracker) => {
            if (tracker.status === 'Planning') {
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
    </StyledPlanning>
  );
}
