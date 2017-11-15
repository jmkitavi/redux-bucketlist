import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import './styles/index.css';

render (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
