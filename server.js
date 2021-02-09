const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors())

const ADMIN_USER = process.env.ADMIN_USER
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const SECRET = process.env.SECRET

const loginMiddleware = (req, res, next) => {
    if(req.body.username === ADMIN_USER && 
       req.body.password === ADMIN_PASSWORD) {
            next()
       }
    else {
        res.status(401).json({
            message: 'Wrong username and password'
        })
    }
}

const jwt = require('jwt-simple')

app.post('/login', loginMiddleware, (req, res) => {
   const payload = {
      sub: req.body.username,
      iat: new Date().getTime()
   }
   res.status(200).json({
       'token': jwt.encode(payload, SECRET)
   })
})

const PORT = process.env.PORT || 3000
const ENV = process.env.NODE_ENV || 'development'
app.listen(PORT, ()=>{
    console.log(`on PORT: ${PORT}`)
    console.log(`on ENV: ${ENV}`)
    console.log('authen service is running')
})