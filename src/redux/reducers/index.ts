import { combineReducers } from 'redux';
import { collectedReducer } from "./collectedReducer";
import { secretReducer } from "./secretReducer";
import { withHydration } from "../../background/wrappers/withHydration";
import { Paths } from "../paths";
import { authReducer } from "./authReducer";
import { invokerReducer } from "./invokerReducer";

export default combineReducers({
  [Paths.Collected]: collectedReducer,
  [Paths.Secret]: withHydration(secretReducer),
  [Paths.Auth]: withHydration(authReducer),
  [Paths.Invoker]: invokerReducer
});
