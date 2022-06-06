import logo from './logo.svg';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import './App.css';
import User from './components/UserComponent';
import Artists from './components/ArtistsComponent'
import Topbar from './components/TopbarComponent';
import Tracks from './components/TracksComponent'
import Settings from './components/SettingsComponent';

function App(props) {
  return (
    <BrowserRouter>
      <div>
        <Topbar />
      </div>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="artists" element={<Artists />} />
        <Route path="tracks" element={<Tracks />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


