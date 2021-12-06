import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TrackerForm from '../components/TrackerForm';

const StyledAddTracker = styled.div`
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

export default function AddTracker({ tab }) {
  return (
    <StyledAddTracker>
      <h1>Add a Tracker</h1>
      <TrackerForm tab={tab} />
    </StyledAddTracker>
  );
}

AddTracker.propTypes = {
  tab: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    isPlanning: PropTypes.bool,
    isComplete: PropTypes.bool,
    isLearning: PropTypes.bool,
    artist: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};
