var restify = require('restify');
var service = require('./service.js');
 
var server = restify.createServer({
  name: 'nancycare',
  version: '1.0.0'
});

//server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.get('/patient/:id/token/:token', function (req, res, next) {
  service.collectObservation(req.params.id, req.params.token, function (err, data){
  	if (err) {
  		res.send(500, err);
  		return;
  	};
  	res.send(data);
  	return next();
  });
  
});
 

server.listen(9090, function () {
  console.log('%s listening at %s', server.name, server.url);
});