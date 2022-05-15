//疯转依赖收集类
class Depend {
  constructor() {
    this.reactiveFns = []
  }

  //添加依赖收集方法
  addDepend(reactiveFn) {
    this.reactiveFns.push(reactiveFn)
  }

  //通知， 遍历依赖方法
  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}

//封装一个响应式函数
const depend = new Depend()
function watchFn(fn) {
  depend.addDepend(fn)
}

//对象的响应式
const obj = {
  name: 'zyq', //depend对象
  age: 22 //depend对象
}
//调用响应式函数
// watchFn(() => {
//   console.log('1111')
//   console.log(obj.name)
// })

//监听对象的属性变量： Proxy(Vue3) / Object.defineProperty(Vue2)
const objProxy = new Proxy(obj, {
  get(target, key, receiver) {
    return Reflect.get(target, key, receiver)
  },
  set(target, p, newValue, receiver) {
    Reflect.set(target, p, newValue, receiver)
    depend.notify()
  }
})

watchFn(() => {
  const newName = objProxy.name
  console.log('Hello World')
  console.log(objProxy.name)
})
let i = 0
watchFn(() => {
  console.log(objProxy.name, 'demo function ------' + `${++i}`)
})

watchFn(() => {
  console.log(objProxy.age, 'age 发生变化是需要执行的------1');
})
watchFn(() => {
  console.log(objProxy.age, 'age 发生变化是需要执行的------2')
})

objProxy.name = 'kobe'
objProxy.name = 'james'
objProxy.name = 'jordan'
objProxy.age = 100
