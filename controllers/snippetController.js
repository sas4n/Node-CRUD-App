const { Snippet } = require('../models/snippet')
const { errorHandler } = require('../utils/utils')

/**
 *Prepare the home page and send it to user.

 * @param {object} req  request object received from client.
 * @param {object} res Response object which sent to client.
 */
const home = (req, res) => {
  const viewData = {
    showLogin: true
  }
  res.render('home/index', { viewData })
}
/**
 *This function shows all snippet .

 * @param {object} req  request object received from client.
 * @param {object} res Response object which sent to client.
 * @param {Function} next a callback function which lets after execution of this function, the next function executed.
 */
const allSnippets = async (req, res, next) => {
  try {
    const viewData = {
      showLogin: true,
      isAuth: req.session.userId,
      snippets: (await Snippet.find({})).map(snippet => ({
        id: snippet._id,
        title: snippet.title,
        ownerId: snippet.ownerId
      }))
    }
    res.render('snippets/allSnippets', { viewData })
  } catch (err) {
    next(err)
  }
}

/**
 *Shows the snippet that user are looking for or shows an error message that snippet not found.

 * @param {object} req  request object received from client.
 * @param {object} res Response object which sent to client.
 * @param {Function} next a callback function which lets after execution of this function, the next function executed.
 */
const getSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.findById(req.params.id)
    if (!snippet) {
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
 *Shows the form for creating a new snippet.

 * @param {object} req  request object received from client.
 * @param {object} res Response object which sent to client.
 * @param {Function} next a callback function which lets after execution of this function, the next function executed.
 */
const getCreateSnippetForm = (req, res, next) => {
  try {
    res.render('snippets/createSnippet')
  } catch (err) {
    next(err)
  }
}

/**
 *Creates a new snippet by sending it to model to be saved in database. After creating the snippet, redirect to all_snippet page.

 * @param {object} req request object received from client.
 * @param {object} res Response object which sent to client.
 * @param {Function} next a callback function which lets after execution of this function, the next function executed.
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
    if (errorMessage) {
      req.session.flash = { type: 'danger', message: errorMessage }
      return res.redirect('./create-snippet')
    }
    next(err)
  }
}

/**
 * FInds the snippet in the database and shows it to the user. If the snippet does not exist a 404 error message will be shown.

 *@param {object} req  request object received from client.
 * @param {object} res Response object which sent to client.
 * @param {Function} next a callback function which lets after execution of this function, the next function executed.
 */
const updateSnippetForm = async (req, res, next) => {
  try {
    const snippet = await Snippet.findById(req.params.id)
    // if user write some dummy id in the browser, next line would lead that request to a 404 page
    if (!snippet) {
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
 *Updates the snippet and redirects to all-snippet page.

 * @param {object} req  request object received from client.
 * @param {object} res Response object which sent to client.
 * @param {Function} next a callback function which lets after execution of this function, the next function executed.
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
    if (errorMessage) {
      req.session.flash = { type: 'danger', message: errorMessage }
      return res.redirect('./update-snippet')
    }
    next(err)
  }
}

/**
 *Deletes the snippet and redirects to all-snippets page.

 * @param {object} req  request object received from client.
 * @param {object} res Response object which sent to client.
 * @param {Function} next a callback function which lets after execution of this function, the next function executed.
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
