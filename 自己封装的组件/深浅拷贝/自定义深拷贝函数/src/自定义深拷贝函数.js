//此时是深拷贝
function isObject(value) {
    const valueType = typeof value
    return (value !== null) && (valueType === 'object' || valueType === 'function')
}

function deepClone(originObj, map = new WeakMap()) {

    //判断传入的originObj是一个Set类型
    if (originObj instanceof Set) {
        return new Set([...originObj])
    }

    //判断传入的originObj是一个Map类型
    if (originObj instanceof Map) {
        return new Map([...originObj])
    }

    //判断传入的originObj是否是一个对象类型
    if (!isObject(originObj)) {
        return originObj
    }

    //判断如果是函数类型，那么直接使用同一个函数
    if (typeof originObj === 'function') {
        return originObj
    }

    //判断如果是Symbol的value，那么将创建一个新的symbol
    if (typeof originObj === 'symbol') {
        return Symbol(originObj.description)
    }

    //第二次判断是否有newObject
    if (map.has(originObj)) {
        return map.get(originObj)
    }

    //判断传入的对象是数组，还是对象
    //第一次传进来的时候，生成newObj
    const newObj = Array.isArray(originObj) ? [] : {}
    map.set(originObj, newObj)
    for (const key in originObj) {
        newObj[key] = deepClone(originObj[key], map)
    }

    //遍历symbol的key（因为不可遍历的）
    const ownPropertySymbols = Object.getOwnPropertySymbols(originObj);
    for (const sKey of ownPropertySymbols) {
        newObj[sKey] = deepClone(originObj[sKey], map)
    }

    return newObj
}
let s1 = Symbol('aaa')
let s2 = Symbol('bbb')
const obj = {
    name: 'zyq',
    age: 22,
    friend: {
        name: 'lebron',
        age: 30,
        address: {
            city: "南京市"
        }
    },
    hobbies: ['cba', 'abc', 'nba'],
    foo: function () {
        console.log('foo function')
    },
    // //Symbol作为key和value
    [s1]: 'abc',
    s2: s2,
    // //Set 和 Map
    set: new Set(['aaa', 'bbb', 'ccc']),
    map: new Map([['aaa', 'abc'],['bbb', 'bbc'], ['ccc', 'cba']])
}

//循环引用
obj.info = obj

const newObj = deepClone(obj)

console.log(newObj === obj)
obj.friend.name = 'kobe'
obj.friend.address.city = '苏州市'
console.log(newObj)
// console.log(obj)
// console.log(newObj.s2 === obj.s2)