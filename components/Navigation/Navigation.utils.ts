const formatTooltipContent = (content: string): string => {
  if (content === '/') {
    return 'Home';
  }
  return content
    .replace(/^\//, '')
    .split('/')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default formatTooltipContent;
