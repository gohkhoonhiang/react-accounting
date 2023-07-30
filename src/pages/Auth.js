import { React, useState } from 'react';
import { useAuth } from '../AuthContext.js';
import { Tab, Tabs } from '@blueprintjs/core';
import Login from './Login.js';
import Loading from '../Loading.js';
import Signup from './Signup.js';
import './Auth.css';

function Auth() {
  const token = useAuth();
  const loading = token === 'loading';

  const [selectedTabId, setSelectedTabId] = useState('login');

  function handleTabChange(tabId) {
    setSelectedTabId(tabId);
  }

  return (
    <div className="Auth-main">
      {loading ? (
        <Loading />
      ) : (
        <Tabs id="login" onChange={handleTabChange} selectedTabId={selectedTabId}>
          <Tab id="login" title="Login" panel={<Login />} />
          <Tab id="signup" title="Signup" panel={<Signup />} />
        </Tabs>
      )}
    </div>
  );
}

export default Auth;
