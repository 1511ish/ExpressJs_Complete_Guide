// const express = require('express');

// const app = express();

// app.use((req, res, next) => {
//     console.log("first middleware");
//     next();
// })
// app.use((req, res, next) => {
//     console.log("second middleware");
// })

// app.listen(4000);




// ----------2nd Assignment------------

// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();

// app.use('/',bodyParser.urlencoded({extended: false}));

// app.use('/add-product', (req, res, next) => {
//    res.send("<form action='/product' method='POST'><input type='text' name='title'><input type='text' name='title'><button type='submit'>click</button></form>")
// })
// app.use('/product',(req, res, next) => {
//    console.log(req.body);
//    res.redirect('/');
// })
// app.use('/', (req, res, next) => {
//     res.send('<h1>Hello from Express</h1>');
// })

// app.listen(4000);




// ----------3rd Assignment------------

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/', bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
   res.status(404).send('<h1>Page not found</h1>');
})

app.listen(4000);