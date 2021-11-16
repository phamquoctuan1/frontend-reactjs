export const capitalizeString = (str: string) => {
  if (!str) return '';
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};
export const numberWithCommas = (num: number | undefined) =>
  num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VNĐ';
export const getMarkColor = (mark: number): string => {
  if (mark >= 8) return 'green';
  if (mark >= 4) return 'goldenrod';
  return 'red';
};


