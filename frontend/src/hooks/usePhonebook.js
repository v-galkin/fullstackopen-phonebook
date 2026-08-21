import { useState, useEffect, useRef } from 'react';
import phonebookService from '../services/phonebookService';

const usePhonebook = () => {
  const [people, setPeople] = useState([]);
  // notification shape: { message: string, type: 'success' | 'error' }
  const [notification, setNotification] = useState(null);
  const notificationTimeoutRef = useRef(null);

  // -------------- Logic --------------
  const showNotification = (message, type = 'success') => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    
    setNotification({ message, type });
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null);
      notificationTimeoutRef.current = null;
    }, 5000);
  };

  // -------------- Queries --------------

  // Get all People
  useEffect(() => {
    phonebookService.getAll().then((initialPeople) => {
      setPeople(initialPeople);
    });
  }, []);

  // Create a new Person
  const addPerson = (newPersonData) => {
    const existingPerson = people.find(
      (person) => person.name === newPersonData.name
    );

    if (existingPerson) {
      const updatedPerson = {
        ...existingPerson,
        number: newPersonData.number,
      };

      updatePerson(updatedPerson);
      return;
    }

    const personObject = {
      name: newPersonData.name,
      number: newPersonData.number,
    };

    phonebookService.create(personObject)
      .then((returnedPerson) => {
        showNotification(`Added '${returnedPerson.name}'`, 'success');
        setPeople(people.concat(returnedPerson));
      })
      .catch((error) => {
        showNotification(error.response?.data?.error || 'Failed to add new phonebook entry', 'error');
      })
  };

  // Update an existing Person
  const updatePerson = (personToUpdate) => {
    const id = personToUpdate.id;

    if (
      window.confirm(
        `${personToUpdate.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      phonebookService
        .update(id, personToUpdate)
        .then((returnedPerson) => {
          setPeople(
            people.map((person) => (person.id === id ? returnedPerson : person))
          );
          showNotification(`Updated '${returnedPerson.name}'`, 'success');
        })
        .catch(() => {
          showNotification(
            `Information of '${personToUpdate.name}' has already been removed from server`,
            'error'
          );
          setPeople(people.filter((person) => person.id !== id));
        });
    }
  };

  // Delete an existing person
  const deletePerson = (id) => {
    const person = people.find((person) => person.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .remove(id)
        .then(() => {
          setPeople(people.filter((person) => person.id !== id));
          showNotification(`Deleted '${person.name}'`, 'success');
        })
        .catch(() => {
          showNotification(
            `Information of '${person.name}' has already been removed from server`,
            'error'
          );
          setPeople(people.filter((person) => person.id !== id));
        });
    }
  };

  return {
    people,
    notification,
    addPerson,
    deletePerson,
  };
};

export default usePhonebook;
