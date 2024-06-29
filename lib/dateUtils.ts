const getTodayDate = (): string => {
  const today = new Date();
  return today.toLocaleDateString();
};

export default getTodayDate;
