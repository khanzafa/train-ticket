const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { where } = require('sequelize');

/* Tampilan Beranda */
router.get('/', function(req, res, next) {
  res.render('landing');
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
        
    if(!user){
      return res.status(404).json({message:'User tidak ditemukan'});
    }    
    bcrypt.compare(password, user.password, (err, result)=>{
      if(err){
        console.error('Error comparing passwords:', err);
        return res.status(500).json({message: 'Error comparing passwords'});
      }
      if(result){        
        req.session.user = user;                
        res.redirect("/searching");        
      }else{        
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
    
    const go_ticket = await Ticket.findOne({where: {ticket_id: go_ticket_id}});
    const return_ticket = await Ticket.findOne({ where: { ticket_id: return_ticket_id } });    
    const return_train = await Train.findOne({ where: { train_name } });        

    res.render('passenger-form-with-return', { go_ticket, return_ticket, return_train, passenger });
  } catch (err) {
    console.error('Error retrieving train tickets: ', err);
    res.status(500).send('Error retrieving train tickets');
  }
});


router.post('/checkout', async (req, res) => {
  try {
    const { passenger } = req.body; // Assuming you have a field named "passenger" that indicates the number of passengers
    const user = req.session.user;
    console.log(user.user_id);  
    const Passenger = req.app.get("Passenger");
    const Booking = req.app.get("Booking");
    const Ticket = req.app.get("Ticket");
    const go_ticket = await Ticket.findOne({
      where: {ticket_id : req.body.go_ticket_id}
    });
    const return_ticket = await Ticket.findOne({
      where: {ticket_id : req.body.return_ticket_id}
    });
    for (let num = 1; num <= passenger; num++) {
      // const { fullname, title, type_id, passenger_id, phone_number, email } = req.body;      
      // Create a new passenger in the database
      const passenger = await Passenger.create({
        fullname: req.body['fullname' + num],
        title: req.body['title' + num],
        type_id: req.body['type_id' + num],
        passenger_id: req.body['passenger_id' + num],
        phone_number: req.body['phone_number' + num],
        email: req.body['email' + num],
      });
      await Booking.create({
        user_id: user.user_id,
        ticket_id: go_ticket.ticket_id,
        passenger_id: passenger.passenger_id,
        payment_status: 'PAID'
      });
      if(return_ticket){
        await Booking.create({
          user_id: user.user_id,
          ticket_id: return_ticket.ticket_id,
          passenger_id: passenger.passenger_id,
          payment_status: 'PAID'
        });
      }      
    }
    // const Bookings = await Booking.findAll
    res.render('e-ticket');
  }catch(err){
    console.error('Error retrieving train tickets: ', err);
    res.status(500).send('Error retrieving train tickets');
  }   
});


router.get('/dashboard', function(req, res, next){
  const user = req.session.user;
  console.log(user.user_id);
  res.render('dashboard');  
});

/* Proses Logout */
router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
