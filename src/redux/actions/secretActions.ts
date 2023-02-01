import { SecretAction } from "../reducers/secretReducer";

export const updateSecret = (code: string) => ({
  type: SecretAction.SET,
  payload: { code }
});

export const generateSecret = () => ({
  type: SecretAction.GENERATE
});
