import logo from './logo.svg';
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Clock from './components/Clock'
import Greeting from './components/Greeting.js'
import Topbar from './components/Topbar'
import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <header>
        <Topbar />
      </header>
      <div>
      {/*}  <Browser />  */}
      <Login />
      </div>
    </div>
  );
}

export default App;


