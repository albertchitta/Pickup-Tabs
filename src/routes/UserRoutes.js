import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import Learning from '../views/Learning';
import Completed from '../views/Completed';
import Planning from '../views/Planning';

export default function UserRoutes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/currently-learning" component={Learning} />
        <Route exact path="/completed" component={Completed} />
        <Route exact path="/planning-to-learn" component={Planning} />
      </Switch>
    </div>
  );
}
