const { Thought, User } = require('../models');

// Thought Controller 
const thoughtController = {
    
    // Get all thoughts
    getAllThoughts(req,res) {
        Thought.find({})
            // sort by id
            .sort({ _id: -1 })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err); 
            }); 
    },

    // Get a thought
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
            .populate({
                path: 'reactions', 
                select: '-__v'
            })
            .select('-__v')
            .then(thoughtData => {
                if(!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id'});
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    // Create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $push: { thoughts: _id }},
                    { new: true, runValidators: true }
                );
            })
            .then(thoughtData => {
                if(!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!'});
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => res.json(err)); 
    },

    // Update a thought  
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-___v')
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));

    },

    // Create a reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body }}, 
            { new: true, runValidators: true }
        )
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(thoughtData => {
        if (!thoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thoughtData);
    })
    .catch(err => res.status(400).json(err))

    },

    // delete a thought 
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete a reaction 
    deleteReaction(req, res) {
        console.log(req.params.thoughtId, req.params.reactionId);
        Thought.findOneAndUpdate(
            
            { _id: req.params.thoughtId }, 
            { $pull: { reactions: { _id: req.params.reactionId }}},
            { new : true }
        )
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));
    }


}

// Exporting controller 
module.exports = thoughtController;