const addPrecedingZero = (dateString) => {
  if (dateString.length === 1) {
    return `0${dateString}`;
  }
  return dateString;
};

export default addPrecedingZero;
