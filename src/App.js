import logo from './logo.svg';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Artists from './components/ArtistsComponent'
import Topbar from './components/TopbarComponent';

function App(props) {
  console.log(props.location)
  return (
    <BrowserRouter>
      <div>
        <Topbar />
      </div>
      <Routes>
        <Route path="/" element={<Artists />}>
          <Route path="artists" element={<Artists />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


