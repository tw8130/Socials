classDiagram
      
class Users {
    user_id
          username
          email
          password
          registered_at
          last_login
          first_name
          last_name
          
}
        
class Location {
    location_id
          latitude
          longitude
          location_name
          
}
        
class Posts {
    post_id
          user_id
          content
          media_type
          media_url
          location_id
          timestamp
          
}
        
class Likes {
    like_id
          post_id
          user_id
          is_like
          
}
        
class Followings {
    following_id
          follower_user_id
          following_user_id
          timestamp
          status
          
}
        
class Followers {
    follower_id
          follower_user_id
          following_user_id
          timestamp
          
}
        
class Profile {
    profile_id
          user_id
          profile_pic_url
          cover_pic_url
          contact_no
          address
          bio
          relationship_status
          gender
          dob
          
}
        
class Friendships {
    friendship_id
          user1_id
          user2_id
          timestamp
          
}
        
class Messages {
    message_id
          sender_user_id
          receiver_user_id
          content
          media_type
          media_url
          timestamp
          is_read
          
}
        
class Tags {
    tag_id
          post_id
          tagged_user_id
          
}
        
class Reaction {
    reaction_id
          user_id
          emoji
          timestamp
          comment_id
          
}
        
class Comments {
    comment_id
          post_id
          user_id
          content
          timestamp
          reaction_id
          parent_comment_id
          
}
        
class Notifications {
    notification_id
          user_id
          sender_id
          notification_type
          post_id
          comment_id
          timestamp
          follower_id
          friendship_id
          
}
        
      Posts --|> Users: user_id
            Posts --|> Location: location_id
            Likes --|> Posts: post_id
            Likes --|> Users: user_id
            Followings --|> Users: user_id
            Followings --|> Users: user_id
            Followers --|> Users: user_id
            Followers --|> Users: user_id
            Profile --|> Users: user_id
            Friendships --|> Users: user_id
            Friendships --|> Users: user_id
            Messages --|> Users: user_id
            Messages --|> Users: user_id
            Tags --|> Posts: post_id
            Tags --|> Users: user_id
            Reaction --|> Users: user_id
            Reaction --|> Comments: comment_id
            Comments --|> Posts: post_id
            Comments --|> Users: user_id
            Comments --|> Reaction: reaction_id
            Comments --|> Comments: comment_id
            Notifications --|> Users: user_id
            Notifications --|> Users: user_id
            Notifications --|> Posts: post_id
            Notifications --|> Comments: comment_id
            Notifications --|> Followers: follower_id
            Notifications --|> Friendships: friendship_id
            
      