// const promise = Promise.reject('reject message')
//相当于
// const promise2 = new Promise((resolve, reject) => {
//   reject('reject message')
// })

//注意： 无论传入什么值都是一样的
const promise = Promise.reject(new Promise((resolve) => {resolve('111')}))
// const promise = Promise.resolve(new Promise((resolve) => {resolve('111')}))
//不执行then和catch
// const promise = Promise.resolve(new Promise(() => {}))
// const promise = Promise.reject(new Promise(() => {}))
promise.then(res => {
  console.log('res: ', res)
}).catch(err => {
  console.log('err: ', err)
})