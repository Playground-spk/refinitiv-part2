export default () => {
  const cache = { 0: true, 1: true };
  let frist = 0;
  let second = 1;

  return function (num) {
    if (cache[num]) {
      console.log('cache!!');
      return cache[num];
    }
    if (num < second) return false;

    while (true) {
      let tempSecond = second;
      second += frist;

      cache[second] = true;
      frist = tempSecond;
      if (num < second) break;
    }

   
    return !!cache[num];
  };
};
