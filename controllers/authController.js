const {User} = require('../models/snippet')

const isAuth = (req, res, next) => {
    console.log('here')
    console.log(req.session.userId)
    if(req.session.userId){
        return next()
    }
    //throw new Error({status: 403, message: 'you need to login first'})
   // const error = new Error('Forbiden')
   // error.status = 403
   // next(error)
   res.redirect('../all-Snippets')
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

module.exports = {
    getSignupForm,
    postSignupForm,
    getLoginForm,
    postLoginForm,
    isAuth
}