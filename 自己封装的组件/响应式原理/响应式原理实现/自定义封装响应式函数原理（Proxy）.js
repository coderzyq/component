//Depend类的封装
let activeReactiveFn = null
class Depend {
    constructor() {
        this.reactiveFns = new Set()
    }

    /**
     * Depend优化:
     *  1> depend方法
     *  2> 使用Set来保存依赖函数, 而不是数组[]
     */

    //添加依赖响应式函数
    // addDepend(reactiveFn) {
    //     this.reactiveFns.push(reactiveFn)
    // }

    depend() {
        if (!activeReactiveFn) {
            this.reactiveFns.add(activeReactiveFn)
        }

    }
    //通知： 遍历执行所依赖的响应式函数
    notify() {
        this.reactiveFns.forEach(fn => {
          fn()
        })
    }
}
//响应式函数的封装
//将所有的响应式函数封装到函数当中
let depend = new Depend()
function watchFn(fn) {
    //将所有响应式函数存放到一个数组当中
    // depend.addDepend(activeReactiveFn)
    activeReactiveFn = fn
    fn()
    activeReactiveFn = null

}

// 封装一个获取depend函数
const targetMap = new WeakMap()
function getDepend(target, key) {
    // 根据target对象获取map的过程
    let map = targetMap.get(target)
    if (!map) {
        map = new Map()
        targetMap.set(target, map)
    }

    // 根据key获取depend对象
    let depend = map.get(key)
    if (!depend) {
        depend = new Depend()
        map.set(key, depend)
    }
    return depend
}
//对象的响应式
const obj = {
    name: 'zyq',
    age: 22
}

//对象代理
const proxy = new Proxy(obj, {
    get: function (target, key, receiver) {
        //根据target.key获取对应的depend
        const depend = getDepend(target, key)
        //给depend对象添加响应式函数
        depend.depend(activeReactiveFn)

        return Reflect.get(target, key, receiver)
    },
    set: function (target, key, newValue, receiver) {
        Reflect.set(target, key, newValue, receiver)
        const depend = getDepend(target, key)
        depend.notify()
    }
})

//响应式函数
watchFn(() => {
    console.log(proxy.name)
})
watchFn(() => {
    console.log(proxy.age)
})

//测试代码
proxy.name = 'kobe'
// proxy.name = 'james'
// proxy.name = 'curry'
// proxy.age = 33
// proxy.age = 44