import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import List from './Components/List';
import New from './Components/New';
import Pet from './Components/Pet';
import Edit from './Components/Edit';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <h1 className="Header">Pet Shelter</h1>
        <h3 className="Looking">These are pets looking for a home</h3>
        <Link to="/">Home</Link>
        <Link to="/new">Add a Pet to the shelter</Link>
        <Route exact path="/" component={List} />
        <Route path="/new" component={New} />
        <Route path="/pet/:_id" component={Pet} />
        <Route path="/edit/:_id" component={Edit} />
      </BrowserRouter>
    )
  }
}

export default App