const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give password as argument')
  process.exit(1)
}

const urlObject = {
  username: 'galkinvl111_db_user',
  password: process.argv[2],
  cluster: 'fullstackopen-course.iuekxr8.mongodb.net',
  dbName: 'phonebookApp',
  options: '?appName=FullStackOpen-Course'
}

const url = `mongodb+srv://${urlObject.username}:${urlObject.password}@${urlObject.cluster}/${urlObject.dbName}${urlObject.options}`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4})

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// const Phonebook = mongoose.model('Phonebook', phonebookSchema)
const Phonebook = mongoose.model('Phonebook', phonebookSchema, 'phonebookEntries')

const listAllEntries = () => {
  Phonebook.find({}).then((result) => {
    console.log('Phonebook:')
    result.forEach((entry) => {
      console.log(`${entry.name}: ${entry.number}`)
    })
    mongoose.connection.close()
  })
}

const addNewEntry = (name, number) => {
  const phonebookEntry = new Phonebook({ name, number })

  phonebookEntry.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  listAllEntries()
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  addNewEntry(name, number)
} else {
  console.log('Invalid number of arguments')
  console.log('Usage: node mongo.js <password> OR node mongo.js <password> <name> <number>')
  mongoose.connection.close()
}