export const selectSecret = (state: any): string => state.secretReducer.code;

export const selectPublicHalf = (state: any): string => state.secretReducer.publicHalf;
