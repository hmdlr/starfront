import { collectedReducer, Collectible } from "../reducers/collectedReducer";

export const selectCollected = (state: any): Collectible => state.collectedReducer;
