import React from 'react';
import './Auth.css';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import { useState } from 'react';
import axios from 'axios';
import Loading from '../Loading';

function Signup() {
  const [signupSuccess, setSignupSuccess] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loginError = errorMessage !== '';
  const matchPassword = password === '' || confirmPassword === '' || password === confirmPassword;
  const submitDisabled =
    !matchPassword || username === '' || password === '' || confirmPassword === '';

  function submitSignup(e) {
    e.preventDefault();

    setLoading(true);

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
        setLoading(false);
        setSignupSuccess(true);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setErrorMessage(err.response.data.error);
      });
  }

  function clearSignup(e) {
    e.preventDefault();
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setLoading(false);
    setErrorMessage('');
  }

  if (loading) {
    return <Loading />;
  } else {
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
        {loginError ? <div className="error">{errorMessage}</div> : <></>}
        {signupSuccess ? <div className="success">Signup successful!</div> : <></>}
      </div>
    );
  }
}

export default Signup;
