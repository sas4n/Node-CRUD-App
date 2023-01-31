const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const snippetSchema = new Schema({
  title: {
    type: String,
    required: [true, 'All fields are required'],
    maxLength: [60, 'You exceeds the maximum length of the field']
  },
  content: {
    type: String,
    required: [true, 'All fields are required'],
    maxLength: [1000, 'You exceed the maximum length of the field']
  },
  ownerId: {
    type: String,
    required: true
  }
}, { timestamp: true })

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'All fields are required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'All fields are required'],
    minLength: [10, 'password should be at least 10 characters'],
    maxLength: 100
  }
})

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10)
})

/**
 *Compares the password user provides by the on in database and if user is authenticated, returns the user.

 * @param {string} username usernam.
 * @param {string} password password.
 */
userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })

  if (!user || !(await bcrypt.compare(password, user.password))) {
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
