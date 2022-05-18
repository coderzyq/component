// ES6 ES2015
// https://promisesaplus.com/
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class YQPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined

    const resolve = value => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_FULFILLED
        this.value = value
        console.log('resolve被调用')
      }
    }

    const reject = reason => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED
        this.reason = reason
        console.log('reject被调用')
      }
    }

    executor(resolve, reject)
  }
}

const promise = new YQPromise((resolve, reject) => {
  console.log('状态pending')
  resolve(111111)
  reject(222222)
})

// promise.then(res => {
//
// }, err => {
//
// })

//on表示在某件事情发生的时候，执行某件（事情对应的）函数
// window.onclick = function () {
//
// }

