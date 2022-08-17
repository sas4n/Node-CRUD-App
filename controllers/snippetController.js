const { Snippet } = require('../models/snippet')
const{errorHandler} = require('./authcontroller')

/**
 *
 * @param req
 * @param res
 */
const home = (req, res) => {
  res.render('home/index')
  // res.send('hi')
}
/**
 *
 * @param req
 * @param res
 * @param next
 */
const allSnippets = async (req, res, next) => {
  try {
    const viewData = {
      showLogin: true,
      isAuth: req.session.userId,
      snippets: (await Snippet.find({})).map(snippet => ({
        id: snippet._id,
        title: snippet.title,
        ownerId: snippet.ownerId,
        
      }))
    }
    res.render('snippets/allSnippets', { viewData })
  } catch (err) {
    next(err)
    res.render('home/index')
  }
}

/**
 *
 * @param req
 * @param res
 */
const getSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.findById(req.params.id)
    if(!snippet) {
      const error = new Error('snippet not found')
      error.status = 404
      return next(error)
    }
    const viewData = {
      title: snippet.title,
      content: snippet.content
    }
    res.render('snippets/snippet', { viewData })
  } catch (err) {
    next(err)
  }
}

/**
 *
 * @param req
 * @param res
 */
const getCreateSnippetForm = (req, res, next) => {
  try {
    res.render('snippets/createSnippet')
  } catch (err) {
    next(err)
  }
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
const createSnippet = async (req, res, next) => {
  try {
    const snippet = new Snippet({
      title: req.body.title,
      content: req.body.content,
      ownerId: req.session.userId
    })
    await snippet.save()
    req.session.flash = { type: 'success', message: 'Snippet created successfully' }
    res.redirect(302, './all-snippets')
  } catch (err) {
    const errorMessage = errorHandler(err)
    if(errorMessage) {
      req.session.flash = { type: 'error', message: errorMessage }
      return res.redirect('./create-snippet')
    }
    next(err)
  }
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
const updateSnippetForm = async (req, res, next) => {
  try {
    const snippet = await Snippet.findById(req.params.id)
    if(!snippet) {
      const error = new Error('snippet not found')
      error.status = 404
      return next(error)
    }
    const viewData = {
      id: snippet._id,
      title: snippet.title,
      content: snippet.content,
      ownerId: req.query.ownerId
    }
    res.render('snippets/editSnippet', { viewData })
  } catch (err) {
      next(err)
  }
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
const updateSnippet = async (req, res, next) => {
  try {
    await Snippet.updateOne({ id: req.body.id }, {
      title: req.body.title,
      content: req.body.content
    })
    req.session.flash = { type: 'success', message: 'Snippet updated successfully' }
    res.redirect(302, './all-snippets')
  } catch (err) {
    const errorMessage = errorHandler(err)
    if(errorMessage) {
      req.session.flash = { type: 'error', message: errorMessage }
      return res.redirect('./update-snippet')
    }
    next(err)
  }
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
const deleteSnippet = async (req, res, next) => {
  try {
    await Snippet.findByIdAndDelete(req.params.id)
    req.session.flash = { type: 'success', message: 'Snippet deleted successfully' }
    res.redirect(302, '../all-snippets')
  } catch (err) {
    next(err)
  }
}

module.exports = {
  home,
  getCreateSnippetForm,
  getSnippet,
  createSnippet,
  updateSnippet,
  updateSnippetForm,
  deleteSnippet,
  allSnippets
}
