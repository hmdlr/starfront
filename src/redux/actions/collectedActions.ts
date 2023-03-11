import { Collectible } from "../reducers/collectedReducer";
import { Actions } from "./index";

export const updateCollected = (collectible: Partial<Collectible>) => ({
  type: Actions.Collected.UPDATE,
  payload: collectible
});

export const setCollected = (collectible: Collectible) => ({
  type: Actions.Collected.SET,
  payload: collectible
});
