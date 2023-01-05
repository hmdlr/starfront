import { createStore } from 'redux';
import reducers from './reducers';

// @ts-ignore
export const store = createStore(reducers);
