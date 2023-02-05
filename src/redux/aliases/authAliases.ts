import { Alias } from "./types";
import { withPersist } from "../../background/wrappers/withPersist";
import { setJwt } from "../actions/authActions";

export const authAliases = {
  [Alias.Auth.STORE_TOKEN]: (token: string) => withPersist(setJwt(token)),
  [Alias.Auth.CLEAR_TOKEN]: () => withPersist(setJwt('')),
}
