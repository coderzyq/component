function debounce(func, delay, immediate = false, resultCallback) {
    //1.定义一个定时器
    let timer = null
    //是否执行过
    let isInvoke = false
    const _debounce = function(...args) {
        //取消上一次的定时器
        if (timer) clearTimeout(timer)
        //判断是否立即执行
        if (immediate && !resultCallback) {
            const result = func.apply(this, args)
            if (resultCallback) resultCallback(result)
            isInvoke = true
        } else {
            //延迟执行
            timer = setTimeout(() => {
                //外部传入的真正执行的函数
                const result = func.apply(this,args)
                if(resultCallback) resultCallback(result)
                isInvoke = false
                timer = null
            }, delay)
        }
    }
}