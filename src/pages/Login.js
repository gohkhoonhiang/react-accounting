import React, { useState } from 'react';
import './Auth.css';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginError = errorMessage !== '';
  const submitDisabled = username === '' || password === '';

  function submitLogin(e) {
    e.preventDefault();

    setLoading(true);

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
        return navigate('/');
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setErrorMessage(err.response.data.error);
      });
  }

  function clearLogin(e) {
    e.preventDefault();
    setUsername('');
    setPassword('');
    setErrorMessage('');
    setLoading(false);
  }

  if (loading) {
    return <Loading />;
  } else {
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

        {loginError ? <div className="error">{errorMessage}</div> : <></>}
      </div>
    );
  }
}

export default Login;
