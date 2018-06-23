const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => { // loaded middleware in the req and res args
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear', () => { // injectable methods
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// handler for a get request to your server(site)
app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!<h1>');
    res.render('home.hbs', {
        pagetitle: 'Home Page',
        welcomeMsg: 'Welcome, people of earth.'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        //this is where you create an object to inject data via string interpolation 
        pagetitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        Error: 404,
        Message: 'Sorry, cannot find requested page'
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});