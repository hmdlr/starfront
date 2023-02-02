import { SecretAction } from "../reducers/secretReducer";
import { Alias } from "../aliases/types";

export const updateSecret = (code: string) => ({
  type: SecretAction.SET,
  payload: { code }
});

export const generateSecret = () => ({
  type: Alias.Secret.GENERATE
});
