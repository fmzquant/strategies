/*
策略出处: https://www.botvs.com/strategy/747
策略名称: 计划委托卖出
策略作者: Zero
策略描述:

计划委托卖出, 在价格涨超或者跌破指定的价格后进行卖出操作, 如果使用市价单，只需要填写卖出数量，如果限价单，需要指定卖出价格


参数            默认值    描述
------------  -----  -------------
OpType        0      下单类型: 市价单|限价单
TriggerPrice  2600   触发价格
SellPrice     2610   限价单 - 卖出价格
SellAmount    3      卖出数量
LoopInterval  true   检测间隔(秒)
*/


var InitPrice = 0;
var Interval = 300;
var UseMarketOrder = (OpType == 0);

function _N(v, precision) {
    if (typeof(precision) != 'number') {
        precision = 4;
    }
    var s = v.toString().split(".");
    if (s.length < 2 || s[1].length <= precision) {
        return v;
    }
    var b = Math.pow(10, precision);
    return Math.floor(parseFloat(v.toFixed(Math.min(20, precision+10)))*b)/b;
}

function GetTicker() {
    var ticker;
    while (!(ticker = exchange.GetTicker())) {
        Sleep(Interval);
    }
    return ticker;
}


function GetDepth(e) {
    if (typeof(e) == 'undefined') {
        e = exchange;
    }
    var depth;
    while (true) {
        depth = e.GetDepth();
        if (depth && depth.Asks.length > 0 && depth.Bids.length > 0 && depth.Asks[0].Price > depth.Bids[0].Price) {
            break;
        }
        Sleep(Interval);
    }
    return depth;
}

function GetTickerFromDepth(e) {
    var depth = GetDepth(e);
    return {Buy : depth.Bids[0].Price, Sell : depth.Asks[0].Price, BuyAmount: depth.Bids[0].Amount, SellAmount: depth.Asks[0].Amount, depth: depth};
}

function GetOrders() {
    var orders;
    while (!(orders = exchange.GetOrders())) {
        Sleep(Interval);
    }
    return orders;
}

function GetAccount() {
    var account;
    while (!(account = exchange.GetAccount())) {
        Sleep(Interval);
    }
    return account;
}


function cancelPending() {
    var ret = false;
    while (true) {
        var orders = GetOrders();
        if (orders.length == 0) {
            break;
        }
        for (var j = 0; j < orders.length; j++) {
            exchange.CancelOrder(orders[j].Id, orders[j]);
            ret = true;
        }
    }
    return ret;
}

function ensureSell() {
    var account = GetAccount();
    var initAccount = account;
    var minStock = exchange.GetMinStock();
    var isfirst = true;
    while (true) {
        cancelPending();
        if (!isfirst) {
            account = GetAccount();
        }
        isfirst = false;
        var needSell = _N(SellAmount - (initAccount.Stocks - account.Stocks));
        var ticker = GetTickerFromDepth();
        var price = _N(ticker.Buy);
        var amount = Math.min(ticker.BuyAmount, needSell);
        if (needSell < minStock) {
            Log('计划委托完成');
            break;
        }
        exchange.Sell(price, amount);
        Sleep(100);
    }
    return _N((account.Balance - initAccount.Balance) / SellAmount);
}

function SellIt() {
    if (UseMarketOrder) {
        var avgPrice = ensureSell();
        Log("市价单卖单完成, 均价: ", avgPrice);
    } else {
        var success = false;
        for (var i = 0; i < 20; i++) {
            if (exchange.Sell(SellPrice, SellAmount) > 0) {
                success = true;
                break;
            }
            Sleep(Interval);
        }
        Log(success ? "限价单挂单完成" : "限价单下单失败");
    }
}

function onTick() {
    var doIt = false;
    var ticker = GetTicker();
    if (InitPrice > TriggerPrice && ticker.Last < TriggerPrice) {
        Log('价格跌破 ', TriggerPrice, '元, 开始按计划卖出');
        SellIt();
        doIt = true;
    } else if (InitPrice < TriggerPrice && ticker.Last > TriggerPrice) {
        Log('价格涨超 ', TriggerPrice, '元, 开始按计划卖出');
        SellIt();
        doIt = true;
    }
    return doIt;
}

function main() {
    var account = GetAccount();
    var ticker = GetTicker();
    Log('当前账户: ', account);
    if (account.Stocks < SellAmount) {
        throw "账户没有足够的币卖出";
    }
    
    InitPrice = ticker.Last;
    
    if (UseMarketOrder) {
        msg = '时使用市价卖出 ' + SellAmount + ' 个 ' + exchange.GetCurrency();
    } else {
        msg = '时使用限价 ' + SellPrice + ' 卖出 ' + SellAmount + '个 ' + exchange.GetCurrency();
    }
    
    Log('当前价格: ', InitPrice, ticker.Last > TriggerPrice ? '价格跌破' : '价格涨超', TriggerPrice, msg);
    
    while (!onTick()) {
        Sleep(LoopInterval * 1000);
    }
}

