const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { where } = require('sequelize');
const { Op } = require('sequelize');

/* BERANDA */
router.get('/', function(req, res, next) {
  res.render('landing');
});

/* LOGIN */
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.post('/login', async(req, res) => {
  try {
    const {email, password} = req.body;    
    const User = req.app.get('User');        
    if(email === "admin@gmail.com" && password === "admin"){
      res.redirect("/dashboard");
    }
    else{
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
    }            
  } catch(error){
    console.error('Kesalahan saat login:', error);
    return res.status(500).json({message:'Kesalahan server'});
  }
});

/* REGISTER */
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

/* DASHBOARD PAGE */
router.get('/dashboard', function(req, res, next){  
  res.render('dashboard');  
});

/* SEARCHING PAGE */
router.get('/searching', function (req, res, next){  
  res.render('searching');
});
router.post('/searching-go', async (req, res) => {
  try{
    const Ticket = req.app.get("Ticket");
    const Train = req.app.get("Train");
    const Station = req.app.get("Station");          
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
          model: Station,
          as: 'DepartureStation', // Add the alias for the departure station association
        },
        {
          model: Station,
          as: 'ArrivalStation', // Add the alias for the arrival station association
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
        departure_station: go_ticket.arrival_station, 
        arrival_station: go_ticket.departure_station, 
        departure_date: return_date,
      },
      include: [
        {
          model: Train,          
        },        
      ],    
    });
    console.log(return_tickets);
    res.render('return-ticket', {go_ticket, return_tickets, return_date, passenger});    
  } catch (error) {
      console.error('Error retrieving train tickets: ', error);
      res.status(500).send('Error retrieving train tickets');
  }  
});

/* BOOKING */
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
    const Station = req.app.get("Station");
    const go_ticket = await Ticket.findOne({
      where: { ticket_id: req.body.go_ticket_id },
      include: [
        {
          model: Train,
        },
        {
          model: Station,
          as: 'DepartureStation', // Add the alias for the departure station association
        },
        {
          model: Station,
          as: 'ArrivalStation', // Add the alias for the arrival station association
        },
      ],
    });
    
    const return_ticket = await Ticket.findOne({
      where: { ticket_id: req.body.return_ticket_id },
      include: [
        {
          model: Train,
        },
        {
          model: Station,
          as: 'DepartureStation', // Add the alias for the departure station association
        },
        {
          model: Station,
          as: 'ArrivalStation', // Add the alias for the arrival station association
        },
      ],
    });    

    res.render('passenger-form-with-return', { go_ticket, return_ticket, passenger });
  } catch (err) {
    console.error('Error retrieving train tickets: ', err);
    res.status(500).send('Error retrieving train tickets');
  }
});

/* CHECKOUT */
router.post('/checkout', async (req, res) => {
  try {
    const passengerData = req.body;
    const user = 'c0b4cd07-9844-4349-8ad8-177c6beb40a8';
    const Passenger = req.app.get("Passenger");
    const Booking = req.app.get("Booking");
    const Ticket = req.app.get("Ticket");
    const Train = req.app.get("Train");
    const Station = req.app.get("Station");    

    const go_ticket = await Ticket.findOne({
      where: { ticket_id: req.body.go_ticket_id },
      include: [
        {
          model: Train,
        },
      ],
    });

    const return_ticket = await Ticket.findOne({
      where: { ticket_id: req.body.return_ticket_id },
      include: [
        {
          model: Train,
        },
      ],
    });
    
    for (let num = 1; num <= passengerData.passenger; num++) {
      // Create a new passenger in the database
      const [passenger, create] = await Passenger.findOrCreate({
        where: { passenger_id: req.body['passenger_id' + num] },
        defaults: {
          fullname: req.body['fullname' + num],
          title: req.body['title' + num],
          type_id: req.body['type_id' + num],
          passenger_id: req.body['passenger_id' + num],
          phone_number: req.body['phone_number' + num],
          email: req.body['email' + num],
        },
      });

      await Booking.create({
        user_id: user,
        ticket_id: go_ticket.ticket_id,
        passenger_id: passenger.passenger_id,
        payment_status: 'PAID',
      });

      if (return_ticket) {
        await Booking.create({
          user_id: user,
          ticket_id: return_ticket.ticket_id,
          passenger_id: passenger.passenger_id,
          payment_status: 'PAID',
        });
      }
    }

    const bookings = await Booking.findAll({
      where: {
        user_id: user,
        ticket_id: {
          [Op.or]: [go_ticket.ticket_id, return_ticket && return_ticket.ticket_id],
        },
      },
      include: [
        {
          model: Passenger,          
        },
        {
          model: Ticket,
          include: [
            {
              model: Train,
            },
            {
              model: Station,
              as: 'DepartureStation',
            },
            {
              model: Station,
              as: 'ArrivalStation',
            },
          ],          
        },
      ],       
    });

    // console.log(bookings[1].Passenger);    
    res.render('e-ticket', {go_ticket, return_ticket, bookings });
  } catch (err) {
    console.error('Error retrieving train tickets: ', err);
    res.status(500).send('Error retrieving train tickets');
  }
});

/* LOGOUT */
router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
