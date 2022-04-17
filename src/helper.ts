export const uppercaseWords = (str: string): string =>
  str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
