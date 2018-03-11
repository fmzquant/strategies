/*
策略出处: https://www.botvs.com/strategy/57267
策略名称: 数字货币交易类库 (期货支持OKCoin期货-BitVC, 支持$.CTA函数)
策略作者: 小小梦
策略描述:

数字货币交易类库 (期货支持OKCoin期货/BitVC) 目前测试阶段，使用请留意，如有问题 ，请联系作者 ，十分感谢！

- ### 新增了 $.CTA 函数

  可以用 $.CTA 函数 快速构建 均线等 类型的策略
  使用模板的 $.CTA 函数 构建的 策略代码如下（很精简）：
  文章 参看 商品期货交易类库 的 $.CTA 函数 使用 （使用、架构是类似的）  ：  https://zhuanlan.zhihu.com/p/30016518
```
function main() {
    $.CTA(exchanges[0], 0.01, function(r, mp, pair){         // 第一个参数 是 要做的 交易所对象， 第二个参数 0.01 是交易所 要求的 最小下单数量， 第三个 匿名函数 function(){...}
                                                                                        // 是 回调函数， 交易逻辑 就写在这个函数中， 该回调函数 第一个参数 r 接收最新的 K线数据， 第二个参数 接收 持仓数， 第
                                                                                        // 三个参数 接收 交易对 名称
        if (r.length < 20) {                                                     // 判断 K线柱数量 
            return
        }
        var emaSlow = TA.EMA(r, 20)
        var emaFast = TA.EMA(r, 5)
        var cross = _Cross(emaFast, emaSlow);                // 判断指标 相交状态，   _Cross 参看 ： https://www.botvs.com/bbs-topic/1140
        if (mp <= 0 && cross > 1) {
            Log(pair, "买, 金叉周期", cross, "mp:", mp);
            return 0.1 * (mp < 0 ? 2 : 1)                                //  返回的数值 就是 要开仓的 数量， 正数是 开多 ，负数是 开空，   0 是 全部平掉。
        } else if (mp >= 0 && cross < -1) {
            Log(pair, "卖, 死叉周期", cross, "mp:", mp);
            return -0.1 * (mp > 0 ? 2 : 1)
        }
    })
}
```

https://dn-filebox.qbox.me/c230753d3fd584c15ad3e39e33f970aafffe722f.png
https://dn-filebox.qbox.me/a74f74b34e32897868086e6b771f81fd1468306e.png
https://dn-filebox.qbox.me/1671268eba20870c7820542448dc0ef541d65a5b.png

- ### 注意：

  - #### 使用期货 功能下单时：
    注意不要忘记 先设置 合约类型  ：exchange.SetContractType("this_week")   否则会报错。
    ```
    var p = $.NewPositionManager()
    // this_week 即 当周合约 开多仓   ,  PositionManager.prototype.OpenLong = function(contractType, shares, price)
    exchange.SetContractType("this_week")
    p.OpenLong("this_week", 1, 1000)
    // 这样就 1000 美元价格  开多仓 合约 1张
    ```


参数              默认值    描述
--------------  -----  --------------------------
OpMode          0      现货-下单方式: 吃单|挂单
MaxSpace        0.5    现货-挂单失效距离
SlidePrice      0.1    现货-下单滑动价(元)
MaxAmount       0.8    现货-开仓最大单次下单量
RetryDelay      500    现货-失败重试(毫秒)
MAType          0      现货-均线算法: EMA|MA|AMA(自适应均线)
Interval        300    期货—失败重试间隔(毫秒)
F_SlidePrice    2      期货—下单滑价(元)
lv              0.5    期货—滑价增长率
max_open_lv     true   期货—开仓滑价最大增长率
max_cover_lv    true   期货—平仓滑价最大增长率
_GetMinStocks   0.01   最小交易数量
isCTAshowTable  false  是否显示 模板生成状态栏表格
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
        if (!waitFrozen || (account.FrozenStocks < _GetMinStocks && account.FrozenBalance < 0.01)) {
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
                doAmount = Math.min(maxAmount, tradeAmount - dealAmount, _N((nowAccount.Balance * 0.95) / tradePrice, 4));
            } else {
                diffMoney = _N(nowAccount.Balance - initAccount.Balance, 4);
                dealAmount = _N(initAccount.Stocks - nowAccount.Stocks, 8);
                doAmount = Math.min(maxAmount, tradeAmount - dealAmount, nowAccount.Stocks);
            }
            if (doAmount < _GetMinStocks) {
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
        if (needOpen < 1) {
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

// $.CTA  函数
$.CTA = function(Exchange, MinStock, onTick, interval){
    if(typeof(interval) !== "number"){
        interval = 500
    }
    
    var lastUpdate = 0
    var e = Exchange
    var pair = e.GetCurrency()
    var hold = 0
    var tradeInfo = null
    var initAccount = _C(e.GetAccount)
    var nowAccount = initAccount
    
    var CTAshowTable = function(r){
        var tbl = {
            type : "table", 
            title : "策略信息，交易对" + pair,
            cols : ["变量", "值"],
            rows : [],
        }
        tbl.rows.push(["初始账户：", initAccount])
        tbl.rows.push(["当前账户：", nowAccount])
        tbl.rows.push(["上次交易信息：", tradeInfo])
        tbl.rows.push(["持仓：", hold])
        tbl.rows.push(["最新K线柱：", r[r.length - 1]])
        tbl.rows.push(["Bar 数量：", r.length])
        LogStatus(_D() + '\n`' + JSON.stringify([tbl]) + '`')
    }

    Log("$.CTA 初始化 完成。")

    while(true){
        var ts = new Date().getTime()

        var r = e.GetRecords()
        if(!r || r.length == 0){
            continue
        }
        
        hold = nowAccount.Stocks - initAccount.Stocks
        if(Math.abs(hold) < MinStock){
            hold = 0
        }
        var n = onTick(r, hold, pair)
        var callBack = null
        if (typeof(n) == 'object' && typeof(n.length) == 'number' && n.length > 1) {
            if (typeof(n[1]) == 'function') {
                callBack = n[1]
            }
            n = n[0]
        }
        if(typeof(n) !== "number"){
            if(isCTAshowTable){
                CTAshowTable(r)
            }
            continue
        }

        if(n > 0){             // buy
            if(hold < 0){
                Log("平仓")     // 测试
                tradeInfo = $.Buy(e, Math.min(-hold, n))
                if(typeof(callBack) == 'function'){
                    callBack(tradeInfo)
                }
                n += hold
            }
            if(n > 0){
                Log("开仓 或 反手")     // 测试
                tradeInfo = $.Buy(e, n)
                if(typeof(callBack) == 'function'){
                    callBack(tradeInfo)
                }
            }
            nowAccount = _C(e.GetAccount)
        }else if(n < 0){       // sell
            if(hold > 0){
                Log("平仓")     // 测试
                tradeInfo = $.Sell(e, Math.min(hold, -n))
                if(typeof(callBack) == 'function'){
                    callBack(tradeInfo)
                }
                n += hold
            }
            if(n < 0){
                Log("开仓 或 反手")     // 测试
                tradeInfo = $.Sell(e, -n)
                if(typeof(callBack) == 'function'){
                    callBack(tradeInfo)
                }
            }
            nowAccount = _C(e.GetAccount)
        }else{                 // keep balance
            // nowAccount = _C(e.GetAccount)
            if(hold > 0){
                tradeInfo = $.Sell(e, hold)
                if(typeof(callBack) == 'function'){
                    callBack(tradeInfo)
                }
                nowAccount = _C(e.GetAccount)
            }else if(hold < 0){
                tradeInfo = $.Buy(e, -hold)
                if(typeof(callBack) == 'function'){
                    callBack(tradeInfo)
                }
                nowAccount = _C(e.GetAccount)
            }
        }
        
        if(isCTAshowTable){
            CTAshowTable(r)
        }
        
        Sleep(interval)
    }
}



// 测试代码
/*
2017.5.1 - 2017.10.11 ,  K线 天， 模拟级别， OK国际 ， BTC 
*/
function main() {
    $.CTA(exchanges[0], 0.01, function(r, mp, pair){   // $.CTA = function(Exchange, MinStock, onTick, interval)
        // Log(r.length)   // 测试
        if (r.length < 20) {
            return
        }
        var emaSlow = TA.EMA(r, 20)
        var emaFast = TA.EMA(r, 5)
        var cross = _Cross(emaFast, emaSlow);

        if (mp <= 0 && cross > 1) {
            Log(pair, "买, 金叉周期", cross, "mp:", mp);
            return 0.1 * (mp < 0 ? 2 : 1)
        } else if (mp >= 0 && cross < -1) {
            Log(pair, "卖, 死叉周期", cross, "mp:", mp);
            return -0.1 * (mp > 0 ? 2 : 1)
        }
    })
}

