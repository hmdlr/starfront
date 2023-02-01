import { combineReducers } from 'redux';
import { collectedReducer } from "./collectedReducer";
import { secretReducer } from "./secretReducer";

export default combineReducers({
  collectedReducer,
  secretReducer
});
