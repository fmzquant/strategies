/*
策略出处: https://www.botvs.com/strategy/10744
策略名称: 价值0.418
策略作者: kakababy
策略描述:

设定一个用于投资的资金额度，如10000元。设定一个资金和比特币的价值比例，如50:50。根据现价，一直维持资金和比特币的价值比例。

如初始资金10000元，设定资金和比特币的比例为30:70，在第一次交易时买入7000元比特币（假设币价为1000元，买入7个币），剩余资金为3000元，保持比例为30:70。

下一个交易周期，假设币价变为1500元，则总价值变为1500*7 + 3000= 13500，则应保持手中资金为13500*0.3 = 4050元，则应卖出4050 - 3000 = 1050的比特币，卖出数量为1050/1500 = 0.7个，手中剩余比特币7-0.7=6.3个，币价值为6.3*1500 = 9450。 资金与比特币价值比例为4050:9450 = 30:70。

同理，币价下跌时则买入以保持比例不变。


参数              默认值    描述
--------------  -----  ---------
UseAccount      true   使用帐户内全部资金
InitMoney       10000  初始资金量。
InitStock       5      初始币数。
StockRatio      0.418  币价值占总价值比例
InvestInterval  true   投资间隔。
ErrorInterval   300    出错重试间隔。
SlidePrice      0.01   滑点
*/

var initAccount = null;
var initPrice = 0;
var stockHold = 0;
var moneyHold = 0;
var lastOrderID = null;
var prices = [];

function AdjustFloat(v) {
    return Math.floor(v * 1000) / 1000;
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

function GetOrders() {
    var orders = null;
    while (!(orders = exchange.GetOrders())) {
        Log('Get Orders Error');
        Sleep(ErrorInterval);
    }
    return orders;
}

function CancelPendingOrders() {
    while (true) {
        var orders = GetOrders();
        if (orders.length === 0) {
            return;
        }

        for (var i = 0; i < orders.length; i++) {
            exchange.CancelOrder(orders[i].Id);
            if (i < (orders.length - 1)) {
                Sleep(ErrorInterval);
            }
        }
    }
}

function GetStatus() {
    var price = GetCurrentPrice();
    var initStockValue = InitStock + InitMoney / initPrice;
    var initMoneyValue = InitMoney + InitStock * initPrice;
    var stockValueNow = stockHold + moneyHold / price;
    var moneyValueNow = stockHold * price + moneyHold;
    var stockEarned = stockValueNow - initStockValue;
    var moneyEarned = moneyValueNow - initMoneyValue;
    var averagePrice = 0;
    var alpha = (stockHold - InitStock) * (price - initPrice);
    var beta = moneyEarned - alpha;

    var sum = 0;
    if (prices.length > 0) {
        for (var i = prices.length - 1; i >= 0; i--) {
            sum += prices[i];
        }
        averagePrice = sum / prices.length;
    }

    var logString = 'Stock Holding:' + AdjustFloat(stockHold) + '\n';
    logString += 'Money Holding:' + AdjustFloat(moneyHold) + '\n';
    logString += 'Stock Earned:' + AdjustFloat(stockEarned) + '\n';
    logString += 'Money Earned:' + AdjustFloat(moneyEarned) + '\n';
    logString += 'History Average price:' + averagePrice + '\n';
    logString += 'Current Price:' + price + '\n';
    logString += 'Alpha:' + alpha + '\n';
    logString += 'Beta:' + beta;

    LogProfit(moneyEarned);

    return logString;
}

function CaculateHoldings() {
    CancelPendingOrders();

    if (lastOrderID) {
        var order = exchange.GetOrder(lastOrderID);
        Log('last order:', order);
        if (order.Status === ORDER_STATE_CLOSED) {
            if (order.Type === ORDER_TYPE_BUY) { //Buy
                stockHold += order.DealAmount;
                moneyHold -= order.DealAmount * order.Price;
                Log("Order Buy. stockHold +=:", order.DealAmount, ',Money -=:', order.DealAmount * order.Price);
            } else { //Sell
                stockHold -= order.DealAmount;
                moneyHold += order.DealAmount * order.Price;
                Log("Order Sell. stockHold -=:", order.DealAmount, ',Money +=:', order.DealAmount * order.Price);
            }
        }
    }
}

function OnTick() {
    var currentPrice = GetCurrentPrice();
    prices.push(currentPrice);
    //Log('History prices:',prices);

    var stockValue = 0;
    var totalValue = 0;
    var ratio = 0;

    stockValue = stockHold * currentPrice;
    totalValue = stockValue + moneyHold;

    ratio = stockValue / totalValue;
    Log('Current Price:', currentPrice);
    Log('stockHold:', stockHold);
    Log('moneyHold:', moneyHold);
    Log('stockValue:', stockValue);
    Log('Current Ratio:', ratio);

    if (ratio > StockRatio) { //Sell
        Log('Current ratio > StockRatio');
        var sellAmt = (stockValue - totalValue * StockRatio) / (currentPrice - SlidePrice);
        lastOrderID = exchange.Sell(currentPrice - SlidePrice, sellAmt);
    } else { //Buy
        Log('Current ratio < StockRatio');
        var buyAmt = (totalValue * StockRatio - stockValue) / (currentPrice + SlidePrice);
        lastOrderID = exchange.Buy(currentPrice + SlidePrice, buyAmt);
    }
    Log('Order ID:', lastOrderID);
    CaculateHoldings();

}

function main() {
    if (InitStock < 0) {
        Log('Stock less than zero.');
        return;
    }

    if (InitMoney < 0) {
        Log('Money less than zero.');
    }

    //if(InvestInterval < 0){
    //    Log('InvestInterval less than zero.');
    //}

    if (ErrorInterval < 0) {
        Log('ErrorInterval less than zero.');
    }

    if (StockRatio < 0 || StockRatio > 1) {
        Log('StockRatio should be a number from 0 to 1.');
    }

    EnableLogLocal(true);
    SetFailover(true);
    exchange.IO("websocket");

    Log(exchange.GetName(), exchange.GetCurrency());

    initAccount = _G('InitAccount');
    if (initAccount === null) {
        initAccount = GetAccount();
        _G('InitAccount', initAccount);
    }
    Log('InitAccount', initAccount);

    initPrice = _G('InitPrice');
    if (initPrice === null) {
        initPrice = GetCurrentPrice();
        _G('InitPrice', initPrice);
    }
    Log('InitPrice', initPrice);

    if (UseAccount) {
        InitMoney = initAccount.Balance + initAccount.FrozenBalance;
        InitStock = initAccount.Stocks + initAccount.FrozenStocks;
    }
    Log('InitMoney:', InitMoney);
    Log('InitStock:', InitStock);

    stockHold = _G('StockHold');
    if (stockHold === null) {
        stockHold = InitStock;
        Log('Set Stock Hold', stockHold);
    }

    moneyHold = _G('MoneyHold');
    if (moneyHold === null) {
        moneyHold = InitMoney;
        Log('Set Money Hold', moneyHold);
    }

    if (_G('Prices') !== null) {
        prices = _G('Prices');
    }

    while (true) {
        OnTick();
        LogStatus(GetStatus());
        Sleep(InvestInterval * 1000 * 60);
    }
}

function onexit() {
    _G('StockHold', stockHold);
    _G('MoneyHold', moneyHold);
    //_G('Prices',prices);
    Log('Set Stock Hold', stockHold);
    Log('Set Money Hold', moneyHold);
    Log('Set prices:', prices);
    Log('Robot Stopped!#ff0000@');
}
