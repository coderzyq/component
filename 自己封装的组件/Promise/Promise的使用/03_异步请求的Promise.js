// request.js
function requestData(url) {
  return new Promise((resolve, reject) => {
    //模拟网络请求
    setTimeout(() => {
      if (url === 'coder') {
        let names = ['abc', 'cba', 'cbb', 'ccc']
        resolve(names)
      } else {
        let meaasge = '请求失败'
        reject(meaasge)
      }
    },2000)
  })
}
// // main.js
const promise = requestData('coderzyq')
promise.then((res) => {
  console.log("请求成功", res);
}).catch((err) => {
  console.log("请求失败", err);
})
// const promise = requestData("coderzyq")
// promise.then((res) => {
//   console.log("请求成功:", res)
// }, (err) => {
//    console.log("请求失败:", err)
// })
