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
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = value => {
      if (this.status === PROMISE_STATUS_PENDING) {
        //微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_FULFILLED
          this.value = value
          console.log('resolve被调用')
          this.onFulfilledFns.forEach(fn => {
            fn(this.value)
          })
        })
      }
    }
    const reject = reason => {
      if (this.status === PROMISE_STATUS_PENDING) {
        //微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_REJECTED
          this.reason = reason
          console.log('reject被调用')
          this.onRejectedFns.forEach(fn => {
              fn(this.reason)
            })
          })
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  //2.then方法
  then(onFulfilled, onRejected) {
    return new YQPromise((resolve, reject) => {
      //如果在then调用的时候，状态已经确定下来
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        try {
          const value = onFulfilled(this.value)
          resolve(value)
        } catch (err) {
          reject(err)
        }
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        try {
          const reason = onRejected(this.reason)
          resolve(reason)
        } catch (err) {
          reject(err)
        }
      }
      if (this.status === PROMISE_STATUS_PENDING) {
        if (onFulfilled === null || onRejected === null) throw new Error('onFulfilled or onRejected is null')
        //将成功回调和失败回调放入到数组中
        this.onFulfilledFns.push(() => {
          try {
            const value = onFulfilled(this.value)
            resolve(value)
          } catch (err) {
            reject(err)
          }
        })
        this.onRejectedFns.push(() => {
          try {
            const reason = onRejected(this.reason)
            resolve(reason)
          } catch (err) {
            reject(err)
          }
        })
      }
    })

  }
}

const promise = new YQPromise((resolve, reject) => {
  console.log('状态pending')
  resolve(111)
  // reject(222)
})

promise.then(res => {
  console.log('res: ', res)
  // return 'aaa'
  throw new Error('aaa')
}, err => {
  console.log('err: ', err)
  return 'aaa'
}).then( res => {
  console.log('res1: ', res)
}, err => {
  console.log('err1: ', err)
})
promise.then(res => {
  console.log('res2: ', res)
}, err => {
  console.log('err2: ',err)
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
