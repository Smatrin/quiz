var express = require('express');
var router = express.Router();

var quizControler = require('../controllers/quiz_controller');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

router.get('/author', function(req, res, next) {
  res.render('author');
});

router.get('/quizes',                      quizControler.index);
router.get('/quizes/:quizId(\\d+)',        quizControler.show);
router.get('/quizes/:quizId(\\d+)/answer', quizControler.answer);
router.get('/quizes/new',                  quizControler.new);
router.post('/quizes/create',               quizControler.create);
router.get('/quizes/:quizId(\\d+)/edit',   quizControler.edit);
router.put('/quizes/:quizId(\\d+)',        quizControler.update);
router.delete('/quizes/:quizId(\\d+)',     quizControler.destroy);

module.exports = router;
