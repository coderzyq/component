// ES6 ES2015
// https://promisesaplus.com/
const PROMISE_STATUS_PENDING ='pending'
const PROMISE_STATUS_FULFILLED ='fulfilled'
const PROMISE_STATUS_REJECTED ='rejected'

class YQPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_FULFILLED
          this.value = value
          console.log('resolve被调用')
          // this.onFulfilled(this.value)
          //遍历获取的所有的函数
          this.onFulfilledFns.forEach(fn => {
            fn(this.value)
          })
        })
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_REJECTED
          this.reason = reason
          console.log('reject被调用')
          // this.onRejected(this.reason)
          this.onRejectedFns.forEach(fn => {
            fn(this.reason)
          })
        })
      }
    }

    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    //如果在then调用的时候，状态已经确定下来
    if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
      onFulfilled(this.value)
    }
    if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
      onRejected(this.reason)
    }
    // this.onFulfilled = onFulfilled
    // this.onRejected = onRejected
    if (this.status === PROMISE_STATUS_PENDING) {
      //将成功回调和失败回调放入到数组中
      if (onFulfilled === null || onRejected === null) throw new Error('onFulfilled or onRejected is null')
      this.onFulfilledFns.push(onFulfilled)
      this.onRejectedFns.push(onRejected)
    }

  }



}

const promise = new YQPromise((resolve, reject) => {
  console.log("状态pending")
  resolve(1111) // resolved/fulfilled
  // reject(2222)
})

// promise.then()多次调用
promise.then(res => {
  console.log("res: ", res)
}, err => {
  console.log('err: ', err)
})

promise.then( res => {
  console.log("res2: ", res)
}, err => {
  console.log('err2: ', err)
})

//以下代码不会进行回调, 原因是还没加入到this.onFulfilled中，但是原生的Promise可以
// const promise = new Promise(resolve => {
//   resolve('aaaa')
// })
//确定promise状态后，再次调用then()
setTimeout(() => {
  promise.then((res) => {
    console.log('res3: ', res)
  }, err => {
    console.log('err3: ', err)
  })
}, 1000)