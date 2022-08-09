

const home = (req, res) => {
    res.render('home/index')
   //res.send('hi')
}
const allSnippets = (req, res) => {
    res.render("snippets/allSnippets")
}

const getCreateSnippetForm = (req, res) => {
    res.render('snippets/createSnippet')
}

const createSnippet = (req, res) => {
    res.render('snippets/allSnippets')
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
    createSnippet, 
    updateSnippet,
    updateSnippetForm,
    deleteSnippet,
    allSnippets
}