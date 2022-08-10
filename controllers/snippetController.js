

const home = (req, res) => {
    res.render('home/index')
   //res.send('hi')
}
const allSnippets = (req, res) => {
    const snippets = [
        {id:1, title:'something', owner:'sasan'},{id:2, title:'something else', owner:'saman'}
    ]
    res.render('snippets/allSnippets', {snippets})
}

const getSnippet = (req, res) => {
    const viewData = {title:'sasan', content: 'something'}
    res.render('snippets/snippet', {viewData})
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
    getSnippet,
    createSnippet, 
    updateSnippet,
    updateSnippetForm,
    deleteSnippet,
    allSnippets
}