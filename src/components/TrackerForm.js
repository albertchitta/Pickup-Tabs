import React, { useState, useEffect } from 'react';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { createTracker, updateTracker } from '../api/data/trackerData';

const StyledForm = styled.div`
  border-style: solid;
  border-color: #000000;
  border-width: 1px;
  padding: 16px;
  width: 644px;
  margin: 42px auto;
  border-radius: 10px;

  Label {
    color: #2f4550;
  }

  Input {
    margin-bottom: 24px;
  }

  Button {
    margin-top: 24px;
    color: white;
    background-color: #5bc0be;
    border-color: #000000;
  }

  Button:hover {
    background-color: #586f7c;
  }
`;

const initialState = {
  title: '',
};

export default function TrackerForm({ tracker = {} }) {
  const [formInput, setFormInput] = useState(initialState);
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (tracker.firebaseKey) {
        setFormInput({
          title: tracker.title,
          firebaseKey: tracker.firebaseKey,
        });
      }
    }
    return () => {
      isMounted = false;
    };
  }, [tracker]);

  const resetForm = () => {
    setFormInput(initialState);
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
      updateTracker(formInput).then(() => {
        resetForm();
        history.push('/');
      });
    } else {
      createTracker(formInput).then(() => {
        resetForm();
        history.push('/');
      });
    }
  };

  return (
    <StyledForm>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">Tracker Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Add a title"
            value={formInput.title || ''}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button type="submit" className="btn btn-success">
          {tracker.firebaseKey ? 'Update' : 'Submit'}
        </Button>
      </Form>
    </StyledForm>
  );
}

TrackerForm.propTypes = {
  tracker: PropTypes.shape({}).isRequired,
};
