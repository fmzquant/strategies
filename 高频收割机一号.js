/*
策略出处: https://www.botvs.com/strategy/6237
策略名称: 高频收割机一号
策略作者: Zero
策略描述:

代码本身就是很好的注释, 识货的拿走.


参数             默认值              描述
-------------  ---------------  ------
DicAmount      0.6,1.5,1.8,1.9  交易量
DicBuyOffset   1.5,2.5,4.5,8    买单距离
DicSellOffset  1,1.8,2.5,4      卖单距离
DicResetDiff   0.1,0.3,0.3,0.4  撤单差价
DicStep        9,12,17,25       增量步长
DicSleep       1,2,3,5          等待周期
SleepPeriod    3000             轮询周期
ChartPeriod    600              统计周期
IsEnableLog    true             开启订单跟踪

按钮         默认值         描述
---------  ----------  ---------
开启/关闭订单跟踪  __button__  开启/关闭订单跟踪
统计周期       3600        秒数
*/


var TAmount, TBuyOffset, TSellOffset, TResetDiff, TStep, TSleep, TLen;
var OrdersBuy = [];
var OrdersSell = [];
var InitAccount = null;
var __chart = null;
var __lastUpdate = 0;

function CancelPendingOrders() {
    while (true) {
        var orders = _C(exchange.GetOrders);
        if (orders.length === 0) {
            return;
        }

        for (var i = 0; i < orders.length; i++) {
            exchange.CancelOrder(orders[i].Id);
            if (i < (orders.length-1)) {
                Sleep(500);
            }
        }
    }
}

function str2array(s) {
    var ret = [];
    var arr = s.split(',');
    for (var i = 0; i < arr.length; i++) {
        ret.push(parseFloat(arr[i]));
    }
    return ret;
}

function parseOption() {
    TAmount = str2array(DicAmount);
    TBuyOffset = str2array(DicBuyOffset);
    TSellOffset = str2array(DicSellOffset);
    TResetDiff = str2array(DicResetDiff);
    TStep = str2array(DicStep);
    TSleep = str2array(DicSleep);
    TLen = TAmount.length;
    if ((TAmount.length !== TBuyOffset.length) ||
        (TAmount.length !== TSellOffset.length) ||
        (TAmount.length !== TStep.length) ||
        (TAmount.length !== TSleep.length) ||
        (TAmount.length !== TResetDiff.length) ) {
        throw "参数有误, 表长度不一";
    }
    for (var i = 0; i < TLen; i++) {
        OrdersBuy.push({Id: 0, Price: 0, Amount: 0});
        OrdersSell.push({Id: 0, Price: 0, Amount: 0});
    }
}

function getOrderPrice(books, limitAmount, prePrice, defRatio) {
    var amount = 0;
    for (var i = 0; i < books.length; i++) {
        if (i > books.length - 3) {
            return [books[1].Price * defRatio, false];
        }
        if (books[i].Price === prePrice) {
            continue;
        }
        amount += books[i].Amount;
        if (amount > limitAmount) {
            return [books[i].Price, true];
        }
    }
}

function updateOrders() {
    var ueseless = [];
    var orders = _C(exchange.GetOrders);
    // Update orders state, 1: Complete
    for (var i = 0; i < TLen; i++) {
        var found = false;
        var j = 0;
        if (OrdersBuy[i].Id > 0) {
            for (j = 0; j < orders.length; j++) {
                if (OrdersBuy[i].Id == orders[j].Id) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                OrdersBuy[i] = {Id: 0, Price: 0};
            }
        }
        found = false;
        if (OrdersSell[i].Id > 0) {
            for (j = 0; j < orders.length; j++) {
                if (OrdersSell[i].Id == orders[j].Id) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                OrdersSell[i] = {Id: 0, Price: 0};
            }
        }
    }
    
    // remove useless orders
    while (true) {
        var dropped = 0;
        for (i = 0; i < orders.length; i++) {
            var found = false;
            for (j = 0; j < TLen; j++) {
                if (OrdersBuy[j].Id == orders[i].Id || OrdersSell[j].Id == orders[i].Id) {
                    found = true;
                }
            }
            if (!found) {
                exchange.CancelOrder(orders[i].Id);
                dropped++;
            }
        }
        if (dropped === 0) {
            break;
        } else {
            Sleep(1000);
            orders = _C(exchange.GetOrders);
        }
    }
    
    return true;
}

function onTick(pos) {
    var depth = exchange.GetDepth();
    if (!depth || depth.length < 2) {
        return;
    }
    
    // recalc order price
    var buys = [];
    var sells = [];
    for (var i = 0; i < TLen; i++) {
        var buyPrice = getOrderPrice(depth.Bids, TAmount[i], OrdersBuy[i].Price, 0.99)[0] + (0.03 * Math.random());
        var sellPrice = getOrderPrice(depth.Asks, TAmount[i], OrdersSell[i].Price, 1.01)[0] - (0.03 * Math.random());
        var newSellPrice = sellPrice;
        var newBuyPrice = buyPrice;
        for(var newSellAmount = TAmount[i]; (newSellPrice - buyPrice) <= TSellOffset[i]; newSellAmount += TStep[i]) {
            var retS = getOrderPrice(depth.Asks, newSellAmount, OrdersSell[i].Price, 1.01);
            if (!retS[1]) {
                break;
            }
            newSellPrice = retS[0] - (0.03 * Math.random());
        }
        for(var newBuyAmount = TAmount[i]; (sellPrice - newBuyPrice) <= TBuyOffset[i]; newBuyAmount += TStep[i]) {
            var retB = getOrderPrice(depth.Bids, newBuyAmount, OrdersBuy[i].Price, 0.99);
            if (!retB[1]) {
                break;
            }
            newBuyPrice = retB[0] + (0.03 * Math.random());
        }
        buys.push(_N(newBuyPrice, 2));
        sells.push(_N(newSellPrice, 2));
    }
    
    while (true) {
        if (!updateOrders()) {
            Sleep(1000);
        }
        var dropped = 0;
        for (i = 0; i < TLen; i++) {
            if (pos === 0 || (pos % TSleep[i] !== 0)) {
                continue;
            }
            if (OrdersBuy[i].Id > 0 && Math.abs(buys[i] - OrdersBuy[i].Price) > TResetDiff[i]) {
            //if (OrdersBuy[i].Id > 0 && (buys[i] - OrdersBuy[i].Price) > TResetDiff[i]) {
                exchange.CancelOrder(OrdersBuy[i].Id);
                dropped++;
            }
            if (OrdersSell[i].Id > 0 && Math.abs(sells[i] - OrdersSell[i].Price) > TResetDiff[i]) {
            //if (OrdersSell[i].Id > 0 && (OrdersSell[i].Price - sells[i]) > TResetDiff[i]) {
                exchange.CancelOrder(OrdersSell[i].Id);
                dropped++;
            }
        }
        if (dropped === 0) {
            break;
        } else {
            Sleep(1000);
        }
    }
    var account = _C(exchange.GetAccount);
    
    var now = new Date().getTime();
    if ((now - __lastUpdate) > (1000 * ChartPeriod)) {
        __lastUpdate = now;
        var btcPrice = depth.Bids[0].Price;
        var net = _N(account.Balance + account.FrozenBalance + ((account.Stocks + account.FrozenStocks) * btcPrice));
        __chart.add([0, [now, net]]);
        __chart.add([1, [now, btcPrice]]);
    }
    
    var freeAmount = account.Stocks;
    var freeBalance = account.Balance;
    
    for (i = 0; i < TLen; i++) {
        if (OrdersBuy[i].Id === 0) {
            var orderAmount = Math.min(_N(freeBalance / buys[i]), TAmount[i]);
            if (orderAmount >= 0.01) {
                var orderId = exchange.Buy(buys[i], orderAmount);
                if (orderId) {
                    OrdersBuy[i] = {Id: orderId, Price: buys[i], Amount: orderAmount};
                }
            }
            freeBalance -= ((buys[i] + 1) * orderAmount);
        }
        if (OrdersSell[i].Id === 0 && freeAmount >= 0.01) {
            var orderAmount = Math.min(freeAmount, TAmount[i]);
            var orderId = exchange.Sell(sells[i], orderAmount);
            if (orderId) {
                OrdersSell[i] = {Id: orderId, Price: sells[i], Amount: orderAmount};
            }
            freeAmount -= orderAmount;
        }
    }
}

function onexit() {
    CancelPendingOrders();
    Log("exit");
}

function main() {
    SetErrorFilter("订单不存在|10050|net");
    exchange.IO("websocket")
    __chart = Chart({
        tooltip: {xDateFormat: '%Y-%m-%d %H:%M:%S, %A'},
        title : { text : '资产趋势'},
        rangeSelector: {
            buttons:  [{type: 'hour',count: 1, text: '1h'}, {type: 'hour',count: 3, text: '3h'}, {type: 'hour', count: 8, text: '8h'}, {type: 'all',text: 'All'}],
            selected: 0,
            inputEnabled: false
        },
        xAxis: { type: 'datetime'},
        yAxis: [{ // Primary yAxis
            labels: { format: '{value}元', style: { color: '#FF0000' } },
            title: { text: '资产估值', style: { color: '#FF0000' } }
        }, { title: { text: 'BTC单价', style: { color: '#4572A7' } },
            labels: { format: '{value} 元', style: { color: '#4572A7' } },
            opposite: false
        }],
        series : [{
            name : '净产净值',
            data : [],
            tooltip: {
                valueDecimals: 2
            }
        },{
            name : 'BTC单价',
            yAxis: 1,
            data : [],
            tooltip: {
                valueDecimals: 2
            }
        }]
    });
    __chart.reset();
    EnableLog(IsEnableLog);
    Log("Switch to websocket => ", exchange.IO("websocket"));
    CancelPendingOrders();
    InitAccount = _C(exchange.GetAccount);
    Log(InitAccount);
    parseOption();
    var allAmount = _.reduce(TAmount, function(memo, num){ return memo + num; }, 0);
    var ticker = _C(exchange.GetTicker);
    var ratio = (InitAccount.Balance + InitAccount.FrozenBalance + ((InitAccount.Stocks + InitAccount.FrozenStocks) * ticker.Buy)) / 2 / ticker.Buy / allAmount;
    for (var i = 0; i < TAmount.length; i++) {
        TAmount[i] = _N(TAmount[i] * ratio, 3);
    }
    Log("订单跟踪已经: " + (IsEnableLog ? "开启" : "关闭"), " 统计周期为", ChartPeriod, "秒, ", TAmount, "缩放比例:", _N(ratio));
    for (var count = 0; ; count++) {
        var cmd = GetCommand();
        if (cmd == '开启/关闭订单跟踪') {
            IsEnableLog = !IsEnableLog;
            EnableLog(IsEnableLog);
            Log("订单跟踪已经: " + (IsEnableLog ? "开启" : "关闭"));
        } else if (cmd && cmd.indexOf('统计周期:') === 0) {
            ChartPeriod = parseFloat(cmd.split(':')[1]);
            Log("统计周期变更为", ChartPeriod, "秒");
        }
        onTick(count);
        Sleep(SleepPeriod);
    }
}
