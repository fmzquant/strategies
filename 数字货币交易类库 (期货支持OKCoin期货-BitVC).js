/*
策略出处: https://www.botvs.com/strategy/30199
策略名称: 数字货币交易类库 (期货支持OKCoin期货-BitVC)
策略作者: 小小梦
策略描述:

数字货币交易类库 (期货支持OKCoin期货/BitVC) 目前测试阶段，使用请留意，如有问题 ，请联系作者 ，十分感谢！


参数            默认值    描述
------------  -----  --------------------------
OpMode        0      现货-下单方式: 吃单|挂单
MaxSpace      0.5    现货-挂单失效距离
SlidePrice    0.1    现货-下单滑动价(元)
MaxAmount     0.8    现货-开仓最大单次下单量
RetryDelay    500    现货-失败重试(毫秒)
MAType        0      现货-均线算法: EMA|MA|AMA(自适应均线)
Interval      300    期货—失败重试间隔(毫秒)
F_SlidePrice  2      期货—下单滑价(元)
lv            0.5    期货—滑价增长率
max_open_lv   true   期货—开仓滑价最大增长率
max_cover_lv  true   期货—平仓滑价最大增长率
*/

// 现货部分
function CancelPendingOrders(e, orderType) {
    while (true) {
        var orders = e.GetOrders();
        if (!orders) {
            Sleep(RetryDelay);
            continue;
        }
        var processed = 0;
        for (var j = 0; j < orders.length; j++) {
            if (typeof(orderType) === 'number' && orders[j].Type !== orderType) {
                continue;
            }
            e.CancelOrder(orders[j].Id, orders[j]);
            processed++;
            if (j < (orders.length - 1)) {
                Sleep(RetryDelay);
            }
        }
        if (processed === 0) {
            break;
        }
    }
}

function GetAccount(e, waitFrozen) {
    if (typeof(waitFrozen) == 'undefined') {
        waitFrozen = false;
    }
    var account = null;
    var alreadyAlert = false;
    while (true) {
        account = _C(e.GetAccount);
        if (!waitFrozen || (account.FrozenStocks < e.GetMinStock() && account.FrozenBalance < 0.01)) {
            break;
        }
        if (!alreadyAlert) {
            alreadyAlert = true;
            Log("发现账户有冻结的钱或币", account);
        }
        Sleep(RetryDelay);
    }
    return account;
}


function StripOrders(e, orderId) {
    var order = null;
    if (typeof(orderId) == 'undefined') {
        orderId = null;
    }
    while (true) {
        var dropped = 0;
        var orders = _C(e.GetOrders);
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
        if (dropped === 0) {
            break;
        }
        Sleep(RetryDelay);
    }
    return order;
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
        var ticker = _C(e.GetTicker);
        var tradePrice = 0;
        if (isBuy) {
            tradePrice = _N((mode === 0 ? ticker.Sell : ticker.Buy) + slidePrice, 4);
        } else {
            tradePrice = _N((mode === 0 ? ticker.Buy : ticker.Sell) - slidePrice, 4);
        }
        if (!orderId) {
            if (isFirst) {
                isFirst = false;
            } else {
                nowAccount = GetAccount(e, true);
            }
            var doAmount = 0;
            if (isBuy) {
                diffMoney = _N(initAccount.Balance - nowAccount.Balance, 4);
                dealAmount = _N(nowAccount.Stocks - initAccount.Stocks, 8);                                                // 如果保留小数过少，会引起在小交易量交易时，计算出的成交价格误差较大。
                doAmount = Math.min(maxAmount, tradeAmount - dealAmount, _N((nowAccount.Balance - 10) / tradePrice, 4));
            } else {
                diffMoney = _N(nowAccount.Balance - initAccount.Balance, 4);
                dealAmount = _N(initAccount.Stocks - nowAccount.Stocks, 8);
                doAmount = Math.min(maxAmount, tradeAmount - dealAmount, nowAccount.Stocks);
            }
            if (doAmount < e.GetMinStock()) {
                break;
            }
            prePrice = tradePrice;
            orderId = tradeFunc(tradePrice, doAmount, ticker);
            if (!orderId) {
                CancelPendingOrders(e, tradeType);
            }
        } else {
            if (mode === 0 || (Math.abs(tradePrice - prePrice) > maxSpace)) {
                orderId = null;
            }
            var order = StripOrders(e, orderId);
            if (!order) {
                orderId = null;
            }
        }
        Sleep(retryDelay);
    }

    if (dealAmount <= 0) {
        return null;
    }

    return {
        price: _N(diffMoney / dealAmount, 4),
        amount: dealAmount
    };
}

$.Buy = function(e, amount) {
    if (typeof(e) === 'number') {
        amount = e;
        e = exchange;
    }
    return Trade(e, ORDER_TYPE_BUY, amount, OpMode, SlidePrice, MaxAmount, MaxSpace, RetryDelay);
};

$.Sell = function(e, amount) {
    if (typeof(e) === 'number') {
        amount = e;
        e = exchange;
    }
    return Trade(e, ORDER_TYPE_SELL, amount, OpMode, SlidePrice, MaxAmount, MaxSpace, RetryDelay);
};

$.CancelPendingOrders = function(e, orderType) {
    if (typeof(orderType) === 'undefined') {
        if (typeof(e) === 'number') {
            orderType = e;
            e = exchange;
        } else if (typeof(e) === 'undefined') {
            e = exchange;
        }
    }
    return CancelPendingOrders(e, orderType);
};

$.GetAccount = function(e) {
    if (typeof(e) === 'undefined') {
        e = exchange;
    }
    return _C(e.GetAccount);
};

var _MACalcMethod = [TA.EMA, TA.MA, talib.KAMA][MAType];

// 返回上穿的周期数. 正数为上穿周数, 负数表示下穿的周数, 0指当前价格一样
$.Cross = function(a, b) {
    var crossNum = 0;
    var arr1 = [];
    var arr2 = [];
    if (Array.isArray(a)) {
        arr1 = a;
        arr2 = b;
    } else {
        var records = null;
        while (true) {
            records = exchange.GetRecords();
            if (records && records.length > a && records.length > b) {
                break;
            }
            Sleep(RetryDelay);
        }
        arr1 = _MACalcMethod(records, a);
        arr2 = _MACalcMethod(records, b);
    }
    if (arr1.length !== arr2.length) {
        throw "array length not equal";
    }
    for (var i = arr1.length-1; i >= 0; i--) {
        if (typeof(arr1[i]) !== 'number' || typeof(arr2[i]) !== 'number') {
            break;
        }
        if (arr1[i] < arr2[i]) {
            if (crossNum > 0) {
                break;
            }
            crossNum--;
        } else if (arr1[i] > arr2[i]) {
            if (crossNum < 0) {
                break;
            }
            crossNum++;
        } else {
            break;
        }
    }
    return crossNum;
};

// 期货部分
function GetPosition(e, contractType, direction) {
    var allCost = 0;
    var allAmount = 0;
    var allProfit = 0;
    var allFrozen = 0;
    var posMargin = 0;
    var positions = _C(e.GetPosition);
    for (var i = 0; i < positions.length; i++) {
        if (positions[i].ContractType == contractType &&
            (((positions[i].Type == PD_LONG) && direction == PD_LONG) || ((positions[i].Type == PD_SHORT) && direction == PD_SHORT))
        ) {
            posMargin = positions[i].MarginLevel;
            allCost += (positions[i].Price * positions[i].Amount);
            allAmount += positions[i].Amount;
            allProfit += positions[i].Profit;
            allFrozen += positions[i].FrozenAmount;
        }
    }
    if (allAmount === 0) {
        return null;
    }
    return {
        MarginLevel: posMargin,
        FrozenAmount: allFrozen,
        Price: _N(allCost / allAmount),
        Amount: allAmount,
        Profit: allProfit,
        Type: direction,
        ContractType: contractType
    };
}

function Open(e, contractType, direction, opAmount, price) {
    var initPosition = GetPosition(e, contractType, direction);
    var isFirst = true;
    var initAmount = initPosition ? initPosition.Amount : 0;
    var positionNow = initPosition;
    var step = 0;
    while (true) {
        var needOpen = opAmount;
        if (isFirst) {
            isFirst = false;
        } else {
            positionNow = GetPosition(e, contractType, direction);
            if (positionNow) {
                needOpen = opAmount - (positionNow.Amount - initAmount);
            }
        }
        if (needOpen < e.GetMinStock()) {
            break;
        }
        if (step > max_open_lv) {
            break;
        }
        var amount = needOpen;
        e.SetDirection(direction == PD_LONG ? "buy" : "sell");
        var orderId;
        if (direction == PD_LONG) {
            orderId = e.Buy(price + F_SlidePrice * (1 + step), amount, "开多仓", contractType, price);
        } else {
            orderId = e.Sell(price - F_SlidePrice * (1 + step), amount, "开空仓", contractType, price);
        }
        while (true) {
            var orders = _C(e.GetOrders);
            if (orders.length === 0) {
                break;
            }
            Sleep(Interval);
            for (var j = 0; j < orders.length; j++) {
                e.CancelOrder(orders[j].Id);
                if (j < (orders.length - 1)) {
                    Sleep(Interval);
                }
            }
        }
        step += lv;
    }
    var ret = {
        price: 0,
        amount: 0,
        position: positionNow
    };
    if (!positionNow) {
        return ret;
    }
    if (!initPosition) {
        ret.price = positionNow.Price;
        ret.amount = positionNow.Amount;
    } else {
        ret.amount = positionNow.Amount - initPosition.Amount;
        ret.price = _N(((positionNow.Price * positionNow.Amount) - (initPosition.Price * initPosition.Amount)) / ret.amount);
    }
    return ret;
}

function Cover(e, contractType, price, OP_amount, direction) {
    var initP = null;
    var positions = null;
    var isFirst = true;
    var ID = null;
    var step = 0;
    var index = 0;
    while (true) {
        var n = 0;
        positions = _C(e.GetPosition);
        if (isFirst === true) {
            if (typeof(direction) === 'undefined' && positions.length > 1 || (direction !== PD_LONG && direction !== PD_SHORT && typeof(direction) !== 'undefined')) {
                throw "有多，空双向持仓，并且参数direction未明确方向！或 direction 参数异常：" + direction;
            }
            initP = positions;
            isFirst = false;
        }
        for (var i = 0; i < positions.length; i++) {
            if (positions[i].ContractType != contractType || (positions[i].Type !== direction && typeof(direction) !== 'undefined')) {
                continue;
            }
            var amount = 0;
            if (typeof(OP_amount) === 'undefined') {
                amount = positions[i].Amount;
            } else {
                amount = OP_amount - (initP[i].Amount - positions[i].Amount);
            }

            if (amount === 0) {
                continue;
            }
            if (positions[i].Type == PD_LONG) {
                e.SetDirection("closebuy");
                ID = e.Sell(price - F_SlidePrice * (1 + step), amount, "平多仓", contractType, price);
                n++;
            } else if (positions[i].Type == PD_SHORT) {
                e.SetDirection("closesell");
                ID = e.Buy(price + F_SlidePrice * (1 + step), amount, "平空仓", contractType, price);
                n++;
            }
            index = i;
        }
        if (n === 0) {
            break;
        }
        Sleep(Interval);
        if (typeof(ID) !== 'number') {
            Log("ID:", ID);
            continue;
        }

        e.CancelOrder(ID);
        step += lv;
        if (step > max_cover_lv) {
            break;
        }
    }

    var nowP = _C(e.GetPosition);
    if (!nowP[index] || nowP[index].Type !== initP[index].Type) {
        return initP.length === 0 ? 0 : initP[index].Amount;
    } else {
        var diff = initP[index].Amount - nowP[index].Amount;
        return diff;
    }
}

var PositionManager = (function() {
    function PositionManager(e) {
        if (typeof(e) === 'undefined') {
            e = exchange;
        }
        if (e.GetName() !== 'Futures_OKCoin' && e.GetName() !== 'Futures_BitVC') {
            throw 'Only support Futures_OKCoin & Futures_BitVC';
        }
        this.e = e;
        this.account = null;
    }
    PositionManager.prototype.GetAccount = function() {
        return _C(this.e.GetAccount);
    };

    PositionManager.prototype.OpenLong = function(contractType, shares, price) {
        if (!this.account) {
            this.account = _C(exchange.GetAccount);
        }
        return Open(this.e, contractType, PD_LONG, shares, price);
    };

    PositionManager.prototype.OpenShort = function(contractType, shares, price) {
        if (!this.account) {
            this.account = _C(exchange.GetAccount);
        }
        return Open(this.e, contractType, PD_SHORT, shares, price);
    };

    PositionManager.prototype.Cover = function(contractType, price, OP_amount, direction) {
        if (!this.account) {
            this.account = _C(exchange.GetAccount);
        }
        return Cover(this.e, contractType, price, OP_amount, direction);
    };

    PositionManager.prototype.Profit = function(contractType) {
        var accountNow = _C(this.e.GetAccount);
        Log("NOW:", accountNow, "--account:", this.account);
        return _N(accountNow.Balance - this.account.Balance);
    };

    return PositionManager;
})();

$.NewPositionManager = function(e) {
    return new PositionManager(e);
};


// 测试代码
function main() {
    if (exchange.GetName() === 'Futures_OKCoin') {
        var info = exchange.SetContractType("this_week");
        Log("info 返回值:", info);
        Log("当前持仓信息", exchange.GetPosition(), _C(exchange.GetTicker));
        var depth = exchange.GetDepth();
        var p = $.NewPositionManager();
        p.OpenShort("this_week", 10, depth.Bids[0].Price - 2);
        Log(exchange.GetPosition());
        Sleep(500 * 1000);
        depth = exchange.GetDepth();
        var ret = p.Cover("this_week", depth.Bids[0].Price + 2, 5);
        Log("cover ret:", ret);
        //LogProfit(p.Profit());
        Log(exchange.GetPosition());
        Log("-----------------------------测试分割线----------------------------------------");
        var depth = exchange.GetDepth();
        p.OpenLong("this_week", 20, depth.Bids[0].Price + 2);
        Log(exchange.GetPosition());
        Sleep(500 * 1000);
        depth = exchange.GetDepth();
        var ret = p.Cover("this_week", depth.Bids[0].Price - 2, 10, PD_LONG);
        Log("cover ret:", ret);
        Log(exchange.GetPosition());
        Log("-----------------------------测试分割线----------------------------------------");
        var ret = p.Cover("this_week", depth.Bids[0].Price - 3, 10, PD_LONG);
        Log("cover ret:", ret);
        var ret = p.Cover("this_week", depth.Bids[0].Price + 3, 5, PD_SHORT);
        Log("cover ret:", ret);
        Log(exchange.GetPosition());
    } else if (exchange.GetName() === 'Futures_BitVC') {
        var info = exchange.SetContractType("week");
        Log("info 返回值:", info);
        Log("当前持仓信息", exchange.GetPosition(), _C(exchange.GetTicker));
        var depth = exchange.GetDepth();
        var p = $.NewPositionManager();
        p.OpenLong("week", 500, depth.Bids[0].Price + 2);
        Log(exchange.GetPosition());
        Sleep(500 * 1000);
        depth = exchange.GetDepth();
        var ret = p.Cover("week", depth.Bids[0].Price - 2, 500);
        Log("cover ret:", ret);
        Log(exchange.GetPosition());
        Log("-----------------------------测试分割线----------------------------------------");
        var info = exchange.SetContractType("week");
        Log("info 返回值:", info);
        Log("当前持仓信息", exchange.GetPosition(), _C(exchange.GetTicker));
        var depth = exchange.GetDepth();
        p.OpenShort("week", 600, depth.Bids[0].Price - 2);
        Log(exchange.GetPosition());
        Sleep(500 * 1000);
        depth = exchange.GetDepth();
        var ret = p.Cover("week", depth.Bids[0].Price + 2, 500, PD_SHORT);
        Log("cover ret:", ret);
        Log(exchange.GetPosition());
        Log("-----------------------------测试分割线----------------------------------------");
        var ret = p.Cover("week", depth.Bids[0].Price + 3, 100, PD_SHORT);
        Log("cover ret:", ret);
        //p.Cover("week", depth.Asks[0].Price - 3, 300, PD_LONG);
        Log(exchange.GetPosition());
    } else if(exchange.GetName() === 'huobi' || exchange.GetName() === 'OKCoin'){
        Log($.GetAccount());
        Log($.Buy(0.5));
        Log($.Sell(0.5));
        exchange.Buy(1000, 3);
        $.CancelPendingOrders(exchanges[0]);
        Log($.Cross(30, 7));
        Log($.Cross([1,2,3,2.8,3.5], [3,1.9,2,5,0.6]));
    }
}

