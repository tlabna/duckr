/*
  Data rquirements for Duckr app by page:
    Home
      All Ducks

    Profile
      User Info
      User Ducks

    Replies
      Specific Duck
      Ducks Replies
 */

/*
  Data structure best optimized for Duckr app (my opinion):
    /user
      uid
        name
        uid
        avatar

    /ducks
      duckId
        avatar
        duckId
        name
        text
        timestamp
        uid

    /usersDucks
      uid
        duckId
          avatar
          duckId
          name
          text
          timestamp
          uid

    /replies
      duckId
        replyId
          name
          comment
          uid
          timestamp
          avatar

    /usersLikes
      uid
        duckid

    /likeCount
      duckId
 */
