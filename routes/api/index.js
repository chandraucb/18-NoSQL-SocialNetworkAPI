// connecting routes to the server 
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// add prefix 
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);


module.exports = router;