const express = require('express');
const commentController = require('../controllers/commentController');

const router1 = express.Router();

router1.post('/add', commentController.addComment);
router1.post('/reply/:commentId', commentController.replyToComment);
router1.put('/edit/:commentId', commentController.editComment);
router1.delete('/delete/:commentId', commentController.deleteComment);
router1.post('/react/:commentId', commentController.addReactionToComment);
router1.get('/post/:postId', commentController.getCommentsForPost);

module.exports = router1;