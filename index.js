const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()



const postRoute = require('./routes/post')
const authRoute = require('./routes/auth')


app.use(cors())
app.use(bodyParser.json())


mongoose.connect('mongodb+srv://tumo:tumo1234@cluster0-y2wu8.mongodb.net/myDB?retryWrites=true&w=majority', 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    ()=>{
    console.log('Connect to DB');
    })




app.use('/posts', postRoute)
app.use('/user/auth', authRoute)

//const port = process.env.PORT || 3000



app.listen (process.env.PORT || 3000, ()=>{
  console.log('I am running');
})


