const {User} = require('../models/snippet')
const {Snippet} = require('../models/snippet')

const isAuthenticated = (req, res, next) => {
    console.log('here')
    console.log(req.session.userId)
    if(req.session.userId){
        return next()
    }
    //throw new Error({status: 403, message: 'you need to login first'})
    const error = new Error('you need to login first')
    error.status = 403
    next(error)
   //res.redirect('../authentication/login')
}

const isAuthorized = (req, res, next) => {
    console.log('isAuthorized')
    console.log(req.session.userId)
    console.log(req.body.ownerId)
    if(req.session.userId === req.body.ownerId || req.session.userId ===req.query.ownerId) {//query.ownerId for edit since it s a get request we can't send data and req.body.ownerId for delet since it s post request and we can send data
        return next()
    }
    const error = new Error('you are not authorized')
    error.status = 403
    return next(error)
}

const getSignupForm = (req, res) => {
    res.render('authentication/signup')
}

const postSignupForm = async (req, res) => {
    const {username, password} = req.body
    try{
        const user = new User({username, password})
        await user.save()
        req.session.flash= {type:'success',message:`user ${username} saved successfully`}
        res.redirect(302, './login')
    }catch(err){
        req.session.flash={type:'error', message: err.message}
        console.log(err)
        res.redirect('signup')
    }
}
const getLoginForm = (req, res) => {
    res.render('authentication/login')
}

const postLoginForm = async (req, res) => {
    const {username, password} = req.body
    try{
        const user = await User.authenticate(username, password)
        req.session.userId = user._id
        console.log(req.session)
        req.session.flash= {type:'success', message:`welcome ${username}`}
        res.redirect(302, '/snippets/all-Snippets')
    }catch(err){
        req.session.flash = {type:'error', message:err.message}
        res.redirect(302, './signup')
    }
    
}

const logout = (req, res, next) => {
    req.session.destroy(err => {
        if(err){
            throw new Error('some error happened try again later')
        }
        res.redirect('/authentication/login')
    })
}

module.exports = {
    getSignupForm,
    postSignupForm,
    getLoginForm,
    postLoginForm,
    isAuthenticated,
    isAuthorized,
    logout
}