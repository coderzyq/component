function debounce(func, delay, immediate = false, resultCallback) {
    //1.定义一个定时器
    let timer = null
    //是否执行过
    let isInvoke = false
    const _debounce = function (...args) {
        //取消上一次的定时器
        if (timer) clearTimeout(timer)
        // console.log(`执行了防抖操作`)
        //判断是否需要立即执行
        if (immediate && !isInvoke) {
            const result = func.apply(this, args)
            if (resultCallback) resultCallback(result)
            isInvoke = true
        } else {
            //延迟执行
            timer = setTimeout(() => {
                //外部传入的真正要执行的函数
                const result = func.apply(this, args)
                if (resultCallback) resultCallback(result)
                isInvoke = false
                timer = null
            }, delay)
        }

    }

    //封装取消功能
    _debounce.cancel = function () {
        if (timer) clearTimeout(timer)
        timer = null
        isInvoke = false
    }
    return _debounce
}