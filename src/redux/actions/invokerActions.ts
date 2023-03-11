import { Alias } from "../aliases/types";

export const callInvoke = (payload: any) => ({
  type: Alias.Invoker.INVOKE,
  payload
});
