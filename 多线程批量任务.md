
> Name

多线程批量任务

> Author

一拳男孩

> Strategy Description

```
    var tasks = $.go([
        [exchange, 'GetDepth'],
        [exchange, 'GetTicker'],
    ])
    var retList = $.wait(tasks)
    Log(retList[0])
    Log(retList[1])
```

- **$.go()**
> 批量执行Go
> 参数类型 二维数组
```
   [
        [exchange, 'GetDepth'],
        [exchange, 'GetTicker'],
    ]
```
> 返回值 cmdList 数组

- **$.wait(cmdList)**
> 获取结果

- **$.gowait()**
> 执行Go并且获取结果

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|RETRY_INTERVAL|true|重试间隔(秒)|


> Source (javascript)

``` javascript
$.go = function(tasks) {
    return _.map(tasks, function(args) {
        return {
            result: null,
            args: args,
            defer: args[0].Go.apply(args[0], args.slice(1))
        }
    })
}

$.gowait = function(tasks, maxConcurrent, retry) {
    return $.wait($.go(tasks), maxConcurrent, retry)
}

$.wait = function(cmdList, maxConcurrent, retry) {
    retry = retry || true
    maxConcurrent = Math.min(cmdList.length, maxConcurrent || 5)
    var total = Math.ceil(cmdList.length / maxConcurrent)
    return _.reduce(_.range(total), function(beforeResultList, currentPage) {
        var lastCmdList = cmdList.slice(currentPage * maxConcurrent, currentPage * maxConcurrent + maxConcurrent)
        while (1) {
            lastCmdList = _.map(lastCmdList, function(cmd) {
                var args = cmd.args
                if (cmd.result == null) {
                    var ret = cmd.defer.wait()
                    if (ret != null) {
                        return _.extend(cmd, {
                            result: ret
                        })
                    } else if (retry === true) {
                        return _.extend(cmd, {
                            defer: args[0].Go.apply(args[0], args.slice(1)),
                            result: null
                        })
                    }
                }
                return cmd
            })
            var isFinished = _.every(lastCmdList, function(cmd) {
                return cmd.result
            })
            if (isFinished) {
                break
            }
            Sleep(RETRY_INTERVAL * 1000)
        }
        var newResultList = lastCmdList.map(function(cmd) {
            return cmd.result
        })
        if (currentPage + 1 < total) {
            Sleep(1000)
        }
        return beforeResultList.concat(newResultList)
    }, [])
}
```

> Detail

https://www.fmz.com/strategy/159978

> Last Modified

2019-08-24 16:02:33
