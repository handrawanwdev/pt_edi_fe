import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import 'primeicons/primeicons.css';
// import "primereact/resources/themes/bootstrap4-light-purple/theme.css";
// import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
// import "primereact/resources/themes/bootstrap4-dark-purple/theme.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
  // <React.StrictMode>
    // <App />
  // </React.StrictMode>
// );
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
