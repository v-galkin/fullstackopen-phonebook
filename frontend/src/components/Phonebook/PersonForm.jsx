import { useState } from 'react';

const PersonForm = ({ onAddPerson }) => {
  const [newPerson, setNewPerson] = useState('Name');
  const [newNumber, setNewNumber] = useState('Number');

  const handlePersonChange = (event) => {
    setNewPerson(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddPerson({ name: newPerson, number: newNumber });
    setNewPerson('Name');
    setNewNumber('Number');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input value={newPerson} onChange={handlePersonChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add / Update</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
