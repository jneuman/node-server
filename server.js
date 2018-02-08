const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/partials');
app.set('view engine', 'hbs');
/*
app.use((request, response, next) => {
    response.render('maintenance.hbs', {
        pageTitle: 'Maintenance Page',
        content: 'Oops... we are in the miiddle of maintenance.',
        screamMessage: 'Stop screaming!'
    });
});
*/
app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;

    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to append to server.log');
        }
    });
    console.log(log);
    next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        content: 'Welcome to nodejs!',
        screamMessage: 'Stop screaming!'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page',
        content: 'Something about us.',
        screamMessage: 'Stop screaming!'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        name: 'Joe',
        likes: [
            'Apples',
            'Food'
        ]
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});