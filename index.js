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

// set default port
const port = 8000;


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

// route for homepage
app.get('/', (req, res) => {
    let sql = 'SELECT * FROM products';
    let kueri = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('product_view', {
            results: results
        });
    });
});

//  route for insert
app.post('/save', (req, res) => {
    let data = {
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price,
        product_rating: req.body.product_rating,
        product_qty: req.body.product_qty,
        product_color: req.body.product_color,
        size: req.body.size,
        product_condition: req.body.product_condition,
    }
    let sql = 'INSERT INTO PRODUCT SET ?';
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// route for update
app.post('/update', (req, res) => {
    let sql = "UPDATE product SET product_name='" + req.body.product_name + "',product_description'" + req.body.product_description + "',product_price'" + req.body.product_price + "',product_rating'" + req.body.product_rating + "',product_qty'" + req.body.product_qty + "',product_color'" + req.body.product_color + "',size'" + req.body.size + "',product_condition'" + req.body.product_condition + "',WHERE id=" + req.body.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// route for delete
app.post('/delete', (req, res) => {
    let sql = 'DELETE FROM products WHERE id=' + req.body.id + "";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    })
})

// set port and write the documentation
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});

// localhost:8000/products
// endpoint => /products
// localhost:8000 /
// endpoint => /
// send response with get method
app.get('/', (_, res) => {
    res.send('express is running')
});

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

// handler get products
// app.get('/products', (_, res) => {
//     const queryStr = "SELECT p.id , p.product_name AS 'name', p.product_description , p.product_price , c.category_name , p.product_qty , p.product_color , p.product_condition , p.size FROM products AS p JOIN category AS c ON c.id=p.id_category";
//     const getAllProduct = new Promise((resolve, reject) => {
//         conn.query(queryStr, (err, data) => {
//             if (!err) {
//                 resolve(data)
//             } else {
//                 reject(err);
//             }
//         });
//     });
//     getAllProduct.then((data) => {
//         res.json(data);
//     }).catch((err) => {
//         res.json(err)
//     });
// });

// app.post("/products", (req, res) => {

// })