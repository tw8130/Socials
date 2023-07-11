const mssql = require('mssql');


// Add a comment to a post
const addComment = async(req, res) => {


    try {
        const { postId, userId, content } = req.body;

        const pool = require("../server").pool;

        const result = await pool.request()
            .input('postId', mssql.Int, postId)
            .input('userId', mssql.Int, userId)
            .input('content', mssql.NVarChar(mssql.MAX), content)
            .output("commentId", mssql.Int)
            .execute('AddCommentToPost');

        const commentId = result.output.commentId;
        res.status(201).json({ commentId, message: "Added the comment successfully" });


    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'An error occurred while adding the comment.' });
    }
};

// Reply to a comment
const replyToComment = async(req, res) => {


    try {
        const { postId, userId, content, parentCommentId } = req.body;
        const { commentId } = req.params;
        const pool = require("../server").pool;

        const result = await pool.request()
            .input('postId', mssql.Int, postId)
            .input('userId', mssql.Int, userId)
            .input('content', mssql.NVarChar(mssql.MAX), content)
            .input('parentCommentId', mssql.Int, parentCommentId)
            .output("commentId", mssql.Int)
            .execute('ReplyToComment');

        const commentId1 = result.output.commentId;
        res.status(201).json({ commentId1, message: "Replied to the comment successfully" });

    } catch (error) {
        console.error('Error replying to comment:', error);
        res.status(500).json({ message: 'An error occurred while replying to the comment.' });
    }
};

// Edit a comment
const editComment = async(req, res) => {


    try {
        const { commentId } = req.params;
        const { userId, content } = req.body;

        const pool = require("../server").pool;

        await pool.request()
            .input('commentId', mssql.Int, commentId)
            .input('userId', mssql.Int, userId)
            .input('content', mssql.NVarChar(mssql.MAX), content)
            .execute('EditDeleteComment');

        res.status(200).json({ message: 'Comment edited successfully.' });
    } catch (error) {
        console.error('Error editing comment:', error);
        res.status(500).json({ message: 'An error occurred while editing the comment.' });
    }
};

// Delete a comment
const deleteComment = async(req, res) => {


    try {
        const { commentId } = req.params;
        const { userId } = req.body;

        const pool = require("../server").pool;

        await pool.request()
            .input('commentId', mssql.Int, commentId)
            .input('userId', mssql.Int, userId)
            .input('isDeleted', mssql.Bit, 1)
            .execute('EditDeleteComment');

        res.status(200).json({ message: 'Comment deleted successfully.' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'An error occurred while deleting the comment.' });
    }
};

// React to a comment
const addReactionToComment = async(req, res) => {
    try {
        const { commentId } = req.params
        const { userId, emoji } = req.body;

        const pool = require("../server").pool;
        // Execute the stored procedure to add the reaction to the comment
        const result = await pool
            .request()
            .input('commentId', commentId)
            .input('userId', userId)
            .input('emoji', emoji)
            .execute('AddReactionToComment');

        res.status(200).json({ message: 'Reaction added to comment successfully' });
    } catch (error) {
        console.error('Error adding reaction to comment:', error);
        res.status(500).json({ error: 'An error occurred while adding the reaction to the comment' });
    }
};


// Get comments for a specific post including nested replies
const getCommentsForPost = async(req, res) => {
    try {
        const { postId } = req.params;

        const pool = require("../server").pool;

        const result = await pool.request()
            .input('postId', sql.Int, postId)
            .execute('GetPostDetails');

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error retrieving comments:', error);
        res.status(500).json({ message: 'An error occurred while retrieving the comments.' });
    }
};


module.exports = {
    addComment,
    replyToComment,
    editComment,
    deleteComment,
    addReactionToComment,
    getCommentsForPost,
};