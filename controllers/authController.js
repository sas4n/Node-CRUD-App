const { User } = require('../models/snippet')
const { errorHandler } = require('../utils/utils')

/**
 * This middleware prepare the signup form for the user.
 *
 * @param {object} req  request object received from client.
 * @param {object} res Response object which sent to client.
 * @param {Function} next a callback function which lets after execution of this function, the next function executed.
 */
const getSignupForm = (req, res, next) => {
  try {
    const viewData = {
      pageTitle: 'Register',
      showLogin: true
    }
    res.render('authentication/signup', { viewData })
  } catch (err) {
    next(err)
  }
}

/**
 * This middleware takes the request from router and takes care of data received in the post request.
 *
 * @description
 *
 * @param {object} req Request object containing the sign up data.
 * @param {object} res Response object will send back the response to the user after signing up.
 */
const postSignupForm = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = new User({ username, password })
    await user.save()
    req.session.flash = { type: 'success', message: `user ${username} saved successfully` }
    res.redirect(302, './login')
  } catch (err) {
    req.session.flash = { type: 'danger', message: errorHandler(err) }
    res.redirect('signup')
  }
}
/**
 *This function render the login page and in case of error pass it to next function.

 * @param {object} req  Request object received from client.
 * @param {object} res Response object which sent to client.
 * @param {Function} next A callback function which lets after execution of this function, the next function executed.
 */
const getLoginForm = (req, res, next) => {
  const viewData = {
    pageTitle: 'Login'
  }
  try {
    res.render('authentication/login', { viewData })
  } catch (err) {
    next(err)
  }
}

/**
 *This function authenticate the user and if the user is authenticated, it renders all-Snippets page, otherwise it redirects to the login page.

 * @param {object} req  request object received from client.
 * @param {object} res Response object which sent to client.
 */
const postLoginForm = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.authenticate(username, password)
    // For authorization
    req.session.userId = user._id
    req.session.flash = { type: 'success', message: `welcome ${username}` }
    res.redirect(302, '/snippets/all-Snippets')
  } catch (err) {
    req.session.flash = { type: 'danger', message: err.message }
    res.redirect('login')
  }
}

/**
 *This function destroy the session in order to logout and redirect to the login page.

 * @param {object} req  request object received from client.
 * @param {object} res Response object which sent to client.
 * @param {Function} next a callback function which lets after execution of this function, the next function executed.
 */
const logout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      next(err)
    }
    res.redirect('/authentication/login')
  })
}

module.exports = {
  getSignupForm,
  postSignupForm,
  getLoginForm,
  postLoginForm,
  logout
}
