const formatDate = (date: Date = new Date()) => {
  const day = date.getDate();
  const month = date.getMonth() + 1; //Months are zero based
  const year = date.getFullYear();

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  return `(${day}-${month}-${year} ${hours}hr ${minutes}min ${seconds}sec UTC)`;
};

export default formatDate;
