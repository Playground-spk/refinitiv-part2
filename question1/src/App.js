import './App.css';
import { useEffect, useState } from 'react';
import IsPrimeWithCache from './utils/IsPrimeWithCache';
import IsFibonacciWithCache from './utils/IsFibonacciWithCache.js';
const IS_PRIME = 'ISPRIME';
const IS_FIBONACCI = 'IS_FIBONACCI';
function App() {
  const [type, setType] = useState(IS_PRIME);
  const [inputNum, setInputNum] = useState(0);
  const [resultOfType, setResultOfType] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChangeInputNum = (e) => {
    let { value } = e.target;
    value = Number(value);
    if (value < 0) return setInputNum(1);

    setInputNum(Math.round(value));
  };

  const handleOnchangeSelect = (e) => {
    const { value } = e.target;
    switch (value) {
      case IS_PRIME:
        setType(IS_PRIME);
        break;
      case IS_FIBONACCI:
        setType(IS_FIBONACCI);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const isPrime = IsPrimeWithCache();
    document.isPrime = isPrime;

    const IsFibonacci = IsFibonacciWithCache();
    document.isFibonacci = IsFibonacci;
  }, []);

  useEffect(() => {
    switch (type) {
      case IS_PRIME:
        setIsLoading(true);
        setTimeout(() => {
          setResultOfType(document.isPrime(inputNum));
          setIsLoading(false);
        }, 0);

        break;
      case IS_FIBONACCI:
        setIsLoading(true);
        setTimeout(() => {
          setResultOfType(document.isFibonacci(inputNum));
          setIsLoading(false);
        }, 0);
        break;

      default:
        break;
    }
  }, [type, inputNum]);

  return (
    <div className='App'>
      <div className='left'>
        <input value={inputNum} type='number' onChange={handleOnChangeInputNum} />
      </div>
      <div className='middle'>
        <select onChange={handleOnchangeSelect}>
          <option value={IS_PRIME}>isPrime</option>
          <option value={IS_FIBONACCI}>IsFibonacci</option>
        </select>
      </div>
      <div className='right'>{isLoading ? 'loading...' : String(resultOfType)}</div>
    </div>
  );
}

export default App;
