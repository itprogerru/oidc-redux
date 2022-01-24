import React from 'react';
import logo from './logo.svg';
import './App.css';
import OidcSecure, {oidcSecure} from "./secure/OidcSecure";
import {Route, Routes} from 'react-router-dom';
import {useOidc} from "./hooks/useOidc";



const CustomAuthenticatingComponent = () => <div>Authenticating ...</div>;

const ProtectedChild = () => {
    const { logout } = useOidc();

    return (
        <OidcSecure authenticating={CustomAuthenticatingComponent}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Protected</h1>
                </header>
                <button onClick={logout}>logout</button>
            </div>
        </OidcSecure>
    );
}

const NotProtectedChild = () => (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Not Default Protected</h1>
        </header>
    </div>
);


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
        <Routes>
        <Route path="/not-protected" element={<ProtectedChild />} />
        <Route path="/protected" element={<NotProtectedChild/>} />
        </Routes>
    </div>
  );
}

export default App;
