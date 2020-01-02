
> 策略名称

FMEX简单排序挖矿机器人

> 策略作者

小草

> 策略描述

## 策略原理

**策略将会根据当前深度，自动寻找收益最大的挂单位置挂单，未被占用的位置优先，远离盘口优先。达到最大化资金利用。不同深度的挖矿效率可能相差百倍。**


**每隔一段时间检查仓位，如果有持仓，每次按盘口价平固定数量（需要自己设置）的仓位，直到不持仓**

**策略仅供学习参考，按需修改。管理仓位简单，未经长时间测试，欢迎反馈问题，不定期更新**

**如用于实盘，需要修改参数里的基地址**

排序挖矿机器人:  https://www.fmz.com/strategy/171042
挂单挖矿机器人:  https://www.fmz.com/strategy/171258
交易挖矿机器人:  https://www.fmz.com/strategy/171560

FMZ已支持FMEX测试网，需要更新最新的托管者，等10月25号正式网上线后会自动切换。相关问题反馈：https://www.fmz.com/bbs-topic/4476

## 问题和改进方向

- 仓位管理较为简单，可自行修改。比如改为盘口挂单而不是直接吃单、累积到一定仓位再平等。
- 挖矿系数可自行定义，如不想挂买一卖一，以及为了避免成交，向后的深度权重可以设置高一点。
- 没有分散挂单，导致同策略的竞争。后期竞争较大时，可以改进一次挂多组订单。

## 排序挖矿说明

https://fcoin.zendesk.com/hc/zh-cn/articles/360037685493-FMex%E6%8E%92%E5%BA%8F%E6%8C%96%E7%9F%BF%E7%AE%97%E6%B3%95%E8%AF%B4%E6%98%8E

排序挖矿全称为“挂单排序挖矿”，为了区别于已存在的“挂单挖矿”，故简称为排序挖矿。
 

定义每天中的每1分钟为一个排序挖矿周期，每个周期分配交易对当日排序挖矿额度的1/1440。

 

每个周期内，随机选取一个时间点，对该交易对买卖盘挂单情况做快照镜像，其中：

买1 按用户挂单金额占比 分配该排序挖矿周期返还额度的1/4

卖1 按用户挂单金额占比 分配该排序挖矿周期返还额度的1/4 

买2到买11 这10档的挂单，按用户在每1档内的挂单金额占比 分别分配该排序挖矿周期返还额度的1/40

卖2到卖11 这10档的挂单，按用户在每1档内的挂单金额占比 分别分配该排序挖矿周期返还额度的1/40

 

当日某用户在某交易对的排序挖矿的总返还，为用户在该交易对每个周期排序挖矿所获FMEX返还的总和。

 

补充说明：

1. 必须是当天0点（GMT+8）之后的新挂单，才有参与当日排序挖矿的资格。

2. 被排序挖矿快照到（每分钟随机一次）的挂单，如果已经部分成交，仍然按照全部订单金额计算。

3. 排序挖矿和现有的交易挖矿、挂单挖矿并存，分别独立返还FMEX。一个订单在满足规则的情况下将可能同时享受多种挖矿返还。

> 策略参数



|参数|默认值|描述|
|----|----|----|
|Intervel|2|休眠时间|
|Amount|10|下单量|
|CoverAmount|2|每次平仓量|
|CoverTime|60|检查仓位并平仓间隔|
|ProfitTime|60|打印收益时间间隔|
|Url|https://api.testnet.fmex.com|API基地址|


> 源码 (javascript)

``` javascript
exchange.IO("base", Url) //切换基地址，方便切换实盘和模拟盘，实盘地址：https://api.fmex.com

var ordersInfo = {buyId:0, buyPrice:0, sellId:0, sellPrice:0}
var depthInfo = {asks:[], bids:[]}
var lastProfitTime = 0 //控制打印收益时间
var lastRestTime = Date.now()   //定时重置策略
var lastCoverTime = Date.now()  //检查仓位并平仓

function calcDepth(depth){ //计算最佳挂单位置
    depthInfo = {asks:[], bids:[]}
    var max_asks = 0
    var max_bids = 0
    var ask_price = depth.Asks[0].Price
    var bid_price = depth.Bids[0].Price
    for(var i=0;i<11;i++){
        var fact = i==0 ? 1/4 : 1/40 //官方的挖矿系数，可按需设置，如离盘口越远越大，减少成交风险
        var my_ask_amount = depth.Asks[i].Price == ordersInfo.sellPrice ? Amount : 0 //排除掉自己订单的干扰
        var my_bid_amount = depth.Bids[i].Price == ordersInfo.buyPrice ? Amount : 0
        while(ask_price <= depth.Asks[i].Price){ //考虑到未被占用的深度位置
            var ask_amount = ask_price == depth.Asks[i].Price ? depth.Asks[i].Amount : 0
            var ratio = _N(10000*Amount*fact/Math.max(ask_amount+Amount-my_ask_amount,Amount),5) //避免因深度更新延时导致除0
            depthInfo.asks.push(['sell_'+(i+1), ask_price, ask_amount, ratio])
            if(ratio >= depthInfo.asks[max_asks][3]){max_asks = depthInfo.asks.length-1} //大于等于保证相同挖矿效率下远离盘口的优先
            ask_price += 0.5
        }
        while(bid_price >= depth.Bids[i].Price){
            var bid_amount = bid_price == depth.Bids[i].Price ? depth.Bids[i].Amount : 0
            var ratio = _N(10000*Amount*fact/Math.max(bid_amount+Amount-my_bid_amount,Amount),5)
            depthInfo.bids.push(['buy_'+(i+1), bid_price, bid_amount, ratio])
            if(ratio >= depthInfo.bids[max_bids][3]){max_bids = depthInfo.bids.length-1}
            bid_price -= 0.5
        }
    }
    return [depthInfo.asks[max_asks][1], depthInfo.bids[max_bids][1]]
}

function showTable(){
    var table = {type: 'table', title: '挂单信息', cols: ['位置', '价格', '数量', '额度占比（万分之一）'], rows: []}
    for(var i=0;i<depthInfo.asks.length;i++){
        table.rows.push(depthInfo.asks[i])
    }
    for(var i=0;i<depthInfo.bids.length;i++){
        table.rows.push(depthInfo.bids[i])
    }
    LogStatus('`' + JSON.stringify(table) + '`\n'+JSON.stringify(ordersInfo))
}

function reset(){ //重置策略，防止一些订单卡住，可能会影响其它正在运行的策略
    var orders = exchange.GetOrders()
    if(orders){
        for(var i=0;i<orders.length;i++){
            exchange.CancelOrder(orders[i].Id)
        }
        ordersInfo = {buyId:0, buyPrice:0, sellId:0, sellPrice:0}
    }
}

function onexit(){  //退出后撤销订单
    reset()
}

function cover(pos,depth){
    if(pos.length>0){
        if(pos[0].Type == 0){ //平多仓，采用盘口吃单，会损失手续费，可改为盘口挂单，会增加持仓风险。
            exchange.SetDirection('sell')
            var sellId = exchange.Sell(depth.Bids[0].Price, Math.min(CoverAmount, pos[0].Amount), '平多仓')
            if(sellId){exchange.CancelOrder(sellId)} //平仓单会立即撤销
        }else{
            exchange.SetDirection('buy')
            var buyId = exchange.Buy(depth.Asks[0].Price, Math.min(CoverAmount, pos[0].Amount), '平空仓')
            if(buyId){exchange.CancelOrder(buyId)}
        }
    }
}

function main() {
    exchange.SetContractType('swap')
    exchange.SetMarginLevel(0) //全仓模式
    reset()
    while(true){
        var depth = _C(exchange.GetDepth)
        var price = calcDepth(depth)
        var sellPrice = price[0]
        var buyPrice = price[1]
        if(buyPrice != ordersInfo.buyPrice){
            var cancelId = ordersInfo.buyId
            exchange.SetDirection('buy')
            var buyId = exchange.Buy(buyPrice, Amount)
            ordersInfo.buyPrice = buyPrice
            if(buyId){ordersInfo.buyId = buyId}else{ordersInfo.buyId = 0}
            if(cancelId){exchange.CancelOrder(cancelId)} //先下单后撤单，保证始终有挂单
        }
        if(sellPrice != ordersInfo.sellPrice){
            var cancelId = ordersInfo.sellId
            exchange.SetDirection('sell')
            var sellId = exchange.Sell(sellPrice, Amount)
            ordersInfo.sellPrice = sellPrice
            if(sellId){ordersInfo.sellId = sellId}else{ordersInfo.sellId = 0}
            if(cancelId){exchange.CancelOrder(cancelId)}
        }
        if(Date.now()-lastProfitTime > ProfitTime*1000){
            lastProfitTime = Date.now()
            var account = exchange.GetAccount()
            if(account){
                LogProfit(_N(account.Info.data.BTC[0]+account.Info.data.BTC[1]+account.Info.data.BTC[2],6))
            }
        }
        if(Date.now()-lastCoverTime > CoverTime*1000){
            lastCoverTime = Date.now()
            var pos = exchange.GetPosition()
            if(pos){cover(pos,depth)}
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

https://www.fmz.com/strategy/171042

> 更新时间

2019-12-09 11:15:15
