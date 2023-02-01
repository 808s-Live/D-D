const fs = require('fs');
const express = require('express');
const {engine} = require('express-handlebars');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

let app = express();
//------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'page')));
app.use(express.static('css'));

app.engine('.hbs', engine({defaultLayout: false}));
app.set('view engine', ".hbs");
app.set('views', path.join(__dirname, 'page'));

const apiRouter = require('./router/api.router');
app.use('/', apiRouter);

//------------------------------------------------------
app.listen(8008, ()=>{
    console.log("start 8008");
})