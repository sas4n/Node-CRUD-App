const mongoose = require('mongoose')
const Schema = mongoose.Schema

const snippetSchema = new Schema({
    title:{
        type: string,
        required: true,
        maxLength:60
    },
    body: {
        type: string,
        required: true,
        maxLength: 1000
    }
}, {timestamp : true})

const Snippet = mongoose.model('Snippet', snippetSchema)
module.exports = Snippet