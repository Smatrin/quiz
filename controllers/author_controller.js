// GET /quizes/question
exports.author = function(req, res) {
   res.render('authors/author', {encabezado: 'Firma del Autor', errors: []});
};
