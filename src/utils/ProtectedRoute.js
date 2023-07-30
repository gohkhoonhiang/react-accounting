import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext.js';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const token = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    if (token === null) {
      setIsLoggedIn(false);
      return navigate('/login');
    }
    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
};

export default ProtectedRoute;
