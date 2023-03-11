import { Alias } from "./types";
import { useClient } from "../../background/wrappers/useClient";
import { InvokePayload } from "../../common/models";
import { store } from "../store";

export const invokerAliases = {
  [Alias.Invoker.INVOKE]: (props: { payload: InvokePayload }) => (async () => {
    const client = useClient();
    const { payload } = props;
    console.log(payload);
    const response = await client.request(payload.url, payload.options);
    console.log(response);
    store.dispatch({
      type: `INVOKER_RESULT/${payload.url}`,
      payload: { response: await response.json() }
    });
  })
};
