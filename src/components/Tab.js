import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

export default function Tab({ tab }) {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{tab.title}</h5>
          <h6 className="card-title">{tab.artist.name}</h6>
          <a
            href={`http://www.songsterr.com/a/wa/bestMatchForQueryString?s="${tab.title}"&a="${tab.artist.name}"`}
            target="_blank"
            rel="noreferrer"
          >
            click here
          </a>
        </div>
      </div>
    </>
  );
}

Tab.propTypes = {
  tab: PropTypes.shape({
    title: PropTypes.string,
    artist: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
