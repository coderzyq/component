//Depend类 依赖项
let activeReactiveFn = null
class Depend {
    constructor() {
        this.reactiveFns = new Set()
    }

    //依赖函数,将所需要的依赖函数添加到数组中
    // addDepend(reactiveFn) {
    //   this.reactiveFns.add(reactiveFn)
    // }
    depend() {
        if (activeReactiveFn) {
            this.reactiveFns.add(activeReactiveFn)
        }
    }

    //遍历所需要的依赖项
    notify() {
        this.reactiveFns.forEach(fn => {
            fn()
        })
    }
}

//封装一个响应式函数
function watchFn(fn) {
    activeReactiveFn = fn
    fn()
    activeReactiveFn = null
}

//封装一个depend函数
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

//设置代理对象
function reactive(obj) {
    return new Proxy(obj, {
        get(target, key, receiver) {
            //根据target.key获取对应的depend
            const depend = getDepend(target, key)
            //给depend对象添加响应式函数
            // depend.addDepend(activeReactiveFn)
            depend.depend()

            return Reflect.get(target, key, receiver)
        },

        set(target, key, newValue, receiver) {
            Reflect.set(target, key, newValue, receiver)
            const depend = getDepend(target, key)
            depend.notify()
        }
    })
}

//监听对象（测试）
const objProxy = reactive({
    name: 'zyq',
    age: 22
})
const infoProxy = reactive({
    name: 'kobe',
    address: '广州市'
})

watchFn(() => {
    console.log(infoProxy.address)
    console.log(objProxy.name)
})
watchFn(() => {
    console.log(objProxy.name)
})
// console.log(objProxy.name);
infoProxy.address = 'zzz'

// console.log(infoProxy.name)



