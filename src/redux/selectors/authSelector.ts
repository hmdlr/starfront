export const selectUsername = (state: any): string => state.authReducer.username;

export const selectJwt = (state: any): string => state.authReducer.jwt;
