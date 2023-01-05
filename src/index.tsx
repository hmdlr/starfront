import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Store } from 'webext-redux';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import env from './env';

const proxyStore = new Store({ portName: env.commPort });

ReactDOM.render(
    <Provider store={proxyStore}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
