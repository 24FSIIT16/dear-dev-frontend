/**
 * Truncates a string to a specified maximum length and appends ellipsis if needed.
 * @param str - The string to truncate.
 * @param maxLength - The maximum length of the string.
 * @returns The truncated string with ellipsis if it exceeds the maximum length.
 */
const truncateString = (str: string, maxLength: number): string => {
  if (str.length > maxLength) {
    return `${str.slice(0, maxLength)}...`;
  }
  return str;
};

export default truncateString;
