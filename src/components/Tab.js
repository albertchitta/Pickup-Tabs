/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
// import Select from 'react-select';
import {
  Form, FormGroup, Input, Label, Button,
} from 'reactstrap';
import {
  createTracker,
  getCurrentUsersUid,
  updateTracker,
} from '../api/data/trackerData';

const StyledTab = styled.div`
  Button {
    margin-bottom: 18px;
    width: 150px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export default function Tab({ tab }) {
  const tracker = {
    uid: getCurrentUsersUid(),
    songId: tab.id,
    title: tab.title,
    artist: tab.artist,
    // status: tab.status,
    // rating: tab.rating,
    // difficulty: tab.difficulty,
    // note: tab.note,
  };

  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState(tracker);
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const status = [
  //   { value: formInput.status || '', label: 'Learning' },
  //   { value: formInput.status || '', label: 'Completed' },
  //   { value: formInput.status || '', label: 'Planning' },
  // ];

  // const rating = [
  //   { value: formInput.rating || '', label: 'None' },
  //   { value: formInput.rating || '', label: '1' },
  //   { value: formInput.rating || '', label: '2' },
  //   { value: formInput.rating || '', label: '3' },
  //   { value: formInput.rating || '', label: '4' },
  //   { value: formInput.rating || '', label: '5' },
  // ];

  // const difficulty = [
  //   { value: formInput.difficulty || '', label: 'None' },
  //   { value: formInput.difficulty || '', label: '1' },
  //   { value: formInput.difficulty || '', label: '2' },
  //   { value: formInput.difficulty || '', label: '3' },
  //   { value: formInput.difficulty || '', label: '4' },
  //   { value: formInput.difficulty || '', label: '5' },
  // ];

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
        <button type="button" onClick={handleShow}>
          Add to Learning
        </button>
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
            <FormGroup>
              <Label for="status">Status</Label>
              {/* <Select options={status} /> */}
              <Input
                type="text"
                name="status"
                id="status"
                placeholder="Add status"
                value={formInput.status || ''}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="rating">Rating</Label>
              {/* <Select options={rating} /> */}
              <Input
                type="text"
                name="rating"
                id="rating"
                placeholder="Add overall rating"
                value={formInput.rating || ''}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="difficulty">Difficulty</Label>
              {/* <Select options={difficulty} name="difficulty" id="difficulty" value={formInput.difficulty || ''} onChange={handleChange} required />
               */}
              <Input
                type="text"
                name="difficulty"
                id="difficulty"
                placeholder="Add difficulty rating"
                value={formInput.difficulty || ''}
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
