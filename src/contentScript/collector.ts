import { initCollectible } from "../redux/reducers/collectedReducer";

export const collect = () => {
  // url info
  const collectible = initCollectible();

  const host = window.location.host;
  // count the number of numbers and symbols in host
  const urlSymbols = countUrlSymbols(host);
  // todo: similarity to other urls
  // check if url is an IP address
  const isIP = isHostIp(host);
  // check if url is shortened

};

function countUrlSymbols(url: string) {
  const regex = /[^a-zA-Z]/g;
  const matches = url.match(regex);
  return matches ? matches.length : 0;
}

function isHostIp(host: string): boolean {
  return host.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g) !== null;
}

function isShortenedUrl(url: string): boolean {
  // get a list of shortened url services from the BE
  return false;
}
