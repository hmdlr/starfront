import { store } from "../../redux/store";
import { selectJwt } from "../../redux/selectors/authSelector";

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
    } as RequestInit),
    request: (url: string, options: RequestInit = {}) => starfetch(url, {
      ...defaultOptions,
      ...options
    } as RequestInit),
  }
};

export const useClient = (): typeof clientContext.client => {
  return clientContext.client;
};

function starfetch(input: RequestInfo, init?: RequestInit) {
  const token: string | undefined = selectJwt(store.getState());
  return fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    } as HeadersInit
  });
}
