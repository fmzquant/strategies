
> Name

Deribit期权测试策略

> Author

小小梦

> Strategy Description

## Deribit期权测试策略

测试代码，测试期权开仓、平仓、下单撤单，行情获取等。
使用的是Deribit测试环境，用于实际实盘，可以删除```exchange.IO("base", "https://test.deribit.com")```行代码。

![IMG](https://www.fmz.com/upload/asset/1705e6bb63a19de89463.png) 



> Source (javascript)

``` javascript
function CancelAll() {
    while (1) {
        var orders = exchange.GetOrders()
        for (var i = 0; i < orders.length; i++) {
            exchange.CancelOrder(orders[i].Id, orders[i])
            Sleep(500)
        }
        if (orders && orders.length == 0) {
            break
        }
        Sleep(500)
    }
    Log(exchange.GetOrders())
}

function main() {
    contract = "BTC-27DEC19-7250-P"
    exchange.IO("base", "https://test.deribit.com")    // 测试，使用deribit的模拟测试环境，如果实盘，请删除此句
    exchange.SetContractType(contract)     // 设置期权合约
    
    // 取消当前所有挂单
    CancelAll()
    
    // 获取当前账户信息
    LogStatus(exchange.GetAccount())
    Sleep(500)
    
    // 获取当前行情信息
    Log(exchange.GetTicker())
    Sleep(500)

    // 获取当前深度信息
    Log(exchange.GetDepth())
    Sleep(500)
    
    // 获取当前市场最近成交记录
    Log(exchange.GetTrades())
    Sleep(500)
    
    // 获取当前K线数据
    Log(exchange.GetRecords())
    Sleep(500)
    
    // 测试下单
    exchange.SetDirection("buy")
    var id = exchange.Buy(0.002, 0.1)   // 第一个参数指的是 权利金，第二个参数指的是标的物数量
    Log("id:", id)
    Sleep(500)
    
    // 获取订单信息
    Log(exchange.GetOrder(id))
    Sleep(500)
    
    // 获取当前所有挂单
    Log(exchange.GetOrders())
    Sleep(500)
    
    // 获取当前期权持仓
    Log(exchange.GetPosition())
    Sleep(500)
    
    // 撤销挂单
    exchange.CancelOrder(id)
    Sleep(500)
    
    // 再次获取当前挂单，检查是否撤销
    Log(exchange.GetOrders())
    Sleep(500)
    
    // 吃单成交
    exchange.SetDirection("sell")
    var ticker = exchange.GetTicker()
    var id2 = exchange.Sell(ticker.Buy, 0.1)
    Sleep(500)
    
    // 获取持仓
    Log(exchange.GetPosition())
    Sleep(500)
    
    // 平仓
    exchange.SetDirection("closesell")
    var pos = exchange.GetPosition(contract)
    Log("pos", pos)
    var id3 = exchange.Buy(ticker.Sell, pos[0].Amount)
    Log(exchange.GetPosition())
    Sleep(500)
}
```

> Detail

https://www.fmz.com/strategy/179475

> Last Modified

2019-12-25 15:17:30
