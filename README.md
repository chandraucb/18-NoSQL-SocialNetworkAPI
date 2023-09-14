# 18-NoSQL-SocialNetworkAPI

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](http://choosealicense.com/licenses/mit/)

## Description
API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list

## Table of Contents
 - [Installation](#installation)
 - [Usage](#usage)
 - [Credits](#credits)
 - [License](#license)

## Installation
Clone the github repo as shown below, <br/><br/> ``` git clone git@github.com:chandraucb/18-NoSQL-SocialNetworkAPI.git ``` <br/><br/> Run node package install <br/><br/> ``` npm install ```

## Usage
To run this application execute below command and follow the prompts <br/><br/> ```npm start ``` <br/> <br/>  
### End points
**User**
    Get all users:        GET /api/users
    Create a user:        POST /api/users
    Get user by ID:       GET /api/users/:id
    Update a user:        PUT /api/users/:id
    Delete a user:        DELETE /api/users/:id

    
**Friend**
    Add a friend:         PUT /api/users/:userId/friends/:friendId
    Delete a friend:      DELETE /api/users/:userId/friends/:friendId

**Thought**
    Get all thoughts:     GET /api/thoughts
    Create a thought:     POST /api/thoughts
    Get thought by ID:    GET /api/thoughts/:id
    Update a thought:     PUT /api/thoughts/:id
    Delete a thought:     DELETE /api/thoughts/:id

**Reaction**
    Add a reaction:       PUT /api/thoughts/:id/reactions
    Delete a reaction:    DELETE /api/thoughts/:id/reactions <br/><br/> 

![videodemo](../assets/images/video_demo.gif) 

## Credits

[Mongo DB](https://www.mongodb.com/developer/languages/javascript/tutorials/)
[Mongoose](https://mongoosejs.com/docs/guide.html)

## License
Copyright (c) 2023 Chandrasekar Mohan
Licensed under the MIT License

## Questions 
  Name : Chandrasekar Mohan 
  Git profile : https://github.com/chandraucb 
  Reach me through email with additional questions

