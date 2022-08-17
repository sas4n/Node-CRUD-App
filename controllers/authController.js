const { User } = require('../models/snippet')

/**
 *
 * @param req
 * @param res
 * @param next
 */
const isAuthenticated = (req, res, next) => {
  console.log('here')
  console.log(req.session.userId)
  if (req.session.userId) {
    return next()
  }
  // throw new Error({status: 403, message: 'you need to login first'})
  const error = new Error('you need to login first')
  error.status = 401
  next(error)
  // res.redirect('../authentication/login')
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
const isAuthorized = (req, res, next) => {
  console.log('isAuthorized')
  console.log(req.session.userId)
  console.log(req.body.ownerId)
  console.log(req.query.ownerId)
  if (req.session.userId === req.body.ownerId || req.session.userId === req.query.ownerId) { // query.ownerId for edit since it s a get request we can't send data and req.body.ownerId for delet since it s post request and we can send data
    return next()
  }
  const error = new Error('You are not authorized to modify others\' snippets')
  error.status = 403
  return next(error)
}

/**
 *
 * @param req
 * @param res
 */
const getSignupForm = (req, res, next) => {
  try{
    const viewData = {
      showLogin: true
    }
    res.render('authentication/signup', { viewData})
  }catch(err){
    next(err)
  }
 
}

/**
 *
 * @param req
 * @param res
 */
const postSignupForm = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = new User({ username, password })
    await user.save()
    req.session.flash = { type: 'success', message: `user ${username} saved successfully` }
    res.redirect(302, './login')
  } catch (err) {
   // errorHandler(err)
    req.session.flash = { type: 'error', message: errorHandler(err) }
    res.redirect('signup')
  }
}
/**
 *
 * @param req
 * @param res
 */
const getLoginForm = (req, res, next) => {
  try {
    const viewData = {showLogin: true}
    res.render('authentication/login')
  }catch (err) {
    next(err)
  }
  
}

/**
 *
 * @param req
 * @param res
 */
const postLoginForm = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.authenticate(username, password)
    req.session.userId = user._id
    console.log(req.session)
    req.session.flash = { type: 'success', message: `welcome ${username}` }
    res.redirect(302, '/snippets/all-Snippets')
  } catch (err) {
    req.session.flash = { type: 'error', message: err.message }
    res.redirect('login')
  }
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
const logout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      next(err)
    }
    res.redirect('/authentication/login')
  })
}

const errorHandler = (err) => { 
  //console.log(err.message)
  let errorsMessage = ''
  if(err.message.includes('Snippet validation failed')){
    console.log('already')
    errorsMessage = Object.values(err.errors)[0].properties.message
    console.log(errorsMessage)
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
  getSignupForm,
  postSignupForm,
  getLoginForm,
  postLoginForm,
  isAuthenticated,
  isAuthorized,
  logout,
  errorHandler
}
