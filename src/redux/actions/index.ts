import { Paths } from "../paths";

export const Actions = {
  Secret: {
    SET: `${Paths.Secret}/SET_SECRET`,
  },
  Collected: {
    UPDATE: `${Paths.Collected}/UPDATE_COLLECTION`,
    SET: `${Paths.Collected}/SET_COLLECTION`,
  },
  Auth: {
    SET_JWT: `${Paths.Auth}/SET_AUTH`
  },
  Invoker: {
    INVOKE: `${Paths.Invoker}/INVOKE`,
  }
} as const;
