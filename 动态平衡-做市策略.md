
> Name

动态平衡-做市策略

> Author

FawkesPan



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|DELAY|5|平衡间隔|
|PRICE_INCREMENT|1e-06|最小价格变化|
|AMOUNT_INCREMENT|0.01|最小数量变化|
|AMOUNT_MINIMUM|0.01|最低交易数量|
|SPREAD|0.3|挂单价格间隔|


> Source (javascript)

``` javascript
/*

Rebalance With MarketMake

Copyright 2018 FawkesPan
Contact : i@fawkex.me / Telegram@FawkesPan

GNU General Public License v3.0

*/

var Coin = ''
var Fiat = ''
var RefreshLoop = 0
var Account = ''
var Depth = ''
var Orders = ''
var BuyWeighted = 0
var SellWeighted = 0
var MidPrice = 0
var InitialBalance = exchange.GetAccount().Balance + exchange.GetAccount().Stocks * exchange.GetDepth().Bids[0].Price

function CancelPendingOrders() {
    for (var j = 0; j < Orders.length; j++) {
          exchange.CancelOrder(Orders[j].Id, Orders[j])}
}

function UpdateAll() {
    Account = exchange.GetAccount()
    Depth = exchange.GetDepth()
    Orders = exchange.GetOrders()
    //Log("UpdateAll")
}

function UpdatePrice() {
    //MidPrice = (Depth.Asks[0].Price+Depth.Bids[0].Price)/2
    BuyWeighted = Depth.Asks[0].Price * (1+SPREAD/100)
    SellWeighted = Depth.Bids[0].Price * (1-SPREAD/100)
    //Log("UpdatePrice")
}

function onTick(){
    // 刷新账户余额及行情数据
    //Log("UpdateAll")
    UpdateAll()
    var Buy = Depth.Asks[0].Price
    var Sell = Depth.Bids[0].Price
    
    // 计算加权价格
    //Log("UpdatePrice")
    UpdatePrice()
    
    // 检查当前存在订单
    if (Orders.length==2){
        return
    }
    if (Orders.length>2){
        CancelPendingOrders()
        UpdateAll()
    }
    // 处理单一订单
    if (Orders.length==1){
        Order = Orders[0]
        Price=Order.Price
        if (Order.Type==0){
            if (Price/(1-SPREAD/100) > Sell){
                return
            }else{
                CancelPendingOrders()
                UpdateAll()
            }
        }else{
            if (Price/(1+SPREAD/100) < Buy){
                return
            }else{
                CancelPendingOrders()
                UpdateAll()
            }
        }
    }
    
    // 计算所持仓位价值
    var ValueByBuy = Account.Stocks * BuyWeighted
    var ValueBySell = Account.Stocks * SellWeighted
    Log(Coin + " Value By Weighted Ask - " + Fiat +" Balance : " + (ValueByBuy-Account.Balance))
    Log(Fiat + " Balance - " + Coin +" Value By Weighted Bid : " +(Account.Balance-ValueBySell))
    //Log(ValueByBuy)
    //Log(ValueBySell)
    
    // 所持币价值高于定价货币 卖出所持的币
    if (ValueByBuy > Account.Balance){
        ToBeSold = (ValueByBuy - Account.Balance)/2/BuyWeighted
        if (ToBeSold > AMOUNT_MINIMUM){
            ToBeSold = _N(Math.ceil(ToBeSold / AMOUNT_INCREMENT) * AMOUNT_INCREMENT)
            Log("将要售出的 " + Coin + " 数量：" + ToBeSold)
            exchange.Sell(BuyWeighted,ToBeSold)
        }
    }
    // 所持定价货币价值高于所持币 买入币
    if (ValueBySell < Account.Balance){
        ToBeBought = (Account.Balance - ValueBySell)/2/SellWeighted
        if (ToBeBought > AMOUNT_MINIMUM){
            ToBeBought = _N(Math.ceil(ToBeBought / AMOUNT_INCREMENT) * AMOUNT_INCREMENT)
            Log("将要购买的 " + Coin + " 数量：" + ToBeBought)
            exchange.Buy(SellWeighted,ToBeBought)
        }
    }
    Log(Fiat + " 数量：" + Account.Balance)
    Log(Coin + " 数量：" + Account.Stocks)
    
    RefreshLoop = RefreshLoop+1
    if (RefreshLoop>60) {
        var Profit = _N(Account.Stocks*Sell) + _N(Account.Balance) - _N(InitialBalance)
        LogProfit(Profit)
        RefreshLoop = 0
    }
}
function main(){
    var Pair = exchange.GetCurrency()
    LogReset()
    LogProfitReset()
    LogProfit(0)
    UpdateAll()
    CancelPendingOrders()
    Coin = Pair.split("_")[0]
    Fiat = Pair.split("_")[1]
    while (true){
        try {
            onTick()
        } catch (err) {
            Log(err)
        }
        Sleep(DELAY*1000)
    }
}
```

> Detail

https://www.fmz.com/strategy/113618

> Last Modified

2018-09-18 21:02:19
