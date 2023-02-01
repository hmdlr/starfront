import { v4 as uuidv4 } from "uuid";
import { store } from "../redux/store";
import { updateSecret } from "../redux/actions/secretActions";

export const generateCode = () => `${uuidv4()}${uuidv4()}`;

export const saveCode = (code: string) => {
  store.dispatch(updateSecret(code));
};
