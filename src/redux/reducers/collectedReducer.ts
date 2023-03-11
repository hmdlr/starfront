import { Actions } from "../actions";

export interface Collectible {
  url: {
    symbols: number; // [0...∞] number of symbols in the url (numbers, special characters)
    knownSimilarity: number; // [0...1] known similarity to other stored urls
    isIP: boolean; // is the url an IP address?
    shortened: boolean; // is the url shortened? [bitly, rebrandly, tinyurl, shortio, etc],
    isPunycode: boolean; // is the url punycode?
  };
  ssl: {
    has: boolean;
  };
  links: {
    invalidPercentage: number; // [0...1] malformed links and `#`'s
    trickyPercentage: number; // [0...∞] redirects to pages that are not the same as the original
  };
  favicon: {
    similarity: number; // [0...1] similarity to other favicons
  };
  totalImageSpace: number; // [0...1] the total space that images take up on the page
}

export const initCollectible = (): Collectible => ({
  url: {
    symbols: 0,
    knownSimilarity: 0,
    isIP: false,
    shortened: false,
    isPunycode: false,
  },
  ssl: {
    has: true,
  },
  links: {
    invalidPercentage: 0,
    trickyPercentage: 0
  },
  favicon: {
    similarity: 0
  },
  totalImageSpace: 0,
});

const initialState: Collectible = initCollectible();
export const collectedReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Actions.Collected.UPDATE:
      return {
        ...state,
        ...action.payload
      };
    case Actions.Collected.SET:
      return {
        ...action.payload
      }
    default:
      return state;
  }
};
