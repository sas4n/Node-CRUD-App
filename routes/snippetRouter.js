const express = require('express')
const router = express.Router()
const controller = require('../controllers/snippetController')
const { isAuthenticated, isAuthorized } = require('../controllers/authController')

router.get('/all-snippets', controller.allSnippets)

router.get('/create-snippet', isAuthenticated, controller.getCreateSnippetForm)
router.post('/create-snippet', isAuthenticated, controller.createSnippet)

router.get('/snippet/:id', isAuthenticated, controller.getSnippet)

router.get('/update-snippet/:id', isAuthenticated, isAuthorized, controller.updateSnippetForm)
router.post('/update-Snippet', isAuthenticated, isAuthorized, controller.updateSnippet)

router.post('/delete-snippet/:id', isAuthenticated, isAuthorized, controller.deleteSnippet)

module.exports = router
