const { Snippet } = require('../models/snippet')

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
      snippets: (await Snippet.find({})).map(snippet => ({
        id: snippet._id,
        title: snippet.title,
        ownerId: snippet.ownerId
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
const getCreateSnippetForm = (req, res) => {
  try {
    console.log('hereeee')
    console.log(req.session)
    res.render('snippets/createSnippet')
  } catch (err) {
    req.session.flash = { type: 'error', message: err.message }
    const { flash } = req.session
    res.render('snippets/allSnippet', { flash })
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
  } catch (error) {
    req.session.flash = { type: 'error', message: error.message }
    const { flash } = req.session
    res.render('./createSnippet', { flash })
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
    const viewData = {
      id: snippet._id,
      title: snippet.title,
      content: snippet.content
    }
    res.render('snippets/editSnippet', { viewData })
  } catch (error) {
    req.session.flash = { type: 'error', message: error.message }
    next(error)
    res.render('snippets/allSnippets')
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
  } catch (error) {
    req.session.flash = { type: 'error', message: error.message }
    next(error)
    res.render('snippets/allSnippets')
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
    req.session.flash = { type: 'error', message: err.message }
    next(err)
    res.render('Snippets/allSnippets')
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
