const express = require('express')
const router = express.Router()
const checkToken = require('./checkToken')
const Post = require('../model/post')


router.get('/', async (req, res)=>{
   try {
        const data = await Post.find().populate('userId', 'username category imgUrl describtion date _id')
        res.send(data)
    } catch (error) {
        res.status(400).send({message: "Please try again"})
        console.log(error);
    } 
})

router.get('/post/:id', async (req, res)=>{
    const id = req.params.id
    try {
        const data = await Post.findById(id).populate('userId', 'username category imgUrl describtion date _id')
        res.send(data)
    } catch (error) {
        res.status(400).send({message: "Please try again"})
        console.log(error);
    }
})

router.post('/add', checkToken, async (req, res)=>{
    const post = new Post({
        userId: req.user,
        username: req.body.username,
        category: req.body.category,
        imgUrl: req.body.imgUrl,
        describtion: req.body.describtion
    })
    
    try {
      const data =  await post.save()
      res.send(data)
    } catch (error) {
     console.log(error);
     res.status(400).send({message: 'Something went wrong'})
    }

})


router.delete('/del/:id', checkToken, async (req, res)=>{
   const id = req.params.id
    try {
        const data = await Post.findById(id)
        if (data.userId ==req.user) {
            const datapost = await Post.findByIdAndDelete(id)
            res.send(datapost)
        }

    } catch (error) {
        res.status(400).send({message: "Please try again"})
        console.log(error);
    }
})


router.get('/user/:userId', checkToken, async (req, res) => {
    const userId = req.params.userId
    try {
        const data = await Post.find({userId: userId}).populate('userId')
        res.send(data)
    } catch (error) {
        res.status(400).send({message: "Please try again"})
        console.log(error);
    }
})

router.get('/profile', checkToken, async (req, res) => {
    try {
        const data = await Post.find({userId: req.user}).populate('userId', 'username category imgUrl describtion date _id')
        res.send(data)
    } catch (error) {
        res.status(400).send({message: "Please try again"})
        console.log(error);
    }
})

router.patch('/update/:id', checkToken, async (req, res) => {
    const id = req.params.id
    try {
        const data = await Post.findByIdAndUpdate(id,{$set: {
            category: 'New'
        }})
        res.send(data)
    } catch (error) {
        res.status(400).send({message: "Please try again"})
        console.log(error);
    }
})


module.exports = router