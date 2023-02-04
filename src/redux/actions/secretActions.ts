import { Alias } from "../aliases/types";
import { Actions } from "./index";

export const updateSecret = (code: string) => ({
  type: Actions.Secret.SET,
  payload: { code }
});

export const generateSecret = () => ({
  type: Alias.Secret.GENERATE
});
