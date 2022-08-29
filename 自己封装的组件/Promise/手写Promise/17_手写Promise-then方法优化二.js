// ES6 ES2015
// https://promisesaplus.com/
const PROMISE_STATUS_PENDING ='pending'
const PROMISE_STATUS_FULFILLED ='fulfilled'
const PROMISE_STATUS_REJECTED ='rejected'

//工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value)
    resolve(result)
  } catch (err) {
    reject(err)
  }
}

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
          // console.log('resolve被调用')
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

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    return new YQPromise((resolve, reject) => {
      //如果在then调用的时候，状态已经确定下来
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        // try {
        //   const value = onFulfilled(this.value)
        //   resolve(value)
        // } catch (err) {
        //   reject(err)
        // }
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        // try {
        //   const reason = onRejected(this.reason)
        //   resolve(reason)
        // } catch (err) {
        //   reject(err)
        // }
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_PENDING) {
        //将成功回调和失败回调放入到数组中
        if (onFulfilled === null || onRejected === null) throw new Error('onFulfilled or onRejected is null')
        this.onFulfilledFns.push(() => {
          // try {
          //   const value = onFulfilled(this.value)
          //   resolve(value)
          // } catch (err) {
          //   reject(err)
          // }

          execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
        })
        this.onRejectedFns.push(() => {
          // try {
          //   const reason = onRejected(this.reason)
          //   resolve(reason)
          // } catch (err) {
          //   reject(err)
          // }

          execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
        })
      }
    })
  }



}

const promise = new YQPromise((resolve, reject) => {
  console.log("状态pending")
  // resolve(1111) // resolved/fulfilled
  reject(2222)
})


promise.then(res => {
  console.log("res: ", res)
  return 'aaa'
}, err => {
  console.log('err: ', err)
  return 'bbb'
}).then(res => {
  console.log('res2: ', res)
}, err => {
  console.log('err2: ', err)
})
