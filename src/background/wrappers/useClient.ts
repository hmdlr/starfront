import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { storageRetrieve } from "../../persistence/chromeStorage";
import env from "../../env";

const defaultOptions: AxiosRequestConfig = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export interface StarClient {
  get: <T>(url: string, options?: any) => Promise<AxiosResponse<T>>;
  post: <T>(url: string, data: any, options?: any) => Promise<AxiosResponse<T>>;
  put: <T>(url: string, data: any, options?: any) => Promise<AxiosResponse<T>>;
  delete: <T>(url: string, options?: any) => Promise<AxiosResponse<T>>;
}

const clientContext: {
  client: StarClient
} = {
  client: {
    get: (url: string, options?: any) => axios.get(url, { ...defaultOptions, ...options }),
    post: (url: string, data: any, options?: any) => axios.post(url, data, { ...defaultOptions, ...options }),
    put: (url: string, data: any, options?: any) => axios.put(url, data, { ...defaultOptions, ...options }),
    delete: (url: string, options?: any) => axios.delete(url, { ...defaultOptions, ...options }),
  }
};

export const useClient = async (): Promise<StarClient> => {
  await injectToken();
  return clientContext.client;
};

async function injectToken() {
  const token: string | undefined = await storageRetrieve(env.tokenLocation);
  if (!token) {
    axios.interceptors.request.clear();
    return;
  }

  axios.interceptors.request.clear();
  axios.interceptors.request.use((config) => {
    if (!config.headers) {
      config.headers = {};
    }
    // @ts-ignore
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}
