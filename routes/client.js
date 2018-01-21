var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('client');
});

router.get('/remote_control', function(req, res, next) {
  res.render('remote_control');
});

// Export created router to be used in `app.js`
module.exports = function(io) {

  io.on('connection', function(socket){
    console.log('Cineva a accesat super site-ul nostru!');

    socket.on('audio_cmd', function(msg){
      console.log('Am primit o comanda' , msg);
        io.emit('audio ' + msg);
    });
  });



  router.get('/api/start_music', function(req, res, next) {
    io.emit('audio start');
    res.json({done: true});
  });

  router.get('/api/stop_music', function(req, res, next) {
    io.emit('audio stop');
    res.json({done: true});
  });

  router.get('/api/increase_volume', function(req, res, next) {
    io.emit('audio increase_volume');
    res.json({done: true});
  });

  router.get('/api/decrease_volume', function(req, res, next) {
    io.emit('audio decrease_volume');
    res.json({done: true});
  });

  router.get('/api/next_song', function(req, res, next) {
    io.emit('audio next_song');
    res.json({done: true});
  });
  router.get('/api/previous_song', function(req, res, next) {
    io.emit('audio previous_song');
    res.json({done: true});
  });

  return router;
};
