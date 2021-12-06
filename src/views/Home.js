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
  float: right;
  margin-left: auto;
  Input {
    width: 400px;
  }
  Button {
    width: 80px;
  }
`;

const StyledTabs = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
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
          <FormGroup>
            <Input
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
          <p>A list of Tabs.</p>
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
