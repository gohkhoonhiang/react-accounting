import React from 'react';
import { Button } from '@blueprintjs/core';
import axios from 'axios';
import { useAuthDispatch } from '../AuthContext';
import './Auth.css';

function Logout() {
  const dispatch = useAuthDispatch();

  function submitLogout(e) {
    e.preventDefault();
    const token = localStorage.getItem('go-accounting-auth');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE}/logout`, { headers })
      .then(() => {
        localStorage.removeItem('go-accounting-auth');
        dispatch({
          type: 'logout'
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="Auth-container">
      <h1>Logout</h1>
      <div className="buttons">
        <Button intent="Primary" onClick={submitLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Logout;
