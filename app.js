const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const apiRouter = require('./router/api.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'page')));
app.use(express.static('css'));
app.use('/', apiRouter);

app.engine('.hbs', engine({ defaultLayout: false }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'page'));

app.listen(8008, () => {
    console.log('start 8008');
});
