function isObject(value) {
    const valueType = typeof value;
    return (value !== null) && (valueType === 'object' || valueType === 'function');
}
//深拷贝
function deepClone(originObj, map = new WeakMap()) {
    //判断传入的originObj是否是一个对象类型
    if (!isObject(originObj)) {
        return originObj
    }
    //判断如果是Symbol的value,那么将创建一个新的symbol
    if (typeof originObj === 'symbol') {
        return Symbol(originObj.description)
    }
    //判断传入的ooriginObj是一个Set类型
    if (originObj instanceof Set) {
        return new Set([...originObj])
    }
    //判断传入的originObj是一个Map类型
    if (originObj instanceof Map) {
        return new Map([...originObj])
    }
    //判断如果是函数类型，那么直接使用同一个函数
    if (typeof originObj === 'function') {
        return originObj
    }
    //判断传入的对象是数组，还是对象
    //第一次穿进来的时候，生成newObj
    const newObj = Array.isArray(originObj) ? [] : {}
    map.set(originObj, newObj)
    for (const key in originObj) {
        newObj[key] = deepClone(originObj[key], map)
    }
    //遍历Symbol的key(因为不可遍历)
    const ownPropertySymbols = Object.getOwnPropertySymbols(originObj)
    for (const sKey of ownPropertySymbols) {
        newObj[sKey] = deepClone(originObj[sKey], map)
    }
    return newObj
}
let s1 = Symbol('aaa')
let s2 = Symbol('bbb')
const obj = {
    name: 'coderzyq',
    name: 23,
    friend: {
        name: 'kobe',
        age: 30,
        address: {
            city: '南京市'
        }
    },
    hobbies: ['cba', 'nba', 'abc'],
    foo: function () {
        console.log('foo function');
    },
    //Symbol 作为key和value
    [s1]: 'abc',
    s2: s2,
    //Set and Map
    set: new Set(['aaa', 'bbb', 'ccc']),
    map: new Map([['aaa', 'abc'], ['bbb', 'bbc'], ['ccc', 'cba']])
}
//循环引用
// obj.info = obj
const newObj = deepClone(obj)
console.log(newObj ===  obj);
obj.friend.name = 'lebron'
obj.friend.address.city = '广州市'
console.log(obj);
console.log(newObj);
