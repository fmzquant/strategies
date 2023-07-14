
> Name

现货预定价格循环买卖

> Author

小草

> Strategy Description

预设一个买价和卖价，策略将在这两个价格区间挂单，先买入后卖出，卖出后再挂买单，不断循环操作获利。

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Buy_price|9000|买入价格|
|Sell_price|9500|卖出价格|
|Amount|0.1|交易数量|
|Advance|false|显示更多参数|
|Intervel|5000|休眠时间ms|
|Log_profit|600000|打印收益时间ms|


> Source (javascript)

``` javascript
/*backtest
start: 2020-05-18 00:00:00
end: 2020-06-16 23:59:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"BTC_USDT","stocks":0}]
*/

var order = {buy_price:0,buy_amount:0,buy_id:0,sell_price:0,sell_amount:0,sell_id:0}
var account = null
var last = 0
var symbol = ''
var status = 0 //0：开始挂买单，1：买单成交挂卖单；2：卖单成交挂买单

var log_profit_time　= 0
var update_status_time = 0
var update_alpha_time = Date.now()

if(exchange.GetName().slice(0,7) == 'Futures'){
    throw '此策略只支持现货'
}

if(_G('symbol')){
    symbol = _G('symbol')
}else{
    symbol = exchange.GetCurrency()
    _G('symbol', symbol)
}
if(exchange.GetCurrency() != symbol){
    throw '不可更换币种,需要重新建立新机器人'
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
    var ticker = exchange.GetTicker()
    if(ticker){
        last = ticker.Last
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

if(_G('init_value')){
    init_value  = _G('init_value')
    init_account = _G('init_account')
}else{
    init_value = _N(account.Balance+account.FrozenBalance+(account.Stocks+account.FrozenStocks)*last, 6)
    init_account = {balance:account.Balance+account.FrozenBalance, amount:account.Stocks+account.FrozenStocks}
    Log('第一次启动策略, 始总价值为: ', init_value)
    _G('init_value', init_value)
    _G('init_account', init_account)
}


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
            if(account.Balance < 1*value){
                Log('资金不足, 无法挂买单, 等待卖出')
            }else{
                id = exchange.Buy(price, amount, msg)
            }
        }
        if(direction == 'sell'){
            if(account.Stocks < 1*amount){
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
                 cols: ['初始币', '初始资金', '当前币',  '当前资金', '买单价格', '卖单价格', '现价', '初始市值', '当前市值', '收益'],
                 rows: [[_N(init_account.amount,6), _N(init_account.balance,6), _N(account.Stocks+account.FrozenStocks,6),
                     _N(account.Balance+account.FrozenBalance,6), order.buy_price, order.sell_price, _N(last,6), 
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
    //0：开始挂买单，1：买单成交挂卖单；2：卖单成交挂买单
    var buy_price  = _N(Buy_price,   precision.price)
    var sell_price = _N(Sell_price,  precision.price)
    
    if(status == 0 && !order.buy_id){
        trade('buy', buy_price,  Amount*buy_price,    '挂买单')
    }
    if(order.buy_id && status == 0 ){
        var buy_order = exchange.GetOrder(order.buy_id)
        if(buy_order && buy_order.Status == ORDER_STATE_CLOSED){
            status = 1
            order.buy_id = 0
            order.buy_price = 0
        }
    }
    if(status == 1 && !order.sell_id){
        trade('sell', sell_price,  Amount*sell_price,    '买单成交挂卖单')
    }
    if(status == 1 && order.sell_id){
        var sell_order = exchange.GetOrder(order.sell_id)
        if(sell_order && sell_order.Status == ORDER_STATE_CLOSED){
            status = 0
            order.sell_id = 0
            order.sell_price = 0
        }
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

https://www.fmz.com/strategy/215007

> Last Modified

2020-06-19 16:06:36
