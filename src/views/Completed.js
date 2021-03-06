import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCurrentUsersUid, getTrackers } from '../api/data/trackerData';
import CompleteTracker from '../components/CompleteTracker';
import ScrollToTop from '../components/ScrollToTop';

const StyledComplete = styled.div`
  width: 40%;
  justify-content: center;
  margin: auto;
  color: black;

  h1 {
    text-align: center;
    margin: 48px auto;
  }

  h3 {
    text-align: center;
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

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
                <CompleteTracker
                  key={tracker.firebaseKey}
                  tracker={tracker}
                  setTrackers={setTrackers}
                />
              );
            }
            return false;
          })
        ) : (
          <h3>No Trackers Added</h3>
        )}
      </div>
      <ScrollToTop />
    </StyledComplete>
  );
}
