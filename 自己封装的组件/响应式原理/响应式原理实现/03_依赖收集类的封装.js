class Depend {
  constructor() {
    this.reactiveFns = []
  }

  //添加依赖函数
  addDepend(reactiveFn) {
    this.reactiveFns.push(reactiveFn)
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}

//封装一个响应式的函数
const depend = new Depend()
function watchFn(fn) {
  depend.addDepend(fn)
}

//对象的响应式
const obj = {
  name: 'zyq', //depend对象
  age: 22 //depend对象
}

watchFn(() => {
  console.log('Hello World')
  console.log(obj.name)
  // console.log(obj.age)
})

watchFn(() => {
  console.log(obj.name, 'demo function------')
})
// console.log(obj.name)
obj.name = 'kobe'
// obj.age = 88
depend.notify()
