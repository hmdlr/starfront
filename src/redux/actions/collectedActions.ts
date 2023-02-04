import { Collectible } from "../reducers/collectedReducer";
import { Actions } from "./index";

export const updateCollected = (collectible: Partial<Collectible>) => ({
  type: Actions.Collected.UPDATE,
  payload: collectible
});
