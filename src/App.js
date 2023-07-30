import React, { useEffect, useState } from 'react';
import './App.css';
import AppNav from './components/AppNav.js';
import { AuthProvider } from './AuthContext.js';
import AppContainer from './components/AppContainer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    const userToken = localStorage.getItem('user-token');
    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false);
    }
    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return (
    <React.Fragment>
      <div className="App">
        <main className="App-main">
          <AuthProvider>
            <AppNav></AppNav>
            <AppContainer></AppContainer>
          </AuthProvider>
        </main>
      </div>
    </React.Fragment>
  );
}

export default App;
