const mongoose = require('mongoose')
const Schema = mongoose.Schema

const snippetSchema = new Schema({
    title:{
        type: String,
        required: true,
        maxLength:60
    },
    content: {
        type: String,
        required: true,
        maxLength: 1000
    },
    ownerId: {
        type: String,
        required: true,
    }
}, {timestamp : true})

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength:6,
        maxLength:100
    }
})

const Snippet = mongoose.model('Snippet', snippetSchema)
const User = mongoose.model('User', userSchema)
module.exports = {
    Snippet,
    User
}