export const hasSsl = (url: string): boolean => {
  const protocol = new URL(url).protocol;
  return protocol === "https:";
}

