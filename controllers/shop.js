// const Product = require('../models/product');
// const Cart = require('../models/cart');

// exports.getProducts = (req, res, next) => {
//   Product.fetchAll(products => {
//     res.render('shop/product-list', {
//       prods: products,
//       pageTitle: 'All Products',
//       path: '/products'
//     });
//   });
// };

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   Product.findById(prodId, product => {
//     res.render('shop/product-detail', {
//       product: product,
//       pageTitle: product.title,
//       path: '/products'
//     })
//   })
// }

// exports.getIndex = (req, res, next) => {
//   Product.fetchAll(products => {
//     res.render('shop/index', {
//       prods: products,
//       pageTitle: 'Shop',
//       path: '/'
//     });
//   });
// };

// exports.getCart = (req, res, next) => {
//   Cart.getCart(cart => {
//     Product.fetchAll(products => {
//       const cartProducts = [];
//       for (product of products) {
//         const cartProductData = cart.products.find(prod => prod.id === product.id);
//         if (cartProductData) {
//           cartProducts.push({ productData: product, qty: cartProductData.qty })
//         }
//       }
//       res.render('shop/cart', {
//         path: '/cart',
//         pageTitle: 'Your Cart',
//         products: cartProducts
//       });
//     })
//   })
// };

// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId, (product) => {
//     console.log("yhaa tk toh sahi h")
//     Cart.addProduct(prodId, product.price);
//   })
//   res.redirect('/cart');
// }

// exports.postCartDeleteProduct = (req,res,next) =>{
//   const prodId = req.body.productId;
//   Product.findById(prodId,product => {
//     Cart.deleteProduct(prodId, product.price);
//     res.redirect('/cart');
//   })
// }
// exports.getOrders = (req, res, next) => {
//   res.render('shop/orders', {
//     path: '/orders',
//     pageTitle: 'Your Orders'
//   });
// };

// exports.getCheckout = (req, res, next) => {
//   res.render('shop/checkout', {
//     path: '/checkout',
//     pageTitle: 'Checkout'
//   });
// };





                                //     ----------------------------------USING MYSQL DATABSE-----------------------------------     //

const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  // Product.fetchAll()
  //   .then(([products, fieldData]) => {
  //     res.render('shop/product-list', {
  //       prods: products,
  //       pageTitle: 'All Products',
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));

  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // --------------USING mySql2------------------
  // Product.findById(prodId)
  //   .then((product) => {
  //     res.render('shop/product-detail', {
  //       product: product,
  //       pageTitle: product.title,
  //       path: '/products'
  //     })
  //   })
  //   .catch(err => console.log(err));

  // -----------USING SEQUELIZE PRODUCT--------------
  // Product.findByPk(prodId)
  //   .then((product) => {
  //     res.render('shop/product-detail', {
  //       product: product,
  //       pageTitle: product.title,
  //       path: '/products'
  //     })
  //   })
  //   .catch(err => console.log(err));

  // ------------OR-----------
  // It is aslo a Sequelize method
  Product.findAll({ where: { id: prodId } })
    .then(products => {
      res.render('shop/product-detail', {
        product: products[0],
        pageTitle: products[0].title,
        path: '/products'
      })
    })
    .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
  // --------------USING mySql2------------------
  // Product.fetchAll()
  //   .then(([products, fieldData]) => {
  //     res.render('shop/index', {
  //       prods: products,
  //       pageTitle: 'Shop',
  //       path: '/'
  //     });
  //   })
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(prod => prod.id === product.id);
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty })
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     });
  //   })
  // })

  req.user.getCart()
    .then(cart => {
      return cart.getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.findById(prodId, (product) => {
  //   Cart.addProduct(prodId, product.price);
  // })
  // res.redirect('/cart');
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      console.log("first then");
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      console.log("second then");
      let product;
      console.log(product);
      if (products.length > 0) {
        product = products[0]; //because products arr will contain atmost one element.
      }
      if (product) {
        console.log("iska mtlb yha tk bhi theek h");
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      console.log("third then");
      return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
    })
    .then(() => {
      console.log("tfourth then");
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.findById(prodId, product => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect('/cart');
  // })

  req.user.getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
