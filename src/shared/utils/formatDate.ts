const formatDate = (date: Date = new Date()) => {
    const day = date.getDate() + '';
    const month = (date.getMonth() + 1) + ''; //Months are zero based
    const year = date.getFullYear() + '';

    const hours = date.getUTCHours() + '';
    const minutes = date.getUTCMinutes() + '';

    return `(${year.padStart(2, '0')}_${month.padStart(2, '0')}_${day.padStart(2, '0')} ${hours.padStart(2, '0')}_${minutes.padStart(2, '0')})`;
};

export default formatDate;
