const mssql = require('mssql');
//const { pool } = require('../config');
const emailValidator = require('../validators/emailValidator');
const isValidEmail = require('../validators/emailValidator');
const { sendResetPasswordEmail } = require('../utilis/verifyEmail');

const createProfile = async(req, res) => {
    try {
        const { userId } = req.params;
        const {

            profilePicUrl,
            coverPicUrl,
            contactNo,
            address,
            bio,
            relationshipStatus,
            gender,
            dob,
        } = req.body;

        const pool = require("../server").pool;

        const request = pool.request();
        request.input('userId', mssql.Int, userId);
        request.input('profilePicUrl', mssql.VarChar(255), profilePicUrl);
        request.input('coverPicUrl', mssql.VarChar(255), coverPicUrl);
        request.input('contactNo', mssql.VarChar(20), contactNo);
        request.input('address', mssql.VarChar(255), address);
        request.input('bio', mssql.VarChar(mssql.MAX), bio);
        request.input('relationshipStatus', mssql.VarChar(50), relationshipStatus);
        request.input('gender', mssql.Char(1), gender);
        request.input('dob', mssql.Date, dob);

        const result = await request.execute('CreateUserProfile');
        const users = result.recordset
            //res.json(result.recordset[0]);
        res.json({

            success: true,

            message: "created the profile successfully",

            result: users



        })
    } catch (error) {
        console.error('Error creating user profile:', error);
        res.status(500).json({ error: 'An error occurred while creating user profile' });
    }
};

const deleteProfile = async(req, res) => {
    try {
        const { profileId, userId } = req.params;

        const pool = require("../server").pool;

        const request = pool.request();
        request.input('profileId', mssql.Int, profileId);
        request.input('userId', mssql.Int, userId);
        request.input('isDeleted', mssql.Bit, 1);

        await request.execute('EditDeleteProfile');

        res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
        console.error('Error deleting user profile:', error);
        res.status(500).json({ error: 'An error occurred while deleting user profile' });
    }
};

const editProfile = async(req, res) => {
    try {
        const { profileId, userId } = req.params;
        const {

            profilePicUrl,
            coverPicUrl,
            contactNo,
            address,
            bio,
            relationshipStatus,
            gender,
            dob,
        } = req.body;

        const pool = require("../server").pool;

        const request = pool.request();
        request.input('profileId', mssql.Int, profileId);
        request.input('userId', mssql.Int, userId);
        request.input('profilePicUrl', mssql.VarChar(255), profilePicUrl);
        request.input('coverPicUrl', mssql.VarChar(255), coverPicUrl);
        request.input('contactNo', mssql.VarChar(20), contactNo);
        request.input('address', mssql.VarChar(255), address);
        request.input('bio', mssql.VarChar(mssql.MAX), bio);
        request.input('relationshipStatus', mssql.VarChar(50), relationshipStatus);
        request.input('gender', mssql.Char(1), gender);
        request.input('dob', mssql.Date, dob);

        await request.execute('EditDeleteProfile');

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'An error occurred while updating user profile' });
    }
};

const getFollowers = async(req, res) => {
    try {
        const { userId } = req.params;

        const pool = require("../server").pool;

        const request = pool.request();
        request.input('userId', mssql.Int, userId);

        const result = await request.query('EXEC GetFollowers @userId');

        res.json(result.recordset);
    } catch (error) {
        console.error('Error retrieving followers:', error);
        res.status(500).json({ error: 'An error occurred while retrieving followers' });
    }
};

const getFollowing = async(req, res) => {
    try {
        const { userId } = req.params;

        const pool = require("../server").pool;

        const request = pool.request();
        request.input('userId', mssql.Int, userId);

        const result = await request.query('EXEC GetFollowing @userId');

        res.json(result.recordset);
    } catch (error) {
        console.error('Error retrieving following users:', error);
        res.status(500).json({ error: 'An error occurred while retrieving following users' });
    }
};

const getSuggestedUsers = async(req, res) => {
    try {
        const { userId } = req.params;

        const pool = require("../server").pool;

        const request = pool.request();
        request.input('userId', mssql.Int, userId);

        const result = await request.query('EXEC GetSuggestedUsers @userId');

        res.json(result.recordset);
    } catch (error) {
        console.error('Error retrieving suggested users:', error);
        res.status(500).json({ error: 'An error occurred while retrieving suggested users' });
    }
};

const searchUsers = async(req, res) => {
    try {
        const { searchText } = req.params;

        const pool = require("../server").pool;

        const request = pool.request();
        request.input('searchText', mssql.VarChar(100), searchText);

        const result = await request.query('EXEC SearchUsers @searchText');

        res.json(result.recordset);
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ error: 'An error occurred while searching users' });
    }
};


const sendFriendRequest = async(req, res) => {
    try {
        const { senderId, receiverId } = req.body;

        const pool = require("../server").pool;

        const request = pool.request();
        request.input('senderId', mssql.Int, senderId);
        request.input('receiverId', mssql.Int, receiverId);

        await request.execute('SendFriendRequest');

        res.json({ message: 'Friend request sent successfully' });
    } catch (error) {
        console.error('Error sending friend request:', error);
        res.status(500).json({ error: 'An error occurred while sending the friend request' });
    }
};

const acceptOrDeclineFriendRequest = async(req, res) => {
    try {
        const { senderId, receiverId, status } = req.body;

        const pool = require("../server").pool;

        const request = pool.request();
        request.input('senderId', mssql.Int, senderId);
        request.input('receiverId', mssql.Int, receiverId);
        request.input('status', mssql.VarChar(20), status);

        await request.execute('AcceptOrDeclineFriendRequest');

        res.json({ message: 'Friend request updated successfully' });
    } catch (error) {
        console.error('Error updating friend request:', error);
        res.status(500).json({ error: 'An error occurred while updating the friend request' });
    }
};

const deleteAccount = async(req, res) => {
    try {
        const { userId } = req.params;

        const pool = require("../server").pool;

        const request = pool.request();
        request.input('userId', mssql.Int, userId);

        await request.execute('SoftDeleteUserAccount');

        res.json({ message: 'User account deleted successfully' });
    } catch (error) {
        console.error('Error deleting user account:', error);
        res.status(500).json({ error: 'An error occurred while deleting the user account' });
    }
};


const validateResetToken = async(email, resetToken) => {
    try {
        const pool = require("../server").pool;

        const result = await pool.request()
            .input('email', email)
            .input('resetToken', resetToken)
            .output('isValid', mssql.Bit)
            .execute('ValidateResetToken');

        return result.output.isValid === 1;
    } catch (error) {
        console.error('Error validating reset token:', error);
        throw new Error('An error occurred while validating the reset token.');
    }
};

const updatePasswordInDatabase = async(email, newPassword) => {
    try {
        const pool = require("../server").pool;

        await pool.request()
            .input('email', email)
            .input('newPassword', newPassword)
            .execute('UpdateUserPassword');
    } catch (error) {
        console.error('Error updating password in the database:', error);
        throw new Error('An error occurred while updating the password in the database.');
    }
};

module.exports = { validateResetToken, updatePasswordInDatabase };


const updateUserPassword = async(req, res) => {
    try {
        const { email, resetToken, newPassword } = req.body;
        const { userId } = req.session;
        const intendedEmail = req.body.email;
        // Validate email format
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        // Check if the email is associated with the intended user
        // if (req.session.userEmail !== email) {
        //     return res.status(401).json({ message: 'Unauthorized access.' });
        // }

        // Check if the email belongs to the intended user
        if (!emailValidator(userId, intendedEmail)) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Validate reset token in the database
        const isTokenValid = await validateResetToken(email, resetToken);

        if (!isTokenValid) {
            return res.status(400).json({ message: 'Invalid reset token.' });
        }

        // Update password in the database
        await updatePasswordInDatabase(email, newPassword);

        // Send reset password email
        const resetLink = 'https://example.com/reset-password'; // Modify with your actual reset password link
        sendResetPasswordEmail(email, resetLink);

        return res.status(200).json({ message: 'Password updated successfully.' });



    } catch (error) {
        console.error('Error updating user password:', error);
        res.status(500).json({ error: 'An error occurred while updating the user password' });
    }
};

module.exports = {
    createProfile,
    deleteProfile,
    editProfile,
    getFollowers,
    getFollowing,
    getSuggestedUsers,
    searchUsers,
    sendFriendRequest,
    acceptOrDeclineFriendRequest,
    deleteAccount,
    updateUserPassword,
    validateResetToken,
    updatePasswordInDatabase
};