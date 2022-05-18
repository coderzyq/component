# 简单总结手写Promise

## 一、Promise规范
    https://promisesaplus.com/


## 二、Promise类设计
```javascript
class YQPromise {
    
}
```

```javascript
function YQPromise() {
    
}
```

## 三、构造函数的规划
```javascript
class YQPromise {
    constructor(executor) {
        //定义状态
        //定义resolve、reject回调
        //resolve执行微任务队列：改变状态、获取value、then传入执行成功回到
        //reject执行微任务队列：改变状态、获取reason、then传入失败回调
        
        //try catch
        executor(resolve, reject)
    }
}
```

## 四、then方法的实现
```javascript
class YQPromise {
    then(onFulfilled, onRejected) {
        this.onFulfilled = onFulfilled
        this.onRejected = onRejected
        
        // 1.判断nFulfilled、onRejected，会给默认值
        
        // 2.返回Promise resolve/reject
        
        // 3.判断之前的promise状态是否确定
        // onFulfilled/onRejected直接执行（捕获异常）
        
        // 4.添加到数组中push(() => {执行 onFulfilled/onRejected 直接执行代码})
    }
}
```