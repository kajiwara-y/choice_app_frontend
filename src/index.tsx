import React from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom';
import './index.css';
import ChoiceApp from './ChoiceApp';
import Result from './result';
import reportWebVitals from './reportWebVitals';



ReactDOM.render(
  <Router>
  <div>
    <Switch>
      <Route exact path="/" component={ChoiceApp} />
      <Route exact path="/result" component={Result} />
    </Switch>
  </div>
</Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
