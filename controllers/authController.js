const getSignupForm = (req, res) => {
    res.render('authentication/signup')
}

const postSignupForm = (req, res) => {
    res.render('/')
}
const getLoginForm = (req, res) => {
    res.render('authentication/login')
}

const postLoginForm = (req, res) => {
    res.render('/snippets/allSnippets')
}

module.exports = {
    getSignupForm,
    postSignupForm,
    getLoginForm,
    postLoginForm
}