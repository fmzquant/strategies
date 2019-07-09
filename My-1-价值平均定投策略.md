
> 策略名称

My-1-价值平均定投策略

> 策略作者

Lizza

> 策略描述

实盘：https://www.fmz.com/m/robot/26018
这个策略适合长期看好比特币的脑残粉，使用价值平均策略来进行定投，可以有效的抵抗市场波动。（关于价值平均定投请度娘。）

基本的思路是先想好每个月想要投入多少钱（策略变量：MoneyEveryMonth），然后决定多久交易一次，交易的间隔不建议小于5分钟（策略参数：InvestInternal）。

以下用一个实例说明策略思路和买卖时机：
假设每月想要买入价值72000元人民币的比特币(便于计算)，每个小时交易一次，就是计划每个月交易24*30＝720次，每次计划投入的资金价值为72000/720=100元（变量A）。

小时B，当时价格C，已投入资金D，已买入币数E，现在币价值F，本次投入资金G，     本次买入币数H
1      400     0            0           C*E=0         A*B-F=100         G/C=0.25                   
2      200     100          0.25        200*0.25=50   100*2-50=150      0.75
3     1000     250          1           1000          100*3-1000=-700   -0.7
4     500      -550         0.3         150           100*4-150=250      0.5

最终的结果，投入资金300，买入0.8个比特币（价值400元），平均价格375元。

说明：程序会每次检查账户内的资金和比特币与启动时的差额，以此计算每次需要购买的数量，因此不要用其他机器人公用一个帐户，也不要手工进行买入卖出的操作。如果在交易所有充值和体现，应该在程序互动部分填入，否则程序计算会错误。

> 策略参数



|参数|默认值|描述|
|----|----|----|
|ErrorInterval|2000|出错重试(毫秒)|
|InvestInternal|15|投资间隔（按照分钟计算）|
|MoneyEveryMonth|5000|每月要投资的资金量|
|SlidePrice|0.05|购买时滑点|




|按钮|默认值|描述|
|----|----|----|
|Pause|__button__|暂停交易|
|Continue|__button__|继续交易|
|MoneyChange|false|纪录资金充值或提现|
|StockChange|false|纪录数字货币充值或提现|


> 源码 (javascript)

``` javascript
var initAccount;
var startTime; //unix timestamp
var pause = false; //pause execution of strategy or continue
var moneyDeposit = 0; // positive means deposit, negative means withdraw
var sotckDeposit = 0; // positive means deposit, negative means withdraw

function AdjustFloat(v) {
    return Math.floor(v * 1000)/1000;
}

function GetAccount() {
    var account = null;
    while (!(account = exchange.GetAccount())) {
        Log('Get Account Error');
        Sleep(ErrorInterval);
    }
    return account;
}

function GetCurrentPrice() {
    var ticker = null;
    while (!(ticker = exchange.GetTicker())) {
        Log('Get Ticker Error');
        Sleep(ErrorInterval);
    }
    return AdjustFloat(ticker.Last);
}

function GetOrders(){
    var orders = null;
    while (!(orders = exchange.GetOrders())) {
        Log('Get Orders Error');
        Sleep(ErrorInterval);
    }
    return orders;
}

function CancelPendingOrders() {
    while(true){
        var orders = GetOrders();
        if (orders.length === 0) {
            return;
        }

        for (var i = 0; i < orders.length; i++) {
            exchange.CancelOrder(orders[i].Id);
            if (i < (orders.length-1)) {
                Sleep(ErrorInterval);
            }
        }
    }
}

function ProcessCommand() {
    var command = GetCommand();

    if (command !== null) {
        Log('command:', command);
        if (command === 'pause') {
            pause = true;
        }
        if (command === 'Continue') {
            pause = false;
        }
        if(command.indexOf('MoneyChange:') === 0){
            moneyDeposit += parseFloat(command.replace("MoneyChange:", ""));
            Log('Deposit Money:', moneyDeposit);
        }
        if(command.indexOf('StockChange:') === 0){
            stockDeposit += parseFloat(command.replace("StockChange:", ""));
            Log('Deposit Stock:',stockDeposit);
        }
    }
}

function CaculateMoneyToInvest(currentPrice,investCount)
{
    var moneyEveryInvest = MoneyEveryMonth * InvestInternal / (30 * 24 * 60);
    var totalStockInvested = 0.0;
    var totalMoneyInvested = 0.0;
    var totalValueInvested = 0.0;
    var moneyToInvestThisTime = 0.0;

    CancelPendingOrders();
    var accountNow = GetAccount();
    totalMoneyInvested = initAccount.Balance + initAccount.FrozenBalance + moneyDeposit - accountNow.Balance - accountNow.FrozenBalance;
    totalStockInvested = accountNow.Stocks + accountNow.FrozenStocks - initAccount.Stocks - initAccount.FrozenStocks - stockDeposit;

    Log('Total Money Invested:',totalMoneyInvested);
    Log('Total Stock Invested:',totalStockInvested);

    totalValueInvested = AdjustFloat(totalStockInvested * currentPrice);
    Log('Total Value Invested:',totalValueInvested);

    var averagePrice = 0;
    if(totalStockInvested !== 0){
        averagePrice = AdjustFloat(totalMoneyInvested / totalStockInvested);
    }

    moneyToInvestThisTime = AdjustFloat(moneyEveryInvest * investCount - totalValueInvested);
    Log('Money to Invest This Time:', moneyToInvestThisTime);

    var profit = totalValueInvested - totalMoneyInvested;
    var totalValueNow = (accountNow.Stocks + accountNow.FrozenStocks) * currentPrice + accountNow.Balance + accountNow.FrozenBalance;
    LogStatus('Account Value Now:' + totalValueNow + '\n' + 'Count:',investCount,'  Money:', totalMoneyInvested, 'Stock:', totalStockInvested, 'Average:', averagePrice,'Profit:',profit);
    LogProfit(profit);

    return moneyToInvestThisTime;
}

function onTick(investCount) {
    var currentPrice = GetCurrentPrice();
    Log('Current Price', currentPrice);

    var moneyToInvestThisTime = CaculateMoneyToInvest(currentPrice,investCount);
    var stockToInvestThisTime = 0;
    if(moneyToInvestThisTime > 0){ //Buy
        stockToInvestThisTime = AdjustFloat(moneyToInvestThisTime / (currentPrice + SlidePrice));
    }else{ //Sell
        stockToInvestThisTime = AdjustFloat(moneyToInvestThisTime / (currentPrice - SlidePrice));
    }

    var minPrice = exchange.GetMinPrice();
    if(Math.abs(moneyToInvestThisTime) < minPrice){
        Log('Invest Less Than MinPrice:', minPrice);
        return;
    }

    var minStock = exchange.GetMinStock();
    if(Math.abs(stockToInvestThisTime) < minStock){
        Log('Invest Less Than MinStock:',minStock);
        return;
    }

    var account = GetAccount();
    if(stockToInvestThisTime > 0){ //Buy
        if(account.Balance < moneyToInvestThisTime){
            Log('Money not Enough.#ff0000@');
            return;
        }
    }else{ //Sell
        if(account.Stocks < Math.abs(stockToInvestThisTime)){
            Log('Stock not Enough.#ff0000@');
            return;
        }
    }

    var orderID = -1;
    if(stockToInvestThisTime > 0){ //Buy
        Log('Buy Stock:',stockToInvestThisTime);
        orderID = exchange.Buy(currentPrice + SlidePrice,stockToInvestThisTime);
    }

    if(stockToInvestThisTime < 0){ //Sell
        Log('Sell Stock:',Math.abs(stockToInvestThisTime));
        orderID = exchange.Sell(currentPrice - SlidePrice,Math.abs(stockToInvestThisTime));
    }


}

function main() {
    //exchange.IO("websocket");
    initAccount = _G('InitAccount');
    if(initAccount === null){
        initAccount = GetAccount();
        _G('InitAccount',initAccount);
        Log('Set Init account.');
        Log(exchange.GetName(), exchange.GetCurrency(), initAccount);
    }
    else{
        Log('Read Init Account:', initAccount);
    }

    startTime = _G('StartTime');
    if(startTime === null){
        startTime = new Date().getTime();
        _G('StartTime',startTime);
        Log('Set Start Time:', startTime);
    }else{
        Log('Read Start Time',new Date().setTime(startTime));
    }

    var investCount = _G('InvestCount' );
    if(investCount === null){
        investCount = 1;
        Log('Set Invest Starting from Count 1.');
    }
    else{
        Log('Invest Continuing from:', investCount);
    }

    moneyDeposit = _G('MoneyDeposit');
    if(moneyDeposit === null){
        moneyDeposit = 0;
        Log('Set Money Deposit 0.');
    }
    else{
        Log('Read Money Deposit:', moneyDeposit);
    }

    stockDeposit = _G('StockDeposit');
    if(stockDeposit === null){
        stockDeposit = 0;
        Log('Set Stock Deposit 0.');
    }
    else{
        Log('Read Stock Deposit:', stockDeposit);
    }

    while (true) {
        ProcessCommand();
        if (!pause) {
            Log('=================================================');
            Log('Invest Count', investCount);
            onTick(investCount);
            investCount += 1;
            _G('InvestCount',investCount);
        }
        Sleep(InvestInternal * 1000 * 60);
    }
}

function onexit(){
    _G('MoneyDeposit',moneyDeposit);
    _G('StockDeposit', stockDeposit);

    Log('Robot Stopped!#ff0000@');
}
```

> 策略出处

https://www.fmz.com/strategy/8602

> 更新时间

2016-06-14 10:42:59
