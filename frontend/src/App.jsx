import { useState } from 'react';
import People from './components/Phonebook/People';
import Filter from './components/Phonebook/Filter';
import PersonForm from './components/Phonebook/PersonForm';
import Notification from './components/Phonebook/Notification';
import usePhonebook from './hooks/usePhonebook';

const App = () => {
  const { people, notification, addPerson, deletePerson } = usePhonebook();

  const [searchTerm, setSearchTerm] = useState('');

  const peopleToShow = people.filter((person) =>
    person.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />

      <Filter onSearch={setSearchTerm} />

      <h2>Add a new person</h2>
      <PersonForm onAddPerson={addPerson} />

      <h2>Numbers</h2>
      <People people={peopleToShow} onDelete={deletePerson} />
    </div>
  );
};

export default App;
