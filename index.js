require('dotenv').config()
const express = require('express');
const app = express()
const userRouter = require('./api/user/userRouter')

app.use(express.json());

app.use('/api/user' , userRouter)



app.listen(process.env.PORT,()=>{
    console.log('Sever up and running')
})