const express = require('express');
const morgan = require('morgan');
const app = express();

const connectToDatabase = require('./db/connect');
const phonebookRouter = require('./controllers/phonebook');
const { errorHandler, unknownEndpoint } = require('./utils/middleware');

morgan.token('body', (request) => JSON.stringify(request.body));

connectToDatabase();

app.use(express.json());
app.use(express.static('dist'));

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.use('/api/phonebook', phonebookRouter);

app.use(errorHandler);
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
