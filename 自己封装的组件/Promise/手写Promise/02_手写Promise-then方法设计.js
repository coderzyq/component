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
          //改变状态时不要做延迟‘
          this.status = PROMISE_STATUS_FULFILLED
          //宏任务
          // setTimeout(() => {
          //   this.status = PROMISE_STATUS_FULFILLED
          //   this.value = value
          //   console.log('++++++')
          //   console.log('resolve被调用')
          //   this.onFulfilled(this.value)
          // })

          //微任务
          queueMicrotask(() => {
            this.value = value
            console.log('resolve被调用')
            this.onFulfilled(this.value)
          })
        }

    }

    const reject = reason => {
        if (this.status === PROMISE_STATUS_PENDING) {
          //改变状态时不要做延迟
          this.status = PROMISE_STATUS_REJECTED
          // setTimeout(() => {
          //   this.status = PROMISE_STATUS_REJECTED
          //   this.reason = reason
          //   console.log('reject被调用')
          //   this.onRejected()
          // })

          queueMicrotask(() => {
            this.reason = reason
            console.log('reject被调用')
            this.onRejected(this.reason)
          })
        }
    }

    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    this.onFulfilled = onFulfilled
    this.onRejected = onRejected
  }
}

const promise = new YQPromise((resolve, reject) => {
  console.log('状态pending')
  reject(222222)
  resolve(111111)
})

console.log('******')

promise.then(res => {
  console.log('res: ', res)
}, err => {
  console.log('err: ', err)
})

