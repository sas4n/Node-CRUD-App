const express = require('express')
const router = express.Router()
const controller = require('../controllers/snippetController')

router.get('/all-snippets', controller.allSnippets)

router.get('/create-snippet', controller.getCreateSnippetForm)
router.post('/create-snippet', controller.createSnippet)

router.get('/update-snippet', controller.updateSnippetForm)
router.post('/updateSnippet/:id', controller.updateSnippet)

router.post('/delete-snippet/:id', controller.deleteSnippet)

module.exports = router