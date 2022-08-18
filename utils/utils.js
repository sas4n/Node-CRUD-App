/**
 *
 * @param req
 * @param res
 * @param next
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
 *
 * @param req
 * @param res
 * @param next
 */
const isAuthorized = (req, res, next) => {
    if (req.session.userId === req.body.ownerId || req.session.userId === req.query.ownerId) { // query.ownerId for edit since it s a get request we can't send data and req.body.ownerId for delet since it s post request and we can send data
      return next()
    }
    const error = new Error('You are not authorized to modify others\' snippets')
    error.status = 403
    return next(error)
  }

  const errorHandler = (err) => {
    let errorsMessage = ''
    if(err.message.includes('Snippet validation failed')){
      errorsMessage = Object.values(err.errors)[0].properties.message
      return errorsMessage
    }
    if(err.message.includes('User validation failed')){
      errorsMessage = Object.values(err.errors)[0].properties.message
      return errorsMessage
    }
    if(err.code === 11000){
      errorsMessage = 'This username is not avaliable, select another username'
      return errorsMessage
    }
    
  }

  module.exports = {
    isAuthenticated,
    isAuthorized,
    errorHandler
  }