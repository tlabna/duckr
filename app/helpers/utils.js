import { usersDucksExpirationLength, userExpirationLength, repliesExpirationLength } from 'config/constants'

export function formatUserInfo (name, avatar, uid) {
  avatar = `${avatar}?height=100&width=100`

  return {
    name,
    avatar,
    uid
  }
}

export function formatDuck (text, user) {
  return {
    text,
    name: user.get('name'),
    avatar: user.get('avatar'),
    uid: user.get('uid'),
    timestamp: Date.now()
  }
}

export function formatTimestamp (timestamp) {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

export function getMilliseconds (timestamp) {
  return new Date().getTime() - new Date(timestamp).getTime()
}

export function staleDucks (timestamp) {
  return getMilliseconds(timestamp) > usersDucksExpirationLength
}

export function staleUser (timestamp) {
  return getMilliseconds(timestamp) > userExpirationLength
}

export function staleReplies (timestamp) {
  return getMilliseconds(timestamp) > repliesExpirationLength
}

export function formatReply (authedUser, reply) {
  return {
    name: authedUser.get('name'),
    avatar: authedUser.get('avatar'),
    uid: authedUser.get('uid'),
    reply,
    timestamp: Date.now()
  }
}
