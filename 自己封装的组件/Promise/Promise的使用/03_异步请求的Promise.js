// request.js
function requestData(url) {
  return new Promise((resolve, reject) => {
    //模拟网络请求
    setTimeout(() => {
      if (url === 'coderzyq') {
        let names = ['abc', 'nba', 'cba']
        resolve(names)
      } else {
        //失败
        let message = '请求失败，url错误'
        reject(message)
      }
    }, 3000)
  })
}

// main.js
const promise = requestData("coderzyq")
promise.then((res) => {
  console.log("请求成功:", res)
}, (err) => {
   console.log("请求失败:", err)
})
