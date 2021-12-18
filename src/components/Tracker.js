/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import {
  Form, FormGroup, Input, Label,
} from 'reactstrap';
import {
  deleteTracker,
  getCurrentUsersUid,
  updateTracker,
} from '../api/data/trackerData';

const StyledTracker = styled.div`
  border-radius: 6px;
  box-shadow: 0px 0px 10px 1px #888888;
  padding: 10px;
  background-color: white;
  text-align: center;
  margin: 24px auto;

  .Mui-completed {
    color: forestGreen;
  }

  .MuiButton-root {
    background-color: dodgerBlue;
    color: white;
    margin-left: 10px !important;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
  .MuiButton-root:hover {
    background-color: royalBlue;
  }

  .MuiButtonBase-root {
    padding: 0;
    margin: 0;
  }

  .complete-button {
    width: 190px;
    background-color: forestGreen;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
  .complete-button:hover {
    background-color: darkGreen;
  }

  .reset-button {
    width: 190px;
    background-color: red;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
  .reset-button:hover {
    background-color: darkRed;
  }

  .card {
    border: 0;
  }

  .MuiStepper-root {
    flex-wrap: wrap;

    @media (max-width: 768px) {
      MuiStepConnector-root {
        background-color: white;
      }
    }
  }

  iframe {
    width: 100%;
    height: 40vh;
    border-radius: 6px;
    margin: 15px auto;
  }

  h1 {
    margin-top: 10px;
  }

  h6 {
    margin-top: 5px;
  }
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: center;

  button {
    padding: 0;
    width: 64px;
    margin: auto 5px;
    color: white;
    background-color: royalBlue;
  }
`;

const steps = ['Intro', 'Riffs', 'Verses', 'Choruses', 'Solos', 'Outro'];

export default function Tracker({ tracker, setTrackers }) {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(tracker.progress);
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState(tracker);
  // const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(tracker.progress).length - 1;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

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
    const aTracker = tracker;
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    aTracker.progress[activeStep] = true;
    setCompleted(newCompleted);
    updateTracker(tracker).then(setTrackers);
    handleNext();
    if (completedSteps() === totalSteps()) {
      aTracker.status = 'Completed';
      updateTracker(aTracker).then(setTrackers);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    const aTracker = tracker;
    delete aTracker.progress;
    aTracker.status = 'Learning';
    aTracker.progress = {
      uid: getCurrentUsersUid(),
    };
    updateTracker(tracker).then((trackers) => {
      setTrackers(trackers);
    });
  };

  const resetStep = () => {
    const aTracker = tracker;
    const newCompleted = completed;
    delete newCompleted[activeStep];
    delete aTracker.progress[activeStep];
    setCompleted(newCompleted);
    updateTracker(aTracker).then(setTrackers);
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
      // history.push('/completed'); // FIX ME
    }
  };

  return (
    <StyledTracker>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {tracker.artist.name} - {tracker.title}
          </h5>
          <a
            href={`http://www.songsterr.com/a/wa/bestMatchForQueryString?s="${tracker.title}"&a="${tracker.artist.name}"`}
            target="_blank"
            rel="noreferrer"
            className="tab-link"
          >
            Songsterr Tabs
          </a>
          <h6>Rating: {tracker.rating}</h6>
          <h6>Difficulty: {tracker.difficulty}</h6>
          <h6>Notes: {tracker.note}</h6>
          <iframe
            src={`https://www.youtube.com/embed/${
              tracker.videoUrl.split('=')[1]
            }`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
          />
        </div>
        <hr className="my-4" />
        <h1>Progress</h1>
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
                  <Button onClick={handleNext} sx={{ mr: 1 }}>
                    Next
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  {activeStep !== steps.length
                    && (completed[activeStep] ? (
                      <Button className="reset-button" onClick={resetStep}>
                        Reset {steps[activeStep]}
                      </Button>
                    ) : (
                      <Button
                        className="complete-button"
                        onClick={handleComplete}
                      >
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
        <hr className="my-4" />
        <StyledButtons>
          <button type="button" onClick={handleShow}>
            Edit
          </button>
          <button type="button" onClick={() => handleClick('delete')}>
            Delete
          </button>
        </StyledButtons>
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
              <Label for="videoUrl">Video URL</Label>
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
              <Label for="note">Notes</Label>
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
              className="btn btn-success update-submit-btn"
              onClick={handleClose}
            >
              {tracker.firebaseKey ? 'Update' : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </StyledTracker>
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
    videoUrl: PropTypes.string,
    artist: PropTypes.shape({
      name: PropTypes.string,
    }),
    progress: PropTypes.shape({
      0: PropTypes.bool,
      1: PropTypes.bool,
      2: PropTypes.bool,
      3: PropTypes.bool,
      4: PropTypes.bool,
      5: PropTypes.bool,
    }),
  }).isRequired,
  setTrackers: PropTypes.func.isRequired,
};
