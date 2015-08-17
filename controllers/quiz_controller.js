
var models = require('../models/models.js');

// GET /quizes
exports.index = function(req, res) {
  models.Quiz.findAll().then(function(quizes) {
    res.render('quizes/index.ejs', { quizes: quizes});
  })
};

// GET /quizes/:id
exports.show = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
    res.render('quizes/show', { quiz: quiz});
  })
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
    if (req.query.respuesta === quiz.respuesta) {
      res.render('quizes/answer', 
                 { quiz: quiz, respuesta: 'Correcto' });
    } else {
      res.render('quizes/answer', 
                 { quiz: quiz, respuesta: 'Incorrecto'});
    }
  })
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build(
    {pregunta: "Pregunta", respuesta: "Respuesta", tema: ""}
  );

  res.render('quizes/new', {quiz: quiz});
};

exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );

// guarda en DB los campos pregunta y respuesta de quiz
  quiz.save().then(function(){
    res.redirect('/quizes');  
  })   // res.redirect: Redirección HTTP a lista de preguntas
};


exports.edit = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
    res.render('quizes/edit', { quiz: quiz});
  })
};


exports.update = function(req, res){
    
    models.Quiz.find(req.params.quizId).then(function(quiz) {
        quiz.pregunta  = req.body.quiz.pregunta;
        quiz.respuesta = req.body.quiz.respuesta;
        quiz.tema = req.body.quiz.tema;
        quiz.save().then()
        .then( function(){ res.redirect('/quizes');});
    })
};

exports.destroy = function(req, res) {
    models.Quiz.find(req.params.quizId).then(function(quiz) {
        quiz.destroy().then( function() {
        res.redirect('/quizes');
    }).catch(function(error){next(error)});
    });
};
    