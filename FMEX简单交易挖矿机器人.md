
> 策略名称

FMEX简单交易挖矿机器人

> 策略作者

小草

> 策略描述

## 策略原理

**FMEX根据成交量大小来决定返还，由于taker有很高的手续费，此策略采用maker占据买一卖一，尽可能成交。**

**每隔一段时间检查仓位，如果有持仓过多，则只开平仓单减少仓位**

**策略仅供学习参考，按需修改。管理仓位简单，未经长时间测试，欢迎反馈问题，不定期更新**

**如用于实盘，需要修改参数里的基地址**

排序挖矿机器人:  https://www.fmz.com/strategy/171042
挂单挖矿机器人:  https://www.fmz.com/strategy/171258
交易挖矿机器人:  https://www.fmz.com/strategy/171560


FMZ已支持FMEX测试网，需要更新最新的托管者，等10月25号正式网上线后会自动切换。相关问题反馈：https://www.fmz.com/bbs-topic/4476

## 问题和改进方向

- 根据每分钟成交量的大小，挖矿效率也是不同的，可以考虑进去。
- 可以maker成交后，立即taker平仓，需要考虑到挖矿收益是否能覆盖成本。
- 策略较为死板，无法应对单边行情，可自行择时交易。
- 行情波动剧烈可能做成maker。可用IO更改下单方式。
- **可参考现货交易价格，确定挂单，减少单边成交**

## 排序挖矿说明

https://fcoin.zendesk.com/hc/zh-cn/articles/360037172894-FMex%E4%BA%A4%E6%98%93%E6%8C%96%E7%9F%BF%E7%AE%97%E6%B3%95%E8%AF%B4%E6%98%8E

每个永续合约交易对的每日交易挖矿额度，将分为两部分计算，并在合计后统一于次日返还。每部分分别返还该交易对当日额度的50%，具体算法为：

 

用户在某合约交易对当日可获得的交易挖矿FMEX返还（第一部分）计算方法为：

该交易对每日交易挖矿返还额度的50% * 用户在该交易对的成交量 / 该交易对的当日总成交量

 

用户在某交易对当日可获得的交易挖矿FMEX返还（第二部分）计算方法为：

定义每天中的每1分钟为一个交易挖矿周期，每个周期分配交易对当日交易挖矿额度的1/2880。每个周期内，按照用户成交量的占比分配该交易挖矿周期的返还额度

用户在该交易对每个交易挖矿周期所获FMEX返还的总和，即该用户在该交易对当日可获得的挖矿FMEX返还（第二部分）

> 策略参数



|参数|默认值|描述|
|----|----|----|
|Intervel|2|休眠时间|
|Amount|10|下单量|
|HoldAmount|100|最大单边持仓量|
|CoverAmount|2|每次平仓量|
|CoverTime|60|检查仓位间隔|
|ProfitTime|60|打印收益时间间隔|
|Url|https://api.testnet.fmex.com|API基地址|


> 源码 (javascript)

``` javascript
exchange.IO("base", Url) //切换基地址，方便切换实盘和模拟盘，实盘地址：https://api.fmex.com

var ordersInfo = {buyId:0, buyPrice:0, buyAmount:0, sellId:0, sellPrice:0, sellAmount:0, pos:0}
var depthInfo = {asks:[], bids:[]}
var lastProfitTime = 0 //控制打印收益时间
var lastRestTime = Date.now()   //定时重置策略
var lastCoverTime = 0  //检查仓位

function showTable(){
    var table = {type: 'table', title: '信息', cols: ['买一价', '卖一价', '买挂单量', '卖挂单量', '当前持仓量'],
                 rows: [[ordersInfo.buyPrice, ordersInfo.sellPrice, ordersInfo.buyAmount, ordersInfo.sellAmount, ordersInfo.pos]]}
    LogStatus('`' + JSON.stringify(table) + '`\n'+JSON.stringify(ordersInfo))
}

function reset(){ //重置策略，防止一些订单卡住，可能会影响其它正在运行的策略
    var orders = exchange.GetOrders()
    if(orders){
        for(var i=0;i<orders.length;i++){
            exchange.CancelOrder(orders[i].Id)
        }
        ordersInfo = {buyId:0, buyPrice:0, buyAmount:0, sellId:0, sellPrice:0, sellAmount:0, pos:0}
    }
}

function onexit(){  //退出后撤销订单
    reset()
}

function getPostiton(){
    pos = exchange.GetPosition()
    if(!pos){return}
    if(pos.length>0){
        if(pos[0].Type == 0){ //多仓
            ordersInfo.pos = pos[0].Amount
        }else{
            ordersInfo.pos = -pos[0].Amount
        }
    }
}

function main() {
    exchange.SetContractType('swap')
    exchange.SetMarginLevel(0) //全仓模式
    reset()
    while(true){
        var ticker = _C(exchange.GetTicker)
        var sellPrice = ticker.Sell
        var buyPrice = ticker.Buy
        if(Date.now()-lastCoverTime > CoverTime*1000){
            lastCoverTime = Date.now()
            getPostiton()
        }
        if(ordersInfo.pos <= HoldAmount){
            if(buyPrice != ordersInfo.buyPrice){
                var cancelId = ordersInfo.buyId
                exchange.SetDirection('buy')
                var buyId = exchange.Buy(buyPrice, Amount)
                ordersInfo.buyPrice = buyPrice
                ordersInfo.buyAmount = Amount
                if(buyId){ordersInfo.buyId = buyId}else{ordersInfo.buyId = 0}
                if(cancelId){exchange.CancelOrder(cancelId)} //先下单后撤单，保证始终有挂单
            }
        }else{
            if(ordersInfo.buyId){
                exchange.CancelOrder(ordersInfo.buyId)
            }
            ordersInfo.buyId = 0
            ordersInfo.buyPrice = 0
            ordersInfo.buyAmount = 0
        }
        if(ordersInfo.pos >= -HoldAmount){
            if(sellPrice != ordersInfo.sellPrice){
                var cancelId = ordersInfo.sellId
                exchange.SetDirection('sell')
                var sellId = exchange.Sell(sellPrice, Amount)
                ordersInfo.sellPrice = sellPrice
                ordersInfo.sellAmount = Amount
                if(sellId){ordersInfo.sellId = sellId}else{ordersInfo.sellId = 0}
                if(cancelId){exchange.CancelOrder(cancelId)}
            }
        }else{
            if(ordersInfo.sellId){
                exchange.CancelOrder(ordersInfo.sellId)
            }
            ordersInfo.sellId = 0
            ordersInfo.sellPrice = 0
            ordersInfo.sellAmount = 0
        }
        if(Date.now()-lastProfitTime > ProfitTime*1000){
            lastProfitTime = Date.now()
            var account = exchange.GetAccount()
            if(account){
                LogProfit(_N(account.Info.data.BTC[0]+account.Info.data.BTC[1]+account.Info.data.BTC[2],6))
            }
        }

        if(Date.now()-lastRestTime > 10*60*1000){
            lastRestTime = Date.now()
            reset()
        }
        showTable()
        Sleep(Intervel*1000)
    }
}
```

> 策略出处

https://www.fmz.com/strategy/171560

> 更新时间

2019-12-09 11:15:46
