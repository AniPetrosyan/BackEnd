const router = require('express').Router()
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const bycript = require('bcryptjs')
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const checkToken = require('./checkToken')

/* const transporter = nodemailer.createTransport(sendgrid({
    auth: {api_key: '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'}
}))  */


const transporter = nodemailer.createTransport(sendgrid({
    auth: {api_key: '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'}
}))

router.post('/signin', async(req, res)=>{
    const emailExists = await User.findOne({email: req.body.email})
    
    if(!emailExists){
        res.status(400).send({message: 'Please register'})
        return
    }

    const areSame = await bycript.compare(req.body.password, emailExists.password)


    if(!areSame){
        res.status(400).send({message:'Password is wrong'})
        return
    }
    const token = jwt.sign({ id: emailExists._id }, 'tumo_students');
    res.send({auth_token: token})
})

router.post('/signup', async (req, res)=>{
    const emailExists = await User.findOne({email: req.body.email})    
    const userName = await User.findOne({username: req.body.username})
    if(userName){
        res.status(400).send({message:'UserName already exists'})
    }
    if(emailExists){
        res.status(400).send({message:'Email already exists'})
        return
    }
 
 
    const hashPassword = await bycript.hash(req.body.password, 16)

     const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
    })



    try {
        const data = await user.save()

        await transporter.sendMail({
            to: req.body.email,
            from: 'apetrosyan071@gmail.com',
            subject: 'Congrats!',
            text: 'you registered',
           
            html: ` <div style=" display:flex; margin:0;padding:0;background-color:#F8F8F8;border:1px solid #ddd; "> 
            <h3> Hi ${req.body.username}, welcome on board! <br>
            Now you can share your hobbies and follow your friends!<br> Don't hesitate to post your first hobby.
            Enjoy the platform!)</h3><br>
             <img src="cid:image1@johnson.com"/> </div>`,
        attachments:[{
                        filename : 'bg.jpg',
                        path: './routes/bg.jpg',
                        cid : 'image1@johnson.com',
                    }],
        
        },
        )

        console.log(data);
        res.send(data)
    } 
    catch (error) {
        console.log(error);
        res.status(400).send({message: 'Something went wrong'})
        
    }

    //res.send({message: 'done'})
    res.send(data)
})

router.get('/profile', checkToken, async(req, res) => {
    try {
        const profile = await User.findById(req.user)
        res.send(profile)

    } catch (error) {
        console.log(error);
        res.status(400).send({message: 'Something went wrong'})
    } 
})

module.exports = router