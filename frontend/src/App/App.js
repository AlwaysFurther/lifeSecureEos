import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Menubar from './components/Menubar/Index'
import Main from './components/Main/Index'
import './App.css';

const users = ['Alex', 'Coco', 'Pascal', 'Thomas', 'Noby'];

class App extends Component {

  render() {
    return (
    <BrowserRouter>
      <div className="App">
        <Menubar />
        <Main />
      </div>
    </BrowserRouter>
    )
  }
}

export default App;