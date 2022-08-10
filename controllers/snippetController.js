const {Snippet} = require('../models/snippet')

const home = (req, res) => {
    res.render('home/index')
   //res.send('hi')
}
const allSnippets = (req, res) => {
    const snippets = [
        {id:1, title:'something', owner:'sasan'},{id:2, title:'something else', owner:'saman'}
    ]
    res.render('snippets/allSnippets' )
}

const getSnippet = (req, res) => {
    const viewData = {title:'sasan', content: 'something'}
    res.render('snippets/snippet', {viewData})
}

const getCreateSnippetForm = (req, res) => {
    res.render('snippets/createSnippet')
}

const createSnippet = async (req, res,next) => {
   try { 
        const snippet = new Snippet({
            title: req.body.title,
            content: req.body.content,
            ownerId:"1"
            })
        await snippet.save()
        res.render('snippets/allSnippets')
    }catch(error) {
       // next(error)
        res.render('./createSnippet')
    }
    
    
}

const updateSnippetForm = (req, res) => {
    res.render('snippets/updateSnippetForm')
}

const updateSnippet = (req, res) => {
    res.render('snippets/allSnippet')
}

const deleteSnippet = (req, res) => {
    res.render('snippets/all-snippets')
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