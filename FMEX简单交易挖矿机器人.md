
> Name

FMEX简单交易挖矿机器人

> Author

小草

> Strategy Description

具体参考文章： https://www.fmz.com/digest-topic/5834

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|MaxAmount|1000|最大下单量|
|ProfitTime|60|打印收益时间间隔|
|Fee|0.05|吃单手续费%|
|PeriodTradeBack|0.0001|每分钟交易解锁BTC数量|
|CoverCost|0.25|默认成交平仓亏损|
|Intervel|2|休眠时间|
|Url|https://api.testnet.fmex.com|API基地址|


> Source (javascript)

``` javascript
exchange.SetBase(Url)
if(exchange.GetName()!= 'Futures_FMex'){
    throw '此策略只支持FMEX永续'
}

var account = null
var records = null 
var pos = {direction:'empty',price:0,amount:0,unrealised_profit:0}


var total_efficiency = 0 //总效率
var my_efficiency = 0

var ordersInfo = {buyId:0, buyPrice:0, sellId:0, sellPrice:0}
var coverInfo = {buyId:0, buyPrice:0, sellId:0, sellPrice:0}
var depthInfo = {asks:[], bids:[]}
var lastProfitTime = 0 //控制打印收益时间
var lastRestTime = Date.now()   //定时重置策略
var lastLogStatusTime = 0
var lastPeriod = 0
var today = _D().slice(8,11)

updateAccount()

var total_back = 0
if(_G('total_back')){
    total_back = _G('total_back')
}else{
    _G('total_back',total_back)
}
var init_value = 0
if(_G('init_value')){
    init_value  = _G('init_value')
}else{
    init_value = _N(account.Info.data.BTC[0]+account.Info.data.BTC[1]+account.Info.data.BTC[2], 6)
    Log('第一次启动策略, 始总价值为: ', init_value)
    _G('init_value', init_value)
}

function updateRecords(){
    var data = exchange.GetRecords(60)
    if(data){
        records = data
    }else{
        Log('获取行情出错')
    }
}

function updateAccount(){
    var data = exchange.GetAccount()
    if(data){
        account = data
    }else{
        Log('获取账户出错')
    }
}

function updatePosition(){
    var data = exchange.GetPosition()
    if(data){
        if(data.length > 0){
            if(data[0].Info.direction !=  pos.direction || data[0].Info.quantity != pos.amount){
                Log('持仓变动：', pos.direction + ' ' +  pos.amount + ' -> ' + data[0].Info.direction + ' ' + data[0].Info.quantity)
            }
            pos = {direction:data[0].Info.direction, price:data[0].Info.entry_price, amount:data[0].Info.quantity, unrealised_profit:data[0].Info.unrealized_pnl}
        }else{
            if(pos.amount){
                Log('持仓变动：', pos.direction + ' ' +  pos.amount + ' -> ' + 'empty')
            }
            pos = {direction:'empty',price:0,amount:0,unrealised_profit:0}
        }
    }else{
        Log('获取持仓出错')
    }
}

function calcEfficiency(){
    total_efficiency = 0
    for(var i=0;i<records.length;i++){
        total_efficiency += 1000000*(Amount/(records[i].Volume+Amount))*0.3*0.5/2880
    }
    if(_D().slice(17) > 57){
        my_efficiency = 1000000*(Amount/(records[records.length-1].Volume+Amount))*0.3*0.5/2880
    }
}


function logStatus(){
    if(Date.now()-lastLogStatusTime < 4000){
        return
    }
    lastLogStatusTime = Date.now()
    var leverage = pos.amount/(account.Info.data.BTC[0]*(depth.Asks[0].Price+depth.Bids[0].Price)/2)
    var table1 = {type: 'table', title: '账户信息', 
             cols: ['可用保证金', '冻结保证金', '持仓保证金',  '持仓方向','持仓张数', '持仓价格', '未实现盈亏', '已用杠杆', '初始资金', '收益', '买价', '卖价','平均效率','我的效率'],
             rows: [[_N(account.Info.data.BTC[0], 6),_N(account.Info.data.BTC[1], 6),_N(account.Info.data.BTC[2], 6),
                     pos.direction,pos.amount,_N(pos.price,2),_N(pos.unrealised_profit,5),_N(leverage,2),
                     _N(init_value,6),_N(account.Info.data.BTC[0]-init_value, 6), ordersInfo.buyPrice, ordersInfo.sellPrice,
                     _N(total_efficiency/records.length,2),_N(my_efficiency,2)
                    ]]
                 }
    var table2 = {type: 'table', title: '挂单信息', cols: ['位置', '买价', '买量', '效率', '卖价', '卖量', '效率'], rows: []}
    for(var i=0;i<15;i++){
        //Log(i+1,depthInfo.bids[i][1],depthInfo.bids[i][2],depthInfo.bids[i][3],depthInfo.asks[i][1],depthInfo.asks[i][2],depthInfo.asks[i][3])
        table2.rows.push([i+1,depthInfo.bids[i][1],depthInfo.bids[i][2],depthInfo.bids[i][3],depthInfo.asks[i][1],depthInfo.asks[i][2],depthInfo.asks[i][3]])
    }
    if(_D().slice(8,11) != today){
        today = _D().slice(8,11)
        Log('昨天总解锁额度百万分之',total_back,'。今日重新统计')
        total_back = 0
        
    }
    var logString = '当前挖矿周期：'+_D().slice(11,14) + nowPeriod*5 + ' - ' + _D().slice(11,14) + (nowPeriod*5+5) + ' '+'排序挖矿已获得当日解锁总额度的百万分之'+ _N(total_back,4) +'\n'
    LogStatus(logString + '`' + JSON.stringify(table1) + '`'+'\n'+'`' + JSON.stringify(table2) + '`')
    if(Date.now()-lastProfitTime > ProfitTime*1000){
        updateAccount()
        lastProfitTime = Date.now()
        LogProfit(_N(account.Info.data.BTC[0]+account.Info.data.BTC[1]+account.Info.data.BTC[2],6))
    }
}

function cancelAll(){ //重置策略，防止一些订单卡住，可能会影响其它正在运行的策略
    var orders = exchange.GetOrders()
    if(orders){
        for(var i=0;i<orders.length;i++){
            exchange.CancelOrder(orders[i].Id)
        }
        ordersInfo = {buyId:0, buyPrice:0, sellId:0, sellPrice:0}
    }
}


function coverPosition(){
    if(pos.amount>0){
        if(pos.direction == 'long'){ //平多仓，采用盘口吃单，会损失手续费，可改为盘口挂单，会增加持仓风险。
            var sellPrice = _N(pos.price,0)+_N(CoverProfit,0)
            if(sellPrice != coverInfo.sellPrice){
                if(coverInfo.sellId){
                    exchange.CancelOrder(coverInfo.sellId)
                    coverInfo.sellId = 0
                }
                exchange.SetDirection('sell')
                var sellId = exchange.Sell(sellPrice, pos.amount, '平多仓')
                coverInfo.sellPrice = sellPrice
                if(sellId){
                     coverInfo.sellId = sellId
                }else{
                     coverInfo.sellId = 0
                }
            }        
        }else{
            var buyPrice = _N(pos.price,0)-_N(CoverProfit,0)
            if(buyPrice != coverInfo.buyPrice){
                if(coverInfo.buyId){
                    exchange.CancelOrder(coverInfo.buyId)
                    coverInfo.buyId = 0
                }
                exchange.SetDirection('buy')
                var buyId = exchange.Buy(buyPrice, pos.amount, '平空仓')
                coverInfo.buyPrice = buyPrice
                if(buyId){
                     coverInfo.buyId = buyId
                }else{
                    coverInfo.buyId = 0
                }
            }
        }
    }
}

function onTick(){
        var price = calcDepth(depth)
        var sellPrice = price[0]
        var buyPrice = price[2]
        if(buyPrice != ordersInfo.buyPrice){
            if(ordersInfo.buyId){
                exchange.CancelOrder(ordersInfo.buyId)
                ordersInfo.buyId = 0
            }
            exchange.SetDirection('buy')
            var buyId = exchange.Buy(buyPrice, Amount, _N(price[1],3))
            ordersInfo.buyPrice = buyPrice
            if(buyId){
                ordersInfo.buyId = buyId
            }else{
                ordersInfo.buyId = 0
            }
            
        }
        if(sellPrice != ordersInfo.sellPrice){
            if(ordersInfo.sellId){
                exchange.CancelOrder(ordersInfo.sellId)
                ordersInfo.sellId = 0
            }
            exchange.SetDirection('sell')
            var sellId = exchange.Sell(sellPrice, Amount, _N(price[3],3))
            ordersInfo.sellPrice = sellPrice
            if(sellId){
                ordersInfo.sellId = sellId
            }else{
                ordersInfo.sellId = 0
            }
        }

        if(Date.now()-lastRestTime > 10*60*1000){
            lastRestTime = Date.now()
            cancelAll()
        }
}


function onexit(){  //退出后撤销订单
    cancelAll()
    _G('total_back',total_back)
}


exchange.SetContractType('swap')
exchange.SetMarginLevel(0)



function main() {
    cancelAll()
    while(true){
        updatePosition()
        updateRecords()
        onTick()
        logStatus()
        Sleep(Intervel*1000)
    }
}
```

> Detail

https://www.fmz.com/strategy/171560

> Last Modified

2020-09-25 15:34:15
