const express = require('express');
const router = express.Router();
const session = require('express-session');
const bcrypt = require('bcrypt');

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
    const {username, password} = req.body;    
    const User = req.app.get('User');
    const user = await User.findOne({where:{username}});
    
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
        return res.status(200).json({message:'Login berhasil'});
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
  const {name, username, password, email, phone} = req.body;
  try {
    const User = req.app.get('User');
    const newUser = await User.create({
      name, username, password, email, phone
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

router.get('/search', function (req, res){
  res.render('booking');
});
router.post('/search', async (req, res) => {

})

router.get('/index', function(req, res, next){
  res.render('landing');
});

module.exports = router;
