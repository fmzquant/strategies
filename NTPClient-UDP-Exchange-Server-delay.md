
> Name

NTPClient-UDP-Exchange-Server-delay

> Author

发明者量化

> Strategy Description

[trans]
获取远程NTP服务器时间的一个函数，在高频交易或者计算延迟时比较常见
||
A function to obtain the time of the remote NTP server, which is more common in high-frequency trading or calculation delays
[/trans]



> Source (javascript)

``` javascript

function ntp_client() {
    // compatible with backtesting
    if (IsVirtual()) {
        return new Date().getTime()
    }
    let client = Dial("udp://time.windows.com:123")
    client.write('\x1b' + Array(47).fill('\0').join(''))
    let buf = client.read()
    client.close()
    if (buf && buf.byteLength == 48) {
        let dataView = new DataView(buf)
        return (dataView.getUint32(40, false) - 2208988800) * 1000 + Math.floor((dataView.getUint32(44, false) / 4294967295) * 1000)
    }
    return null
}

// compare local time and binance delay
function localDelayBinance() {
    let delay = 0
    for (let i = 0; i < 6; i++) {
        let ts = 0
        // 1 - 4 ignore first time
        if (i> 0 && i < 5) {
            ts = new Date().getTime()
        }
        let res = HttpQuery("https://fapi.binance.com/fapi/v1/time")
        let now = new Date().getTime()
        if (ts > 0) {
            delay += now - ts
        }
        if (i == 5) {
            return now - JSON.parse(res).serverTime + Math.ceil(delay / 2 / 4)
        }
    }
}

function main() {
    let timestamp = ntp_client()
    Log(_D(timestamp) + '.' + timestamp%1000, timestamp)
}
```

> Detail

https://www.fmz.com/strategy/426069

> Last Modified

2023-09-07 19:18:18
