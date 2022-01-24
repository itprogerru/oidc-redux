import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {OidcReducer} from "./Reducer/Reducer";
import {OidcProviderRedux} from "./reduxProvider/OidcProviderRedux";
import {InMemoryWebStorage} from "./service/authenticationService";
import {BrowserRouter} from "react-router-dom";

export const store = configureStore({
    reducer: {
        oidc: OidcReducer
    },
})

const config = {
    authority: 'https://accounts.google.com',
    client_id:
        '1066073673387-undfdseanu1soilcdprq1p4m8gq8a1iu.apps.googleusercontent.com',
    response_type: 'id_token',
    redirect_uri: 'http://localhost:3000/',
    automaticSilentRenew: true,
}

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <OidcProviderRedux configuration={config} store={store} UserStore={InMemoryWebStorage}>
              <BrowserRouter>
                  <App />
              </BrowserRouter>
          </OidcProviderRedux>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
