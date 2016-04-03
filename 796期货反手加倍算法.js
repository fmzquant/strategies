/*
策略出处: https://www.botvs.com/strategy/3648
策略名称: 796期货反手加倍算法
策略作者: Zero
策略描述:

796期货反手加倍算法, 先开空或多, 也可以指定失败了继续上次方向, 如果失败了就按指定倍数加仓, 策略有风险, 仅限学习使用.


参数           默认值    描述
-----------  -----  -----------
MarginIdx    0      杠杆大小: 10|20
OpType       0      开仓方向: 做多|做空
OpAmount     0.1    开仓数量
OpMode       0      开仓方式: 吃单|挂单
MaxSpace     0.5    挂单失效距离
SlidePrice   0.1    下单滑动价(元)
StopProfit   0.2    止赢(百分比)
StopLoss     0.1    止损(百分比)
ReverseRate  2      反手加仓倍数
MaxLoss      10     最多反手次数
ReverseMode  0      反手模式: 反仓|顺仓
SaveLocal    false  保存本地日志
Interval     true   轮询间隔(秒)
*/


var MarginLevel = [10,20][MarginIdx];
var FirstTradeType = [ORDER_TYPE_BUY, ORDER_TYPE_SELL][OpType];
var OrgAccount = null;
var Counter = {s : 0, f: 0};
var LastProfit = 0;
var AllProfit = 0;
var _IsBTC = false;
var _Failed = 0;

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
                e.SetDirection(orders[i].Type == ORDER_TYPE_BUY ? "buy" : "sell");
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


var preMsg = "";
function GetAccount(e, waitFrozen) {
    if (typeof(waitFrozen) == 'undefined') {
        waitFrozen = false;
    }
    var account = null;
    var alreadyAlert = false;
    while (true) {
        account = EnsureCall(e, "GetAccount");
        if (!waitFrozen || account.FrozenStocks < e.GetMinStock()) {
            break;
        }
        if (!alreadyAlert) {
            alreadyAlert = true;
            Log("发现账户有冻结的钱或币", account);
        }
        Sleep(Interval);
    }
    msg = "成功: " + Counter.s + " 次, 失败: " + Counter.f + " 次, 当前账户 币: " + account.Stocks;
    if (account.FrozenStocks > 0) {
        msg += " 冻结的币: " + account.FrozenStocks;
    }

    if (msg != preMsg) {
        preMsg = msg;
        LogStatus(msg, "#ff0000");
    }
    return account;
}

function GetPosition(e, orderType) {
    var positions = EnsureCall(e, 'GetPosition');
    if (typeof(orderType) == 'undefined') {
        return positions;
    }
    for (var i = 0; i < positions.length; i++) {
        if (positions[i].Type == orderType) {
            return positions[i];
        }
    }
    return null;
}

function GetTicker(e) {
    while (true) {
        var ticker = EnsureCall(e, 'GetTicker');
        if (ticker.Buy > 0 && ticker.Sell > 0 && ticker.Sell > ticker.Buy) {
            return ticker;
        }
        Sleep(100);
    }
}
// mode = 0 : direct buy, 1 : buy as buy1
function Trade(e, tradeType, tradeAmount, mode, slidePrice, maxSpace, retryDelay) {
    var initPosition = GetPosition(e, tradeType);
    var nowPosition = initPosition;
    var orderId = null;
    var prePrice = 0;
    var dealAmount = 0;
    var diffMoney = 0;
    var isFirst = true;
    var tradeFunc = tradeType == ORDER_TYPE_BUY ? e.Buy : e.Sell;
    var isBuy = tradeType == ORDER_TYPE_BUY;
    while (true) {
        var account = EnsureCall(e, 'GetAccount');
        var ticker = GetTicker(e);
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
                nowPosition = GetPosition(e, tradeType);
            }
            dealAmount = _N((nowPosition ? nowPosition.Amount : 0) - (initPosition ? initPosition.Amount : 0), 6);
            var doAmount = Math.min(tradeAmount - dealAmount, account.Stocks * MarginLevel, 4);
            if (doAmount < e.GetMinStock()) {
                break;
            }
            prePrice = tradePrice;
            e.SetDirection(tradeType == ORDER_TYPE_BUY ? "buy" : "sell");
            orderId = tradeFunc(tradePrice, doAmount);
        } else {
            if (mode == 0 || Math.abs(tradePrice - prePrice) > maxSpace) {
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

    return nowPosition;
}

function coverFutures(e, orderType) {
    var coverAmount = 0;
    while (true) {
        var positions = EnsureCall(e, 'GetPosition');
        var ticker = GetTicker(e);
        var found = 0;
        for (var i = 0; i < positions.length; i++) {
            if (positions[i].Type == orderType) {
                if (coverAmount == 0) {
                    coverAmount = positions[i].Amount;
                }
                if (positions[i].Type == ORDER_TYPE_BUY) {
                    e.SetDirection("closebuy");
                    e.Sell(ticker.Buy, positions[i].Amount);
                } else {
                    e.SetDirection("closesell");
                    e.Buy(ticker.Sell, positions[i].Amount);
                }
                found++;
            }
        }
        if (found == 0) {
            break;
        }
        Sleep(2000);
        StripOrders(e);
    }
    return coverAmount;
}


function loop(pos) {
    var tradeType = null;
    if (typeof(pos) == 'undefined' || !pos) {
        tradeType = FirstTradeType;
        pos = Trade(exchange, tradeType, OpAmount, OpMode, SlidePrice, MaxSpace, Interval);
        if (!pos) {
            throw "出师不利, 开仓失败";
        } else {
            Log(tradeType == ORDER_TYPE_BUY ? "开多仓完成" : "开空仓完成", "均价:", pos.Price, "数量:", pos.Amount);
        }
    } else {
        tradeType = pos.Type;
    }
    var holdPrice = pos.Price;
    var holdAmount = pos.Amount;

    var openFunc = tradeType == ORDER_TYPE_BUY ? exchange.Buy : exchange.Sell;
    var coverFunc = tradeType == ORDER_TYPE_BUY ? exchange.Sell : exchange.Buy;

    var reversePrice = 0;
    var coverPrice = 0;
    var canOpen = true;

    if (tradeType == ORDER_TYPE_BUY) {
        reversePrice = _N(holdPrice * (1 - StopLoss), 4);
        coverPrice = _N(holdPrice * (1 + StopProfit), 4);
    } else {
        reversePrice = _N(holdPrice * (1 + StopLoss), 4);
        coverPrice = _N(holdPrice * (1 - StopProfit), 4);
    }

    var coverId = null;
    var msg = "持仓价: " + holdPrice + " 止损价: " + reversePrice;

    for (var i = 0; i < 10; i++) {
        if (coverId) {
            break;
        }
        if (tradeType == ORDER_TYPE_BUY) {
            exchange.SetDirection("closebuy");
            coverId = exchange.Sell(coverPrice, holdAmount, msg);
        } else {
            exchange.SetDirection("closesell");
            coverId = exchange.Buy(coverPrice, holdAmount, msg);
        }

        Sleep(Interval);
    }

    if (!coverId) {
        StripOrders(exchange);
        throw "下单失败";
    }


    while (true) {
        Sleep(Interval);
        var ticker = GetTicker(exchange);
        if ((tradeType == ORDER_TYPE_BUY && ticker.Last < reversePrice) || (tradeType == ORDER_TYPE_SELL && ticker.Last > reversePrice)) {
            StripOrders(exchange);
            var coverAmount = coverFutures(exchange, tradeType);
            if (_Failed >= MaxLoss) {
                Counter.f++;
                Log("超过最大失败次数", MaxLoss);
                break;
            }
            var reverseAmount = _N(coverAmount * ReverseRate, 4);

            var account = GetAccount(exchange, true);
            if (_N(account.Stocks * MarginLevel, 4) < reverseAmount) {
                Log("没有币反手开仓, 需要开仓: ", reverseAmount, "个, 只有", account.Stocks, "个币");
                Counter.f++;
                break;
            }
            var reverseType = tradeType;
            if (ReverseMode == 0) {
                reverseType = tradeType == ORDER_TYPE_BUY ? ORDER_TYPE_SELL : ORDER_TYPE_BUY;
            }
            var pos = Trade(exchange, reverseType, reverseAmount, OpMode, SlidePrice, MaxSpace, Interval);
            if (pos) {
                Log(reverseType == ORDER_TYPE_BUY ? "多仓" : "空仓", "加倍开仓完成");
            }
            return pos;
        } else {
            var orders = EnsureCall(exchange, "GetOrders");
            if (orders.length == 0) {
                Counter.s++;
                var account = GetAccount(exchange, true);
                LogProfit(account.Stocks, account);
                break;
            }
        }
    }
    return null;
}

function onexit() {
    StripOrders(exchange);
    Log("Exit");
}

function main() {
    if (exchange.GetName().indexOf("796") == -1) {
        throw "只支持796期货, 现货暂不支持";
    }
    EnableLogLocal(SaveLocal);
    if (exchange.GetRate() != 1) {
        Log("已禁用汇率转换");
        exchange.SetRate(1);
    }

    StopProfit /= 100;
    StopLoss /= 100;

    var eName = exchange.GetName();

    _IsBTC = exchange.GetCurrency().indexOf("BTC") != -1;

    exchange.SetContractType("week");
    exchange.SetMarginLevel(MarginLevel);
    Interval *= 1000;
    SetErrorFilter("502:|503:|unexpected|network|timeout|WSARecv|Connect|GetAddr|no such|reset|http|received|EOF");
    StripOrders(exchange);
    OrgAccount = GetAccount(exchange, true);
    LogStatus("启动成功");
    var pos = null;
    var positions = GetPosition(exchange);
    if (positions.length == 1 && positions[0].MarginLevel == MarginLevel) {
        pos = positions[0];
        Log("发现一个仓位, 已经自动恢复进度");
    } else if (positions.length > 1) {
        throw "发现持仓超过1个";
    }
    while (true) {
        pos = loop(pos);
        if (!pos) {
            _Failed = 0;
        } else {
            _Failed++;
        }
        Sleep(Interval);
    }
}
