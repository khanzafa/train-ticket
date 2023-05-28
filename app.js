var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const {Sequelize, DataTypes} = require('sequelize');
const session = require('express-session');
// Konfigurasi koneksi database
const sequelize = new Sequelize('ticket', 'khanza', 'tiwiCute04', {
  host: 'localhost',
  dialect: 'mariadb', // ganti dengan dialect yang sesuai (misalnya, postgres untuk PostgreSQL)
});

const {v4: uuidv4} = require('uuid');
const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.UUID,  
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,    
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.NUMBER,
    allowNull: false
  }
}, {
  timestamps:false,
});

//Generate a UUID before creating a new user
User.beforeCreate((user, _) =>{
  user.user_id = uuidv4();
});

// Hook to hash the password before saving
const bcrypt = require('bcrypt');
User.beforeCreate(async (user)=>{
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

// Synchronize the model with the database
sequelize.sync()
  .then(()=>{
    console.log('Database and table synced');
  })
  .catch((err)=>{
    console.error('Error syncing database:', err);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set('User', User);

module.exports = app;
