const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')
const passport = require('passport');
const session = require('express-session')



//load config

dotenv.config({path: './config/config.env'})

//connect db

//passport config 
require('./config/passport')(passport)

connectDB()

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//handlebars

app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
// static folder

app.use(express.static(path.join(__dirname,'public')))

//express session

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

//@passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use('/',require('./routes/index'));
app.use('/auth',require('./routes/auth'));


const PORT = process.env.PORT || 5000


app.listen(PORT, console.log(`Server runing in ${process.env.NODE_ENV} mode on ${PORT}`))