<<<<<<< HEAD
 //var express = require('express');
 //var router = express.Router();

/* GET home page. */
 //router.get('/', function(req, res) {
  //res.render('index', { title: 'Quiz' });
  // });





// GET /quizes/question
exports.question=function(req,res) {
	res.render('quizes/question',{pregunta:'Capital de italia' });
};

//GET /quizes/question
 exports.answer = function(req,res) {
     if (res.query.respuesta=="Roma"){
     	res.render('quizes/answer',{respuesta:"Correcto"});
        } else  {
              res.render('quizes/answer',{respuesta:"Incorrecto"});
        }
  }; 

   

=======
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

module.exports = router;
>>>>>>> c9e2a16d226cc7dcc028ceb3bcf7a18aa8a8dd81