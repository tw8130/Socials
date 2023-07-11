const express = require('express');
const { authorize } = require('../middlewares/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.use(authorize)
    // Create user profile
router.post('/profile/:userId', userController.createProfile);

// Delete user profile
router.delete('/profile/:profileId/:userId', userController.deleteProfile);

// Edit user profile
router.put('/profile/:profileId/:userId', userController.editProfile);

// Get followers of a user
router.get('/followers/:userId', userController.getFollowers);

// Get users followed by a specific user
router.get('/following/:userId', userController.getFollowing);

// Get suggested users based on common interests or connections
router.get('/suggested-users/:userId', userController.getSuggestedUsers);

// Search for users based on username or name
router.get('/search-users/:searchText', userController.searchUsers);

// Send friend request
router.post('/friend-request', userController.sendFriendRequest);

// Accept or decline friend request
router.put('/friend-request', userController.acceptOrDeclineFriendRequest);

// Delete user account
router.delete('/account/:userId', userController.deleteAccount);

// Update user password
router.put('/password', userController.updateUserPassword);

module.exports = router;