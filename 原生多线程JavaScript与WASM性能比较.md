
> Name

原生多线程JavaScript与WASM性能比较

> Author

发明者量化

> Strategy Description


发明者量化尝试从原生低层使Javascript支持真正意义多线程, 并加入WASM功能, 下面是一个DEMO, 下载最新托管者可以尝鲜体验
此功能非Javascript的Worker功能, 可以使用多个线程内之间相互通信或者与主线程通信

C语言转wasm可以从此网站生成测试: https://wasdk.github.io/WasmFiddle/


编译为wasm的C语言代码如下

```
int fib(int f) {
  if (f < 2) return f;
  return fib(f - 1) + fib(f - 2);
}
```

编译后下载wasm文件后用python转换为hex字符串
```
python -c "print('data:hex,'+bytes.hex(open('program.wasm','rb').read()))"
```

替换代码中的变量后面内容即可

> __Thread(function, arguments...)

创建线程并返回线程tid, 接受的线程主体函数的功能必须在线程函数内完成所有功能代码, 不支持对其它闭包函数引用, 线程内部可调用平台所有API, 但不能调用用户自定义的其它函数

简单的例子:
```
let tid = __Thread(function(x, y) {
    return x + y
}, 1, 2)
Log(__threadJoin(tid))
```

多线程请求的例子:
```
function main() {
    let threads = [
        "https://www.baidu.com",
        "https://www.163.com"
    ].map(function(url) {
        return __Thread(function(url) {
            Log("GET", url)
            return HttpQuery(url)
        }, url)
    })
    threads.forEach(function(tid) {
        Log(__threadJoin(tid))
    })
}
```

> 线程本地存储变量

支持线程本地存储变量, 为方便共享数据, 数据在线程没有被 `__threadJoin` 等待退出成功 或者 `__threadTerminate` 终止的情况下有效

```
__threadGetData(tid, key)
__threadSetData(tid, key, value)
```

tid是0表示当前线程, value不指定表示删除key, 支持线程之间相互访问共享变量, 值必须是可序列化的变量

> 线程通信

```
__threadPostMessage(tid, msg) // 向指定线程发送消息, tid为0是向主线程即当前主函数发送, 在线程内部调用指向主线程回复消息, 该消息可以被EventLoop捕获
__threadPeekMessage(tid, timeout) // 从指定线程接收消息, 如果不指定timeout(毫秒)就一直等待, tid为0指等待主线程的消息
```

> __threadJoin(tid, timeout)

等待线程结束指定timeout(毫秒)为指定等待超时可不指定就是一直等到线程结束, 成功返回一个包含函数返回值的结构并回收资源, 结构如下
```
{
    id: tid, // 线程id
    elapsed: 1111, // 线程的运行时间(纳秒)
    terminated: false, // 线程是否被强制结束 
    ret: 123, // 线程函数的返回值
}
```
如果超时返回undefined
    
    
> __threadTerminate(tid)

强制结束线程, 并回收资源(无法再使用__threadJoin等待结束)
    
> 注意

__Thread的函数不支持引用函数外的变量(做为隔离环境运行), 引用外部变量将会编译失败






> Source (javascript)

``` javascript
function main() {
    let cycle = 100
    let input = 30
    let threads = [
        __Thread(function(cycle, input) {
            function fib(f) {
                if (f < 2) return f
                return fib(f - 1) + fib(f - 2)
            }
            let ret = 0
            for (let i = 0; i < cycle; i++) {
                ret = fib(input);
                Log("javascript progress: ", i)
            }
            return 'javascript fib: ' + ret
        }, cycle, input),
        
        __Thread(function(cycle, input) {
            let data = 'data:hex,0061736d010000000186808080000160017f017f0382808080000100048480808000017000000583808080000100010681808080000007908080800002066d656d6f727902000366696200000aa480808000019e80808000000240200041024e0d0020000f0b2000417f6a10002000417e6a10006a0b'
            let m = wasm.parseModule(data)

            let instance = wasm.buildInstance(m, {
                stack_size: 65 * 1024 * 1024,
            })

            let ret = 0
            for (let i = 0; i < cycle; i++) {
                ret = instance.callFunction('fib', input)
                Log("wasm progress: ", i)
            }

            return 'wasm fib: ' + ret
        }, cycle, input)
    ]

    threads.forEach(function(tid) {
        let info = __threadJoin(tid)
        Log('#'+tid, info.ret, 'elapsed:', info.elapsed / 1e6, "#ff0000")
    })
}
```

> Detail

https://www.fmz.com/strategy/401463

> Last Modified

2023-03-03 03:42:24
