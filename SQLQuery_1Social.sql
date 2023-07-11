CREATE DATABASE Social;

USE Social;

-- Users table
CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100),
    registered_at DATETIME,
    last_login DATETIME,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);

-- Location table
CREATE  TABLE Location (
    location_id INT PRIMARY KEY,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    location_name VARCHAR(100)
);

-- Posts table
CREATE TABLE Posts (
    post_id INT PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES Users(user_id),
    content VARCHAR(MAX),
    media_type VARCHAR(50),
    media_url VARCHAR(255),
    location_id INT FOREIGN KEY REFERENCES Location(location_id),
    timestamp DATETIME
    -- Add other post-related fields here
);

-- Reaction table
CREATE TABLE Reaction (
    reaction_id INT PRIMARY KEY,
    --comment_id INT FOREIGN KEY REFERENCES Comments(comment_id),
    user_id INT FOREIGN KEY REFERENCES Users(user_id),
    emoji VARCHAR(20),
    timestamp DATETIME
);
ALTER TABLE Reaction
    ADD comment_id INT FOREIGN KEY REFERENCES Comments(comment_id)



-- Comments table
CREATE TABLE Comments (
    comment_id INT PRIMARY KEY,
    post_id INT FOREIGN KEY REFERENCES Posts(post_id),
    user_id INT FOREIGN KEY REFERENCES Users(user_id),
    content VARCHAR(MAX),
    timestamp DATETIME,
    reaction_id INT FOREIGN KEY REFERENCES Reaction(reaction_id),
    parent_comment_id INT FOREIGN KEY REFERENCES Comments(comment_id)
);
--DROP TABLE Comments

-- Likes table
CREATE TABLE Likes (
    like_id INT PRIMARY KEY,
    post_id INT FOREIGN KEY REFERENCES Posts(post_id),
    user_id INT FOREIGN KEY REFERENCES Users(user_id),
    is_like BIT
);

-- Followings table
CREATE TABLE Followings (
    following_id INT PRIMARY KEY,
    follower_user_id INT FOREIGN KEY REFERENCES Users(user_id),
    following_user_id INT FOREIGN KEY REFERENCES Users(user_id),
    timestamp DATETIME,
    status BIT
);

-- Followers table
CREATE TABLE Followers (
    follower_id INT PRIMARY KEY,
    follower_user_id INT FOREIGN KEY REFERENCES Users(user_id),
    following_user_id INT FOREIGN KEY REFERENCES Users(user_id),
    timestamp DATETIME
);

-- Profile table
CREATE TABLE Profile (
    profile_id INT PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES Users(user_id),
    profile_pic_url VARCHAR(255),
    cover_pic_url VARCHAR(255),
    contact_no VARCHAR(20),
    address VARCHAR(255),
    bio VARCHAR(MAX),
    relationship_status VARCHAR(50),
    gender CHAR(1),
    dob DATE
);

-- Notifications table
CREATE  TABLE Notifications (
    notification_id INT PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES Users(user_id),
    sender_id INT FOREIGN KEY REFERENCES Users(user_id),
    notification_type VARCHAR(50),
    post_id INT FOREIGN KEY REFERENCES Posts(post_id),
    comment_id INT FOREIGN KEY REFERENCES Comments(comment_id),
    timestamp DATETIME,
    follower_id INT FOREIGN KEY REFERENCES Followers(follower_id),
    friendship_id INT FOREIGN KEY REFERENCES Friendships(friendship_id)
);

-- Friendships/Connections table
CREATE TABLE Friendships (
    friendship_id INT PRIMARY KEY,
    user1_id INT FOREIGN KEY REFERENCES Users(user_id),
    user2_id INT FOREIGN KEY REFERENCES Users(user_id),
    timestamp DATETIME
);

-- Messages table
CREATE  TABLE Messages (
    message_id INT PRIMARY KEY,
    sender_user_id INT FOREIGN KEY REFERENCES Users(user_id),
    receiver_user_id INT FOREIGN KEY REFERENCES Users(user_id),
    content VARCHAR(MAX),
    media_type VARCHAR(50),
    media_url VARCHAR(255),
    timestamp DATETIME,
    is_read BIT
);



-- Tags table
CREATE TABLE Tags (
    tag_id INT PRIMARY KEY,
    post_id INT FOREIGN KEY REFERENCES Posts(post_id),
    tagged_user_id INT FOREIGN KEY REFERENCES Users(user_id)
);





-- Inserting values into the Users table
INSERT INTO Users (user_id, username, email, password, registered_at, last_login, first_name, last_name)
VALUES
    (1, 'john.doe', 'john.doe@example.com', 'password123', '2022-01-01', '2022-06-01', 'John', 'Doe'),
    (2, 'jane.smith', 'jane.smith@example.com', 'password456', '2022-02-01', '2022-06-15', 'Jane', 'Smith'),
    (3, 'alex.wilson', 'alex.wilson@example.com', 'password789', '2022-03-01', '2022-06-20', 'Alex', 'Wilson');

-- Inserting values into the Posts table
INSERT INTO Posts (post_id, user_id, content, media_type, media_url, location_id, timestamp)
VALUES
    (1, 1, 'Hello, everyone!', 'text', NULL, NULL, '2022-06-01 10:00:00'),
    (2, 2, 'Check out this beautiful picture!', 'image', 'https://example.com/image.jpg', NULL, '2022-06-15 15:30:00'),
    (3, 3, 'I just uploaded a new video!', 'video', 'https://example.com/video.mp4', NULL, '2022-06-20 18:45:00');

-- Inserting values into the Location table
INSERT INTO Location (location_id, latitude, longitude, location_name)
VALUES
    (1, 40.7128, -74.0060, 'New York City'),
    (2, 34.0522, -118.2437, 'Los Angeles'),
    (3, 51.5074, -0.1278, 'London');

-- Inserting values into the Comments table
INSERT INTO Comments (comment_id, post_id, user_id, content, timestamp, reaction_id, parent_comment_id)
VALUES
    (1, 1, 2, 'Nice post!', '2022-06-01 10:15:00', NULL, NULL),
    (2, 2, 1, 'Great picture!', '2022-06-15 15:35:00', NULL, NULL),
    (3, 3, 3, 'Awesome video!', '2022-06-20 18:50:00', NULL, NULL);

-- Inserting values into the Likes table
INSERT INTO Likes (like_id, post_id, user_id, is_like)
VALUES
    (1, 1, 3, 1),
    (2, 2, 1, 1),
    (3, 3, 2, 1);

-- Inserting values into the Followings table
INSERT INTO Followings (following_id, follower_user_id, following_user_id, timestamp, status)
VALUES
    (1, 1, 2, '2022-06-01 10:30:00', 1),
    (2, 1, 3, '2022-06-01 10:45:00', 1),
    (3, 2, 3, '2022-06-15 15:50:00', 1);

-- Inserting values into the Followers table
INSERT INTO Followers (follower_id, follower_user_id, following_user_id, timestamp)
VALUES
    (1, 2, 1, '2022-06-01 11:00:00'),
    (2, 3, 1, '2022-06-01 11:15:00'),
    (3, 3, 2, '2022-06-15 16:00:00');

-- Inserting values into the Profile table
INSERT INTO Profile (profile_id, user_id, profile_pic_url, cover_pic_url, contact_no, address, bio, relationship_status, gender, dob)
VALUES
    (1, 1, 'https://example.com/profile1.jpg', 'https://example.com/cover1.jpg', '1234567890', 'New York', 'Hello, I am John!', 'Single', 'M', '1990-01-01'),
    (2, 2, 'https://example.com/profile2.jpg', 'https://example.com/cover2.jpg', '9876543210', 'Los Angeles', 'Nice to meet you!', 'Single', 'F', '1995-02-02'),
    (3, 3, 'https://example.com/profile3.jpg', 'https://example.com/cover3.jpg', '5555555555', 'London', 'I love coding!', 'Single', 'M', '2000-03-03');

-- Inserting values into the Notifications table
INSERT INTO Notifications (notification_id, user_id, sender_id, notification_type, post_id, comment_id, timestamp, follower_id, friendship_id)
VALUES
    (1, 1, 2, 'like', 1, NULL, '2022-06-01 11:30:00', NULL, NULL),
    (2, 1, 3, 'comment', 1, 1, '2022-06-01 11:45:00', NULL, NULL),
    (3, 2, 1, 'follow', NULL, NULL, '2022-06-15 16:15:00', 1, NULL);

-- Inserting values into the Friendships table
INSERT INTO Friendships (friendship_id, user1_id, user2_id, timestamp)
VALUES
    (1, 1, 2, '2022-06-01 12:00:00'),
    (2, 1, 3, '2022-06-01 12:15:00'),
    (3, 2, 3, '2022-06-15 16:30:00');

-- Inserting values into the Messages table
INSERT INTO Messages (message_id, sender_user_id, receiver_user_id, content, media_type, media_url, timestamp, is_read)
VALUES
    (1, 1, 2, 'Hi Jane, how are you?', NULL, NULL, '2022-06-01 12:30:00', 0),
    (2, 2, 1, 'I am  doing great, John! How about you?', NULL, NULL, '2022-06-01 12:45:00', 0),
    (3, 3, 1, 'Hey John, nice to meet you!', NULL, NULL, '2022-06-15 16:45:00', 0);

-- Inserting values into the Reaction table
INSERT INTO Reaction (reaction_id, comment_id, user_id, emoji, timestamp)
VALUES
    (1, 1, 3, '👍', '2022-06-01 13:00:00'),
    (2, 2, 1, '❤️', '2022-06-01 13:15:00'),
    (3, 3, 2, '😄', '2022-06-15 17:00:00');

-- Inserting values into the Tags table
INSERT INTO Tags (tag_id, post_id, tagged_user_id)
VALUES
    (1, 1, 2),
    (2, 2, 1),
    (3, 3, 3);
