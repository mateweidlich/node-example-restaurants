const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');
const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

router.get('/', storeController.homePage);

router.get('/stores', catchErrors(storeController.getStores));
router.get('/stores/page/:page', catchErrors(storeController.getStores));
router.get('/stores/:id/edit', catchErrors(storeController.editStore));

router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));

router.get('/add', authController.isLoggedin, storeController.addStore);
router.post(
  '/add',
  authController.isLoggedin,
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.createStore)
);
router.post(
  '/add/:id',
  authController.isLoggedin,
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.updateStore)
);

router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));

router.get('/register', userController.registerForm);
router.post(
  '/register',
  userController.validateRegister,
  userController.register,
  authController.login
);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/account', authController.isLoggedin, userController.account);
router.post(
  '/account',
  authController.isLoggedin,
  catchErrors(userController.updateAccount)
);

router.post('/account/forgot', authController.forgot);
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post(
  '/account/reset/:token',
  authController.confirmedPasswords,
  catchErrors(authController.update)
);

router.get('/map', storeController.mapPage);

router.get(
  '/hearts',
  authController.isLoggedin,
  catchErrors(storeController.getHearts)
);

router.get('/top', catchErrors(storeController.getTopStores));

router.post(
  '/reviews/:id',
  authController.isLoggedin,
  catchErrors(reviewController.addReview)
);

router.get('/api/v1/search', catchErrors(storeController.searchStores));
router.get('/api/v1/stores/near', catchErrors(storeController.mapStores));
router.post(
  '/api/v1/stores/:id/heart',
  catchErrors(storeController.heartStore)
);

module.exports = router;
