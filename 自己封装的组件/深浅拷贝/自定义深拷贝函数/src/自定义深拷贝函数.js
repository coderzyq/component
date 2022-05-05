//此时是深拷贝
function isObject(value) {
    const valueType = typeof value
    return (value !== null) && (valueType === 'object' || valueType === 'function')
}

function deepClone(originValue) {
    //判断是否是一个Map类型
    if (originValue instanceof Map) {
        return new Map([...originValue])
    }
    //判断是否是一个Set类型
    if (originValue instanceof Set) {
        return new Set([...originValue])
    }
    //判断如果是Symbol的value，那么创建一个新的Symbol
    if (typeof originValue === 'symbol') {
        return Symbol(originValue.description)
    }
    //判断如果是函数类型，那么直接使用同一个函数
    if (typeof originValue === 'function') {
        return originValue
    }
    //判断传入的originValue是不是一个对象类型
    if (!isObject(originValue)) {
        return originValue
    }
    //判断传入的对象是数组还是对象
    const newObject = Array.isArray(originValue) ? [] : {}
    for (const key in originValue) {
        newObject[key] = deepClone(originValue[key])
    }

    //对Symbol的key进行特殊的处理
    const symbolKeys = Object.getOwnPropertySymbols(originValue)
    for (const sKey of symbolKeys) {
        newObject[sKey] = deepClone(originValue[sKey])
    }
    return newObject
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
    //Symbol作为key和value
    [s1]: 'abc',
    s2: s2,
    //Set 和 Map
    set: new Set(['aaa', 'bbb', 'ccc']),
    map: new Map([['aaa', 'abc'], ['bbb', 'bbc'], ['ccc', 'cba']])
}

obj.info = obj

const newObj = deepClone(obj)

console.log(newObj === obj)
obj.friend.name = 'kobe'
obj.friend.address.city = '苏州市'
console.log(newObj)
console.log(obj)
console.log(newObj.s2 === obj.s2)