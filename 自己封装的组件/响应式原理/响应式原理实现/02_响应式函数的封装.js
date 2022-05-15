//封装一个响应式的函数
//将所有的响应式函数封装到函数当中
let reactiveFns = [] // name发生改变的所有需要重新执行的函数
function watchFn(fn) {
  //将所有的响应式函数存放到数组当中
  reactiveFns.push(fn)
}

//对象的响应式
const obj = {
  name: 'zyq',
  age: 22
}
// function foo() {
//   const newName = obj.name
//   console.log('你好啊')
//   console.log('Hello World')
//   console.log(obj.name)
// }
//响应式函数
watchFn(() => {
  // const newName = obj.name
  // console.log('你好啊')
  console.log('Hello World')
  console.log(obj.name)
})
//响应式函数
watchFn(() => {
  console.log(obj.name, 'demo function------')
})

function bar() {
  console.log('普通的其他函数')
  console.log('这个函数不需要任何有响应式')
}
obj.name = 'kobe'
// console.log(obj.name)
// foo()
//将执行所需要的响应式函数
reactiveFns.forEach(fn => {
  fn()
})

