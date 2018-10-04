const capitalizeFirstLetter = str => {
  str = str.split(' ');

  for (let i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(' ');
};

export default capitalizeFirstLetter;
