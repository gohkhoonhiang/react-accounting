import React from 'react';
import './Auth.css';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import { useState } from 'react';
import { useAuth, useAuthDispatch } from '../AuthContext';
import axios from 'axios';

function Login() {
  const dispatch = useAuthDispatch();
  const token = useAuth();
  const loginError = token === 'error';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitDisabled = username === '' || password === '';

  function submitLogin(e) {
    e.preventDefault();

    dispatch({
      type: 'loading'
    });

    const headers = {
      'Content-Type': 'application/json'
    };

    const body = {
      username,
      password
    };

    axios
      .post(`${process.env.REACT_APP_API_BASE}/login`, body, { headers })
      .then((response) => {
        const token = response.data['token'];
        localStorage.setItem('go-accounting-auth', token);
        dispatch({
          type: 'login',
          token
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: 'error'
        });
      });
  }

  function clearLogin(e) {
    e.preventDefault();
    setUsername('');
    setPassword('');
    dispatch({
      type: 'logout'
    });
  }

  return (
    <div className="Auth-container">
      <h1>Login</h1>

      <div className="inputs">
        <FormGroup label="Username" labelFor="username" labelInfo="(required)">
          <InputGroup
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>

        <FormGroup label="Password" labelFor="password" labelInfo="(required)">
          <InputGroup
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
      </div>

      <div className="buttons">
        <Button intent="Primary" onClick={submitLogin} disabled={submitDisabled}>
          Submit
        </Button>
        <Button onClick={clearLogin}>Clear</Button>
      </div>

      {loginError ? <div className="error">Invalid credentials</div> : <></>}
    </div>
  );
}

export default Login;
