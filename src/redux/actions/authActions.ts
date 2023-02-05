import { Actions } from "./index";
import { getParsedJwt } from "../../background/utils/utils";
import { Alias } from "../aliases/types";

export const setJwt = (jwt: string) => ({
  type: Actions.Auth.SET_JWT,
  payload: {
    jwt,
    username: jwt ? getParsedJwt<{ username: string }>(jwt)?.username : ''
  }
});

export const clearJwt = () => ({
  type: Alias.Auth.CLEAR_TOKEN,
});
