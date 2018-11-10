const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.port || 3000;

var app = express();


//It takes the Directory for the all the handlebars Partials files as its only arguments

hbs.registerPartials(__dirname+'/views/partials')

app.set('view engine','hbs');

//Use of Middleware Function below using use
// This is moved becuase the execution is by order and if the public folder is above the maintaienance call it will not be impacted.
//app.use(express.static(__dirname+'/public'));

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = (`${now}: ${req.method} ${req.url}`);
    
    console.log(log);
   
    fs.appendFile('server.log', log + '\n' , (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
        next();
        
    });
});

// app.use((req,res,next) => {
//     res.render('maintenance.hbs')
// });

app.use(express.static(__dirname+'/public'));

//registerHelper takes 2 arguments Name and function
hbs.registerHelper('getCurrentYear',() =>{
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt',(text) =>{
return text.toUpperCase();
});


app.get('/',(req,res) =>
{
    // res.send({
    //     name: 'Rajesh',
    //     likes: [
    //         'Biking',
    //         'Cities'
    //     ]
    
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my Page',
        CurrentYear: new Date().getFullYear()
    });
//res.send('<h1>Hello Express!!!!</h1>');
});



app.get('/about', (req,res) =>
{
    res.render('about.hbs',{
        pageTitle:'About Page',
        CurrentYear: new Date().getFullYear()
    });
    //res.send('About Page2');
});

app.get('/bad',(req,res) =>{
res.send({
    errorMessage: 'Unable to handle error'
});
});

app.listen(port,() => {
console.log(`Server is up on Port ${port}`)
});