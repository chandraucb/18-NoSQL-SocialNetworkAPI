// Importing router 
const router = require('express').Router();

// Import all of the API routes 
const apiRoutes = require('./api');
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send('404 Resource not found!');
});

module.exports = router;