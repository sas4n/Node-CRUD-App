const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

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
        unique: [true, 'this username is not available'],
    },
    password:{
        type: String,
        required: true,
        minLength:[10,'password should be at least 10 characters'],
        maxLength:100
    }
})

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.static.authenticate = async function(username, password) {
    const user = await this.findOne({ username})

    if (!user || !await bcrypt.compare(password, this.password)) {
        throw new Error('username/password is incorrect')
    }
    return user
}

const Snippet = mongoose.model('Snippet', snippetSchema)
const User = mongoose.model('User', userSchema)
module.exports = {
    Snippet,
    User
}