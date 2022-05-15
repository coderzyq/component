const obj = {
  name: 'zyq',
  age: 22
}

const objProxy = new Proxy(obj, {
  get(target, key) {
    console.log('get-------')
    return Reflect.get(target, key)
  },
  set(target, key, newValue) {
    console.log('set------')
    // Reflect.set(target, key, newValue)
    target[key] = newValue
    // Object.freeze(target)
    const result = Reflect.set(target, key, newValue)
    if (result) {
      console.log('设置值成功')
    } else {
      console.log('设置值失败')
    }
  }
})

objProxy.friend = 'kobe'
console.log(objProxy.friend)

