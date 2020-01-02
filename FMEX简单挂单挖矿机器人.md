
> 策略名称

FMEX简单挂单挖矿机器人

> 策略作者

小草

> 策略描述

## 策略原理

**FMEX挂单挖矿将深度按照离盘口的远近分为不同的组，按挂单量占组内比例以及挖矿效率系数决定返还。策略将会根据当前深度，寻找收益最大的挂单位置挂单，尽量远离盘口。达到最大化资金利用的目的。不同深度的挖矿效率可能相差百倍。**

**每隔一段时间检查仓位，如果有持仓，每次按盘口价平固定数量（需要自己设置）的仓位，直到不持仓。**

**策略仅供学习参考，按需修改。管理仓位简单，未经长时间测试，欢迎反馈问题，不定期更新。**

**如用于实盘，需要修改参数里的基地址**

排序挖矿机器人:  https://www.fmz.com/strategy/171042
挂单挖矿机器人:  https://www.fmz.com/strategy/171258
交易挖矿机器人:  https://www.fmz.com/strategy/171560

FMZ已支持FMEX测试网，需要更新最新的托管者，等10月25号正式网上线后会自动切换。相关问题反馈：https://www.fmz.com/bbs-topic/4476

## 问题和改进方向

- 由于FMEX最多返回150档深度，因此深度信息不完整，价格较高或较低时无法获取到准确的订单，因此无法计算效率。本策略将这些挂单组排除，可以有更好的方式处理。
- 挖矿系数可自行定义，为了避免成交，向后的深度权重可以设置高一点。
- 平仓方式简单，可自行修改。

## FMex挂单挖矿算法说明

https://fcoin.zendesk.com/hc/zh-cn/articles/360037685413-FMex%E6%8C%82%E5%8D%95%E6%8C%96%E7%9F%BF%E7%AE%97%E6%B3%95%E8%AF%B4%E6%98%8E

定义每天中的每5分钟为一个挂单挖矿周期，每个周期分配交易对当日挂单挖矿额度的1/288。

每个周期内，随机选取一个时间点，对该交易对买卖盘挂单情况做快照镜像，按照挂单金额在不同价格范围内的占比（即在某价格范围内用户挂单金额占总挂单金额的占比）分配挖矿额度，其中：

挂单价格 在 当前市场价（即快照时的价格） 上方 1%范围内，分配该挂单挖矿周期返还额度的 1/10

 

挂单价格 在 当前市场价 下方 1%范围内，分配该挂单挖矿周期返还额度的 1/10

 
挂单价格 在 当前市场价 上方 1%-2%范围，分配该挂单挖矿周期返还额度的 1/20
 
挂单价格 在 当前市场价 下方 1%-2%范围，分配该挂单挖矿周期返还额度的 1/20
 
 
.......
 
 
挂单价格 在 当前市场价 上方 20%范围外，分配该挂单挖矿周期返还额度的 1/20
 
挂单价格 在 当前市场价 下方 20%范围外，分配该挂单挖矿周期返还额度的 1/20
 
 

补充说明

1. 挂单金额的具体定义为挂单占用的资产（BTC），挂单占用的资产（BTC）= Quantity（下单数量）/ Price（价格）。

2. 挂单挖矿按日返还，每日0点之后（GMT+8）的新增挂单，才能参与当日的挂单挖矿。也就是说，挂单挖矿是按当日统计的，跨日的挂单不会统计在次日的挂单挖矿中，敬请用户知晓。

> 策略参数



|参数|默认值|描述|
|----|----|----|
|Intervel|2|休眠时间|
|Amount|10|下单量|
|CoverAmount|2|每次平仓量|
|CoverTime|60|检查仓位并平仓间隔|
|ProfitTime|60|打印收益时间间隔|
|Url|https://api.testnet.fmex.com|API地址|


> 源码 (javascript)

``` javascript


exchange.IO("base", Url) //切换基地址，方便切换实盘和模拟盘，实盘地址：https://api.fmex.com
//挖矿分组，[下限百分比，上限百分比，挖矿系数]
var groups = [[0,1,1/10],[1,2,1/20],[2,3,1/20],[3,4,1/20],[4,6,1/40],[6,8,1/40],[8,10,1/40],[10,12,1/40],[12,14,1/40],[14,16,1/40],[16,18,1/40],[18,20,1/40],[20,100,1/20]]
var ordersInfo = {buyId:0, buyPrice:0, sellId:0, sellPrice:0, minPrice:0, maxPrice:0}
var depthInfo = {asks:[], bids:[]} 
var lastProfitTime = 0 //控制打印收益时间
var lastRestTime = Date.now()   //定时重置策略
var lastCoverTime = Date.now()  //检查仓位并平仓

function adjustNum(num){ //控制价格精度
    return num >= _N(num,0)+0.5 ? _N(num,0)+0.5 : _N(num,0)
}

function calcDepth(depth){ //计算最佳挂单位置
    depthInfo = {asks:[], bids:[]}
    var last_price = adjustNum((depth.asks[0] + depth.bids[0])/2) //上一次成交价
    var j = 0 //买单深度迭代标记位置
    var k = 0
    var max_asks = 0
    var max_bids = 0
    for(var i=0;i<groups.length;i++){
        var fact = groups[i][2] //官方的挖矿系数，可按需设置，如离盘口越远越大，减少成交风险
        var buy_price_bound = [adjustNum(last_price*(1-groups[i][0]/100)), adjustNum(last_price*(1-groups[i][1]/100))] //价格上下边界
        var sell_price_bound = [adjustNum(last_price*(1+groups[i][0]/100)), adjustNum(last_price*(1+groups[i][1]/100))]
        var ask_amount = 0 //买单累积深度
        var bid_amount = 0

        while(depth.asks[j*2] <= sell_price_bound[1] && j*2 < depth.asks.length){
            ask_amount += depth.asks[j*2+1]
            j += 1
        }
        var my_ask_amount = (ordersInfo.sellPrice > sell_price_bound[0] && ordersInfo.sellPrice <= sell_price_bound[1]) ? Amount : 0
        var ratio = _N(10000*Amount*fact/Math.max(ask_amount+Amount-my_ask_amount,Amount),5)
        depthInfo.asks.push(['sell_'+groups[i][0]+'-'+groups[i][1]+'%', fact, sell_price_bound[0], sell_price_bound[1], ask_amount, ratio, depth.asks[depth.asks.length-2] >= sell_price_bound[1]])
        if(ratio >= depthInfo.asks[max_asks][5] && depth.asks[depth.asks.length-2] >= sell_price_bound[1]){ //保证是完整的深度信息
            max_asks = depthInfo.asks.length-1
        } //大于等于保证相同挖矿效率下远离盘口的优先
        
        while(depth.bids[k*2] >= buy_price_bound[1] && k*2 < depth.bids.length){
            bid_amount += depth.bids[k*2+1]
            k += 1
        }
        var my_bid_amount = (ordersInfo.buyPrice < buy_price_bound[0] && ordersInfo.buyPrice >= buy_price_bound[1]) ? Amount : 0
        ratio = _N(10000*Amount*fact/Math.max(bid_amount+Amount-my_bid_amount,Amount),5)
        depthInfo.bids.push(['buy_'+groups[i][0]+'-'+groups[i][1]+'%', fact, buy_price_bound[0], buy_price_bound[1], bid_amount, ratio, depth.bids[depth.bids.length-2] <= buy_price_bound[1]])
        if(ratio >= depthInfo.bids[max_bids][5] && depth.bids[depth.bids.length-2] <= buy_price_bound[1]){
            max_bids = depthInfo.bids.length-1
        }
    }
    return [depthInfo.asks[max_asks][3]-0.5, depthInfo.bids[max_bids][3]+0.5] //由于无法确定边界归属，所以在最大边界价格处-0.5
}

function showTable(){
    var table = {type: 'table', title: '挂单信息', cols: ['分组位置', '挖矿系数', '下界价格', '上界价格', '累积深度', '额度占比（万分之一）', '深度信息是否完整'], rows: []}
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
        ordersInfo = {buyId:0, buyPrice:0, sellId:0, sellPrice:0, minPrice:0, maxPrice:0}
    }
}

function onexit(){  //退出后撤销订单
    reset()
}

function cover(pos,depth){
    if(pos.length>0){
        if(pos[0].Type == 0){ //平多仓，采用盘口吃单，会损失手续费，可改为盘口挂单，会增加持仓风险。
            exchange.SetDirection('sell')
            var sellId = exchange.Sell(depth.bids[0], Math.min(CoverAmount, pos[0].Amount), '平多仓')
            if(sellId){exchange.CancelOrder(sellId)} //平仓单会立即撤销
        }else{
            exchange.SetDirection('buy')
            var buyId = exchange.Buy(depth.asks[0], Math.min(CoverAmount, pos[0].Amount), '平空仓')
            if(buyId){exchange.CancelOrder(buyId)}
        }
    }
}

function trade(price){
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
}

function main() {
    exchange.SetContractType('swap')
    exchange.SetMarginLevel(0) //全仓模式
    reset()
    while(true){
        var req = HttpQuery(Url+'/v2/market/depth/L150/btcusd_p') //GetDepth默认20档深度，为获取更多深度信息，使用原始API接口
        if(!req){continue}
        var depth = JSON.parse(req).data
        ordersInfo.minPrice = depth.bids[depth.bids.length-2]
        ordersInfo.maxPrice = depth.asks[depth.asks.length-2]
        var price = calcDepth(depth)
        trade(price) //交易函数
        
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

https://www.fmz.com/strategy/171258

> 更新时间

2019-12-09 11:16:06
