const mongoose = require('mongoose');

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: {
        type:string,
        validate: {
            validator: function(v) {
                return /^\d{2,3}-\d+$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number`
        },
        required: [true, 'User phone number required']
    }
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v   
    }
})

const PhonebookEntry = mongoose.model('PhonebookEntry', phonebookSchema, "phonebookEntries");   

module.exports = PhonebookEntry