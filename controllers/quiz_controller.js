


 var models = require('../models/models.js');

// Autoload - factoriza el código si la ruta incluye :quizId
exports.load = function (req, res, next, quizId){
  models.Quiz.findById(quizId).then(
    function (quiz){
      if (quiz){
        req.quiz = quiz;
        next();
      }
      else{
        next (new Error('No existe el quiz con quizId = ' + quizId));
      }
    }
  ).catch (function(error){next(error);});
};

// GET /quizes
exports.index = function (req,res){
  var textoresp = "No se han encontrado preguntas"
  if (req.query.search){
    var search = '%' + req.query.search.replace(' ', '%') + '%';
    models.Quiz.findAll({where: ["pregunta like ?", search]}).then(
      function(quizes){
        if (quizes){
          textoresp = 'Se han encontrado ' + quizes.length + ' preguntas con el término ' + req.query.search;
        }
        res.render('quizes/index', {quizes: quizes, textoresp: textoresp, errors: []})
      }
    ).catch (function(error){next(error);});
  }
  else{
    models.Quiz.findAll().then(
      function (quizes){
        var textoresp = 'Se han encontrado ' + quizes.length + ' preguntas';
        res.render('quizes/index', {quizes: quizes, textoresp: textoresp, errors: []});
      }
    ).catch (function(error){next(error);});
  }

};

// GET /quizes/:id
exports.show = function (req,res){
  res.render('quizes/show', {quiz: req.quiz, errors: []});
};

// GET /quizes/:id/answer
exports.answer = function (req,res){
  var resultado = "La respuesta es Incorrecta";
  if (req.query.respuesta === req.quiz.respuesta){
    resultado = "La respuesta es Correcta";
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
};



//GET /quizes/answer

// exports.answer = function(req, res) {models.Quiz.findAll().success(function(quiz){if (req.query.respuesta===quiz[0].respuesta){res.render('quizes/answer',{respuesta:'Correcto'});
 //   } else  { res.render('quizes/answer',{respuesta:'Incorrecto'}); }})};       


// GET /quizes/new
exports.new = function (req,res){
  var quiz = models.Quiz.build(
    {pregunta: "Pregunta", respuesta: "Respuesta", Tema: "otro"}
  );
  res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function (req,res){
  var quiz = models.Quiz.build(req.body.quiz);
  quiz.validate().then(function (err){
    if (err){
      res.render('quizes/new', {quiz: quiz, errors: err.errors});
    }
    else{
      // Guarda en la BBDD los campos pregunta y respuesta:
      quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
        res.redirect('/quizes/');
      });
    }
  });
};

// GET /quizes/:id/edit
exports.edit = function (req,res){
  var quiz = req.quiz; // Autoload de Instancia quiz
  res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function (req,res){
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;

  req.quiz.validate().then(function (err){
    if (err){
      res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
    }
    else{
      // Guarda en la BBDD los campos pregunta y respuesta:
      req.quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
        res.redirect('/quizes/');
      });
    }
  });
};

// DELETE /quizes/:id
exports.destroy = function (req,res){
  req.quiz.destroy().then(function (){
    res.redirect('/quizes/');
  }).catch (function(error){next(error);});
};



// GET /quizes/question
//exports.question=function(req,res) { models.Quiz.findAll().success(function(quiz) {res.render('quizes/question',{pregunta:quiz[0].pregunta})})}; 



 

