import React, { useEffect, useState } from 'react';
import getTabs from '../api/data/tabsData';
import Tab from '../components/Tab';
// import styled from 'styled-components';

export default function Home() {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getTabs('welcome to the jungle').then(setTabs);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className="title">
        <h1>Tabs</h1>
        <p>A list of Tabs.</p>
      </div>
      <div className="card-container">
        {tabs.length ? (
          tabs.map((tab) => (
            <Tab key={tab.firebaseKey} tab={tab} setTabs={setTabs} />
          ))
        ) : (
          <h3>Create a New Tracker</h3>
        )}
      </div>
    </>
  );
}
