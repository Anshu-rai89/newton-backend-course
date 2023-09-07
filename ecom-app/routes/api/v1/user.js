const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/api/v1/user-controller');
const {isLoggedIn} = require('../../../middleware')

//public
router.post('/register', userController.register);
router.post('/login', userController.login);

// Only logged in user can access this url
// Protected routes

// Send valid token in header which you got in login
router.get('/profile', isLoggedIn, userController.getProfile);
router.put('/cart/:id', isLoggedIn, userController.addToCart);
router.get('/cart', isLoggedIn, userController.getCart)
module.exports = router;