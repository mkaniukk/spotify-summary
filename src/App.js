import logo from './logo.svg';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import MainComponent from './components/MainComponent'
import Layout from './components/Layout'

function App(props) {
  console.log(props.location)
  return (
    <div>
      <MainComponent />
    </div>
  );
}

export default App;


