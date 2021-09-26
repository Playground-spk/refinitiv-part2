export default () => {
    let cache = {0:false};

    return function (num) {
      if (cache[num] || cache[num] === false) {
    
        console.log('cache!!');
        return cache[num];
      }
      let isPrime = true;
      for (let i = 2; i < num; i++) {
        if (num % i === 0) {
          isPrime = false;
          break;
        }
      }
      cache[num] = isPrime;
      
      return isPrime;
    };
  };