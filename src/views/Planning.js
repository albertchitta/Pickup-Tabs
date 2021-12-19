import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCurrentUsersUid, getTrackers } from '../api/data/trackerData';
import ScrollToTop from '../components/ScrollToTop';
import Tracker from '../components/Tracker';

const StyledPlanning = styled.div`
  width: 40%;
  justify-content: center;
  margin: auto;

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
            return false;
          })
        ) : (
          <h3>No Trackers Added</h3>
        )}
      </div>
      <ScrollToTop />
    </StyledPlanning>
  );
}
