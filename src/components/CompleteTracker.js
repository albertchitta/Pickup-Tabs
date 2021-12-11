/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import {
  Form, FormGroup, Input, Label, Button,
} from 'reactstrap';
import { deleteTracker, updateTracker } from '../api/data/trackerData';

const steps = ['Intro', 'Riffs', 'Verses', 'Choruses', 'Solos', 'Outro'];

export default function Tracker({ tracker, setTrackers }) {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  });
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState(tracker);
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => true;

  // It's the last step, but not all steps have been completed,
  // find the first step that has been completed
  const handleNext = () => {
    const newActiveStep = isLastStep() && !allStepsCompleted()
      ? steps.findIndex((step, i) => !(i in completed))
      : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
    if (completedSteps() === totalSteps()) {
      // eslint-disable-next-line no-param-reassign
      tracker.status = 'Completed';
      updateTracker(tracker).then(setTrackers);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    // eslint-disable-next-line no-param-reassign
    tracker.status = 'Learning';
    updateTracker(tracker).then(setTrackers);
  };

  const resetStep = () => {
    const newCompleted = completed;
    delete newCompleted[activeStep];
    setCompleted(newCompleted);
    console.warn(completed);
    handleNext();
  };

  const handleClick = (method) => {
    if (method === 'delete') {
      const del = confirm('Delete tracker?');
      if (del) deleteTracker(tracker).then(setTrackers);
    }
  };

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tracker.firebaseKey) {
      updateTracker(formInput).then(setTrackers);
      history.push('/completed');
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Title: {tracker.title}</h5>
          <h6>Artist: {tracker.artist.name}</h6>
          <h6>Rating: {tracker.rating}</h6>
          <h6>Difficulty: {tracker.difficulty}</h6>
          <h6>Notes: {tracker.note}</h6>
          <h6>Status: {tracker.status}</h6>
          <a
            href={`http://www.songsterr.com/a/wa/bestMatchForQueryString?s="${tracker.title}"&a="${tracker.artist.name}"`}
            target="_blank"
            rel="noreferrer"
          >
            Songsterr Tabs
          </a>
          <button
            type="button"
            className="btn btn-warning"
            onClick={handleShow}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleClick('delete')}
          >
            Delete
          </button>
        </div>
        <Box sx={{ width: '100%' }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {allStepsCompleted() ? (
              <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </>
            ) : (
              <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Step {activeStep + 1}: {steps[activeStep]}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNext} sx={{ mr: 1 }}>
                    Next
                  </Button>
                  {activeStep !== steps.length
                    && (completed[activeStep] ? (
                      <Button onClick={resetStep}>
                        Reset {steps[activeStep]}
                      </Button>
                    ) : (
                      <Button onClick={handleComplete}>
                        {completedSteps() === totalSteps() - 1
                          ? 'Finish'
                          : `Complete ${steps[activeStep]}`}
                      </Button>
                    ))}
                </Box>
              </>
            )}
          </div>
        </Box>
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
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="status">Status</Label>
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
    </>
  );
}

Tracker.propTypes = {
  tracker: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    firebaseKey: PropTypes.string,
    status: PropTypes.string,
    rating: PropTypes.string,
    difficulty: PropTypes.string,
    note: PropTypes.string,
    artist: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  setTrackers: PropTypes.func.isRequired,
};
