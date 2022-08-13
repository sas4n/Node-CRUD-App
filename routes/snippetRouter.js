const express = require('express')
const router = express.Router()
const controller = require('../controllers/snippetController')
const {isAuth, isAuthorized} = require('../controllers/authController')

router.get('/all-snippets', controller.allSnippets)

router.get('/create-snippet', isAuth, controller.getCreateSnippetForm)
router.post('/create-snippet', isAuth, controller.createSnippet)

router.get('/snippet/:id', isAuth,controller.getSnippet)

router.get('/update-snippet/:id', isAuth, isAuthorized, controller.updateSnippetForm)
router.post('/update-Snippet', isAuth, isAuthorized, controller.updateSnippet)

router.post('/delete-snippet/:id', isAuth, isAuthorized, controller.deleteSnippet)

module.exports = router