export interface Collectible {
  url: {
    symbols: number; // [0...∞] number of symbols in the url (numbers, special characters)
    knownSimilarity: number; // [0...1] known similarity to other stored urls
    isIP: boolean; // is the url an IP address?
    shortened: boolean; // is the url shortened? [bitly, rebrandly, tinyurl, shortio, etc]
  };
  ssl: {
    has: boolean;
    selfSigned: boolean;
  };
  links: {
    invalidPercentage: number; // [0...1] malformed links and `#`'s
    brokenRedirects: number; // [0...∞] redirects to non-existing pages(404, handled or not)
    trickyRedirects: number; // [0...∞] redirects to pages that are not the same as the original
  };
  favicon: {
    similarity: number; // [0...1] similarity to other favicons
  };
  totalImageSpace: number; // [0...1] the total space that images take up on the page
  mirrorProxy: boolean; // is the page a mirrorProxy? // only checking if favicon matches, and only with the favicon's original domain
  referrerSafe: boolean | undefined; // can either be true, false or undefined (if we don't know, window.location.origin is not always available)
}

export const initCollectible = (): Collectible => ({
  url: {
    symbols: 0,
    knownSimilarity: 0,
    isIP: false,
    shortened: false,
  },
  ssl: {
    has: true,
    selfSigned: false
  },
  links: {
    invalidPercentage: 0,
    brokenRedirects: 0,
    trickyRedirects: 0
  },
  favicon: {
    similarity: 0
  },
  totalImageSpace: 0,
  referrerSafe: undefined,
  mirrorProxy: false
});

const initialState: Collectible = initCollectible();

export enum Action {
  UpdateCollection = 'UPDATE_COLLECTION',
}

export const collectedReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.UpdateCollection:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
