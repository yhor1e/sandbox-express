const express = require('express'),
      app = express(),
      cheerio     = require('cheerio'),
      interceptor = require('express-interceptor');

app.use('/foo', function(req, res, next){
  console.log(1);
  next();
});
const finalParagraphInterceptor = interceptor(function(req, res){
  return {
    // Only HTML responses will be intercepted
    isInterceptable: function(){
      return /text\/html/.test(res.get('Content-Type'));
    },
    // Appends a paragraph at the end of the response body
    intercept: function(body, send) {
      var $document = cheerio.load(body);
      $document('body').append('<p>From interceptor!</p>');

      send($document.html());
    }
  };
})

app.use(finalParagraphInterceptor);
app.use('/foo', express.static('public'));
app.use('/foo', function(req, res, next){
  console.log(2);
  next();
});

app.get('*', function(req, res){
  res.end('Hello from Express!\n');
});

app.listen(3000);
