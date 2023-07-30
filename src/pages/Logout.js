import React, { useState } from 'react';
import { Button } from '@blueprintjs/core';
import axios from 'axios';
import './Auth.css';
import { useNavigate } from 'react-router';
import Loading from '../Loading.js';

function Logout() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function submitLogout(e) {
    e.preventDefault();
    const token = localStorage.getItem('go-accounting-auth');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    setLoading(true);

    axios
      .post(`${process.env.REACT_APP_API_BASE}/logout`, { headers })
      .then(() => {
        localStorage.removeItem('go-accounting-auth');
        setTimeout(() => {
          navigate('/login');
        }, 500);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  if (loading) {
    return <Loading />;
  } else {
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
}

export default Logout;
