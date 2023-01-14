import { Action, Collectible } from "../reducers/collectedReducer";

export const updateCollected = (collectible: Partial<Collectible>) => ({
  type: Action.UpdateCollection,
  payload: collectible
});
