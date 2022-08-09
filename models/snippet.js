const mongoose = require('mongoose')
const Schema = mongoose.Schema

const snippetSchema = new Schema({
    title:{
        type: string,
        required: true,
        maxLength:60
    },
    content: {
        type: string,
        required: true,
        maxLength: 1000
    },
    ownerId: {
        type: string,
        required: true,
    }
}, {timestamp : true})

const userSchema = new Schema({
    username:{
        type: string,
        required: true,
        unique: true
    },
    password:{
        type: string,
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