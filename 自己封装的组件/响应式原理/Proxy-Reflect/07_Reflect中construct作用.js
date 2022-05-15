function Student(name, age) {
  this.name = name
  this.age = age
}

function Teacher() {

}

// const stu = new Student('zyq', 22)
// console.log(stu)
// console.log(stu.__proto__ === Student.prototype)

//执行Student函数中的内容，但创建出来对象的Teacher对象
const teacher = Reflect.construct(Student, ['zyq', 22], Teacher)
console.log(teacher)

console.log(teacher.__proto__ === Teacher.prototype)