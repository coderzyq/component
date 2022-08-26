// 转成Promise对象
// function foo() {
//   const obj = {name: 'zyq'}
//   return new Promise((resolve) => {
//     resolve(obj)
//   })
// }
//
// foo().then(res => {
//   console.log('res: ', res)
// })


// 类方法 Promise.resolve
// 1.普通的值
// const promise = Promise.resolve({name: 'zyq'})
const promise = Promise.resolve({name: 'coderzyq'})
// 相当于
// const promise2 = new Promise((resolve) => {
//   resolve({name: 'zyq'})
// })

// 2.传入Promise
// const promise = Promise.resolve(new Promise((resolve, reject) => {
//   resolve("11111")
//   // reject('2222')
// }))

promise.then(res => {
  console.log("res:", res)
}).catch(err => {
  console.log("err: ", err)
}).finally(() => {
  console.log('finally')
})

// 3.传入thenable对象

