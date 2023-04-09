const express = require('express')
const app = express()
const mongoose=require('mongoose')
require('./db/mongoose')
const port = process.env.PORT

const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})

const cors = require('cors');
app.use(cors({
  origin: '*'
}));

const bodyParser = require('body-parser')

app.use(require('./routers/auth'))

app.use(express.json());
app.use(express.urlencoded());

// Middelware

const middleware=(req,res,next)=>{
  console.log('hello my middleware')
  next()
}
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.use(middleware);
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})