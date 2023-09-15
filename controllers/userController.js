const { User, Thought } = require('../models');

// User controller
const userController = {
    // Get all users 
    getAllUsers(req, res) {
        User.find({})
            // populate thoughts subdocument
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            // populate friends subdocument
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({_id: -1})
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    
    // Get a user
    getUserById(req, res) {
        User.findOne({_id: req.params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            // return if no user is found 
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No User found with this id!'});
                    return; 
                }
                res.json(userData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    // Create a new user 
    createUser(req, res) {
        User.create(req.body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },

    // Find user and update
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id} , req.body, { new: true, runValidators: true })
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No User found with this id!'});
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err))
    },

    // Add a friend to user 
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { friends: req.params.friendId }},
            { new: true, runValidators: true }
        )
        .populate({
            path: 'friends',
            select: ('-__v')
        })
        .select('-__v')
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
            }
            res.json(userData);
            })
            .catch(err => res.json(err));
        
    },

    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .populate({   //For bonus logic
                path: 'thoughts',
                select: '-__v'
            })
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No User found with this id!'});
                    return;
                } 
                Thought.deleteMany({_id: {
                    $in: userData.thoughts
                }}).then( thoughtData => {
                        console.log(thoughtData)
                        res.json(userData)
                    }      
                )
            })
            .catch(err => res.status(400).json(err));
    },

    findUserThoughts(req,res) {
        User.findById({ _id: req.params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .then(userData => {
            if (userData) {
                Thought.find({_id: {
                    $in: userData.thoughts
                }}).then( thoughtData => res.json(userData))
            } else {
                res.status(500).send('No User Data!')
            }
        })    
    },

    // Delete a friend from a user 
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id }, 
            { $pull: { friends: req.params.friendId }},
            { new: true }
        )
        .populate({
            path: 'friends', 
            select: '-__v'
        })
        .select('-__v')
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: 'No User found with this id!'});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    }
};

// Exporting controller 
module.exports = userController; 