const promise = new Promise((resolve, reject) => {
  resolve('resolve message')
  reject('reject message')
})

promise.then(res => {
  return new Promise((resolve, reject) => {
    reject('reject')
    // resolve('resolve')
  })

  // console.log('res:', res)
}).catch(err => {
  console.log('err: ', err)
}).finally(() => {
  console.log('finally code execute')
})