/**
 *A middleware function which in case of user is authenticated pass to the next function, otherwise throws an 401 error.

 * @param {object} req  request object received from client.
 * @param {object} res Response object which sent to client.
 * @param {Function} next a callback function which lets after execution of this function, the next function executed.
 * @returns {Function} a callback function which let the next function to be called.
 */
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next()
  }
  const error = new Error('you need to login first')
  error.status = 401
  next(error)
}

/**
 *It checks if a user is authorized to update or delete a snippet, otherwise it throws a 403 error.

 * @param {object} req  request object received from client.
 * @param {object} res Response object which sent to client.
 * @param {Function} next a callback function which lets after execution of this function, the next function executed.
 * @returns {Function} a callback function which let the next function to be called.
 */
const isAuthorized = (req, res, next) => {
  if (req.session.userId === req.body.ownerId || req.session.userId === req.query.ownerId) { // query.ownerId for edit since it s a get request we can't send data and req.body.ownerId for delet since it s post request and we can send data
    return next()
  }
  const error = new Error('You are not authorized to modify others\' snippets')
  error.status = 403
  return next(error)
}

/**
 *A function to handle the error for each occassion and returns the error message which will be used to show the error in case of not valid data provided or some required fields are empty.

 * @param {object} err An error object.
 * @returns {string} The error message.
 */
const errorHandler = (err) => {
  let errorsMessage = ''
  if (err.message.includes('Snippet validation failed')) {
    errorsMessage = Object.values(err.errors)[0].properties.message
    return errorsMessage
  }
  if (err.message.includes('User validation failed')) {
    errorsMessage = Object.values(err.errors)[0].properties.message
    return errorsMessage
  }
  if (err.code === 11000) {
    errorsMessage = 'This username is not avaliable, select another username'
    return errorsMessage
  }
}

module.exports = {
  isAuthenticated,
  isAuthorized,
  errorHandler
}
