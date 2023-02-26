import env from "../../env";
import { storageRetrieve } from "../../persistence/chromeStorage";

export const defaultOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  }
};

const clientContext = {
  client: {
    get: (url: string, options: RequestInit = {}) => starfetch(url, {
      ...defaultOptions,
      ...options
    } as RequestInit),
    post: (url: string, options: RequestInit = {}) => starfetch(url, {
      ...defaultOptions,
      method: "POST",
      ...options
    } as RequestInit),
    put: (url: string, options: RequestInit = {}) => starfetch(url, {
      ...defaultOptions,
      method: "PUT",
      ...options
    } as RequestInit),
    delete: (url: string, options: RequestInit = {}) => starfetch(url, {
      ...defaultOptions,
      method: "DELETE",
      ...options
    } as RequestInit)
  }
};

export const useClient = (): typeof clientContext.client => {
  return clientContext.client;
};

async function starfetch(input: RequestInfo, init?: RequestInit) {
  const token: string | undefined = await storageRetrieve(env.tokenLocation);
  return fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    } as HeadersInit
  });
}
