
> Name

现货移动止盈策略

> Author

小草

> Strategy Description

策略启动后不断追踪最高价，如果从最高价跌回一定比例就止盈，如最近最高价为100，止盈比例为0.98，则价格跌倒98止盈。

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Ratio|0.98|止盈比例|
|Amount|0.1|止盈数量|
|Advance|false|显示更多参数|
|Intervel|5000|休眠时间ms|
|Log_profit|600000|打印收益时间ms|


> Source (javascript)

``` javascript
/*backtest
start: 2020-06-17 00:00:00
end: 2020-06-17 23:59:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"BTC_USDT","balance":9000,"stocks":2}]
args: [["Amount",2]]
*/


var order = {buy_price:0,buy_amount:0,buy_id:0,sell_price:0,sell_amount:0,sell_id:0}
var account = null
var ticker = null
var last = 0
var symbol = ''
var status = 0 //0：开始挂买单，1：买单成交挂卖单；2：卖单成交挂买单
var max_price = 0


var log_profit_time　= 0
var update_status_time = 0
var update_alpha_time = Date.now()

if(exchange.GetName().slice(0,7) == 'Futures'){
    throw '此策略只支持现货'
}

function GetPrecision(){
    if(IsVirtual()){
        return {price:6, amount:6}
    }
    var precision = {price:0, amount:0}
    var depth = exchange.GetDepth()
    if(!depth){
        throw '无法连接交易所行情,需要海外托管者'
    }
    for(var i=0;i<depth.Asks.length;i++){
        var amountPrecision = depth.Asks[i].Amount.toString().indexOf('.') > -1 ? depth.Asks[i].Amount.toString().split('.')[1].length : 0
        precision.amount = Math.max(precision.amount,amountPrecision)
        var pricePrecision = depth.Asks[i].Price.toString().indexOf('.') > -1 ? depth.Asks[i].Price.toString().split('.')[1].length : 0
        precision.price = Math.max(precision.price,pricePrecision)
    }
    return precision
}
function updateAccount() {
        var acc = exchange.GetAccount()
        if(acc){
            if(account && _N(acc.Stocks + acc.FrozenStocks,6) != _N(account.Stocks + account.FrozenStocks,6)){
                if(acc.Stocks + acc.FrozenStocks > account.Stocks + account.FrozenStocks){
                    Log('买单成交：',_N(acc.Stocks + acc.FrozenStocks-account.Stocks - account.FrozenStocks,6),  '  数量变动：', _N(account.Stocks + account.FrozenStocks,6), ' -> ', _N(acc.Stocks + acc.FrozenStocks,6))
                }
                if(acc.Stocks + acc.FrozenStocks < account.Stocks + account.FrozenStocks){
                    Log('卖单成交：',_N(account.Stocks + account.FrozenStocks - acc.Stocks - acc.FrozenStocks,6),'  数量变动：', _N(account.Stocks + account.FrozenStocks,6), ' -> ', _N(acc.Stocks + acc.FrozenStocks,6))
                }
            }    
        
            account = acc
       }else{
           Log('获取账户信息出错')
       }
}

function updateTicker(){
        var tick = exchange.GetTicker()
        if(tick){
            last = tick.Last
            ticker = tick
        }else{
            Log('获取行情出错')
        }
}

function cancelAll(){
    Log('撤销所有订单')
    var orders = exchange.GetOrders()
    if(!orders){
        Log('获取订单失败')
    }
    for(var j=0; j<orders.length; j++){
        exchange.CancelOrder(orders[j].Id)
        Sleep(10)
    }
}

cancelAll()
last = exchange.GetTicker().Last
updateAccount()

var precision = GetPrecision()


var init_value = 0
var init_account = {balance:0, amount:0}


init_value = _N(account.Balance+account.FrozenBalance+(account.Stocks+account.FrozenStocks)*last, 6)
init_account = {balance:account.Balance+account.FrozenBalance, amount:account.Stocks+account.FrozenStocks}
Log('第一次启动策略, 始总价值为: ', init_value)
_G('init_value', init_value)
_G('init_account', init_account)



function trade(direction, price, value, msg){
    if(price <= 0){return}
    var amount = _N(value/price, precision.amount)
    var new_order = true
    order[direction+'_price'] = price
    if(new_order){
        if(order[direction+'_id']){
            exchange.CancelOrder(order[direction+'_id'])
            order[direction+'_price'] = 0
            order[direction+'_id'] = 0
        }
        var id =null
        if(direction == 'buy'){
            if(account.Balance <= value){
                Log('资金不足, 无法挂买单, 等待卖出')
            }else{
                id = exchange.Buy(price, amount, msg)
            }
        }
        if(direction == 'sell'){
            if(account.Stocks <= amount){
                Log('余币不足, 无法挂卖单，等待买入')
            }else{
                id = exchange.Sell(price, amount, msg)
            }
        }
        order[direction+'_id'] = id
        order[direction+'_price'] = price
    }
}

function updateStatus(){
    if(Date.now()-update_status_time < 4000){
        return
    }
    update_status_time = Date.now()
    var now_value = (account.Stocks+account.FrozenStocks)*last + account.Balance+account.FrozenBalance
    var profit = _N( now_value - init_account.amount*last - init_account.balance, 6)
    var table = {
                 type: 'table', title: '账户信息', 
                 cols: ['初始币', '初始资金', '当前币',  '当前资金', '最高价', '止盈价', '现价', '初始市值', '当前市值', '收益'],
                 rows: [[_N(init_account.amount,6), _N(init_account.balance,6), _N(account.Stocks+account.FrozenStocks,6),
                     _N(account.Balance+account.FrozenBalance,6), max_price, _N(Ratio*max_price,6), _N(last,6), 
                     _N(init_value,6), _N(now_value,6), _N(profit,6)]]
                 }
    var logString = _D()+'  策略代码最后更新时间6月10日 14:00\n'
    LogStatus(logString + '`' + JSON.stringify(table) + '`'+'\n')
    
    var log_profit_intervel = IsVirtual() ? 12*60*60*1000 : Log_profit
    if(Date.now()-log_profit_time > log_profit_intervel){
        LogProfit(_N((account.Stocks+account.FrozenStocks)*last + account.Balance+account.FrozenBalance - init_account.amount*last - init_account.balance, 6))
        log_profit_time = Date.now()
    }
}

function onTick(){
    if(last == 0){return}
    if(last > max_price){
        max_price = last 
        //Log('更新最高价：', last, '最新止盈价：',  max_price*Ratio)
    }
    var now_trade = init_account.amount - account.FrozenStocks - account.Stocks
    if(now_trade >= Amount*0.995){
        throw '止盈结束'
    }
    if(last < max_price*Ratio && Amount - now_trade > 0.01*Amount ){
        trade('sell', ticker.Buy,  (Amount - now_trade)*ticker.Buy,    '止盈')
    }
}

function onexit(){
    cancelAll()
}

function main() {
    while(true){
        updateTicker()
        updateAccount()
        onTick()
        updateStatus()
        if(!IsVirtual()){
            Sleep(Intervel)
        }
    }
}
```

> Detail

https://www.fmz.com/strategy/215022

> Last Modified

2020-06-22 14:55:07
