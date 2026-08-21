const People = ({ people, onDelete }) => {
  return (
    <div>
      {people.map((person) => (
        <p key={person.id}>
          {person.name}: {person.number}{' '}
          <button onClick={() => onDelete(person.id)}>Delete</button>
        </p>
      ))}
    </div>
  );
};

export default People;
