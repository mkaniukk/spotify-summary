import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import store from './store'
import { Provider } from 'react-redux'
import './App.css';
import User from './components/UserComponent';
import Artists from './components/ArtistsComponent'
import Topbar from './components/NavbarComponent';
import Tracks from './components/TracksComponent'
import Settings from './components/SettingsComponent';
import NotFoundPage from './components/NotFoundPageComponent';

function App(props) {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;


