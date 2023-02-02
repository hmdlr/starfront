import { v4 as uuidv4 } from "uuid";
import { updateSecret } from "../actions/secretActions";
import { Alias } from "./types";
import { withPersist } from "../../background/wrappers/withPersist";

export const secretAliases = {
  [Alias.Secret.GENERATE]: () => withPersist(updateSecret(generateCode()), 5 * 60 * 1000)
};

function generateCode() {
  return `${uuidv4()}${uuidv4()}`;
}
