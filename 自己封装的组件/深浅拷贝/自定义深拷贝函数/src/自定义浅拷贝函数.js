//此时是浅拷贝
function deepClone(originValue) {
    const newObject = {}
    for (const key in originValue) {
        newObject[key] = originValue[key]
    }
    return newObject
}

const obj = {
    name: 'zyq',
    age: 22,
    friend: {
        name: 'kobe',
        age: 30
    }
}

const newObj = deepClone(obj)
console.log(newObj === obj)
obj.friend.name = 'lebron'
console.log(newObj)
console.log(obj)