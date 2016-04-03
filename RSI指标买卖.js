/*
策略出处: https://www.botvs.com/strategy/31
策略名称: RSI指标买卖
策略作者: Zero
策略描述:

RSI简单买卖测试, 默认 70-100卖出,0-30买入


参数          默认值    描述
----------  -----  ---------
RSIPeriod   14     RSI周期
SlidePrice  0.3    下单滑动值
RSIBuyL     false  RSI买入点(低)
RSIBuyH     30     RSI买入点(高)
RSISellL    70     RSI卖出点(低)
RSISellH    100    RSI卖出点(高)
Interval    1000   出错重试(毫秒)
*/

function adjustFloat(v) {
    return Math.floor(v*1000)/1000;
}

function cancelPendingOrders() {
    while (true) {
        var orders = exchange.GetOrders();
        if (orders) {
            if (orders.length == 0) {
                break;
            }
            for (var j = 0; j < orders.length; j++) {
                exchange.CancelOrder(orders[j].Id);
                Sleep(Interval);
            }
        } else {
            Sleep(Interval);
        }
    }
}

var STATE_WAIT_BUY      = 0;
var STATE_WAIT_SELL     = 1;
var STATE_BUY           = 2;
var STATE_SELL          = 3;
var STATE_WAIT_SELL_ALL = 4;


var State = STATE_WAIT_BUY;

var InitAccount;

function MustGetAccount() {
    var account;
    while (!(account = exchange.GetAccount())) {
        Sleep(2000);
    }
    return account;
}

function onTick(exchange) {
    var records = exchange.GetRecords();
    if (!records || records.length < (RSIPeriod + 5)) {
        return;
    }

    rsi = TA.RSI(records, RSIPeriod);
    var rsiValue = rsi[records.length - 1];
    if (State == STATE_WAIT_BUY && rsiValue >= RSIBuyL && rsiValue <= RSIBuyH) {
        State = STATE_BUY;
    } else if (State == STATE_WAIT_SELL && rsiValue >= RSISellL && rsiValue <= RSISellH) {
        State = STATE_SELL;
    } else if (State != STATE_WAIT_SELL_ALL){
        return;
    }
    
    // Buy or Sell, Cancel pending orders first
    cancelPendingOrders();
    
    var account = MustGetAccount();
    var ticker = exchange.GetTicker();
    if (!account || !ticker) {
        return;
    }
    
    if (State == STATE_BUY) {
        var price = ticker.Last + SlidePrice;
        var amount = adjustFloat(account.Balance / price);
        if (amount >= exchange.GetMinStock()) {
            if (exchange.Buy(price, amount)) {
                State = STATE_WAIT_SELL;
            }
        }
    } else {
        if (account.Stocks > exchange.GetMinStock()) {
            // STATE_WAIT_SELL or STATE_WAIT_SELL_ALL
            State = STATE_WAIT_SELL_ALL;
            exchange.Sell(ticker.Last - SlidePrice, account.Stocks);
        } else {
            // No stocks, wait buy and log profit
            LogProfit(account.Balance - InitAccount.Balance);
            Log(account);
            State = STATE_WAIT_BUY;
        }
    }
}

function main() {
    InitAccount = MustGetAccount();
    Log(InitAccount);
    if (InitAccount.Stocks > 0) {
        throw "必须空仓介入";
        return;
    }
    
    while (true) {
        onTick(exchange);
        Sleep(30000);
    }
}
