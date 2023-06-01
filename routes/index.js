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

router.get('/booking', function (req, res, next){
  res.render('booking');
});

router.post('/booking', async (req, res) => {
  try{
    const Ticket = req.app.get("Ticket");  
    const { departure_station_id, arrival_station_id, date } = req.body;
    const tickets = await Ticket.findAll({
      where:{
        departure_station_id, arrival_station_id, date,
      },
    });
    res.json(tickets);
  }catch(err){
    console.error('Error retrieving train tickets: ', err);
    res.status(500).send('Error retrieving train tickets');
  }

  // const query = `
  //   SELECT * FROM Tickets
  //   WHERE departure_station_id = ${departure_station_id}
  //   AND arrival_station_id = ${arrival_station_id}
  //   AND date = '${date}'
  // `;

  // router.query(query, (err, results) => {
  //   if (err) {
  //     console.error('Error executing the query: ', err);
  //     res.status(500).send('Error retrieving train tickets');
  //     return;
  //   }

  // res.json(results);
});

router.get('/', function(req, res, next){
  res.render('landing');
});

router.get('/dashboard', function(req, res, next){
  res.render('dashboard');
});

module.exports = router;
