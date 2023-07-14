
> Name

破冰者

> Author

Zero

> Strategy Description

改自 单点狙击高频加仓自动反手解套算法 V1.2 但是不反手，可以单方向做，加了止损. 效果很好, 识货的拿走，看源码. 不多说了.

回测时资金设置在10万以上, 币设置在30以上, 这样才能达到理想效果, 资金越大, 策略抗波动能力越强

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|OpType|0|开仓方向: 做多|做空|
|OpAmount|0.1|开仓数量|
|OpMode|0|开仓方式: 吃单|挂单|
|MaxSpace|0.5|挂单失效距离|
|SlidePrice|0.1|下单滑动价(元)|
|MaxAmount|0.3|开仓最大单次下单量|
|AddGoal|true|加仓间距(元)|
|AddLine|0.8|加仓均价目标(元)|
|ProfitGoal|0.5|平仓目标(元)|
|Interval|true|轮询间隔(秒)|
|RestoreIt|false|恢复进度|
|RestoreType|0|持仓方向: 做多|做空|
|RestorePrice|false|持仓均价|
|RestoreAmount|false|持仓数量|
|RestoreProfit|false|上次盈利|
|SaveLocal|false|保存本地日志|
|StopLoss|8|止损(元)|
|MinStock|0.01|最小交易币数|


> Source (javascript)

``` javascript
var TradeType = null;
var OrgAccount = null;
var Counter = {s : 0, f: 0, m: 0};
var LastProfit = 0;
var AllProfit = 0;
var LastTicker = null;
var maxHold = 0;

function _N(v, precision) {
    if (typeof(precision) != 'number') {
        precision = 4;
    }
    var d = parseFloat(v.toFixed(Math.max(10, precision+5)));
    s = d.toString().split(".");
    if (s.length < 2 || s[1].length <= precision) {
        return d;
    }

    var b = Math.pow(10, precision);
    return Math.floor(d*b)/b;
}

function EnsureCall(e, method) {
    var r;
    while (!(r = e[method].apply(this, Array.prototype.slice.call(arguments).slice(2)))) {
        Sleep(Interval);
    }
    return r;
}

function StripOrders(e, orderId) {
    var order = null;
    if (typeof(orderId) == 'undefined') {
        orderId = null;
    }
    while (true) {
        var dropped = 0;
        var orders = EnsureCall(e, 'GetOrders');
        for (var i = 0; i < orders.length; i++) {
            if (orders[i].Id == orderId) {
                order = orders[i];
            } else {
                var extra = "";
                if (orders[i].DealAmount > 0) {
                    extra = "成交: " + orders[i].DealAmount;
                } else {
                    extra = "未成交";
                }
                e.CancelOrder(orders[i].Id, orders[i].Type == ORDER_TYPE_BUY ? "买单" : "卖单", extra);
                dropped++;
            }
        }
        if (dropped == 0) {
            break;
        }
        Sleep(300);
    }
    return order;
}

function updateProfit(e, account, ticker) {
    if (typeof(account) == 'undefined') {
        account = GetAccount(e);
    }
    if (typeof(ticker) == 'undefined') {
        ticker = EnsureCall(e, "GetTicker");
    }
    var profit = _N(LastProfit + (((account.Stocks + account.FrozenStocks) - (OrgAccount.Stocks + OrgAccount.FrozenStocks)) * ticker.Last) + ((account.Balance + account.FrozenBalance) - (OrgAccount.Balance + OrgAccount.FrozenBalance)), 4);
    LogProfit(profit, "币数:", _N(account.Stocks + account.FrozenStocks, 4), "钱数:", _N(account.Balance + account.FrozenBalance, 4));
    return profit;
}


var preMsg = "";
function GetAccount(e, waitFrozen) {
    if (typeof(waitFrozen) == 'undefined') {
        waitFrozen = false;
    }
    var account = null;
    var alreadyAlert = false;
    while (true) {
        account = EnsureCall(e, "GetAccount");
        if (!waitFrozen || (account.FrozenStocks < MinStock && account.FrozenBalance < 0.01)) {
            break;
        }
        if (!alreadyAlert) {
            alreadyAlert = true;
            Log("发现账户有冻结的钱或币", account);
        }
        Sleep(Interval);
    }
    // TODO Hack
    msg = "成功: " + Counter.s + " 次, 解套: " + Counter.f + " 次, 止损: " + Counter.m + " 次, 最大持仓量: " + _N(maxHold);
    //msg = Counter.s + " / " + Counter.f + " / " + Counter.m;

    if (LastTicker != null && OrgAccount != null) {
        var profit = (((account.Stocks + account.FrozenStocks) - (OrgAccount.Stocks + OrgAccount.FrozenStocks)) * LastTicker.Last) + ((account.Balance + account.FrozenBalance) - (OrgAccount.Balance + OrgAccount.FrozenBalance));
        msg += "\n盈亏: " + AllProfit + ", 浮动: " + _N(profit, 4);
        msg += "\n初始账户 钱: " + OrgAccount.Balance + " 币: " + OrgAccount.Stocks + ", 当前账户 钱: " + _N(account.Balance + account.FrozenBalance) + " 币: " + _N(account.Stocks + account.FrozenStocks);
    }

    if (msg != preMsg) {
        preMsg = msg;
        LogStatus(msg, "#ff0000");
    }
    return account;
}

// mode = 0 : direct buy, 1 : buy as buy1
function Trade(e, tradeType, tradeAmount, mode, slidePrice, maxAmount, maxSpace, retryDelay) {
    var initAccount = GetAccount(e, true);
    var nowAccount = initAccount;
    var orderId = null;
    var prePrice = 0;
    var dealAmount = 0;
    var diffMoney = 0;
    var isFirst = true;
    var tradeFunc = tradeType == ORDER_TYPE_BUY ? e.Buy : e.Sell;
    var isBuy = tradeType == ORDER_TYPE_BUY;
    while (true) {
        var ticker = EnsureCall(e, 'GetTicker');
        LastTicker = ticker;
        var tradePrice = 0;
        if (isBuy) {
            tradePrice = _N((mode == 0 ? ticker.Sell : ticker.Buy) + slidePrice, 4);
        } else {
            tradePrice = _N((mode == 0 ? ticker.Buy : ticker.Sell) - slidePrice, 4);
        }
        if (orderId == null) {
            if (isFirst) {
                isFirst = false;
            } else {
                nowAccount = GetAccount(e, true);
            }
            var doAmount = 0;
            if (isBuy) {
                diffMoney = _N(initAccount.Balance - nowAccount.Balance, 4);
                dealAmount = _N(nowAccount.Stocks - initAccount.Stocks, 4);
                doAmount = Math.min(maxAmount, tradeAmount - dealAmount, _N((nowAccount.Balance-10) / tradePrice, 4));
            } else {
                diffMoney = _N(nowAccount.Balance - initAccount.Balance, 4);
                dealAmount = _N(initAccount.Stocks - nowAccount.Stocks, 4);
                doAmount = Math.min(maxAmount, tradeAmount - dealAmount, nowAccount.Stocks);
            }
            if (doAmount < MinStock) {
                break;
            }
            prePrice = tradePrice;
            orderId = tradeFunc(tradePrice, doAmount);
        } else {
            if (Math.abs(tradePrice - prePrice) > maxSpace) {
                orderId = null;
            }
            var order = StripOrders(exchange, orderId);
            if (order == null) {
                orderId = null;
            }
        }
        Sleep(retryDelay);
    }

    if (dealAmount <= 0) {
        return null;
    }

    return {price: _N(diffMoney / dealAmount, 4), amount: dealAmount};
}

function loop(isFirst) {
    var minStock = MinStock;
    var initAccount = GetAccount(exchange, true);
    Log(initAccount);
    var holdPrice = 0;
    var holdAmount = 0;
    if (RestoreIt && isFirst) {
        LastProfit = RestoreProfit;
        TradeType = RestoreType == 0 ? ORDER_TYPE_BUY : ORDER_TYPE_SELL;
        holdPrice = RestorePrice;
        holdAmount = RestoreAmount;
        if (holdAmount != 0) {
            initAccount = {
                Stocks: initAccount.Stocks,
                FrozenStocks: initAccount.FrozenStocks,
                Balance: initAccount.Balance,
                FrozenBalance: initAccount.FrozenBalance,
            };
            if (RestoreType == 0) {
                initAccount.Stocks -= holdAmount;
                initAccount.Balance += (holdPrice * holdAmount);
            } else {
                initAccount.Stocks += holdAmount;
                initAccount.Balance -= (holdPrice * holdAmount);
            }
            OrgAccount = initAccount;
            Log("恢复持仓状态为:", RestoreType == 0 ? "做多" : "做空", "均价:", holdPrice, "数量:", holdAmount);
            if (RestoreType == 0) {
                holdAmount = Math.min(initAccount.Stocks, holdAmount);
            }
        }
        if (LastProfit != 0) {
            LogProfit(LastProfit, "恢复上次盈利");
        }
    }
    if (holdAmount == 0) {
        var obj = Trade(exchange, TradeType, OpAmount, OpMode, SlidePrice, MaxAmount, MaxSpace, Interval);
        if (!obj) {
            throw "出师不利, 开仓失败";
        } else {
            Log(TradeType == ORDER_TYPE_BUY ? "开多仓完成" : "开空仓完成", "均价:", obj.price, "数量:", obj.amount);
        }
        Log(GetAccount(exchange, true));
        holdPrice = obj.price;
        holdAmount = obj.amount;
    }
    var openFunc = TradeType == ORDER_TYPE_BUY ? exchange.Buy : exchange.Sell;
    var coverFunc = TradeType == ORDER_TYPE_BUY ? exchange.Sell : exchange.Buy;
    var isFinished = false;
    while (!isFinished) {
        var account = GetAccount(exchange, true);
        var openAmount = 0;
        var openPrice = 0;
        var coverPrice = 0;
        var canOpen = true;

        if (TradeType == ORDER_TYPE_BUY) {
            var upLine = AddLine;
            openPrice = _N(holdPrice - AddGoal, 4);
            openAmount = _N((holdAmount * (holdPrice - openPrice - upLine)) / upLine, 4);
            coverPrice = _N(holdPrice + ProfitGoal, 4);
            if (_N(account.Balance / openPrice, 4) < openAmount) {
                Log("没有钱加多仓, 需要加仓: ", openAmount, "个");
                canOpen = false;
            }
        } else {
            var upLine = -AddLine;
            openPrice = _N(holdPrice + AddGoal, 4);
            coverPrice = _N(holdPrice - ProfitGoal, 4);
            openAmount = _N((holdAmount * (holdPrice - openPrice - upLine) / upLine), 4);
            if (account.Stocks < openAmount) {
                Log("没有币加空仓, 需要币:", openAmount);
                canOpen = false;
            }
        }
        if (holdAmount < minStock) {
            Log("剩余币数过小, 放弃操作", holdAmount);
            return 0;
        }
        openAmount = Math.max(minStock, openAmount);

        var order_count = 0;
        var openId = null;
        var coverId = null;
        if (!canOpen) {
            openId = -1;
            Log("进入等待解套模式");
        }

        for (var i = 0; i < 10; i++) {
            if (!openId) {
                openId = openFunc(openPrice, openAmount);
            }
            if (!coverId) {
                coverId = coverFunc(coverPrice, holdAmount);
            }
            if (openId && coverId) {
                break;
            }
            Sleep(Interval);
        }
        if (!openId || !coverId) {
            StripOrders(exchange);
            throw "下单失败";
        }
        if (openId > 0) {
            order_count++;
        }
        if (coverId > 0) {
            order_count++;
        }

        var preAccount = account;
        var loss = null;
        while (true) {
            Sleep(Interval);
            var ticker = EnsureCall(exchange, "GetTicker");
            LastTicker = ticker;
            var floatProfit = Math.abs(ticker.Last - coverPrice) * holdAmount;
            var balance = false;
            if (loss === null) {
                loss = floatProfit;
            } else if (floatProfit - loss > StopLoss) {
                Log("当前浮动盈亏:", floatProfit, "开始止损");
                StripOrders(exchange);
                balance = true;
            }
            var orders = EnsureCall(exchange, "GetOrders");
            var nowAccount = GetAccount(exchange);
            var diff = nowAccount.Stocks + nowAccount.FrozenStocks - preAccount.Stocks;
            if (balance) {
                diff = nowAccount.Stocks + nowAccount.FrozenStocks - OrgAccount.Stocks;
                if (Math.abs(diff) > minStock) {
                    var obj = Trade(exchange, diff > 0 ? ORDER_TYPE_SELL : ORDER_TYPE_BUY, Math.abs(diff), 0, SlidePrice, MaxAmount, MaxSpace, Interval);
                    if (!obj) {
                        throw "止损失败";
                    } else {
                        Log(TradeType == ORDER_TYPE_BUY ? "平空仓完成" : "平多仓完成", "均价:", obj.price, "数量:", obj.amount);
                    }
                }
                nowAccount = GetAccount(exchange);
                AllProfit = updateProfit(exchange, GetAccount(exchange), ticker);
                initAccount = nowAccount;
                isFinished = true;
                Counter.m++;
                break;
            }

            if (orders.length != order_count || Math.abs(diff) >= minStock) {
                StripOrders(exchange);
                nowAccount = GetAccount(exchange, true);
                //Log(nowAccount);
                var diffAmount = nowAccount.Stocks - initAccount.Stocks;
                var diffMoney = nowAccount.Balance - initAccount.Balance;
                if (Math.abs(diffAmount) < minStock) {
                    AllProfit = updateProfit(exchange, nowAccount, ticker);
                    Log("平仓完成, 达到目标盈利点, 单次盈利", _N(holdAmount * ProfitGoal, 4));
                    initAccount = nowAccount;
                    isFinished = true;
                    if (!canOpen) {
                        Counter.f++;
                    }
                    break;
                }
                var newHoldPrice = 0;
                var newHoldAmount = 0;
                if (TradeType == ORDER_TYPE_BUY) {
                    newHoldAmount = _N(diffAmount, 4);
                    newHoldPrice = _N((-diffMoney) / diffAmount, 4);
                } else {
                    newHoldAmount = _N(-diffAmount, 4);
                    newHoldPrice = _N(diffMoney / (-diffAmount), 4);
                }
                // if open again, we need adjust hold positions's price
                var isAdd = false;
                if (newHoldAmount > holdAmount) {
                    holdPrice = newHoldPrice;
                    isAdd = true;
                }
                holdAmount = newHoldAmount;
                maxHold = Math.max(holdAmount, maxHold);
                if (!isAdd) {
                    // reset initAccount
                    initAccount = {
                        Stocks : nowAccount.Stocks,
                        Balance : nowAccount.Balance,
                        FrozenBalance : nowAccount.FrozenBalance,
                        FrozenStocks : nowAccount.FrozenStocks,
                    };
                    if (TradeType == ORDER_TYPE_BUY) {
                        initAccount.Stocks -= holdAmount;
                        initAccount.Balance += holdAmount * holdPrice;
                    } else {
                        initAccount.Stocks += holdAmount;
                        initAccount.Balance -= holdAmount * holdPrice;
                    }
                    initAccount.Stocks = _N(initAccount.Stocks, 4);
                    initAccount.Balance = _N(initAccount.Balance, 4);
                    Log("持仓前账户调整为: ", initAccount);
                }
                Log((TradeType == ORDER_TYPE_BUY ? "多仓" : "空仓"), (isAdd ? "加仓后" : "平仓后"), "重新调整持仓, 均价: ", holdPrice, "数量", holdAmount);
                Log("买一:", ticker.Buy, "卖一:", ticker.Sell, "上次成交价:", ticker.Last);
                Log(nowAccount);
                break;
            }
        }
    }
    return 0;
}

function onexit() {
    StripOrders(exchange);
    Log("Exit");
}

function main() {
    if (AddLine > AddGoal || AddLine <= 0) {
        throw "加仓均价目标错误";
    }
    if (exchange.GetName().indexOf("Future") != -1) {
        throw "只支持现货, 期货容易爆仓, 暂不支持";
    }
    if (exchange.GetRate() != 1) {
        Log("已禁用汇率转换");
        exchange.SetRate(1);
    }
    TradeType = OpType == 0 ? ORDER_TYPE_BUY : ORDER_TYPE_SELL;
    EnableLogLocal(SaveLocal);
    Interval *= 1000;
    SetErrorFilter("502:|503:|unexpected|network|timeout|WSARecv|Connect|GetAddr|no such|reset|http|received|EOF");
    StripOrders(exchange);
    OrgAccount = GetAccount(exchange);
    var isFirst = true;
    LogStatus("启动成功", TradeType);
    while (true) {
        var ret = loop(isFirst);
        isFirst = false;
        Counter.s++;
        Sleep(Interval);
    }
}
```

> Detail

https://www.fmz.com/strategy/9929

> Last Modified

2018-06-05 16:35:53
