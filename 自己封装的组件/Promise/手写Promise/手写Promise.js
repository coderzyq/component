//自定义Promise类
const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "rejected";
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
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledFns = [];
    this.onRejectedFns = [];

    const resolve = (value) => {
      //判断状态
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          console.log("resolve 被调用");
          //调用then传入的第一个回调函数
          this.onFulfilledFns.forEach((fn) => {
            fn(this.value);
          });
        });
      }
    };
    const reject = (reason) => {
      //判断状态
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          console.log("reject被调用");
          //调用then传入的第二个回调函数
          this.onRejectedFns.forEach((fn) => {
            fn(this.reason);
          });
        });
      }
    };
    try {
        executor(resolve, reject);
    } catch (err) {
        reject(err)
    }
  }
  //then()方法
  then(onFulfilled, onRejected) {
    return new YQPromise((resolve, reject) => {
        onRejected = onRejected || (err => {throw err})
      //如果在then调用的时候，状态已经确定下来
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_PENDING) {
        //将成功回调和失败回调放入到数组中
        if (onFulfilled === null || onRejected === null)
          throw new Error("onFulfilled or onRejected is null");
          if(onFulfilled) this.onFulfilledFns.push(() => {
            execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
        });
        if(onFulfilled) this.onRejectedFns.push(() => {
            execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
        });
      }
    });
  }
  //catch()
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
}

const promise = new YQPromise((resolve, reject) => {
  console.log("状态pending");
//   resolve(111);
    reject(2222);
});

console.log("------------------------------------------------");

// promise.then(
//   (res) => {
//     console.log("res: ", res);
//   },
//   (err) => {
//     console.log("err: ", err);
//   }
// );
//多次调用then
promise
  .then(
    (res) => {
      console.log("result: ", res);
    }
  ).catch((err) => {
    console.log(err, 'eeeeeeee');
  });
//以下代码不会进行回调, 原因是还没加入到this.onFulfilled中，但是原生的Promise可以
// const promise = new Promise(resolve => {
//   resolve('aaaa')
// })
//确定promise状态后，再次调用then()
// setTimeout(() => {
//   promise.then(
//     (res) => {
//       console.log("res3: ", res);
//     },
//     (err) => {
//       console.log("err3: ", err);
//     }
//   );
// }, 1000);
