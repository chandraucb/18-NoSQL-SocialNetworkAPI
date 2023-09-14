const router = require('express').Router();
const { 
    getAllThoughts, 
    getThoughtById, 
    createThought, 
    updateThought,
    addReaction,
    deleteThought,
    deleteReaction
} = require('../../controllers/thought-controller');

// Get through - /api/thoughts
router.route('/')
      .get(getAllThoughts);

// get/put/delete thought - /api/thoughts/:id
router.route('/:id')
      .get(getThoughtById)
      .put(updateThought)
      .delete(deleteThought); 

// create thought - /api/thoughts/:userId
router.route('/:userId')    
      .post(createThought);

// add reaction - /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
      .post(addReaction);

// delete reaction - /api/thoughts/:thoughtId/reactionId
router.route('/:thoughtId/reactions/:reactionId')
      .delete(deleteReaction);

module.exports = router;