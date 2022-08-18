const { User } = require('../models/snippet')

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
    req.session.flash = { type: 'danger', message: errorHandler(err) }
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
    //For authorization
    req.session.userId = user._id
    req.session.flash = { type: 'success', message: `welcome ${username}` }
    res.redirect(302, '/snippets/all-Snippets')
  } catch (err) {
    req.session.flash = { type: 'danger', message: err.message }
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



module.exports = {
  getSignupForm,
  postSignupForm,
  getLoginForm,
  postLoginForm,
  logout,
}
