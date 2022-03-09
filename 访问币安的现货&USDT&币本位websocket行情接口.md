
> 策略名称

访问币安的现货&USDT&币本位websocket行情接口

> 策略作者

高频量化





> 源码 (javascript)

``` javascript
function main() {
    LogStatus("正在连接...")
    // 访问币安的websocket接口
    var client = Dial("wss://stream.binance.com:9443/ws/!ticker@arr") //现货交易对行情
    var f_client = Dial("wss://fstream.binance.com/ws/!ticker@arr") //期货交易对行情USDT
    var d_client = Dial("wss://dstream.binance.com/ws/!ticker@arr") //期货交易对行情币本位   

    if (!client) {
        LogStatus("连接失败, 程序退出")
        client.close()
        client = Dial("wss://stream.binance.com:9443/ws/!ticker@arr") //现货交易对行情
        return
    }
    if (!f_client) {
        LogStatus("连接失败, 程序退出")
        f_client.close()
        f_client = Dial("wss://fstream.binance.com/ws/!ticker@arr") //期货交易对行情USDT
        return
    }
    if (!d_client) {
        LogStatus("连接失败, 程序退出")
        d_client.close()
        d_client = Dial("wss://dstream.binance.com/ws/!ticker@arr") //期货交易对行情币本位
        return
    }

    while (true) {
        // read只返回调用read之后获取的数据
        var buf = client.read()
        if (!buf) {
            client.close()
            client = Dial("wss://stream.binance.com:9443/ws/!ticker@arr") //现货交易对行情
            break
        }
        var f_buf = f_client.read()
        if (!f_buf) {
            f_client.close()
            f_client = Dial("wss://fstream.binance.com/ws/!ticker@arr") //期货交易对行情USDT
            break
        }
        var d_buf = d_client.read()
        if (!d_buf) {
            d_client.close()
            d_client = Dial("wss://dstream.binance.com/ws/!ticker@arr") //期货交易对行情币本位
            break
        }
        var table = {
            type: 'table',
            title: '现货行情图表',
            cols: ['币种', '最高', '最低', '买一', '卖一', '最后成交价', '成交量', '更新时间'],
            rows: []
        }
        var f_table = {
            type: 'table',
            title: 'USDT行情图表',
            cols: ['币种', '最高', '最低', '买一', '卖一', '最后成交价', '成交量', '更新时间'],
            rows: []
        }
        var d_table = {
            type: 'table',
            title: '币本位行情图表',
            cols: ['币种', '最高', '最低', '买一', '卖一', '最后成交价', '成交量', '更新时间'],
            rows: []
        }
        var obj = JSON.parse(buf)
        var f_obj = JSON.parse(f_buf)
        var d_obj = JSON.parse(d_buf)
        _.each(obj, function(ticker) { //ticker 为自己命名的变量
            table.rows.push([ticker.s, ticker.h, ticker.l, ticker.b, ticker.a, ticker.c, ticker.q, _D(ticker.E)]) //现货
        })
        _.each(f_obj, function(ticker) { //ticker 为自己命名的变量
            f_table.rows.push([ticker.s, ticker.h, ticker.l, ticker.b, ticker.a, ticker.c, ticker.q, _D(ticker.E)]) //现货
        })
        _.each(d_obj, function(ticker) { //ticker 为自己命名的变量
            d_table.rows.push([ticker.s, ticker.h, ticker.l, ticker.b, ticker.a, ticker.c, ticker.q, _D(ticker.E)]) //现货
        })
        // Log(table.rows[200])  //不是固定的产品
        //  Log(table.rows.length)//有时长，有时短
        LogStatus('`' + JSON.stringify([table, f_table, d_table]) + '`')
    }
    //还要注意超时重连
    client.close()
    f_client.close()
    d_client.close()
}
```

> 策略出处

https://www.fmz.com/strategy/336260

> 更新时间

2021-12-30 15:15:17
