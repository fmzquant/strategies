
> Name

现货单币种平衡策略

> Author

小草

> Strategy Description

最经典的单币种平衡策略，涨了卖出，跌了买入，始终保持持仓维持一定的比例。比较中庸的策略，需要长期运行。


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Ratio|0.5|持有比例|
|Grid_Ratio|0.005|调整比例|
|Advance|false|显示更多参数|
|Intervel|1000|休眠时间ms|
|Log_profit|600000|打印收益时间ms|


> Source (javascript)

``` javascript
/*backtest
start: 2019-07-24 00:00:00
end: 2020-07-23 23:59:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"BTC_USDT","stocks":1.2,"fee":[0.1,0.1]}]
*/

var order = {buy_price:0,buy_amount:0,buy_id:0,sell_price:0,sell_amount:0,sell_id:0}
var account = null
var last = 0
var symbol = ''

var log_profit_time　= 0
var update_status_time = 0
var update_alpha_time = Date.now()
var total_trade_volume = 0

if(exchange.GetName().slice(0,7) == 'Futures'){
    throw '此策略只支持现货'
}
if(Ratio < 0.0005){
    throw '网格密度勿小于万分之5'
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
            total_trade_volume += _N(Math.abs(acc.Stocks + acc.FrozenStocks - (account.Stocks + account.FrozenStocks)),6)
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
    var new_order = false 
    if(!order[direction+'_id']){
        new_order = true
    }
    if(order[direction+'_price'] > 0 &&　Math.abs(price-order[direction+'_price'])/order[direction+'_price'] > Grid_Ratio/10.0){
        new_order = true
    }
    if((direction == 'buy' && account.FrozenBalance == 0 && account.Balance > 1.5*value) || (direction == 'sell' && account.FrozenStocks == 0 && account.Stocks > 1.5*amount)){
        new_order = true
    }
    order[direction+'_price'] = price
    if(new_order){
        if(order[direction+'_id']){
            exchange.CancelOrder(order[direction+'_id'])
            order[direction+'_price'] = 0
            order[direction+'_id'] = 0
        }
        var id =null
        if(direction == 'buy'){
            if(account.Balance < 1.5*value){
                Log('资金不足, 无法挂买单')
            }else{
                id = exchange.Buy(price, amount, msg)
            }
        }
        if(direction == 'sell'){
            if(account.Stocks < 1.5*amount){
                Log('余币不足, 无法挂卖单')
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
                 cols: ['初始币', '初始资金', '当前币',  '当前资金', '当前比例', '现价', '初始市值', '当前市值', '总成交', '收益'],
                 rows: [[_N(init_account.amount,6), _N(init_account.balance,6), _N(account.Stocks+account.FrozenStocks,6),
                     _N(account.Balance+account.FrozenBalance,6), _N((account.Stocks+account.FrozenStocks)*last/now_value,6), _N(last,6), 
                     _N(init_value,6), _N(now_value,6),_N(total_trade_volume,4), _N(profit,6)]]
                 }
    var logString = _D()+'  策略代码最后更新时间6月10日 14:00\n'
    LogStatus(logString + '`' + JSON.stringify(table) + '`'+'\n')
    
    var log_profit_intervel = IsVirtual() ? 24*60*60*1000 : Log_profit
    if(Date.now()-log_profit_time > log_profit_intervel){
        LogProfit(_N((account.Stocks+account.FrozenStocks)*last + account.Balance+account.FrozenBalance - init_account.amount*last - init_account.balance, 6))
        log_profit_time = Date.now()
    }
}

function onTick(){
    if(last == 0){return}
    var m = account.Stocks+account.FrozenStocks
    var b = account.Balance+account.FrozenBalance
    var r = m*last/(m*last+b)
    if(Math.abs(r-Ratio)>0.3*Ratio){
        throw '为避免冲击市场，需要手动交易到持仓比例附近，再由策略进行交易'
    }
    var buy_r = Ratio-Grid_Ratio
    var sell_r = Ratio+Grid_Ratio
    var buy_price = _N(b*buy_r/(m-m*buy_r), precision.price)
    var sell_price = _N(b*sell_r/(m-m*sell_r), precision.price)
    
    var buy_value =  (m*buy_price + b)*Grid_Ratio
    var sell_value = (m*sell_price + b)*Grid_Ratio
    trade('buy', buy_price,  buy_value,    '买入平衡')
    trade('sell', sell_price, sell_value , '卖出平衡')
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

https://www.fmz.com/strategy/214943

> Last Modified

2020-07-25 20:57:12
