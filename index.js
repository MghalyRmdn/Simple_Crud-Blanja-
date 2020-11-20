// use path module
const path = require('path')
// use express module
const express = require("express");
// use hbs module
const hbs = require('hbs');
// use body-parser module
const bodyParser = require('body-parser');
// user mysql database
const mysql = require('mysql');

//  call module express
const app = express();

// create connection mysql
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'apiblanja',
})

// connect to database
conn.connect((err => {
    if (err) throw err;
    console.log('Mysql connected');
}));

// set views file
app.set('views', path.join(__dirname, 'views'));
// set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// set folder pulic as static folder to static file
app.use('/assets', express.static(__dirname + '/public'));

//  route for homepage
app.post('/save', (req, res) => {
    let data = {
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_desc: req.body.product_desc,
        quantity: req.body.quantity
    }
})


app.get('/', (res) => res.send('express is running'))

app.listen(3000, () => console.log('server running on port 3000!'))