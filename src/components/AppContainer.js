import React from 'react';
import { Outlet } from 'react-router-dom';
import './AppContainer.css';

function AppContainer() {
  return (
    <div className="App-container">
      <Outlet />
    </div>
  );
}

export default AppContainer;
