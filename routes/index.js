const express = require('express');
const router = express.Router();
const session = require('express-session');
const bcrypt = require('bcrypt');
const { where } = require('sequelize');

router.use(session({
  secret:'v654h6cv5oi2435xuu',
  resave:false,
  saveUninitialized:false
}));

/* Tampilan Beranda */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Tampilan Login */
router.get('/login', function(req, res, next) {
  res.render('login');
});
/* Proses Login */
router.post('/login', async(req, res) => {
  try {
    const {email, password} = req.body;    
    const User = req.app.get('User');
    const user = await User.findOne({where:{email}});
    
    //User not found
    if(!user){
      return res.status(404).json({message:'User tidak ditemukan'});
    }    
    bcrypt.compare(password, user.password, (err, result)=>{
      if(err){
        console.error('Error comparing passwords:', err);
        return res.status(500).json({message: 'Error comparing passwords'});
      }
      if(result){
        //Login berhasil
        req.session.user = user;
        res.redirect("/booking");
        //return res.status(200).json({message:'Login berhasil'});
      }else{
        //Invalid password   
        return res.status(401).json({message:'Password tidak cocok'});        
      }
    });
  } catch(error){
    console.error('Kesalahan saat login:', error);
    return res.status(500).json({message:'Kesalahan server'});
  }
});

/* Proses Register */
router.post('/register', async (req, res)=>{
  const {resident_id, name, email, password, phone} = req.body;
  try {
    const User = req.app.get('User');
    const newUser = await User.create({
      resident_id, name, email, password, phone
    });
    
    res.redirect('/login');
    return res.status(200).json({message: 'Registrasi berhasil!'});    
  }catch(error){
    console.error('Kesalahan pembuatan user:', error);
    return res.status(500).json({message: 'Kesalahan pembuatan user'});
  }
});

/* Proses Logout */
router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/login');
});


router.get('/searching', function (req, res, next){
  res.render('searching');
});
router.post('/searching-go', async (req, res) => {
  try{
    const Ticket = req.app.get("Ticket");
    const Train = req.app.get("Train");
    const Station = req.app.get("Station");
    const Booking = req.app.get("Booking");      
    const { departure_station, arrival_station, go_date, return_date, passenger } = req.body;
    const tickets = await Ticket.findAll({
      where: {
        departure_station,
        arrival_station, 
        departure_date: go_date,
      },
      include: [
        {
          model: Train,          
        },
        {
          model: Station          
        },
      ],    
    });
    
    if (return_date) {
      res.render('go-return-ticket', { tickets, passenger, return_date });      
    } else {
      res.render('go-ticket', { tickets, passenger });
    }          
      
  }catch(err){
    console.error('Error retrieving train tickets: ', err);
    res.status(500).send('Error retrieving train tickets');
  }
});

router.post('/searching-return', async(req, res)=>{
  try {
    const { departure_station, arrival_station, ticket_id, return_date, passenger} = req.body;
    const Ticket = req.app.get("Ticket");
    const Train = req.app.get("Train");
    const Station = req.app.get("Station");
    const go_ticket = await Ticket.findOne({
      where:{ ticket_id },
    });
    const return_tickets = await Ticket.findAll({
      where: {
        departure_station: arrival_station, 
        arrival_station: departure_station, 
        departure_date: return_date,
      },
      include: [
        {
          model: Train,          
        },
        {
          model: Station          
        },
      ],    
    });
    res.render('return-ticket', {go_ticket, return_tickets, return_date, passenger});    
  } catch (error) {
      console.error('Error retrieving train tickets: ', error);
      res.status(500).send('Error retrieving train tickets');
  }  
});


router.post('/booking', async (req, res) => {
  try {
    const { ticket_id, train_name, departure_station, arrival_station, passenger } = req.body;
    const Ticket = req.app.get("Ticket");
    const Train = req.app.get("Train");
    const Station = req.app.get("Station");    
    const ticket = await Ticket.findOne({ where: { ticket_id } });
    const train = await Train.findOne({ where: { train_name } });
    const departureStation = await Station.findOne({ where: { station_name: departure_station } });
    const arrivalStation = await Station.findOne({ where: { station_name: arrival_station } });

    res.render('passenger-form', { ticket, train, departureStation, arrivalStation, passenger });
  } catch (err) {
    console.error('Error retrieving train tickets: ', err);
    res.status(500).send('Error retrieving train tickets');
  }
});


router.post('/booking-return', async (req, res) => {
  try {
    const { go_ticket_id, return_ticket_id, train_name, passenger} = req.body;
    const Ticket = req.app.get("Ticket");
    const Train = req.app.get("Train");    
    
    const go_ticket = await Ticket.findOne({where: {ticket_id: go_ticket_id}})
    const return_ticket = await Ticket.findOne({ where: { ticket_id: return_ticket_id } });    
    const return_train = await Train.findOne({ where: { train_name } });        

    res.render('passenger-form-with-return', { go_ticket, return_ticket, return_train, passenger });
  } catch (err) {
    console.error('Error retrieving train tickets: ', err);
    res.status(500).send('Error retrieving train tickets');
  }
});


router.post('/checkout', async (req, res) => {
  try{    
    // const { ticket_id, train_name, departure_station, arrival_station, departure_date, passenger } = req.session.bookingData;
    const passengerData = req.body;
    res.json(passengerData);
  }catch(err){
    console.error('Error retrieving train tickets: ', err);
    res.status(500).send('Error retrieving train tickets');
  }   
});


router.get('/', function(req, res, next){
  res.render('landing');
});

router.get('/dashboard', function(req, res, next){
  res.render('dashboard');
});

module.exports = router;
