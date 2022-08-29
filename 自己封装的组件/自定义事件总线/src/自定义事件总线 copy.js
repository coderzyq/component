class YQEventBus {
    constructor() {
        this.eventBus = {}
    }
    on(eventName, eventCallback, thisArg) {
        //根据eventName获取要执行的函数
        let handlers = this.eventBus[eventName]
        if (!handlers) {
            handlers = []
            this.eventBus[eventName] = handlers
        }
        handlers.push({
            eventCallback,
            thisArg
        })
    }
    
    off(eventName, eventCallback) {
        const handlers = this.eventBus[eventName]
        if (!handlers) return
        const newHandlers = [...handlers]
        for (let i = 0; i < newHandlers.length; i++) {
            const handler = newHandlers[i]
            if (handler.eventCallback === eventCallback) {
                const index = handlers.indexOf(handler)
                handlers.splice(index, 1)
            }
        }
    }

    emit(eventName, ...payload) {
        const handlers = this.eventBus[eventName]
        if (!handlers) return
        handlers.forEach(handler => {
            handler.eventCallback.apply(handler.thisArg, payload)
        })
    }
}

const eventBus = new YQEventBus()

//测试代码
eventBus.on('abc', function() {
    console.log('监听1', this);
}, {name: 'coderzyq'})

const handleCallback = function () {
    console.log('监听abc2', this);
}
eventBus.on('abc', handleCallback, {name: 'coderzyq'})

//utils.js文件
eventBus.emit('abc', 123)

//移除监听
eventBus.off('abc', handleCallback)