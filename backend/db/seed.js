const mongoose = require('mongoose')
const connectToDatabase = require('./connect')
const PhonebookEntry = require('../models/phonebookEntry')

const initialPhonebookEntries = [
  { name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-44-5323523' },
  { name: 'Dan Abramov', number: '12-43-234345' },
  { name: 'Mary Poppendieck', number: '39-23-6423122' }
]

const seedDatabase = async () => {
  try {
    await connectToDatabase()
    await PhonebookEntry.deleteMany({})
    console.log('Removed existing notes from the database')
    await PhonebookEntry.insertMany(initialPhonebookEntries)
    console.log('Database seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error.message)
  } finally {
    await mongoose.connection.close()
  }
}

seedDatabase()