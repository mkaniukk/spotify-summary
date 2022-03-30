import logo from './logo.svg';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Topbar from './components/Topbar'
import Main from './components/Main'
import Top from './components/Top'
import Layout from './components/Layout'

function App(props) {
  console.log(props.location)
  return (
    <div>
      <Main />
    </div>
  );
}

export default App;


