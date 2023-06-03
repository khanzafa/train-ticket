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

app.use(session({
  secret:'v654h6cv5oi2435xuu',
  resave:false,
  saveUninitialized:true
}));

// Konfigurasi koneksi database
const sequelize = new Sequelize('ticket', 'khanza', 'tiwiCute04', {
  host: 'localhost',
  dialect: 'mariadb', // ganti dengan dialect yang sesuai (misalnya, postgres untuk PostgreSQL)
});

//MODEL USER
const {v4: uuidv4} = require('uuid');
const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.UUID,  
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,    
  },
  resident_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false    
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.NUMBER,
    allowNull: false
  }
}, {
  timestamps:false,
});
User.beforeCreate((user, _) =>{
  user.user_id = uuidv4();
});
const bcrypt = require('bcrypt');
User.beforeCreate(async (user)=>{
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

//MODEL TICKET
const Ticket = sequelize.define("Ticket", {
  ticket_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    primaryKey: true,
  },
  train_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departure_station: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departure_time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departure_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  arrival_station: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  arrival_time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  arrival_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('AVAILABLE', 'SOLD OUT'),
    allowNull: false,
  },
}, {
  timestamps: false,
});


//MODEL STATION
const Station = sequelize.define("Station", {
  station_name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true    
  },
  district_city: {
    type: DataTypes.STRING,
    allowNull: false    
  }
}, {
  timestamps:false,
});

//MODEL TRAIN
const Train = sequelize.define("Train", {  
  train_name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true    
  },
  capacity: {
    type: DataTypes.STRING,
    allowNull: false    
  },
  class: {
    type: DataTypes.STRING,
    allowNull: false    
  },
}, {
  timestamps:false,
});

//MODEL PASSENGER
const Passenger = sequelize.define('Passenger', {
  passenger_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  type_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  fullname: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {  
  timestamps: false
});

//MODEL BOOKING
const Booking = sequelize.define("Booking", {
  booking_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true    
  },
  user_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'user_id'
    }  
  },
  ticket_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    references: {
      model: 'Ticket',
      key: 'ticket_id'
    }
  },
  passenger_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Passenger',
      key: 'passenger_id'
    }
  },  
  payment_status: {
    type: DataTypes.ENUM('PENDING', 'PAID'),
    allowNull: false    
  }
}, {
  timestamps:false,
});

Ticket.belongsTo(Train, {
  foreignKey: 'train_name',
});
Ticket.belongsTo(Station, {
  foreignKey: 'departure_station',
});
Ticket.belongsTo(Station, {
  foreignKey: 'arrival_station',
});
Train.hasMany(Ticket, {
  foreignKey: 'train_name',
});
Station.hasMany(Ticket, {
  foreignKey: 'departure_station',
});
Station.hasMany(Ticket, {
  foreignKey: 'arrival_station',
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
app.set('Train', Train);
app.set('Station', Station);
app.set('Ticket', Ticket);
app.set('Passenger', Passenger);
app.set('Booking', Booking);
module.exports = app;