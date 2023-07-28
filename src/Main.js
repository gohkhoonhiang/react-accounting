import { React, useState } from 'react';
import Login from './pages/Login.js';
import Logout from './pages/Logout.js';
import Loading from './Loading.js';
import Signup from './pages/Signup.js';
import { useAuth, useAuthDispatch } from './AuthContext.js';
import { Tab, Tabs } from '@blueprintjs/core';

function Main() {
  const dispatch = useAuthDispatch();
  const token = useAuth();
  const loading = token === 'loading';
  const error = token === 'error';
  const signup = token === 'signup';
  const valid = !error && !signup && token !== null;

  const [selectedTabId, setSelectedTabId] = useState('login');

  function handleTabChange(tabId) {
    setSelectedTabId(tabId);
    dispatch({
      type: 'logout'
    });
  }

  if (loading) {
    return <Loading />;
  } else if (valid) {
    return <Logout />;
  } else {
    return (
      <Tabs id="login" onChange={handleTabChange} selectedTabId={selectedTabId}>
        <Tab id="login" title="Login" panel={<Login />} />
        <Tab id="signup" title="Signup" panel={<Signup />} />
      </Tabs>
    );
  }
}

export default Main;
