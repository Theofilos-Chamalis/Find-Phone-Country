const capitalizeFirstLetter = (str: string) => {
  const strSplits = str.trim().split(' ');

  for (let i = 0, x = strSplits.length; i < x; i++) {
    strSplits[i] = strSplits[i][0].toUpperCase() + strSplits[i].substr(1);
  }

  return strSplits.join(' ');
};

export default capitalizeFirstLetter;
