
> Name

仿Promise异步模板

> Author

nogo

> Strategy Description

仿Promise异步模板

也没什么好说的，使用方法和Promise类似。



> Source (javascript)

``` javascript

class Task {
    static PENDING = 'pending'
    static FULFILLED = 'fulFilled'
    static REJECTED = 'rejected'
    static WaitResults = []

    constructor(executor) {
        this.status = Task.PENDING
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []

        // 成功
        let _resolve = (value) => {
            // 如果是异步的请求的结果，将wait在Task.wait中统一处理
            if (this.status == Task.PENDING) {
                if (value && value.wait instanceof Function) {
                    Task.WaitResults.push({
                        handle: value.wait,
                        resolve: _resolve,
                        reject: _reject
                    })
                } else {
                    this.status = Task.FULFILLED
                    this.value = value
                    let handler;
                    while (handler = this.onResolvedCallbacks.shift()) {
                        handler(this.reason)
                    }
                }
            }
        }

        //失败
        let _reject = (reason) => {
            if (this.status == Task.PENDING) {
                this.status = Task.REJECTED
                this.reason = reason
                let handler;
                while (handler = this.onRejectedCallbacks.shift()) {
                    handler(this.value)
                }
            }
        }

        executor(_resolve, _reject)
    }

    then(onFulfilled, onRejected) {
        let promise = this
        return new Task((resolve, reject) => {
            function handler(value) {
                var ret = typeof onFulfilled === 'function' && onFulfilled(value);
                if (ret instanceof Task) {
                    ret.then(resolve, reject)
                } else {
                    resolve(ret);
                }
            }

            function errback(reason) {
                let ret = typeof onRejected === 'function' && onRejected(reason) || reason;
                if (ret instanceof Task) {
                    ret.then(resolve, reject)
                } else {
                    reject(ret);
                }
            }

            if (promise.status === Task.PENDING) {
                //Log("PENDING")
                promise.onResolvedCallbacks.push(handler);
                promise.onRejectedCallbacks.push(errback);
            } else if (promise.status === Task.FULFILLED) {
                //Log("FULFILLED")
                handler(promise.value);
            } else if (promise.status === Task.REJECTED) {
                //Log("REJECTED")
                errback(promise.reason);
            }
        })
    }

    catch(onReJected) {
        return this.then(undefined, onReJected)
    }

    //同步多个异步操作
    static all = (list) => {
        return new Task((resolve, reject) => {
            var resArray = []
            let index = 0
            function processData(i, data) {
                resArray[i] = data
                index += 1
                if (index == list.length) {
                    resolve(resArray)
                }
            }
            for (let i = 0; i < list.length; i++) {
                let item = list[i]
                if (item instanceof Task) {
                    item.then(data => {
                        processData(i, data);
                    }, err => {
                        reject(err)
                        return;
                    })
                } else {
                    processData(i, item);
                }
            }
        })
    }

    //获取异步结果
    static wait = function () {
        let obj;
        while (obj = Task.WaitResults.shift()) {
            if (!obj) break;
            let { handle, resolve, reject } = obj;
            let data = handle(6000)
            if (data !== undefined) {
                resolve(data)
            } else {
                 // 如果异步超时返回wait对象，可以后续再尝试，或者直接查询请求结果。
                reject(handle)
            }
        }
    }
}

function main() {
    exchange.SetContractType("swap")

    new Task(function (resolve, reject) {
        resolve(exchange.Go("GetDepth"))
    }).then(data => {
        Log(data)
        return data
    }).then((data) => {
        //链式执行
        Log(data)
    })

    new Task(function (resolve, reject) {
        reject("错误测试")
    }).then(data => {
        Log(data)
    }, error => {
        Log(error)
        return "将错误处理后传递到catch方法"
    }).catch(error => {
        Log(error)
    })

    Task.all([
        new Task(function (resolve, reject) {
            resolve(exchange.Go("GetDepth"))
        }),
        new Task(function (resolve, reject) {
            resolve(exchange.Go("GetTicker"))
        }),
        new Task(function (resolve, reject) {
            resolve(100)
        }),
        { a: 1 },
        { b: 2 }
    ]).then(data => {
        Log(data[0])
        Log(data[1])
        Log(data[2])
        Log(data[3])
        Log(data[4])
    })

    //同步多个请求出现异常，需要处理查询异步请求的结果
    Task.all([
        new Task((resolve, reject) => {
            resolve(1)
        }),
        new Task((resolve, reject) => {
            resolve(2)
        }),
        new Task((resolve, reject) => {
            //出错
            reject(3)
        }),
        new Task((resolve, reject) => {
            resolve(4)
        }),

    ]).then((data) => {
        console.log(data)
    }, error => {
        console.log("error", error)
        return 5
    }).catch(error => {
        console.log("catch", error)
    })

    //必须执行，这里将会调用所有异步的wait方法，获取结果。
    Task.wait()
}

```

> Detail

https://www.fmz.com/strategy/386497

> Last Modified

2022-10-16 13:24:40
