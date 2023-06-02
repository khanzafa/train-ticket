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

router.get('/search', function (req, res, next){
  res.render('booking');
});

router.post('/search', async (req, res) => {
  try{
    const Ticket = req.app.get("Ticket");
    const Train = req.app.get("Train");
    const Station = req.app.get("Station");
    const Booking = req.app.get("Booking");      
    const { departure_station, arrival_station, departure_date, return_date, passenger } = req.body;
    const tickets = await Ticket.findAll({
      where: {
        departure_station, arrival_station, departure_date,
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
    const return_ticket = await Ticket.findAll({
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
    if (return_date) {
      res.render('search-result-return', { return_ticket, passenger }); 
    } else {
      res.render('search-result-without-return', { tickets, passenger });
    }          
      
  }catch(err){
    console.error('Error retrieving train tickets: ', err);
    res.status(500).send('Error retrieving train tickets');
  }
});

router.post('/booking', async (req, res) => {
  try {
    const { ticket_id, train_name, departure_station, arrival_station, passenger } = req.body;
    const Ticket = req.app.get("Ticket");
    const Train = req.app.get("Train");
    const Station = req.app.get("Station");
    // Ambil data tiket berdasarkan ticket_id
    const ticket = await Ticket.findOne({ where: { ticket_id } });

    // Ambil data kereta berdasarkan train_name
    const train = await Train.findOne({ where: { train_name } });

    // Ambil data stasiun keberangkatan berdasarkan departure_station
    const departureStation = await Station.findOne({ where: { station_name: departure_station } });

    // Ambil data stasiun tujuan berdasarkan arrival_station
    const arrivalStation = await Station.findOne({ where: { station_name: arrival_station } });

    res.render('passenger-form', { ticket, train, departureStation, arrivalStation, passenger });
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
