module.exports = function(req, res){
	var path = require('path');
	var fs = require('fs');
	var ext = path.extname(req.url);
	
	if(req.url === '/index.html') 
    {
        res.writeHead(200, {'Content-type': 'text/html'});
        fs.readFile('index.html', 'utf8', function (errors, contents){
            res.write(contents); 
            res.end();
        });
    }
	else if(ext == '.css')
	{
		console.log('#################HERE##___CSS___################')
		fs.readFile('style.css', 'utf8', function (errors, contents){
     		res.write(contents);
    		res.end();
      });
	}
	else if(ext == '.jpg' || ext == '.png')
	{
		console.log('#################HERE##___JPG___################')
		fs.readFile('./images/'+ path.basename(req.url),  function (errors, contents){
			res.write(contents)
    		res.end();
      });
	}
}