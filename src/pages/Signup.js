import React from 'react';
import './Auth.css';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import { useState } from 'react';
import { useAuth, useAuthDispatch } from '../AuthContext';
import axios from 'axios';

function Signup() {
  const dispatch = useAuthDispatch();
  const token = useAuth();
  const loginError = token === 'error';
  const signupSuccess = token === 'signup';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const matchPassword = password === '' || confirmPassword === '' || password === confirmPassword;
  const submitDisabled =
    !matchPassword || username === '' || password === '' || confirmPassword === '';

  function submitSignup(e) {
    e.preventDefault();

    dispatch({
      type: 'loading'
    });

    const headers = {
      'Content-Type': 'application/json'
    };

    const body = {
      username,
      password,
      confirmPassword
    };

    axios
      .post(`${process.env.REACT_APP_API_BASE}/signup`, body, { headers })
      .then(() => {
        dispatch({
          type: 'signup'
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: 'error'
        });
      });
  }

  function clearSignup(e) {
    e.preventDefault();
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  }

  return (
    <div className="Auth-container">
      <h1>Signup</h1>

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

        <FormGroup label="Confirm Password" labelFor="confirmPassword" labelInfo="(required)">
          <InputGroup
            id="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>
      </div>

      <div className="buttons">
        <Button intent="Primary" onClick={submitSignup} disabled={submitDisabled}>
          Submit
        </Button>
        <Button onClick={clearSignup}>Clear</Button>
      </div>

      {!matchPassword ? <div className="error">Password mismatch</div> : <></>}
      {loginError ? <div className="error">Invalid credentials</div> : <></>}
      {signupSuccess ? <div className="success">Signup successful!</div> : <></>}
    </div>
  );
}

export default Signup;
