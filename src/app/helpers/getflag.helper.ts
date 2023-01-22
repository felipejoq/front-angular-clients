export const getFlagHelper = (code: any) => {
  const codePoints = code
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
