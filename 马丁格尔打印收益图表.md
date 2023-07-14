
> Name

马丁格尔打印收益图表

> Author

Zer3192





> Source (javascript)

``` javascript
/*backtest
start: 2017-06-26 00:00:00
end: 2022-02-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

function main() {
    // 不使用接口获取数据的测试，就无需使用exchange.IO("status")函数判断连接状态，也不用设置合约代码，因为这里仅仅是测试
    for(var i = 0; i < exchanges.length; i++) {
        Log("添加的交易所对象索引(第一个为0以此类推)：", i, "名称：", exchanges[i].GetName(), "标签：", exchanges[i].GetLabel())
    }
}
var n = 0.001 //初始下单数
var MarginLevel = 30 //合约杠杆 
var profit = 1//期望收益 ，不能小于手续费 
var bet=1//倍率
// 链接交易所, 获取相关信息
function UpdateInfo() {
    var account = exchange.GetAccount()
    records = exchange.GetRecords()
    ticker = exchange.GetTicker()
    balance = account.Stocks
    Bar = records[records.length - 1]
}

//取随机数 
function sum(m, n) {　　
    var num = Math.floor(Math.random() * (m - n) + n);　　
    return num;
}
function onexit() {
    var pos = exchange.GetPosition();
    if (pos.length > 0) {
        Log("警告, 退出时有持仓", pos);
    }
}
function main() {
    if (exchange.GetName() !== 'Futures_Binance') {
        throw "只支持Binance期货";
    }
    if (exchange.GetPosition().length > 0) {
        throw "策略启动前不能有持仓.";
    }
}
function main() {
    exchange.SetContractType("swap")
    exchange.SetMarginLevel(MarginLevel)
    var position = []
    while (true) {
        var ticker = exchange.GetTicker()
        var account = exchange.GetAccount()
        var price = ticker.Buy
        var stocks = account.Stocks + account.FrozenStocks
        var balance = account.Balance + account.FrozenBalance
        var value = stocks*price + balance
        Log('Account value is: ', value)
        LogProfit(value)
        Sleep(3000)//sleep 3000ms(3s), A loop must has a sleep, or the rate-limit of the exchange will be exceed
        //when run in debug tool, add a break here
        Log(exchange.GetAccount().Balance)
        Sleep(2000)
        Log('推送到微信@')
        Log('这是一个红色字体的日志 #ff0000')
        

        position = exchange.GetPosition()
        if (position.length == 0) {
            //取随机数0、1作为方向
            var redom = sum(0,2)
            Log(redom)
            if (redom == 0) {
                n=0.001
                exchange.SetDirection("sell")
                exchange.Sell(-1, n, "开空")
            }
            if (redom == 1) {
                n=0.001
                exchange.SetDirection("buy")
                exchange.Buy(-1, n, "开多")
            }
        }
        if (position.length > 0) {

            if (position[0].Type == 0) {
                //盈利大于期望 
                if (position[0].Profit > profit) {
                    exchange.SetDirection("closebuy")
                    exchange.Sell(-1, position[0].Amount)
                    n=0.001
                    exchange.SetDirection("buy")
                    exchange.Sell(-1, n, "开多")
            
                }
                //负盈利大于保证金 则加仓

                if (position[0].Profit < position[0].Margin * -1) {
                    n=n*bet
                    exchange.SetDirection("buy")
                    exchange.Buy(-1, position[0].Amount=n)
                }
            }
            if (position[0].Type == 1) {
                if (position[0].Profit > profit) {
                    exchange.SetDirection("closesell")
                    exchange.Buy(-1, position[0].Amount)
                    n=0.001
                    exchange.SetDirection("sell")
                    exchange.Sell(-1, n, "开空")
                
            
                }
                if (position[0].Profit < position[0].Margin * -1) {
                    n=n*bet
                    exchange.SetDirection("sell")
                    exchange.Sell(-1, position[0].Amount=n)
                }
            }
            Sleep(60000)
        }
    }
}
```

> Detail

https://www.fmz.com/strategy/353467

> Last Modified

2022-03-28 13:07:36
