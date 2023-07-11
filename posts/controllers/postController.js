const mssql = require('mssql');

const createPost = async(req, res) => {
    try {
        //const { userId } = req.params;
        const { userId, content, mediaType, mediaUrl, locationId } = req.body;

        const pool = require("../server").pool; // Access the connection pool from app.locals

        const result = await pool
            .request()
            .input('userId', mssql.Int, userId)
            .input('content', mssql.VarChar(mssql.MAX), content)
            .input('mediaType', mssql.VarChar(50), mediaType)
            .input('mediaUrl', mssql.VarChar(255), mediaUrl)
            .input('locationId', mssql.Int, locationId)
            .execute('CreatePost');

        const post = result.recordset;
        //res.json(post);
        res.json({

            success: true,

            message: "created the post successfully",

            result: post



        })
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'An error occurred while creating the post' });
    }
};

const deletePost = async(req, res) => {
    try {
        const { postId, userId } = req.params;

        const pool = require("../server").pool;

        await pool
            .request()
            .input('userId', mssql.Int, userId)
            .input('postId', mssql.Int, postId)
            .input('isDeleted', mssql.Bit, 1)
            .execute('EditDeletePost');

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'An error occurred while deleting the post' });
    }
};

const editPost = async(req, res) => {
    try {
        const { postId, userId } = req.params;
        const { content, media_type, media_url } = req.body;

        //const pool = await mssql.connect(req.app.locals.config);
        const pool = require("../server").pool;

        await pool
            .request()
            .input('userId', mssql.Int, userId)
            .input('postId', mssql.Int, postId)
            .input('content', mssql.VarChar(mssql.MAX), content || null)
            .input('media_type', mssql.VarChar(50), media_type || null)
            .input('media_url', mssql.VarChar(255), media_url || null)
            .input('isDeleted', mssql.Bit, 0)
            .execute('EditDeletePost');

        res.json({ message: 'Post edited successfully' });
    } catch (error) {
        console.error('Error editing post:', error);
        res.status(500).json({ error: 'An error occurred while editing the post' });
    }
};

const likePost = async(req, res) => {
    try {
        const { postId, userId } = req.params;
        const { isLike } = req.body;

        const pool = require("../server").pool;

        await pool
            .request()
            .input('userId', mssql.Int, userId)
            .input('postId', mssql.Int, postId)
            .input('isLike', mssql.Bit, isLike)
            .execute('LikeOrDislikePost');

        res.json({ message: 'Post liked/disliked successfully' });
    } catch (error) {
        console.error('Error liking/disliking post:', error);
        res
            .status(500)
            .json({ error: 'An error occurred while liking/disliking the post' });
    }
};
const getAllPosts = async(req, res) => {
    try {
        const pool = require("../server").pool;

        let results = await pool.query(`SELECT * from NewPosts`)

        let posts = results.recordset;

        res.json({

            success: true,

            message: "fetched All posts successfully",

            results: posts



        })



    } catch (error) {


        console.error("Error getting all users:", error);
        res.status(500).send({
            error: "Internal server error"
        })



    }



}

// const addComment = async(req, res) => {
//     try {
//         const { postId, userId } = req.params;
//         const { content, timestamp, reactionId, parentCommentId } = req.body;

//         //const pool = await mssql.connect(req.app.locals.config);
//         const pool = require("../server").pool;

//         const result = await pool
//             .request()
//             .input('postId', mssql.Int, postId)
//             .input('userId', mssql.Int, userId)
//             .input('content', mssql.VarChar(mssql.MAX), content)
//             .input('timestamp', mssql.DateTime, timestamp)
//             .input('reactionId', mssql.Int, reactionId)
//             .input('parentCommentId', mssql.Int, parentCommentId)
//             .execute('AddCommentToPost');

//         const comment = result.recordset[0];
//         res.json(comment);
//     } catch (error) {
//         console.error('Error adding comment:', error);
//         res.status(500).json({ error: 'An error occurred while adding the comment' });
//     }
// };

module.exports = {
    createPost,
    deletePost,
    editPost,
    likePost,
    getAllPosts
};