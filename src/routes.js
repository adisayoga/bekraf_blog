module.exports = function(app) {

  /*
   * GET /
   */
  app.get('/', function(req, res) {
    res.redirect('/blog');
  });

  /*
   * GET /blog
   */
  app.get('/blog', function(req, res) {
    res.render('index');
  });

  /*
   * GET /blog/:id
   */
  app.get('/blog/:id', function(req, res) {

  });

  // ------------------------------

  /*
   * GET /blog/create
   */
  app.get('/blog/create', function(req, res) {

  });

  /*
   * POST /blog/create
   */
  app.post('/blog/create', function(req, res) {

  });

  /*
   * GET /blog/update/:id
   */
  app.get('/blog/update/:id', function(req, res) {

  });

  /*
   * PUT /blog/update/:id
   */
  app.put('/blog/update/:id', function(req, res) {

  });

  /*
   * DELETE /blog/delete
   */
  app.delete('/blog/delete/:id', function(req, res) {

  });

};
