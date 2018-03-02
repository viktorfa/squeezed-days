import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import CalendarContainer from "./components/Calendar/CalendarContainer";
import Layout from "./components/Layout";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout/>
      </div>
    );
  }
}

export default App;
