import { useState } from 'react';

const Filter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div>
      Filter shown with: <input value={searchTerm} onChange={handleChange} />
    </div>
  );
};

export default Filter;
