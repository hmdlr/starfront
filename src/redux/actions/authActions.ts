import { Actions } from "./index";
import { getParsedJwt } from "../../background/utils/utils";
import { Alias } from "../aliases/types";

export const setJwt = (jwt: string | undefined) => ({
  type: Actions.Auth.SET_JWT,
  payload: {
    jwt: jwt,
    username: jwt ? getParsedJwt<{ username: string }>(jwt)?.username : undefined
  }
});

export const clearJwt = () => ({
  type: Alias.Auth.CLEAR_TOKEN,
});

export const pingForJwt = () => ({
  type: Alias.Auth.PING_FOR_TOKEN,
});

export const pongForJwt = (token: string | undefined) => ({
  type: Alias.Auth.PONG_FOR_TOKEN,
  payload: {
    jwt: token,
  }
});
