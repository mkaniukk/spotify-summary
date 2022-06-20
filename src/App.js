import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import store from './store'
import { Provider } from 'react-redux'
import './App.css';
import User from './Components/UserComponent';
import Artists from './Components/ArtistsComponent'
import Topbar from './Components/NavbarComponent';
import Tracks from './Components/TracksComponent'
import Settings from './Components/SettingsComponent';
import NotFoundPage from './Components/NotFoundPageComponent';

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


