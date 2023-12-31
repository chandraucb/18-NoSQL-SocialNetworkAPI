const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
  findUserThoughts,

} = require("../../controllers/userController");

// get users, create user - /api/users
router.route("/")
  .get(getAllUsers)
  .post(createUser);

// get,put,delete user - /api/users/:id
router.route("/:id")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router.route("/:id/thoughts")
  .get(findUserThoughts)

// Setup add Friend and delete Friend at /api/users/:userId/friends/:friendId
router.route("/:id/friends/:friendId")
  .put(addFriend)
  .delete(deleteFriend);

module.exports = router;
