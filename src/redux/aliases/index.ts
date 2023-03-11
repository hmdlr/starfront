import { secretAliases } from "./secretAliases";
import { authAliases } from "./authAliases";
import { invokerAliases } from "./invokerAliases";

export default {
  ...secretAliases,
  ...authAliases,
  ...invokerAliases
};
