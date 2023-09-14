const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// Model for Reaction, a sub-document within Thought model.
const ReactionSchema = new Schema ({
    reactionId : {
        type: Schema.Types.ObjectId, 
        default: () => new Types.ObjectId()  
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        // Set default value to the current timestamp
        default: Date.now,
        // Use a getter method to format the timestamp on query
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
});

//  Thought Schema 
const ThoughtSchema = new Schema ({
    thoughtText : {
        type: String,
        trim: true,
        required: true,
        minlength: 1,
        maxlength: 280
    },

    createdAt: {
        type: Date,
        default: Date.now,
        // Use a getter method to format the timestamp on query
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },

    username : {
        type: String,
        required: true
    },

    reactions: [ReactionSchema]
},
    {
        toJSON: {
        getters: true  // To enable the getters
      },
      id : false
    }
);

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array 
//field on query.

ThoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length;
  });

  const Thought = model('Thought', ThoughtSchema);

  module.exports = Thought;