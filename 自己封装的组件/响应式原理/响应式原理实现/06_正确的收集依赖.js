class Depend {
  constructor() {
    this.reactiveFns = []
  }

  //添加依赖函数
  addDepend(reactiveFn) {
    this.reactiveFns.push(reactiveFn)
  }

  //通知： 遍历添加的每个响应式函数
  notify() {
    console.log(this.reactiveFns);
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}

//封装一个响应式的函数
//全局响应式函数变量
let activeReactiveFn = null
function watchFn(fn) {
  activeReactiveFn = fn
  fn()
  activeReactiveFn = null
}

//封装一个获取depend函数
const targetMap = new WeakMap()
function getDepend(target, key) {
  //根据target对象获取map的过程
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
    targetMap.set(target, map)
  }

  //根据key获取depend对象
  let depend = map.get(key)
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)
  }
  return depend
}

//对象的响应式
const obj = {
  name: 'zyq', //depend对象
  age: 22 //depend对象
}



//监听对象的属性变量：Proxy(vue3)/Object.defineProperty(vue2)
const objProxy = new Proxy(obj, {
  get: function (target, key, receiver) {
    //根据target.key获取对应的depend
    const depend = getDepend(target, key)
    //给depend对象添加响应式函数
    depend.addDepend(activeReactiveFn)
    return Reflect.get(target, key, receiver)
  },
  set: function (target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver)
    //depend.notify()
    const depend = getDepend(target, key)
    depend.notify()
  }
})

//执行响应式函数
watchFn(() => {
  console.log('---第一个name函数开始---')
  console.log('Hello World')
  console.log(objProxy.name);
  console.log('---第一个name函数结束')
})

watchFn(() => {
  console.log(objProxy.name, 'demo function------')
})

watchFn(() => {
  console.log(objProxy.age, 'age 发生变化是需要执行的------1')
})
watchFn(() => {
  console.log(objProxy.age, 'age 发生变化是需要执行的------2')
})
watchFn(() => {
  console.log(objProxy.name, '新函数')
  console.log(objProxy.age, '新函数')
})

console.log('------======改变obj的name值======------')

// objProxy.name = 'kobe'
objProxy.age = 100