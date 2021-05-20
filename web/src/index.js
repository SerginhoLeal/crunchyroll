import React from 'react';
import ReactDOM from 'react-dom';
import './GlobalStyles.css';
import BackGround from './Components/Stars styles'
import Routes from './routes/index.routes';

ReactDOM.render(
  <React.StrictMode>
    <BackGround />
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
