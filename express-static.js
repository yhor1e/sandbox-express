const express = require('express'),
      app = express();

app.use('/foo', function(req, res, next){
  console.log(1);
  next();
});
app.use('/foo', express.static('public'));
app.use('/foo', function(req, res, next){
  console.log(2);
  next();
});

app.get('*', function(req, res){
  res.end('Hello from Express!\n');
});

app.listen(3000);
