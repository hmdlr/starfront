import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Store, applyMiddleware } from 'webext-redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reportWebVitals from './reportWebVitals';
import env from './env';
import { App } from './popup';
import { ProvideAuth } from "./popup/hooks/useAuth";


const proxyStore = new Store({ portName: env.commPort });

const middleware = [thunkMiddleware];
const proxyStoreWithMiddleware = applyMiddleware(proxyStore, ...middleware);

proxyStoreWithMiddleware.ready().then(() => {
  ReactDOM.render(
      <Provider store={proxyStoreWithMiddleware}>
        <React.StrictMode>
          <ProvideAuth>
            <App/>
          </ProvideAuth>
        </React.StrictMode>
      </Provider>,
      document.getElementById('root')
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
