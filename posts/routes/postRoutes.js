const express = require('express');
const router = express.Router();
const {
    createPost,
    deletePost,
    editPost,
    likePost,
    addComment,
    getAllPosts
} = require('../controllers/postController');
const { authorize } = require('../middlewares/auth');

router.use(authorize)
router.post('/post', createPost);
router.delete('/post/:postId/:userId', deletePost);
router.put('/post/:postId/:userId', editPost);
router.post('/post/:postId/:userId/like', likePost);
router.get('/', getAllPosts);


module.exports = router;