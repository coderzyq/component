//Depend类 依赖项
let activeReactiveFn = null
class Depend {
    constructor() {
        this.reactiveFns = new Set()
    }

    //添加依赖项
    // addDepend(fn) {
    //     this.reactiveFns.add(fn)
    // }
    depend() {
        if (activeReactiveFn) {
            this.reactiveFns.add(activeReactiveFn)
        }
    }

    //执行
    notify() {
        this.reactiveFns.forEach(fn => {
            fn()
        })
    }
}

//封装一个响应式函数
const depend = new Depend()

function watchFn(fn) {
    // depend.addDepend(fn)
    activeReactiveFn = fn
    fn()
    activeReactiveFn = null
}

//根据target.key获取所需要的依赖项
const targetMap = new WeakMap()
function getDepend(target, key) {
    //根据target获取map
    let map = targetMap.get(target)
    if (!map) {
        map = new Map()
        targetMap.set(target, map)
    }

    //根据key获取所需要的depend对象
    let depend = map.get(key)
    if (!depend) {
        depend = new Depend()
        map.set(key, depend)
    }

    return depend
}
//设置代理对象
function reactive(obj) {
    return new Proxy(obj, {
        get: function (target, key, receiver) {
            //根据target.key获取所需要的依赖项
            const depend = getDepend(target, key)
            //给获取的依赖项添加依赖响应式函数
            // depend.addDepend(activeReactiveFn)
            depend.depend()
            return Reflect.get(target, key, receiver)
        },
        set: function (target, key, newValue, receiver) {
            //根据target.key获取所需要的依赖项
            const depend = getDepend(target, key)
            Reflect.set(target, key, newValue, receiver)
            //执行所需要的响应式函数
            depend.notify()
        }
    })
}

//测试代码
const objProxy = reactive({
    name: 'zyq',
    age: 22
})
const infoProxy = reactive({
    name: 'kobe',
    address: '南京市'
})
//响应式函数
watchFn(() => {
    console.log(objProxy.name)
    console.log(objProxy.name)
})

watchFn(() => {
    console.log(objProxy.age)
})

watchFn(() => {
    console.log(infoProxy.name)
    console.log(infoProxy.address)
})

objProxy.name = 'james'
infoProxy.address = '日照市'





