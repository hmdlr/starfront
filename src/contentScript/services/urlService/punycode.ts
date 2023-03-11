export const isPunycode = (url: string): boolean => {
  const regex = /^(xn--[a-z0-9\-]{1,59}|xn--)$/i;
  const matches = url.match(regex);
  return matches ? matches.length > 0 : false;
}
