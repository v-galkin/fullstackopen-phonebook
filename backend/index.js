const express = require('express');
const morgan = require('morgan');
const app = express();

const connectToDatabase = require('./db/connect');
const phonebookRouter = require('./controllers/phonebook');

morgan.token('body', (request) => JSON.stringify(request.body));
app.use(express.json());
app.use(express.static('dist'));

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

connectToDatabase();

app.use(phonebookRouter);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
