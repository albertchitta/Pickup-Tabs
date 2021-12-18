import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Button, Form, FormGroup, Input,
} from 'reactstrap';
import getTabs from '../api/data/tabsData';
import Tab from '../components/Tab';

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: center;
  margin: auto;
`;

const StyledSearch = styled.div`
  justify-content: center;
  .form-group {
    display: flex;
    .input {
      margin-right: 18px;
      width: 400px;

      @media (max-width: 768px) {
        width: 200px;
        font-size: 12px;
      }
    }

    Button {
      background-color: #a99d9d;
      @media (max-width: 768px) {
        font-size: 12px;
      }
    }
    Button:hover {
      background-color: gray;
    }
  }
  margin: 50px auto;
`;

const StyledTabs = styled.div`
  float: left;
  min-width: 200px;
  width: 60%;
  margin: auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const initialState = {
  tab: '',
};

export default function Home() {
  const [tabs, setTabs] = useState([]);
  const [input, setInput] = useState(initialState);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getTabs(input.tab).then(setTabs);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getTabs(input.tab).then(setTabs);
  };

  return (
    <StyledHome>
      <StyledSearch>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="form-group">
            <Input
              className="input"
              type="text"
              name="tab"
              id="tab"
              placeholder="Enter artist name or song title"
              value={input.tab || ''}
              onChange={handleChange}
              required
            />
            <Button type="submit">Search</Button>
          </FormGroup>
        </Form>
      </StyledSearch>
      <StyledTabs>
        <div className="title">
          <h1>Tabs</h1>
        </div>
        <div className="card-container">
          {tabs.length ? (
            tabs.map((tab) => <Tab key={tab.id} tab={tab} setTabs={setTabs} />)
          ) : (
            <h3>Search for Tabs</h3>
          )}
        </div>
      </StyledTabs>
    </StyledHome>
  );
}

Home.propTypes = {
  input: PropTypes.shape({
    tab: PropTypes.string,
  }),
};

Home.defaultProps = { input: { tab: '' } };
