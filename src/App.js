import logo from './logo.svg';
import './App.css';
import { Button } from "@blueprintjs/core";

function popup() {
  alert('Hello world!');
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello World
        </p>

        <Button intent="success" text="Click Me!" onClick={popup} />

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
