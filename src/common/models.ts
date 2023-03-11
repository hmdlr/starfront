export interface InvokePayload {
  url: string;
  options: RequestInit;
}

export interface Invoker {
  invoke: <T>(payload: InvokePayload) => Promise<T>;
}
