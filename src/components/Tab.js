/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import {
  Form, FormGroup, Input, Label, Button,
} from 'reactstrap';
import {
  createTracker,
  getCurrentUsersUid,
  updateTracker,
} from '../api/data/trackerData';

const StyledTab = styled.div`
  text-align: center;
  margin-bottom: 24px;
  border-radius: 6px;
  box-shadow: 0px 0px 10px 1px #888888;

  Button {
    margin-bottom: 18px;
    width: 150px;
    margin-left: auto;
    margin-right: auto;
    background-color: #228b22;
  }
  Button:hover {
    background-color: darkGreen;
  }
`;

export default function Tab({ tab }) {
  const tracker = {
    uid: getCurrentUsersUid(),
    songId: tab.id,
    title: tab.title,
    artist: tab.artist,
    progress: {
      uid: getCurrentUsersUid(),
    },
  };

  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState(tracker);
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (tracker.firebaseKey) {
        setFormInput({
          title: tracker.title,
          artist: tracker.artist.name,
          status: tracker.status,
          rating: tracker.rating,
          difficulty: tracker.difficulty,
          note: tracker.note,
          videoUrl: tracker.videoUrl,
          firebaseKey: tracker.firebaseKey,
        });
      }
    }
    return () => {
      isMounted = false;
    };
  }, [tracker]);

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tracker.firebaseKey) {
      updateTracker(formInput).then(() => {
        history.push('/');
      });
    } else {
      createTracker(formInput).then(() => {
        history.push('/');
        alert('Added Tracker');
      });
    }
  };

  return (
    <StyledTab>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{tab.title}</h4>
          <h6 className="card-title">{tab.artist.name}</h6>
          <a
            href={`http://www.songsterr.com/a/wa/bestMatchForQueryString?s="${tab.title}"&a="${tab.artist.name}"`}
            target="_blank"
            rel="noreferrer"
          >
            Click for Tabs
          </a>
        </div>
        {tracker.uid ? (
          <Button type="button" onClick={handleShow}>
            Add to Learning
          </Button>
        ) : (
          <p>Login to Track This Song</p>
        )}
      </div>
      <Modal
        show={show}
        size="md"
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#2f4550' }}>Add to Tracker</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: '#586f7c' }}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Song Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Add a title"
                value={formInput.title || ''}
                onChange={handleChange}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="artist">Artist</Label>
              <Input
                type="text"
                name="artist"
                id="artist"
                placeholder="Add an Artist"
                value={formInput.artist.name || ''}
                onChange={handleChange}
                disabled
              />
            </FormGroup>

            <Label for="status">Status</Label>
            <select
              className="form-control form-select"
              id="status"
              name="status"
              value={formInput.status || ''}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="Learning">Learning</option>
              <option value="Completed">Completed</option>
              <option value="Planning">Planning</option>
            </select>

            <Label for="rating">Rating</Label>
            <select
              className="form-control form-select"
              id="rating"
              name="rating"
              value={formInput.rating || ''}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select rating
              </option>
              <option value="10">(10) Masterpiece</option>
              <option value="9">(9) Great</option>
              <option value="8">(8) Very Good</option>
              <option value="7">(7) Good</option>
              <option value="6">(6) Fine</option>
              <option value="5">(5) Average</option>
              <option value="4">(4) Bad</option>
              <option value="3">(3) Very Bad</option>
              <option value="2">(2) Horrible</option>
              <option value="1">(1) Appalling</option>
            </select>

            <Label for="difficulty">Difficulty</Label>
            <select
              className="form-control form-select"
              id="difficulty"
              name="difficulty"
              value={formInput.difficulty || ''}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select difficulty
              </option>
              <option value="5">(5) Very Hard</option>
              <option value="4">(4) Hard</option>
              <option value="3">(3) Moderate</option>
              <option value="2">(2) Easy</option>
              <option value="1">(1) Very Easy</option>
            </select>
            <FormGroup>
              <Label for="videoUrl">video URL</Label>
              <Input
                type="text"
                name="videoUrl"
                id="videoUrl"
                placeholder="Add a Video URL"
                value={formInput.videoUrl || ''}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="note">Note</Label>
              <Input
                type="textarea"
                name="note"
                id="note"
                placeholder="Add a note"
                value={formInput.note || ''}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <Button
              type="submit"
              className="btn btn-success"
              onClick={handleClose}
            >
              {tracker.firebaseKey ? 'Update' : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </StyledTab>
  );
}

Tab.propTypes = {
  tab: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    status: PropTypes.string,
    rating: PropTypes.string,
    difficulty: PropTypes.string,
    note: PropTypes.string,
    videoUrl: PropTypes.string,
    artist: PropTypes.shape({
      name: PropTypes.string,
    }),
    progress: PropTypes.shape({
      intro: PropTypes.bool,
      riffs: PropTypes.bool,
      verses: PropTypes.bool,
      choruses: PropTypes.bool,
      outro: PropTypes.bool,
    }),
  }).isRequired,
};
