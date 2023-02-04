import { Paths } from "../paths";

export const Actions = {
  Secret: {
    SET: `${Paths.Secret}/SET_SECRET`,
  },
  Collected: {
    UPDATE: `${Paths.Collected}/UPDATE_COLLECTION`
  }
} as const;
