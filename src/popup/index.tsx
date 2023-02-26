import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import '../styles/App.css';
import { Welcome } from './screens/welcome';
import { useSelector } from "react-redux";
import { selectUsername } from "../redux/selectors/authSelector";

/**
 * Popup react page
 * @constructor
 */
export const App = () => {
  const username = useSelector(selectUsername);

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
            username ? (
                <div>
                  <h1>Authenticated</h1>
                </div>
            ) : (
                <Welcome/>
            )
          }
        </div>
      </div>
  );
};
