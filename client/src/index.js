import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers'; // Ensure this import path is correct
import App from './App';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const container = document.getElementById('root'); // Get the root container
const root = createRoot(container); // Create a root instance using the container

// Use the root instance to render the components
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
