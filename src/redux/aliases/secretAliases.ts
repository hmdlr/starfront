import { v4 as uuidv4 } from "uuid";
import { updateSecret } from "../actions/secretActions";
import { Alias } from "./types";
import { withPersist } from "../../background/wrappers/withPersist";
import env from "../../env";
import { Microservice } from "@hmdlr/utils/dist/Microservice";
import { useClient } from "../../background/wrappers/useClient";

export const secretAliases = {
  [Alias.Secret.GENERATE]: () => withPersist(updateSecret(generateCode()), 5 * 60 * 1000)
};

function generateCode() {
  const code = `${uuidv4()}${uuidv4()}`;
  sendExtCode(code);
  return code;
}

async function sendExtCode(code: string) {
  try {
    await useClient().post(`${env.api[Microservice.Authphish]}/api/auth/ext-token`, {
      body: JSON.stringify({
        token: code
      })
    });
  } catch (e) {
    console.error(e);
  }
}
