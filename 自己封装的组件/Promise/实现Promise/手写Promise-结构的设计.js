// ES6 ES2015
// https://promisesaplus.com/
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

//封装工具函数
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
                    // console.log('rejected被调用')
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
        // onRejected = onRejected === undefined ? err => {throw err} : onRejected
        const defaultRejected = err => {
            throw err
        }
        onRejected = onRejected || defaultRejected
        const defaultFulfilled = value => {
            return value
        }
        onFulfilled = onFulfilled || defaultFulfilled
        // onRejected = onRejected === undefined ? defaultRejected : onRejected
        // onRejected = onRejected || (err => { throw err })
        return new YQPromise((resolve, reject) => {
            ////如果在then调用的时候，状态已经确定下来
            if (this.status === PROMISE_STATUS_FULFILLED) {
                // try {
                //   const value = onFulfilled(this.value)
                //   resolve(value)
                // } catch (err) {
                //   reject(err)
                // }
                execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
            }
            if (this.status === PROMISE_STATUS_REJECTED) {
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
                // this.onFulfilledFns.push(onFulfilled)
                //应该把onFulfilled的结果在上文的函数中返回,
                // 但因为下文拿不到上文相对应函数的返回值,给相对应的变量管理又太难
                if (onFulfilled) this.onFulfilledFns.push(() => {
                    // try {
                    //   const value = onFulfilled(this.value)
                    //   resolve(value)
                    // } catch (err) {
                    //   reject(err)
                    // }
                    execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
                })
                if (onRejected) this.onRejectedFns.push(() => {
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

    catch(onRejected) {
        return this.then(undefined, onRejected)
    }

    finally(onFinally) {
        this.then(() => {
            onFinally()
        }, () => {
            onFinally()
        })
    }

    static resolve(value) {
        return new YQPromise((resolve) => resolve(value))
    }

    static reject(reason) {
        return new YQPromise((undefined, reject) => reject(reason))
    }

    static all(promises) {
        //问题关键：什么时候需要执行resolve, 什么时候需要执行reject
        promises.forEach(promise => {

        })
        return new YQPromise((resolve, reject) => {
            let values = []
            promises.forEach(promise => {
                if (!(promise instanceof YQPromise)) {
                    promise =this.resolve(promise)
                }
                console.log(promise)
                promise.then(res => {
                    values.push(res)
                    console.log(values.length)
                    if (values.length === promises.length) {
                        resolve(values)
                    }
                }, err => {
                    reject(err)
                })
                // if (!(promise instanceof YQPromise)) {
                //   console.log(111)
                //   console.log(promise instanceof YQPromise)
                //   promiseNot = this.resolve(promise)
                //   console.log(promiseNot instanceof YQPromise)
                //   promiseNot.then(res => {
                //     values = values1.push(res)
                //     console.log(222)
                //     resolve(values)
                //   }, err => {
                //
                //   })
            })
        })
    }

    static allSettled(promises) {
        return new YQPromise((resolve) => {
            const results = []
            promises.forEach(promise => {
                promise.then(res => {
                    results.push({status: PROMISE_STATUS_FULFILLED, value: res})
                    if (results.length === promises.length) {
                        resolve(results)
                    }
                }, err => {
                    results.push({status: PROMISE_STATUS_REJECTED, value: err})
                    if (results.length === promises.length)
                        resolve(results)
                })
            })
        })
    }

    static race(promises) {
        return new YQPromise((resolve, reject) => {
            promises.forEach(promise => {
                // promise.then(res => {
                //   resolve(res)
                // }, err => {
                //   reject(err)
                // })
                promise.then(resolve, reject)
            })
        })
    }

    static any(promises) {
        //resolve必须等到有一个成功的结果
        //reject表示所有的都失败才执行reject
        const reasons = []
        return new YQPromise((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(resolve, err => {
                    reasons.push(err)
                    if (reasons.length === promises.length) {
                        reject(new AggregateError(reasons))
                    }
                })
            })
        })
    }
}

//测试代码
const promise = new YQPromise((resolve, reject) => {
    console.log('pending状态')
    resolve(111)
    // reject(222)
    // throw new Error('aaa')
})

// YQPromise.resolve('bbb').then(res => {
//   console.log('resolve ', res)
// })
//
// YQPromise.reject('ERR').catch(err => {
//   console.log('eERR: ', err)
// })
const p2 = new YQPromise((resolve, reject) => {
    resolve('bbb')
})
const p3 = new YQPromise((resolve, reject) => {
    resolve('ccc')
})
const p4 = new YQPromise((resolve, reject) => {
    resolve('ddd')
})
YQPromise.all([p2, p3, p4, '222']).then(res => {
        console.log('res', res)
    }
).catch()

//allSettled没有catch()
YQPromise.allSettled().then()
// promise.then(res => {
//   console.log("res1: ", res)
//   return 'aaa'
// }, err => {
//   console.log('err1: ', err)
//   return 'bbb'
// }).then(res => {
//   console.log('res2: ', res)
// }, err => {
//   console.log('err2: ', err)
// })
// promise.then(res => {
//   console.log("res1: ", res)
//   return 'aaa'
// }).catch(err => {
//   console.log('err1: ', err)
// }).then(res => {
//   console.log('res2: ', res)
// }).finally(() => {
//   console.log('finally')
// })

//确定promise状态后，再次调用then()
// setTimeout(() => {
//   promise.then(res => {
//     console.log('res3: ', res)
//   }, err => {
//     console.log('err3: ', err)
//   })
// }, 1000)
