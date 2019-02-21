const express = require('express'); // web server npm
const hbs = require('hbs'); // template engine
const fs = require('fs'); // file system : IO

const port = process.env.PORT || 3000;

var app = express();

// to register partials
hbs.registerPartials(__dirname + '/views/partials');
// templates
app.set('view engine', 'hbs')

// to add a blocking middleware
app.use((req, res, next)=>{
  var now = new Date().toString();
  var log =`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log+'\n', (err)=>{
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
})
/*
app.use((req,res,next) =>{
  res.render('maintenance.hbs',{
    maintenanceMessage:'Sorry, maintenance page'
  })
});*/


// to access static files
app.use(express.static(__dirname + '/public'));

// create helpers
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase()
})

// to serve root
app.get('/', (req, res)=>{
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hi Guys!'
  })
});

app.get('/project', (req,res)=>{
  res.render('project.hbs', {
    pageTitle: 'Project Page',
    projectMessage:'E-Liquid recipes'
  })
});

app.get('/about', (req, res) => {
// to render from a template
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
});

app.get('/bad', (req, res)=>{
  // to send back json
  res.send({
    errorMessage:'Unable to handle request'
  })
})

// start listening and logs when started
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
