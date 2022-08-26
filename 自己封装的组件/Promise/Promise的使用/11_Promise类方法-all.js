// 创建多个Promise
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(111111)
    reject(111111)
  }, 1000)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // reject(222222)
    resolve(222222)
  }, 2000)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve(333333)
    reject(333333)
  }, 3000)
})

// 需求: 所有的Promise都变成fulfilled时, 再拿到结果
// 意外: 在拿到所有结果之前, 有一个promise变成了rejected,
// 那么整个promise是rejected,只会返回第一个rejected
Promise.all([p1, p2, p3]).then(res => {
  console.log(res)
}).catch(err => {
  console.log('err: ', err)
})
