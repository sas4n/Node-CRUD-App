const {Snippet} = require('../models/snippet')

const home = (req, res) => {
    res.render('home/index')
   //res.send('hi')
}
const allSnippets = async (req, res,next) => {
    try {
        const viewData = {
            snippets: (await Snippet.find({})).map(snippet =>( {
                id: snippet._id,
                title: snippet.title,
                ownerId: snippet.ownerId
            }))
        }
        res.render('snippets/allSnippets', {viewData} )
    }catch (err) {
        next(err)
        res.render('home/index')
    }
}

const getSnippet = async (req, res) => {
    try{
        const snippet = await Snippet.findById(req.params.id)
        const viewData = {
            title:snippet.title, 
            content: snippet.content
        }
        res.render('snippets/snippet', {viewData})
    }catch(err){
        next(err)
    }
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
        res.redirect(302,'./all-snippets')
    }catch(error) {
        next(error)
        res.render('./createSnippet')
    }
    
    
}

const updateSnippetForm = async (req, res,next) => {
    try{
        const snippet = await Snippet.findById(req.params.id)
        const viewData = {
            id: snippet._id,
            title: snippet.title,
            content: snippet.content
        }
        res.render('snippets/editSnippet', {viewData})
    }catch(error) {
        next(error)
    }
    
}

const updateSnippet = async (req, res,next) => {
    try{
        await Snippet.updateOne({id: req.body.id},{
            title: req.body.title,
            content: req.body.content,
        })
        res.redirect('./all-snippets')
    }catch(error) {
        next(error)
    }

   
}

const deleteSnippet = async (req, res,next) => {
    try{
        await Snippet.findByIdAndDelete(req.params.id)
        res.redirect(302, '../all-snippets')
    }catch(err) {
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