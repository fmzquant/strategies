
> Name

币安合约蝶式套利千团大战策略3

> Author

小草

> Strategy Description

币安蝶式套利策略，无法回测。具体原理参考文库文章：https://www.fmz.com/digest-topic/6102

**需要看完此策略手册，不能无脑实盘运行。策略代码仅供参考，按需修改，欢迎反馈。**

### 策略原理

币安币本位合约如BTC、ETH等同时存在三个合约，即永续BTCUSD_PERP、当季BTCUSD_200925、次季BTCUSD_201225。

永续合约可以当作现货，一般两个合约做对冲共有三个差价：当季-永续、次季-永续、次季-当季。蝶式套利需要操作三个合约，差价为（次季-当季）-（当季-永续），即差价=次季+永续-2\*当季。做多差价需要开做多一份的次季和永续合约，做空2份的当季合约。

### 策略参数

- 交易币种：需要同时存在永续、当季、次季三个品种。
- 下单张数：每格网格的下单张数。
- 网格开单差价：每偏离一个差价，做多或做空一份。
- 差价平滑参数Alpha：用于计算差价的均值，可用默认，也可自己回测。
- 冰山委托张数：如果开仓张数太大，为减少单腿现象，可以设置每次最小开单张数，缺点是抢差价不及时。不需要冰山委托此参数设置和下单张数一样。

如差价的均线是100，当前差价是200，下单张数是2，网格开单差价是30，则此时的持仓为：次季空6张，永续空6张，当季多12张。不清楚的可以具体看代码。

### 注意事项

- 交割合约需要单向持仓，即不同同时持有多空。
- 保证金为全仓模式。
- 本策略不是无脑运行的策略，理解原理情况下谨慎测试。
- 研究文章的回测不会是实盘情况，不用过于优化参数。
- 机器人长时间不运行，为防止差价过大，需要新建机器人。
- 网格开单差价参数一定要覆盖手续费，如吃单手续费是万2，比特币价格是10000，则至少要大于8\*10000\*0.0002=16，再加上一定的余量，可以设置为25-30。
- 临近交割次季-当季，当季-永续的时间差越来越大，最终当季贴近永续，蝶式套利实际上是次季和永续之间的套利，不能运行，需要在交割前2周停止或观察是否继续运行。同理新开合约也要观察
- 下单采用IOC，将以委托价格（或更优价格）立即成交可成交的部分，无法立即完全成交的部分将被取消。因此不用撤单。
- 此策略稍加修改也可以改成当季和永续或次季和永续之间的套利。
- 策略不会频繁开仓平仓，有可能一天也不开一单。
- 机器人刚开始运行才开始统计平均差价，不会追溯历史。
- 策略很可能因为无法成交造成的单腿，可自行优化。
- 下单加了滑价，对于小的开仓张数影响不大，对于大的开仓张数需要自己优化，如冰山委托。











> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Symbol|BTC|交易币种|
|Trade_value|true|下单张数|
|Grid|false|网格开单差价|
|Alpha|1e-06|差价平滑参数Alpha|
|Ice_value|5|冰山委托张数|


> Source (javascript)

``` javascript
if(IsVirtual()){
    throw '不能回测，回测参考研究文章 https://www.fmz.com/digest-topic/6102'
}
if(exchange.GetName() != 'Futures_Binance'){
    throw '只支持币安期货交易所，和现货交易所不同，需要单独添加，名称为Futures_Binance'
}
if(Grid == 0){
    throw '需要设置网格差价，需要覆盖8份手续费，可设置为当前价*fee*15'
}

exchange.SetBase("https://dapi.binance.com") //切换至交割合约

var exchange_info = HttpQuery('https://dapi.binance.com/dapi/v1/exchangeInfo')
if(!exchange_info){
    throw '无法连接币安网络，需要非公用海外托管者'
}
exchange_info = JSON.parse(exchange_info)
trade_info = {} //合约基础信息
trade_contract = {NEXT_QUARTER:'',CURRENT_QUARTER:'',PERPETUAL:''} //需要交易的合约代码
for (var i=0; i<exchange_info.symbols.length; i++){
   trade_info[exchange_info.symbols[i].symbol] =  exchange_info.symbols[i]
   if(exchange_info.symbols[i].baseAsset == Symbol && exchange_info.symbols[i].contractType in trade_contract && exchange_info.symbols[i].contractStatus == 'TRADING'){
       trade_contract[exchange_info.symbols[i].contractType] = exchange_info.symbols[i].symbol
   }
}
if(!(trade_contract.NEXT_QUARTER && trade_contract.CURRENT_QUARTER && trade_contract.PERPETUAL)){
    throw '无法找到蝶式对冲的三个合约'
}
var pricePrecision = trade_info[trade_contract.PERPETUAL].pricePrecision //价格精度

var ticker = {}
var account = {}
var position = {}

var diff_mean = null //差价均价
if(_G('diff_mean') && _G('symbol') == Symbol){ //防止切换币种，差价出错
    diff_mean = _G('diff_mean')
}else{
    _G('symbol',Symbol)
}

var diff_buy = 0 //做多的差价
var diff_sell = 0 //做空的差价
Trade_value = _N(Trade_value, 0)
 
var init_asset = 0 //初始资金
if(_G('init_asset')){
    init_asset = _G('init_asset')
}else{
    updateAccount()
    init_asset = parseFloat(account[Symbol].marginBalance)
    _G('init_asset', init_asset)
}
var update_status_time = 0
var update_account_time = Date.now()

function onexit(){
    _G('diff_mean', diff_mean)
}

function updateTicker(){
    var bookTicker =  HttpQuery('https://dapi.binance.com/dapi/v1/ticker/bookTicker')
    try {
        bookTicker = JSON.parse(bookTicker)
        for(var i=0;i<bookTicker.length;i++){
            ticker[bookTicker[i].symbol] = bookTicker[i]
        }
    } catch (e) {
        Log('无法获取行情')
    }
}

function updateAccount(){
    var acc = exchange.IO("api", "GET", "/dapi/v1/account", "timestamp="+Date.now())
    if(!acc){
        Log('无法获取账户')
        return
    }
    for(var i=0;i<acc.assets.length;i++){
        account[acc.assets[i].asset] = acc.assets[i]
    }
}

function updatePosition(){
    var pos = exchange.IO("api", "GET", "/dapi/v1/positionRisk", "timestamp="+Date.now())
    if(!pos){
        Log('无法获取仓位')
        return
    }
    for(var i=0;i<pos.length;i++){
        position[pos[i].symbol] = pos[i]
    }
}

function updateStatus(){
    if(Date.now() - update_status_time < 4000){
        return
    }
    update_status_time = Date.now()
    if(Date.now() - update_account_time >  5*60*1000){
        update_account_time = Date.now()
        updateAccount()
        LogProfit(_N(parseFloat(account[Symbol].marginBalance) - init_asset, 5))
    }
    
    $.PlotLine('buy', _N(diff_buy, pricePrecision))
    $.PlotLine('sell', _N(diff_sell, pricePrecision))
    $.PlotLine('mean', _N(diff_mean, pricePrecision+3))
    
    var table1 = {type: 'table', title: '账户信息', 
             cols: ['账户余额', '未实现盈亏', '保证金余额',  '可用余额', '维持保证金', '起始保证金', 'BNB', '初始余额', '收益', '平均差价', '做多差价', '做空差价', '下单量'],
             rows: [[_N(parseFloat(account[Symbol].walletBalance),5), _N(parseFloat(account[Symbol].unrealizedProfit),5), _N(parseFloat(account[Symbol].marginBalance),5), 
                     _N(parseFloat(account[Symbol].availableBalance),5),  _N(parseFloat(account[Symbol].maintMargin),5), _N(parseFloat(account[Symbol].initialMargin),5), 
                     _N(parseFloat(account.BNB.walletBalance),5), _N(init_asset,5),
                      _N(parseFloat(account[Symbol].marginBalance) - init_asset,5), _N(diff_mean, pricePrecision+1),
                     _N(diff_buy, pricePrecision),_N(diff_sell, pricePrecision), Trade_value
                    ]]}
    var table2 = {type: 'table', title: '对冲信息', 
             cols: ['合约', '持仓张数', 'Bid', 'Ask', '持仓价值', '杠杆', '开仓均价', '未实现盈亏'],
             rows: []}
    for(var contract in trade_contract){
        var symbol = trade_contract[contract]
        table2.rows.push([symbol, position[symbol].positionAmt, ticker[symbol].bidPrice, ticker[symbol].askPrice, 
                          parseInt(position[symbol].positionAmt)*parseInt(trade_info[symbol].contractSize), position[symbol].leverage,
                         position[symbol].entryPrice, position[symbol].unRealizedProfit])
    }
    var logString = _D()+'  策略代码最后更新时间9月29日\n'
    LogStatus(logString + '`' + JSON.stringify(table1) + '`'+'\n'+'`' + JSON.stringify(table2) + '`')
}

function trade(symbol, side, price, amount){
    //IOC下单，未成交部分会自动撤销
    exchange.Log(side == 'BUY' ? LOG_TYPE_BUY : LOG_TYPE_SELL, price, amount, ' buy: ' + _N(diff_buy, pricePrecision) + ' sell: '+ _N(diff_sell, pricePrecision) + ' mean: '+_N(diff_mean, pricePrecision+3))
    exchange.IO("api", "POST","/dapi/v1/order","symbol="+symbol+"&side="+side+"&type=LIMIT&timeInForce=IOC&quantity="+amount+"&price="+price+"&timestamp="+Date.now())
}


function onTicker(){
    
    //由于是吃单，需要分别计算做多和做空的差价
    diff_sell = parseFloat(ticker[trade_contract.NEXT_QUARTER].bidPrice) + parseFloat(ticker[trade_contract.PERPETUAL].bidPrice) -
                2*parseFloat(ticker[trade_contract.CURRENT_QUARTER].askPrice)
    diff_buy = parseFloat(ticker[trade_contract.NEXT_QUARTER].askPrice) + parseFloat(ticker[trade_contract.PERPETUAL].askPrice)  -
                2*parseFloat(ticker[trade_contract.CURRENT_QUARTER].bidPrice)

    
    if(!diff_mean){diff_mean = (diff_buy+diff_sell)/2}
    diff_mean = diff_mean*(1-Alpha) + Alpha*(diff_buy+diff_sell)/2 //差价均价的更新
    
    
    var aim_buy_amount = -Trade_value*(diff_buy - diff_mean)/Grid
    var aim_sell_amount = -Trade_value*(diff_sell - diff_mean)/Grid 
    
    if(aim_buy_amount - parseFloat(position[trade_contract.PERPETUAL].positionAmt) > Trade_value){ //做多差价，价格加了滑价
        trade(trade_contract.PERPETUAL, 'BUY', _N(parseFloat(ticker[trade_contract.PERPETUAL].askPrice)*1.01, pricePrecision), _N(Math.min(aim_buy_amount-parseFloat(position[trade_contract.PERPETUAL].positionAmt),Ice_value),0))
    }
    if(aim_buy_amount - parseFloat(position[trade_contract.NEXT_QUARTER].positionAmt) > Trade_value){
        trade(trade_contract.NEXT_QUARTER, 'BUY', _N(parseFloat(ticker[trade_contract.NEXT_QUARTER].askPrice)*1.01,pricePrecision), _N(Math.min(aim_buy_amount-parseFloat(position[trade_contract.NEXT_QUARTER].positionAmt),Ice_value),0))
    }
    if(-2*aim_buy_amount - parseFloat(position[trade_contract.CURRENT_QUARTER].positionAmt) < -2*Trade_value){
        trade(trade_contract.CURRENT_QUARTER, 'SELL', _N(parseFloat(ticker[trade_contract.CURRENT_QUARTER].bidPrice)*0.99,pricePrecision), _N(2*Math.min(aim_buy_amount+parseFloat(position[trade_contract.CURRENT_QUARTER].positionAmt),Ice_value),0))
    }
    
    if(aim_sell_amount - parseFloat(position[trade_contract.PERPETUAL].positionAmt) < -Trade_value){ //做空差价
        trade(trade_contract.PERPETUAL, 'SELL', _N(parseFloat(ticker[trade_contract.PERPETUAL].bidPrice)*0.99,pricePrecision), _N(Math.min(parseFloat(position[trade_contract.PERPETUAL].positionAmt)-aim_sell_amount,Ice_value),0))
    }
    if(aim_sell_amount - parseFloat(position[trade_contract.NEXT_QUARTER].positionAmt) < -Trade_value){
        trade(trade_contract.NEXT_QUARTER, 'SELL', _N(parseFloat(ticker[trade_contract.NEXT_QUARTER].bidPrice)*0.99,pricePrecision), _N(Math.min(parseFloat(position[trade_contract.NEXT_QUARTER].positionAmt)-aim_sell_amount,Ice_value),0))
    }
    if(-2*aim_sell_amount - parseFloat(position[trade_contract.CURRENT_QUARTER].positionAmt) > 2*Trade_value){
        trade(trade_contract.CURRENT_QUARTER, 'BUY', _N(parseFloat(ticker[trade_contract.CURRENT_QUARTER].askPrice)*1.01,pricePrecision), _N(-2*Math.min(aim_sell_amount-parseFloat(position[trade_contract.CURRENT_QUARTER].positionAmt),Ice_value),0))
    }
}

function main() {
    updateAccount()
    updatePosition()
    while(true){
        updateTicker()
        updatePosition()
        onTicker()
        updateStatus()
        Sleep(1*1000)
    }
}
```

> Detail

https://www.fmz.com/strategy/226882

> Last Modified

2021-09-07 14:40:17
