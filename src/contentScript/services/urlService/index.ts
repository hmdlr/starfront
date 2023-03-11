import * as shorteners from "./shorteners.json";

export const countUrlSymbols = (url: string) => {
  const regex = /[^a-zA-Z.\/:]/g;
  const matches = url.match(regex);
  return matches ? matches.length : 0;
};

export const isHostIp = (host: string): boolean => (
    host.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g) !== null
);

export const isShortenedUrl = (url: string): boolean => {
  const host = new URL(url).host;

  const shortenerList = shorteners.hosts as string[];
  return shortenerList.includes(host);
}
