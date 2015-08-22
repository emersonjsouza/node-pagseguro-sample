
/*
* GET home page.
*/
module.exports = function(app) {

	//GET
	app.get('/', function(req, res){
  		res.render('index');
	});
}

