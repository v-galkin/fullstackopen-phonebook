const phonebookRouter = require('express').Router()
const PhonebookEntry = require('../models/phonebookEntry')

const validatePhonebookEntry = async (body) => {
  if (!body.name || !body.number) {
    return 'Name or number missing';
  }

  const existingEntry = await PhonebookEntry.findOne({ name: body.name });

  if (existingEntry) {
    return 'Name already exists in the phonebook';
  }

  if (body.name.length < 3) {
    return 'Name validation failed: Name must be at least 3 chatacters long';
  }

  if (body.number.length < 8) {
    return 'Number validation failed:Number cannot be less than 8 digits long';
  }

  return null;
};

// ------------------ Backend API Endpoints ------------------
// Create a new phonebook entry
phonebookRouter.post('/', async (request, response, next) => {
  const body = request.body;

  try {
    const validationError = await validatePhonebookEntry(body);

    if (validationError) {
      return response.status(400).json({ error: validationError });
    }

    const phonebookEntry = new PhonebookEntry({
      name: body.name,
      number: body.number,
    });

    const savedEntry = await phonebookEntry.save();
    response.json(savedEntry);
  } catch (error) {
    next(error);
  }
});

// Get all phonebook entries from phonebook
phonebookRouter.get('/', (request, response, next) => {
  PhonebookEntry.find({})
    .then((entries) => response.json(entries))
    .catch((error) => next(error));
});

// Get general information
phonebookRouter.get('/info', (request, response, next) => {
  PhonebookEntry.countDocuments({})
    .then((phonebookLength) => {
      const dateTime = new Date();

      response.send(`
        <p>Phonebook has info for ${phonebookLength} people.</p>
        <p>${dateTime}</p>
      `);
    })
    .catch((error) => next(error));
});

// Get phonebook entry from phonebook by id
phonebookRouter.get('/:id', (request, response, next) => {
  PhonebookEntry.findById(request.params.id)
    .then((phonebookEntry) => {
      if (phonebookEntry) {
        response.json(phonebookEntry);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Update phonebook entry by id
phonebookRouter.put('/:id', (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'Name or number missing' });
  }

  const updatedEntry = { name: body.name, number: body.number };

  PhonebookEntry.findByIdAndUpdate(request.params.id, updatedEntry, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((result) => {
      if (result) {
        response.json(result);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Delete phonebook entry by id
phonebookRouter.delete('/:id', (request, response, next) => {
  PhonebookEntry.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

module.exports = phonebookRouter
