
> Name

Value-0418

> Author

kakababy

> Strategy Description
Set an investment capital amount, such as 10,000 yuan. Then set a target value ratio between cash and Bitcoin, such as 50:50. Based on the current price, the strategy continuously maintains that value ratio between cash and Bitcoin.

For example, with an initial capital of 10,000 yuan and a cash-to-Bitcoin ratio of 30:70, the first trade buys 7,000 yuan worth of Bitcoin. Assuming the coin price is 1,000 yuan, that equals 7 coins. The remaining cash is 3,000 yuan, keeping the ratio at 30:70.

In the next trading cycle, assume the coin price rises to 1,500 yuan. The total value becomes 1,500 × 7 + 3,000 = 13,500 yuan. Cash should then be maintained at 13,500 × 0.3 = 4,050 yuan, so the strategy should sell Bitcoin worth 4,050 - 3,000 = 1,050 yuan, or 1,050 / 1,500 = 0.7 coins. The remaining Bitcoin position is 7 - 0.7 = 6.3 coins, worth 6.3 × 1,500 = 9,450 yuan. The cash-to-Bitcoin value ratio is again 4,050:9,450 = 30:70.

Likewise, when the coin price falls, the strategy buys Bitcoin to keep the ratio unchanged.
> Strategy Arguments
|Argument|Default|Description|
|----|----|----|
|UseAccount|true|Use all funds in the account|
|InitMoney|10000|Initial cash amount.|
|InitStock|5|Initial coin amount.|
|StockRatio|0.418|Coin value as a proportion of total value|
|InvestInterval|true|Investment interval.|
|ErrorInterval|300|Retry interval after an error.|
|SlidePrice|0.01|Slippage|
> Source (javascript)

``` javascript
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
```

> Detail

https://www.fmz.com/strategy/10744

> Last Modified

2016-02-14 00:09:10
