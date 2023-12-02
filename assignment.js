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

// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app = express();

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
// const contactRoutes = require('./routes/contact');
// const { Http2ServerRequest } = require('http2');

// app.use('/', bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(adminRoutes);
// app.use(shopRoutes);
// app.use(contactRoutes);

// app.use((req, res, next) => {
//    // res.status(404).send('<h1>Page not found</h1>');
//    res.sendFile(path.join(__dirname, 'views', '404.html'));
// })

// app.listen(4000);






// const path = require('path');

// const express = require('express');
// const bodyParser = require('body-parser');
// const errorController = require('./controllers/error');

// const app = express();

// app.set('view engine', 'ejs');
// app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

// app.use(errorController.get404);

// app.listen(3000);




const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);