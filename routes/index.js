const express = require('express');
const router = express.Router();
const {ensureAuth,ensureGuest} = require('../middleware/auth');


//@desc Login Landing page
//@route GET /

router.get('/',ensureGuest, (req,res)=>{
    res.render('login', {
        layout: 'login'
    })
})

//@desc dashboard
//@route GET /
router.get('/dashboard',ensureAuth, (req,res)=>{
    res.render('dashboard')
    console.log(res.user);

})

module.exports = router;


