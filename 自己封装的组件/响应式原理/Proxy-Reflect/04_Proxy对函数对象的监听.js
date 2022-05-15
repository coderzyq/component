function foo() {
  console.log(1111)
}

const fooProxy = new Proxy(foo, {
  apply(target, thisArg, argArray) {
    console.log('对foo函数进行了apply调用')
    return target.apply(thisArg, argArray)
  },

  construct(target, argArray, newTarget) {
    console.log('对foo函数进行了new调用')
    return new target(...argArray)
  }
})

// fooProxy.apply(foo, ['abc', 'cba'])

new fooProxy('ABC', 'cba')