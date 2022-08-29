//此时是浅拷贝
function shallowClone(originValue) {
    const newObj = {}
    for (const key in originValue) {
        newObj[key] = originValue[key]
    }
    return newObj
}

const obj = {
    name: 'coderzyq',
    age: 22,
    friend: {
        name: 'kobe',
        age: 30
    }
}

const newObj = shallowClone(obj)
console.log(newObj.name);
console.log(newObj.friend.name);
obj.friend.name = 'lebron'
console.log(newObj.friend.name);
console.log(obj.friend.name)
console.log(obj)
console.log(newObj);
console.log(obj === newObj);