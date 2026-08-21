const express = require('express');
const morgan = require('morgan');
const app = express();

morgan.token('body', (request) => JSON.stringify(request.body));
app.use(express.json());
app.use(express.static('dist'));

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

let phonebook = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

// Get all phonebook entries from phonebook
app.get('/api/phonebook', (request, response) => {
  response.json(phonebook);
});

// Get phonebook entry from phonebook by id
app.get('/api/phonebook/:id', (request, response) => {
  const id = request.params.id;
  const phonebookEntry = phonebook.find(
    (phonebookEntry) => phonebookEntry.id === id
  );

  if (phonebookEntry) {
    response.json(phonebookEntry);
  } else {
    response.status(404).end();
  }
});

// Add a new entry to the phonebook
const generateId = () => {
  const maxId =
    phonebook.length > 0
      ? Math.max(
          ...phonebook.map((phonebookEntry) => Number(phonebookEntry.id))
        )
      : 0;

  return String(maxId + 1);
};

const validatePhonebookEntry = (body, phonebook) => {
  if (!body.name || !body.number) {
    return 'Name or number missing';
  }

  const nameExists = phonebook.some(
    (phonebookEntry) => phonebookEntry.name === body.name
  );

  if (nameExists) {
    return 'Name already exists in the phonebook';
  }

  return null;
};

app.post('/api/phonebook', (request, response) => {
  const body = request.body;

  const validationError = validatePhonebookEntry(body, phonebook);

  if (validationError) {
    return response.status(400).json({ error: validationError });
  }

  const newPhonebookEntry = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  phonebook = phonebook.concat(newPhonebookEntry);

  response.json(newPhonebookEntry);
});

// Update phonebook entry by id
app.put('/api/phonebook/:id', (request, response) => {
  const id = request.params.id;
  const body = request.body;

  const validationError = validatePhonebookEntry(body, phonebook);
  
  if (validationError) {
    return response.status(400).json({ error: validationError });
  }

  const updatedEntry = { id, name: body.name, number: body.number };
  phonebook = phonebook.map((entry) => (entry.id === id ? updatedEntry : entry));

  response.json(updatedEntry);
});

// Delete phonebook entry by id
app.delete('/api/phonebook/:id', (request, response) => {
  const id = request.params.id;
  phonebook = phonebook.filter((phonebookEntry) => phonebookEntry.id !== id);

  response.status(204).end();
});

// Get general information
app.get('/info', (request, response) => {
  const phonebookLength = phonebook.length;
  const dateTime = new Date();

  response.send(`
    <p>Phonebook has info for ${phonebookLength} people.</p>
    <p>${dateTime}</p>
  `);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
