export default function auth () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'Tamer L',
        avatar: 'https://avatars2.githubusercontent.com/u/12438014?s=400&u=2ccfd1c5a70c4fd1d061821e6484e51129e641d9&v=4',
        uid: 'tlabna'
      })
    }, 2000)
  })
}
