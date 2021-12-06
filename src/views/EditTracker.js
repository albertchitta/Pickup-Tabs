import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
// import TrackerForm from '../components/TrackerForm';
import { getTracker } from '../api/data/trackerData';

const StyledEditTracker = styled.div`
  display: flex;
  flex-direction: column;
  margin: 116px auto;
  width: 100%;
  justify-content: center;

  h1 {
    color: #2f4550;
    font-size: 45px;
    font-weight: 800;
    text-align: center;
  }
`;

export default function EditTracker() {
  const [editTracker, setEditTracker] = useState({});
  const { firebaseKey } = useParams();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getTracker(firebaseKey).then(setEditTracker);
      console.warn(editTracker);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <StyledEditTracker>
      <h1>Edit a Technology</h1>
      {/* <h1>{editTracker.title}</h1> */}
      {/* <TrackerForm tracker={editTracker} /> */}
    </StyledEditTracker>
  );
}
