import { combineReducers } from 'redux';
import { collectedReducer } from "./collectedReducer";
import { secretReducer } from "./secretReducer";
import { withHydration } from "../../background/wrappers/withHydration";

export default combineReducers({
  collectedReducer,
  secretReducer: withHydration(secretReducer)
});
