const express = require("express")
const mongoose = require("mongoose")
const session = require('express-session');
const connectDB = require('./config/db')
const passport = require("passport")
const path = require('path')
const MongoStore = require('connect-mongo')(session)
const dotenv = require("dotenv")
const PORT = process.env.PORT || 5000

const app = express()



dotenv.config({
    path: path.join(__dirname, '/config/config.env')
  })


connectDB()


require('./config/passport')(passport)



//middlewares
app.use(express.json())

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET',
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }) 
}));


app.use(passport.initialize())
app.use(passport.session())

//routes
//app.use('/', require('./routes/index'))
app.use('/auth',require('./routes/auth'))



app.listen(PORT, console.log(`server running on port ${PORT}`))