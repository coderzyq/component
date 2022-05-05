function throttle(fn, interval, options = {leading: true, trailing: false}) {
    const {leading, trailing} = options
    let lastTime = 0
    let timer = null

    const _throttle = function () {
        const nowTime = new Date().getTime()
        if (!lastTime && !leading) lastTime = nowTime
        // if (lastTime === 0 && leading === false) lastTime = nowTime 等同于上边的写法
        const remainTime = interval - (nowTime - lastTime)
        if (remainTime <= 0) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            fn()
            lastTime = nowTime
            return
        }

        if (trailing && !timer) {
            timer = setTimeout(() => {
                timer = null
                lastTime = 0
                fn()
            }, remainTime)
        }
    }

    return _throttle
}