import { Alias } from "./types";
import { useClient } from "../../background/wrappers/useClient";
import { InvokePayload } from "../../common/models";
import { store } from "../store";

export const invokerAliases = {
  [Alias.Invoker.INVOKE]: (props: { payload: InvokePayload }) => (async () => {
    const { payload } = props;
    const response = await useClient().request(payload.url, payload.options);
    store.dispatch({
      type: `INVOKER_RESULT/${payload.url}`,
      payload: { response: await response.json() }
    });
  })
};
