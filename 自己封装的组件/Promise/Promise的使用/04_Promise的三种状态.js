// const promise = new Promise((resolve, reject) => {
//
// })
//
// promise.then(res => {
//
// }, err => {
//
// })

// 完全等价于下面的代码
// 注意: Promise状态一旦确定下来, 那么就是不可更改的(锁定)
new Promise((resolve, reject) => {
  //pending状态: 待定
  console.log('------')
  reject() //处于rejected状态(已拒绝状态)
  resolve() //处于fulfilled状态（已兑现状态）
  console.log('++++++')
}).then(res => {
  console.log('res', res)
}).catch(err => {
  console.log('err', err)
})
