import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './style/style.scss';
import GetMarvelData from "./services/GetMarvelData";

const NewGetMarvelData = new GetMarvelData();
NewGetMarvelData.resPost().then(data => console.log(data));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

