const obj = {
  name: 'zyq',
  age: 22,
  height: 1.78
}

const objProxy = new Proxy(obj, {
  //获取值时的捕获器
  get(target, key) {
    console.log(`监听到obj对象的${key}的属性被访问到了`, target)
    return target[key]
  },

  //设置值时的捕获器
  set(target, key, newValue) {
    console.log(`监听到obj对象的${key}的属性被设置`, target)
    target[key] = newValue
  }
})

// console.log(objProxy.name);
// console.log(objProxy.age);

objProxy.age = 30
// console.log(objProxy.age)
