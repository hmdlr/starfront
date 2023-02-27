import { Alias } from "./types";
import { withPersist } from "../../background/wrappers/withPersist";
import { pongForJwt, setJwt } from "../actions/authActions";
import { useClient } from "../../background/wrappers/useClient";
import { Microservice } from "@hmdlr/utils/dist/Microservice";
import env from "../../env";
import { store } from "../store";

export const authAliases = {
  [Alias.Auth.STORE_TOKEN]: (token: string) => withPersist(setJwt(token)),
  [Alias.Auth.CLEAR_TOKEN]: () => withPersist(setJwt(undefined)),
  [Alias.Auth.PING_FOR_TOKEN]: () => (async () => {
    const token = await getTokenAuthStatus();
    if (token) {
      store.dispatch(pongForJwt(token));
    }
  }),
  [Alias.Auth.PONG_FOR_TOKEN]: (action: { payload: any, type: string }) => (
      withPersist(setJwt(action.payload?.jwt))
  )
};

async function getTokenAuthStatus() {
  const client = useClient();
  const secret = store.getState().secretReducer.code;
  const response = await client.get(`${env.api[Microservice.Authphish]}/api/auth/ext-token?token=${secret}`);
  const { token } = await response.json();
  return token;
}
