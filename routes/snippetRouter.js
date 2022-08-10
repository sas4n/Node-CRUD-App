const express = require('express')
const router = express.Router()
const controller = require('../controllers/snippetController')

router.get('/all-snippets', controller.allSnippets)

router.get('/create-snippet', controller.getCreateSnippetForm)
router.post('/create-snippet', controller.createSnippet)

router.get('/snippet/:id', controller.getSnippet)

router.get('/update-snippet/:id', controller.updateSnippetForm)
router.post('/update-Snippet', controller.updateSnippet)

router.post('/delete-snippet/:id', controller.deleteSnippet)

module.exports = router