
> Name

FMEX简单排序挖矿机器人

> Author

小草

> Strategy Description

具体参考文章： https://www.fmz.com/digest-topic/5843

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Intervel|2|休眠时间|
|Amount|10|下单量|
|CoverProfit|-10|平仓利润|
|ProfitTime|60|打印收益时间间隔|
|Url|https://api.fmextest.net|API基地址|


> Source (javascript)

``` javascript
exchange.SetBase(Url)
if(exchange.GetName()!= 'Futures_FMex'){
    throw '此策略只支持FMEX永续'
}

var account = null
var depth = null 
var pos = {direction:'empty',price:0,amount:0,unrealised_profit:0}

//官方的挖矿系数，可按需设置，如离盘口越远越大，减少成交风险
var factors = [1/4, 1/40, 1/40,1/40,1/40,1/50,1/50,1/50,1/50,1/50,1/100,1/100,1/100,1/100,1/100]
var total_efficiency = 0 //总效率
var avg_efficiency = 0
var avg_num = 0

var ordersInfo = {buy:[],sell:[]}//id:0, price:0, amount:0}
var coverInfo = {buyId:0, buyPrice:0, sellId:0, sellPrice:0}
var depthInfo = []
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

function updateDepth(){
    var data = exchange.GetDepth()
    if(data){
        depth = data
    }else{
        Log('获取深度出错')
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

function calcDepth(){ 
    depthInfo = [] // price amount efficent  ratio  
    var ask_price = depth.Asks[0].Price
    var bid_price = depth.Bids[0].Price
    total_efficiency = 0
    for(var i=0;i<15;i++){
        var factor = factors[i]
        total_efficiency += 1000000*(Amount*2/(depth.Asks[i].Amount+depth.Bids[i].Amount))*factor*0.5/288
        while(ask_price <= depth.Asks[i].Price){ //考虑到未被占用的深度位置
            var my_ask_amount = _.findWhere(ordersInfo.sell, {price:ask_price}) ? _.findWhere(ordersInfo.sell, {price:ask_price}).amount : 0 //排除掉自己订单的干扰
            var ask_amount = ask_price == depth.Asks[i].Price ? Math.max(depth.Asks[i].Amount-my_ask_amount,0) : 0
            depthInfo.push({side:'sell', pos:i+1, price:ask_price, amount:ask_amount, factor:factor, my_amount:0, e:0, r:0})
            ask_price += 0.5
        }
        
    }
    for(var i=0;i<15;i++){
        var factor = factors[i]
        total_efficiency += 1000000*(Amount*2/(depth.Asks[i].Amount+depth.Bids[i].Amount))*factor*0.5/288
        while(bid_price >= depth.Bids[i].Price){
            var my_bid_amount = _.findWhere(ordersInfo.buy, {price:bid_price}) ? _.findWhere(ordersInfo.buy, {price:bid_price}).amount : 0 
            var bid_amount = bid_price == depth.Bids[i].Price ? Math.max(depth.Bids[i].Amount-my_bid_amount,0) : 0
            depthInfo.push({side:'buy', pos:i+1, price:bid_price, amount:bid_amount, factor:factor, my_amount:0, e:0, r:0})
            bid_price -= 0.5
        }
    }
}

function calcAmount(){
    var total_amount = Amount
    var per_amount = _N(Amount/100,0)
    var max_id = 0
    while(total_amount >= per_amount){
        var max_e = 0
        for(var i=0;i<30;i++){
            if(depthInfo[i].amount == 0){
                depthInfo[i].my_amount = per_amount
            }else{
                depthInfo[i].e = depthInfo[i].factor*depthInfo[i].amount/Math.pow(depthInfo[i].my_amount+per_amount+depthInfo[i].amount,2)
                max_id = depthInfo[i].e > max_e ? i : max_id 
                max_e = depthInfo[i].e > max_e ? depthInfo[i].e : max_e
            }
        }
        depthInfo[max_id].my_amount += per_amount     
        total_amount -= per_amount
    }
}

function makeOrders(){
    var e = 0
    var new_orders = {buy:[],sell:[]}
    for(var i=0;i<30;i++){
        if(depthInfo[i].my_amount > 0){
            var find = _.findWhere(ordersInfo[depthInfo[i].side], {price:depthInfo[i].price})
            //Log(find)
            var now_amount = find ? find.amount : 0
            var now_id =  find ? find.id : 0
            if(Math.abs(now_amount  - depthInfo[i].my_amount) > 2.1*Amount/100 || depthInfo[i].amount == 0){ //需要重新下单
                if(now_id){
                    exchange.CancelOrder(now_id,find)
                    find.id = 0
                }
                if(depthInfo[i].my_amount > 0){
                    exchange.SetDirection(depthInfo[i].side)
                    
                    var id = exchange[depthInfo[i].side == 'buy'  ? 'Buy' :  'Sell'](depthInfo[i].price,depthInfo[i].my_amount)
                    if(id){ 
                        new_orders[depthInfo[i].side].push({price:depthInfo[i].price,amount:depthInfo[i].my_amount,id:id})
                    }
                }
           }else{
               now_id =  find ? find.id : 0
               if(now_id){
                   new_orders[depthInfo[i].side].push(find)
               }
           }
           depthInfo[i].r = 1000000*(depthInfo[i].my_amount/(depthInfo[i].my_amount+depthInfo[i].amount))*depthInfo[i].factor*0.5/288
           e += depthInfo[i].r
        }
    }
    for(var i=0;i<ordersInfo.buy.length;i++){
        if(ordersInfo.buy[i].price < depth.Bids[15].Price && ordersInfo.buy[i].id ){
            exchange.CancelOrder(ordersInfo.buy[i].id,'撤销范围之外的买单')
        }
    }
    for(var i=0;i<ordersInfo.sell.length;i++){
        if(ordersInfo.sell[i].price > depth.Asks[15].Price && ordersInfo.sell[i].id){
            exchange.CancelOrder(ordersInfo.sell[i].id,'撤销范围之外的卖单')
        }
    }
    ordersInfo = new_orders
    var total = avg_efficiency*avg_num + e
    avg_num += 1
    avg_efficiency = total/avg_num
}

function logStatus(){
    if(Date.now()-lastLogStatusTime < 4000){
        return
    }
    lastLogStatusTime = Date.now()
    var leverage = pos.amount/(account.Info.data.BTC[0]*(depth.Asks[0].Price+depth.Bids[0].Price)/2)
    var table1 = {type: 'table', title: '账户信息', 
             cols: ['可用保证金', '冻结保证金', '持仓保证金',  '持仓方向','持仓张数', '持仓价格', '未实现盈亏', '已用杠杆', '初始资金', '收益', '平仓买价', '卖价','平均效率','我的效率'],
             rows: [[_N(account.Info.data.BTC[0], 6),_N(account.Info.data.BTC[1], 6),_N(account.Info.data.BTC[2], 6),
                     pos.direction,pos.amount,_N(pos.price,2),_N(pos.unrealised_profit,5),_N(leverage,2),
                     _N(init_value,6),_N(account.Info.data.BTC[0]-init_value, 6), coverInfo.buyPrice, coverInfo.sellPrice,
                     _N(total_efficiency/30,2),_N(avg_efficiency,2)
                    ]]
                 }
    var table2 = {type: 'table', title: '挂单信息', cols: ['位置', '买价', '买量','我的', '效率', '卖价', '卖量', '我的', '效率'], rows: []}
    
    for(var i=0;i<15;i++){                          
        table2.rows.push([i+1,depthInfo[i+15].price,depthInfo[i+15].amount,depthInfo[i+15].my_amount,_N(depthInfo[i+15].r,3),
                          depthInfo[i].price,depthInfo[i].amount,depthInfo[i].my_amount,_N(depthInfo[i].r,3)])
    }
    if(_D().slice(8,11) != today){
        today = _D().slice(8,11)
        Log('昨天总解锁额度百万分之',total_back,'。今日重新统计')
        total_back = 0
    }
    var nowPeriod = _N(_D().slice(14,16)/5,0)
    if(lastPeriod != nowPeriod){
        lastPeriod = nowPeriod 
        total_back += avg_efficiency
        avg_efficiency = 0
        avg_num = 0
        
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
        ordersInfo = {buy:[],sell:[]}
        coverInfo = {buyId:0, buyPrice:0, sellId:0, sellPrice:0} 
    }
}


function coverPosition(){
    if(pos.amount>0){
        if(pos.direction == 'long'){ //平多仓
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
    calcDepth()
    calcAmount()
    makeOrders()
    if(Date.now()-lastRestTime > 3*60*1000){
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
        updateDepth()
        onTick()
        coverPosition()
        logStatus()
        Sleep(Intervel*1000)
    }
}
```

> Detail

https://www.fmz.com/strategy/171042

> Last Modified

2020-09-25 15:34:00
