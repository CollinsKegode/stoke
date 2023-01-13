import express from 'express'
import mysql from 'mysql'

const app = express()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'stoke'
})

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(express.urlencoded({extend: true}))

//homepage
app.get('/', (req, res) => {
    res.render('index')
})

//view all products
app.get('/products', (req, res) => {
    let sql = 'SELECT * FROM products'
    connection.query(
        sql, (error, results) => {
            res.render('products', {products: results})
        }
    )

})

//view a single product
app.get('/product/:id', (req, res) => {
    const sql = 'SELECT * FROM products WHERE id = ?'
    connection.query(
        sql,
        [parseInt(req.params.id)],
        (error, results) => {
            res.render('product', {product: results[0]})
        }
    )
})


//display add form
app.get('/add', (req, res) => {
    res.render('add')
})

//submit add a product form
app.post('/add', (req, res) => {
    const product = {
        name: req.description.name,
        description: req.description.description
    }

    let sql = 'INSERT INTO products (name, description) VALUES (?,?)'
    connection.query(
        sql,
        [product.name, product.description],
        (error, results) => {
            res.redirect('/products')
        }
    )
})

//404 error
app.get('*', (req, res) => {
    res.render('404')
})

app.listen(3000)
