
> Name

Native-Multithreaded-JavaScript-and-WASM-Performance-Comparison

> Author

发明者量化

> Strategy Description

FMZ Quant has experimented with adding true multithreading support to JavaScript at the native low level, together with WASM support. Below is a demo. Download the latest host to try this feature.
This is not JavaScript Worker-based multithreading. Multiple threads can communicate with each other or with the main thread.

C code can be converted to WASM for testing at: https://wasdk.github.io/WasmFiddle/

The C source compiled to WASM is as follows:

```
int fib(int f) {
  if (f < 2) return f;
  return fib(f - 1) + fib(f - 2);
}
```

After compiling, download the WASM file and convert it to a hex string with Python:
```
python -c "print('data:hex,'+bytes.hex(open('program.wasm','rb').read()))"
```

Then replace the value assigned to the variable in the code.

### __Thread(function, arguments...)

Creates a thread and returns its thread ID. The thread entry function must contain all logic it needs to execute. It does not support references to other user-defined closure functions. Platform APIs can be called inside the thread, but other user-defined functions cannot.

Simple example:
```
let tid = __Thread(function(x, y) {
    return x + y
}, 1, 2)
Log(__threadJoin(tid))
```

Example of multithreaded requests:
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

### Thread-Local Storage Variables

Thread-local storage variables are supported. To make shared data convenient, stored data remains valid until the thread exits successfully through `__threadJoin` or is terminated with `__threadTerminate`.

```
__threadGetData(tid, key)
__threadSetData(tid, key, value)
```

If `tid` is 0, it refers to the current thread. If `value` is omitted, the key is deleted. Threads can access each other’s shared variables, and values must be serializable.

### Thread Communication

```
__threadPostMessage(tid, msg) // 向指定线程发送消息, tid为0是向主线程即当前主函数发送, 在线程内部调用指向主线程回复消息, 该消息可以被EventLoop捕获
__threadPeekMessage(tid, timeout) // 从指定线程接收消息, 如果不指定timeout(毫秒)就一直等待, tid为0指等待主线程的消息
```

### __threadJoin(tid, timeout)

Waits for the thread to finish. `timeout` is the wait timeout in milliseconds. If omitted, it waits until the thread exits. On success it returns a structure containing the function’s return value and reclaims resources. The structure is shown below:
```
{
    id: tid, // 线程id
    elapsed: 1111, // 线程的运行时间(纳秒)
    terminated: false, // 线程是否被强制结束 
    ret: 123, // 线程函数的返回值
}
```
If the wait times out, it returns `undefined`.

### __threadTerminate(tid)

Forcefully terminates the thread and reclaims resources. After that, `__threadJoin` can no longer be used to wait for it.

### Note

The function passed to `__Thread` cannot reference variables outside the function body because it runs in an isolated environment. Referencing external variables will cause compilation to fail.

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
