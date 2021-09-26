import axios from 'axios';
import './App.css';
import { useEffect, useRef, useState } from 'react';
function App() {
  const rawData = useRef([]);
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState('');

  const handleOnchangeInput = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  useEffect(() => {
    (async () => {
      const result = await axios.get('https://api.publicapis.org/categories');
                const test = await axios.get('https://codequiz.azurewebsites.net/')
                console.log(test.data)
      rawData.current = result.data;
      setFilteredData(rawData.current);
    })();
  }, []);

  useEffect(() => {
    if (input === '') return setFilteredData(rawData.current);

    const filterData = rawData.current.filter((data) => data.toLowerCase().includes(input.toLowerCase()));

    setFilteredData(filterData);
  }, [input]);

  return (
    <div className='App'>
      <input type='text' value={input} onChange={handleOnchangeInput} />
      <ul>
        {filteredData?.map((data) => (
          <li>{data}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
