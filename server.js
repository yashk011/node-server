const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear' , () =>{
  return new Date().getFullYear();
} );


app.use((req , res ,next)=> {
  var now = new Date().toString();
  var save = `${now} ${req.method} ${req.url}`
  console.log(save);
  fs.appendFile('server.log' , save + '\n'  ,(err) =>{
    if(err) {
      console.log(err);
    }
  });
  next();

});

app.use((req , res , next) => {
  res.render('maintenance.hbs');

});

app.use(express.static(__dirname + '/public'));

app.get('/' , (req , res)=>{
    res.render('index.hbs' ,{
        pageTitle : 'Index ',
        msg : 'Welcome to our website' ,


      });
});

app.get('/about' , (req , res) =>{

    res.render('about.hbs' , {

      pageTitle :'About us ' ,


    });

});

app.get('/bad' , (req , res) => {

  res.send({
      errorMessage : 'Something is wrong '

  });
});



app.listen(3000 , ()=> {

  console.log('Server is listening on port 3000');
});
