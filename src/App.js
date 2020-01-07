import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import NavBar from './components/common/NavBar';
import SearchPrototypeA from './components/search/SearchPrototypeA';
import SearchPrototypeB from './components/search/SearchPrototypeB';
import SearchPrototypeC from './components/search/SearchPrototypeC';
import SearchPrototypeD from './components/search/SearchPrototypeD';

const Index = () => <h2>Home</h2>;

class App extends Component {
  render() {
    const routes = [
      {link: "/", name: "Home"},
      {link: "/searcha", name: "SearchPrototypeA"},
      // {link: "/searchb", name: "SearchPrototypeB"},
      {link: "/searchc", name: "SearchPrototypeC"},
      {link: "/searchd", name: "SearchPrototypeD"}
      //{link: "/about", name: "SearchB"}
    ]

    return (
      <Router>
        <div className="App">
          <NavBar routes={routes} />
          <Route path="/" exact component={Index} />
          <Route path="/searcha" component={SearchPrototypeA} />
          {/* <Route path="/searchb" component={SearchPrototypeB} /> */}
          <Route path="/searchc" component={SearchPrototypeC} />
          <Route path="/searchd" component={SearchPrototypeD} />
        </div>
      </Router>
    );
  }
}

export default App;
