import React from 'react';
import './App.css';
import { AuthProvider } from './AuthContext.js';
import Main from './Main.js';

function App() {
  return (
    <div className="App">
      <main className="App-main">
        <AuthProvider>
          <Main />
        </AuthProvider>
      </main>
    </div>
  );
}

export default App;
