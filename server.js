const express = require('express');
const hbs = require('hbs');
const fs = require('fs')
const port = process.env.PORT || 3000;
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

/*app.use((req , res , next) => {
  res.render('maintenance.hbs');

});*/

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

app.get('/projects' , (req , res) => {
  res.render('projects.hbs' , {

    pageTitle: 'List of Projects'
  });

});

app.get('/bad2' , (req , res) => {

  res.send({
      errorMessage : 'Something is wrong '

  });
});



app.listen(port , ()=> {

  console.log(`Server is listening on port ${port}`);
});
