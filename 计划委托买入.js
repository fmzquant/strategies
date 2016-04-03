/*
策略出处: https://www.botvs.com/strategy/638
策略名称: 计划委托买入
策略作者: Zero
策略描述:

计划委托买入, 在价格涨超或者跌破指定的价格后进行买入操作, 如果使用市价单，只写购买金额就可以了，如果限价单，需要指定限价单的价格和个数


参数                 默认值  描述
---------------  -----  -------------
OpType               0  下单类型: 市价单|限价单
TriggerPrice      2600  触发价格
MarketUsedMoney  10000  市价单 - 购买金额
BuyPrice          2610  限价单 - 买入价格
BuyAmount            3  限价单 - 买入数量
LoopInterval       200  检测间隔(豪秒)
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
    return Math.floor(parseFloat(v.toFixed(Math.min(10, precision+5)))*b)/b;
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

function ensureBuy() {
    var account = GetAccount();
    var initAccount = account;
    var minStock = exchange.GetMinStock();
    var isfirst = true;
    var c = 0;
    while (true) {
        cancelPending();
        if (!isfirst) {
            account = GetAccount();
        }
        isfirst = false;
        var needCost = _N(MarketUsedMoney - (initAccount.Balance - account.Balance));
        var ticker = GetTickerFromDepth();
        var price = _N(ticker.Sell);
        var amount = Math.min(ticker.SellAmount, _N(needCost / price));
        if (_N(needCost / price) < minStock) {
            Log('计划委托完成');
            break;
        }
        exchange.Buy(price, amount);
        Sleep(100);
    }
    var realBuy = _N(account.Stocks - initAccount.Stocks);
    return realBuy > 0 ? _N((initAccount.Balance - account.Balance) / realBuy) : 0;
}

function BuyIt() {
    if (UseMarketOrder) {
        var avgPrice = ensureBuy();
        Log("市价单买单完成, 均价: ", avgPrice);
    } else {
        var success = false;
        for (var i = 0; i < 20; i++) {
            if (exchange.Buy(BuyPrice, BuyAmount) > 0) {
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
        Log('价格跌破 ', TriggerPrice, '元, 开始按计划买入');
        BuyIt();
        doIt = true;
    } else if (InitPrice < TriggerPrice && ticker.Last > TriggerPrice) {
        Log('价格涨超 ', TriggerPrice, '元, 开始按计划买入');
        BuyIt();
        doIt = true;
    }
    return doIt;
}

function main() {
    var account = GetAccount();
    var ticker = GetTicker();
    Log('当前账户: ', account);
    if (account.Balance < (UseMarketOrder ? MarketUsedMoney : (BuyPrice * BuyAmount))) {
        throw "账户没有足够的钱买来币";
    }
    
    InitPrice = ticker.Last;
    
    if (UseMarketOrder) {
        msg = '时使用市价买入 ' + MarketUsedMoney + ' 元的 ' + exchange.GetCurrency();
    } else {
        msg = '时使用限价 ' + BuyPrice + ' 买入 ' + BuyAmount + '个 ' + exchange.GetCurrency();
    }
    
    Log('当前价格: ', InitPrice, ticker.Last > TriggerPrice ? '价格跌破' : '价格涨超', TriggerPrice, msg);
    
    while (!onTick()) {
        Sleep(LoopInterval);
    }
}

