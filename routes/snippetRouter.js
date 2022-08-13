const express = require('express')
const router = express.Router()
const controller = require('../controllers/snippetController')
const {isAuth} = require('../controllers/authController')

router.get('/all-snippets', controller.allSnippets)

router.get('/create-snippet', isAuth, controller.getCreateSnippetForm)
router.post('/create-snippet', isAuth, controller.createSnippet)

router.get('/snippet/:id', isAuth,controller.getSnippet)

router.get('/update-snippet/:id', isAuth, controller.updateSnippetForm)
router.post('/update-Snippet', isAuth, controller.updateSnippet)

router.post('/delete-snippet/:id', isAuth, controller.deleteSnippet)

module.exports = router