import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import '../styles/App.css';
import { Store } from "webext-redux";
import env from "../env";
import { storageRetrieve } from "../persistence/chromeStorage";
import { Welcome } from './screens/welcome';

/**
 * Popup react page
 * @constructor
 */
export const App = () => {
  const store = new Store({
    portName: env.commPort
  });

  const [isAuth, setIsAuth] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const token: string | undefined = await storageRetrieve(env.tokenLocation);
      if (token) {
        setIsAuth(true);
      }
      setLoaded(true);
    })();
  }, []);

  return (
      <div className={'gradient-body'}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
          {
              !loaded && (
                  <ReactLoading type={"spin"} color={'#094a80'}/>
              )
          }
          {
              loaded && (
                  isAuth ? (
                      <div>
                        <h1>Authenticated</h1>
                      </div>
                  ) : (
                      <Welcome/>
                  )
              )
          }
        </div>
      </div>
  );
};
