
> 策略名称

CTP商品期货多品种海龟交易策略

> 策略作者

Zero

> 策略描述

- 只支持操作CTP商品期货
- 支持自动或手动恢复进度
- 可同时操作多个不同品种
- 增加时间段区分与各种网络错误问题的应对处理
- 移仓功能目前正在加入中

请下载最新托管者并比较版本号是否最新
``` text
$ ./robot -v
BotVS docker 3.0 compiled at 2016-07-05T09:56:18+0800
```

 https://dn-filebox.qbox.me/d33687abb648c489b6883296685e8717ea3f44ca.png

> 策略参数



|参数|默认值|描述|
|----|----|----|
|Instruments|MA701,CF701,zn1701,SR701,pp1701,l1701,hc1610,ni1701,i1701,v1701,rb1610,jm1701,ag1612,al1701,jd1701,cs1701,p1701|合约列表|
|LoopInterval|3|轮询周期(秒)|
|RiskRatio|true|% Risk Per N ( 0 - 100)|
|ATRLength|20|ATR计算周期|
|EnterPeriodA|20|系统一入市周期|
|LeavePeriodA|10|系统一离市周期|
|EnterPeriodB|55|系统二入市周期|
|LeavePeriodB|20|系统二离市周期|
|UseEnterFilter|true|使用入市过滤|
|IncSpace|0.5|加仓间隔(N的倍数)|
|StopLossRatio|2|止损系数(N的倍数)|
|MaxLots|4|单品种加仓次数|
|RMode|0|进度恢复模式: 自动|手动|
|VMStatus|{}|手动恢复字符串|
|WXPush|true|推送交易信息|
|MaxTaskRetry|5|开仓最多重试次数|
|KeepRatio|10|预留保证金比例|




|按钮|默认值|描述|
|----|----|----|
|暂停/继续|__button__|暂停/继续|


> 源码 (javascript)

``` javascript
/*backtest
start: 2016-03-01 00:00:00
end: 2016-12-30 00:00:00
period: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
*/

var _bot = $.NewPositionManager();

var TTManager = {
    New: function(needRestore, symbol, keepBalance, riskRatio, atrLen, enterPeriodA, leavePeriodA, enterPeriodB, leavePeriodB, useFilter,
        multiplierN, multiplierS, maxLots) {

        // subscribe
        var symbolDetail = _C(exchange.SetContractType, symbol);
        if (symbolDetail.VolumeMultiple == 0 || symbolDetail.MaxLimitOrderVolume == 0 || symbolDetail.MinLimitOrderVolume == 0 || symbolDetail.LongMarginRatio == 0 || symbolDetail.ShortMarginRatio == 0) {
            Log(symbolDetail);
            throw "合约信息异常";
        } else {
            Log("合约", symbolDetail.InstrumentName, "一手", symbolDetail.VolumeMultiple, "份, 最大下单量", symbolDetail.MaxLimitOrderVolume, "保证金率:", _N(symbolDetail.LongMarginRatio), _N(symbolDetail.ShortMarginRatio), "交割日期", symbolDetail.StartDelivDate);
        }

        var ACT_IDLE = 0;
        var ACT_LONG = 1;
        var ACT_SHORT = 2;
        var ACT_COVER = 3;


        var ERR_SUCCESS = 0;
        var ERR_SET_SYMBOL = 1;
        var ERR_GET_ORDERS = 2;
        var ERR_GET_POS = 3;
        var ERR_TRADE = 4;
        var ERR_GET_DEPTH = 5;
        var ERR_NOT_TRADING = 6;
        var errMsg = ["成功", "切换合约失败", "获取订单失败", "获取持仓失败", "交易下单失败", "获取深度失败", "不在交易时间"];

        var obj = {
            symbol: symbol,
            keepBalance: keepBalance,
            riskRatio: riskRatio,
            atrLen: atrLen,
            enterPeriodA: enterPeriodA,
            leavePeriodA: leavePeriodA,
            enterPeriodB: enterPeriodB,
            leavePeriodB: leavePeriodB,
            useFilter: useFilter,
            multiplierN: multiplierN,
            multiplierS: multiplierS
        };
        obj.task = {
            action: ACT_IDLE,
            amount: 0,
            dealAmount: 0,
            avgPrice: 0,
            preCost: 0,
            preAmount: 0,
            init: false,
            retry: 0,
            desc: "空闲",
            onFinish: null
        }
        obj.maxLots = maxLots;
        obj.lastPrice = 0;
        obj.symbolDetail = symbolDetail;
        obj.status = {
            symbol: symbol,
            recordsLen: 0,
            vm: [],
            open: 0,
            cover: 0,
            st: 0,
            marketPosition: 0,
            lastPrice: 0,
            holdPrice: 0,
            holdAmount: 0,
            holdProfit: 0,
            N: 0,
            upLine: 0,
            downLine: 0,
            symbolDetail: symbolDetail,
            lastErr: "",
            lastErrTime: "",
            stopPrice: '',
            leavePrice: '',
            isTrading: false
        };

        obj.setLastError = function(err) {
            if (typeof(err) === 'undefined' || err === '') {
                obj.status.lastErr = "";
                obj.status.lastErrTime = "";
                return;
            }
            var t = new Date();
            obj.status.lastErr = err;
            obj.status.lastErrTime = t.toLocaleString();
        };
        obj.reset = function(marketPosition, openPrice, N, leavePeriod, preBreakoutFailure) {
            if (typeof(marketPosition) !== 'undefined') {
                obj.marketPosition = marketPosition;
                obj.openPrice = openPrice;
                obj.preBreakoutFailure = preBreakoutFailure;
                obj.N = N;
                obj.leavePeriod = leavePeriod;
                var pos = _bot.GetPosition(obj.symbol, marketPosition > 0 ? PD_LONG : PD_SHORT);
                if (pos) {
                    obj.holdPrice = pos.Price;
                    obj.holdAmount = pos.Amount;
                    Log(obj.symbol, "仓位", pos);
                } else {
                    throw "恢复" + obj.symbol + "的持仓状态出错, 没有找到仓位信息";
                }
                Log("恢复", obj.symbol, "加仓次数", obj.marketPosition, "持仓均价:", obj.holdPrice, "持仓数量:", obj.holdAmount, "最后一次加仓价", obj.openPrice, "N值", obj.N, "离市周期:", leavePeriod, "上次突破:", obj.preBreakoutFailure ? "失败" : "成功");
                obj.status.open = 1;
                obj.status.vm = [obj.marketPosition, obj.openPrice, obj.N, obj.leavePeriod, obj.preBreakoutFailure];
            } else {
                obj.marketPosition = 0;
                obj.holdPrice = 0;
                obj.openPrice = 0;
                obj.holdAmount = 0;
                obj.holdProfit = 0;
                obj.preBreakoutFailure = true; // test system A
                obj.N = 0;
                obj.leavePeriod = leavePeriodA;
            }
            obj.holdProfit = 0;
            obj.lastErr = "";
            obj.lastErrTime = "";
        };

        obj.Status = function() {
            obj.status.N = obj.N;
            obj.status.marketPosition = obj.marketPosition;
            obj.status.holdPrice = obj.holdPrice;
            obj.status.holdAmount = obj.holdAmount;
            obj.status.lastPrice = obj.lastPrice;
            if (obj.lastPrice > 0 && obj.holdAmount > 0 && obj.marketPosition !== 0) {
                obj.status.holdProfit = _N((obj.lastPrice - obj.holdPrice) * obj.holdAmount * symbolDetail.VolumeMultiple, 4) * (obj.marketPosition > 0 ? 1 : -1);
            } else {
                obj.status.holdProfit = 0;
            }
            return obj.status;
        };
        obj.setTask = function(action, amount, onFinish) {
            obj.task.init = false;
            obj.task.retry = 0;
            obj.task.action = action;
            obj.task.preAmount = 0;
            obj.task.preCost = 0;
            obj.task.amount = typeof(amount) === 'number' ? amount : 0;
            obj.task.onFinish = onFinish;
            if (action == ACT_IDLE) {
                obj.task.desc = "空闲";
                obj.task.onFinish = null;
            } else {
                if (action !== ACT_COVER) {
                    obj.task.desc = (action == ACT_LONG ? "加多仓" : "加空仓") + "(" + amount + ")";
                } else {
                    obj.task.desc = "平仓";
                }
                Log("接收到任务", obj.symbol, obj.task.desc);
                // process immediately
                obj.Poll(true);
            }
        };
        obj.processTask = function() {
            var insDetail = exchange.SetContractType(obj.symbol);
            if (!insDetail) {
                return ERR_SET_SYMBOL;
            }
            var SlideTick = 1;
            var ret = false;
            if (obj.task.action == ACT_COVER) {
                var hasPosition = false;
                do {
                    if (!$.IsTrading(obj.symbol)) {
                        return ERR_NOT_TRADING;
                    }
                    hasPosition = false;
                    var positions = exchange.GetPosition();
                    if (!positions) {
                        return ERR_GET_POS;
                    }
                    var depth = exchange.GetDepth();
                    if (!depth) {
                        return ERR_GET_DEPTH;
                    }
                    var orderId = null;
                    for (var i = 0; i < positions.length; i++) {
                        if (positions[i].ContractType !== obj.symbol) {
                            continue;
                        }
                        var amount = Math.min(insDetail.MaxLimitOrderVolume, positions[i].Amount);
                        if (positions[i].Type == PD_LONG || positions[i].Type == PD_LONG_YD) {
                            exchange.SetDirection(positions[i].Type == PD_LONG ? "closebuy_today" : "closebuy");
                            orderId = exchange.Sell(_N(depth.Bids[0].Price - (insDetail.PriceTick * SlideTick), 2), Math.min(amount, depth.Bids[0].Amount), obj.symbol, positions[i].Type == PD_LONG ? "平今" : "平昨", 'Bid', depth.Bids[0]);
                            hasPosition = true;
                        } else if (positions[i].Type == PD_SHORT || positions[i].Type == PD_SHORT_YD) {
                            exchange.SetDirection(positions[i].Type == PD_SHORT ? "closesell_today" : "closesell");
                            orderId = exchange.Buy(_N(depth.Asks[0].Price + (insDetail.PriceTick * SlideTick), 2), Math.min(amount, depth.Asks[0].Amount), obj.symbol, positions[i].Type == PD_SHORT ? "平今" : "平昨", 'Ask', depth.Asks[0]);
                            hasPosition = true;
                        }
                    }
                    if (hasPosition) {
                        if (!orderId) {
                            return ERR_TRADE;
                        }
                        Sleep(1000);
                        while (true) {
                            // Wait order, not retry
                            var orders = exchange.GetOrders();
                            if (!orders) {
                                return ERR_GET_ORDERS;
                            }
                            if (orders.length == 0) {
                                break;
                            }
                            for (var i = 0; i < orders.length; i++) {
                                exchange.CancelOrder(orders[i].Id);
                                Sleep(500);
                            }
                        }
                    }
                } while (hasPosition);
                ret = true;
            } else if (obj.task.action == ACT_LONG || obj.task.action == ACT_SHORT) {
                do {
                    if (!$.IsTrading(obj.symbol)) {
                        return ERR_NOT_TRADING;
                    }
                    Sleep(1000);
                    while (true) {
                        // Wait order, not retry
                        var orders = exchange.GetOrders();
                        if (!orders) {
                            return ERR_GET_ORDERS;
                        }
                        if (orders.length == 0) {
                            break;
                        }
                        for (var i = 0; i < orders.length; i++) {
                            exchange.CancelOrder(orders[i].Id);
                            Sleep(500);
                        }
                    }
                    var positions = exchange.GetPosition();
                    // Error
                    if (!positions) {
                        return ERR_GET_POS;
                    }
                    // search position
                    var pos = null;
                    for (var i = 0; i < positions.length; i++) {
                        if (positions[i].ContractType == obj.symbol && (((positions[i].Type == PD_LONG || positions[i].Type == PD_LONG_YD) && obj.task.action == ACT_LONG) || ((positions[i].Type == PD_SHORT || positions[i].Type == PD_SHORT_YD) && obj.task.action == ACT_SHORT))) {
                            if (!pos) {
                                pos = positions[i];
                                pos.Cost = positions[i].Price * positions[i].Amount;
                            } else {
                                pos.Amount += positions[i].Amount;
                                pos.Profit += positions[i].Profit;
                                pos.Cost += positions[i].Price * positions[i].Amount;
                            }
                        }
                    }
                    // record pre position
                    if (!obj.task.init) {
                        obj.task.init = true;
                        if (pos) {
                            obj.task.preAmount = pos.Amount;
                            obj.task.preCost = pos.Cost;
                        } else {
                            obj.task.preAmount = 0;
                            obj.task.preCost = 0;
                        }
                    }
                    var remain = obj.task.amount;
                    if (pos) {
                        obj.task.dealAmount = pos.Amount - obj.task.preAmount;
                        remain = parseInt(obj.task.amount - obj.task.dealAmount);
                        if (remain <= 0 || obj.task.retry >= MaxTaskRetry) {
                            ret = {
                                price: (pos.Cost - obj.task.preCost) / (pos.Amount - obj.task.preAmount),
                                amount: (pos.Amount - obj.task.preAmount),
                                position: pos
                            };
                            break;
                        }
                    } else if (obj.task.retry >= MaxTaskRetry) {
                        ret = null;
                        break;
                    }

                    var depth = exchange.GetDepth();
                    if (!depth) {
                        return ERR_GET_DEPTH;
                    }
                    var orderId = null;
                    if (obj.task.action == ACT_LONG) {
                        exchange.SetDirection("buy");
                        orderId = exchange.Buy(_N(depth.Asks[0].Price + (insDetail.PriceTick * SlideTick), 2), Math.min(remain, depth.Asks[0].Amount), obj.symbol, 'Ask', depth.Asks[0]);
                    } else {
                        exchange.SetDirection("sell");
                        orderId = exchange.Sell(_N(depth.Bids[0].Price - (insDetail.PriceTick * SlideTick), 2), Math.min(remain, depth.Bids[0].Amount), obj.symbol, 'Bid', depth.Bids[0]);
                    }
                    // symbol not in trading or other else happend
                    if (!orderId) {
                        obj.task.retry++;
                        return ERR_TRADE;
                    }
                } while (true);
            }
            if (obj.task.onFinish) {
                obj.task.onFinish(ret);
            }
            obj.setTask(ACT_IDLE);
            return ERR_SUCCESS;
        };
        obj.Poll = function(subroutine) {
            obj.status.isTrading = $.IsTrading(obj.symbol);
            if (!obj.status.isTrading) {
                return;
            }
            if (obj.task.action != ACT_IDLE) {
                var retCode = obj.processTask();
                if (obj.task.action != ACT_IDLE) {
                    obj.setLastError("任务没有处理成功: " + errMsg[retCode] + ", " + obj.task.desc + ", 重试: " + obj.task.retry);
                } else {
                    obj.setLastError();
                }
                return;
            }
            if (typeof(subroutine) !== 'undefined' && subroutine) {
                return;
            }
            // Loop
            var suffix = WXPush ? '@' : '';
            // switch symbol
            _C(exchange.SetContractType, obj.symbol);
            var records = exchange.GetRecords();
            if (!records) {
                obj.setLastError("获取K线失败");
                return;
            }
            obj.status.recordsLen = records.length;
            if (records.length < obj.atrLen) {
                obj.setLastError("K线长度小于 " + obj.atrLen);
                return;
            }
            var opCode = 0; // 0: IDLE, 1: LONG, 2: SHORT, 3: CoverALL
            var lastPrice = records[records.length - 1].Close;
            obj.lastPrice = lastPrice;
            if (obj.marketPosition === 0) {
                obj.status.stopPrice = '--';
                obj.status.leavePrice = '--';
                obj.status.upLine = 0;
                obj.status.downLine = 0;
                for (var i = 0; i < 2; i++) {
                    if (i == 0 && obj.useFilter && !obj.preBreakoutFailure) {
                        continue;
                    }
                    var enterPeriod = i == 0 ? obj.enterPeriodA : obj.enterPeriodB;
                    if (records.length < (enterPeriod + 1)) {
                        continue;
                    }
                    var highest = TA.Highest(records, enterPeriod, 'High');
                    var lowest = TA.Lowest(records, enterPeriod, 'Low');
                    obj.status.upLine = obj.status.upLine == 0 ? highest : Math.min(obj.status.upLine, highest);
                    obj.status.downLine = obj.status.downLine == 0 ? lowest : Math.max(obj.status.downLine, lowest);
                    if (lastPrice > highest) {
                        opCode = 1;
                    } else if (lastPrice < lowest) {
                        opCode = 2;
                    }
                    if (opCode != 0) {
                        obj.leavePeriod = (enterPeriod == obj.enterPeriodA) ? obj.leavePeriodA : obj.leavePeriodB;
                        break;
                    }
                }
            } else {
                var spread = obj.marketPosition > 0 ? (obj.openPrice - lastPrice) : (lastPrice - obj.openPrice);
                obj.status.stopPrice = _N(obj.openPrice + (obj.N * StopLossRatio * (obj.marketPosition > 0 ? -1 : 1)));
                if (spread > (obj.N * StopLossRatio)) {
                    opCode = 3;
                    obj.preBreakoutFailure = true;
                    Log(obj.symbolDetail.InstrumentName, "止损平仓", suffix);
                    obj.status.st++;
                } else if (-spread > (IncSpace * obj.N)) {
                    opCode = obj.marketPosition > 0 ? 1 : 2;
                } 
                if (opCode == 0 && records.length > obj.leavePeriod) {
                    obj.status.leavePrice = obj.marketPosition > 0 ? TA.Lowest(records, obj.leavePeriod, 'Low') : TA.Highest(records, obj.leavePeriod, 'High');
                    if ((obj.marketPosition > 0 && lastPrice < obj.status.leavePrice) ||
                        (obj.marketPosition < 0 && lastPrice > obj.status.leavePrice)) {
                        obj.preBreakoutFailure = false;
                        Log(obj.symbolDetail.InstrumentName, "正常平仓", suffix);
                        opCode = 3;
                        obj.status.cover++;
                    }
                }
            }

            if (opCode == 0) {
                return;
            }
            if (opCode == 3) {
                obj.setTask(ACT_COVER, 0, function(ret) {
                    obj.reset();
                    _G(obj.symbol, null);
                });
                return;
            }
            // Open
            if (Math.abs(obj.marketPosition) >= obj.maxLots) {
                obj.setLastError("禁止开仓, 超过最大持仓 " + obj.maxLots);
                return;
            }
            var atrs = TA.ATR(records, atrLen);
            var N = _N(atrs[atrs.length - 1], 4);

            var account = _bot.GetAccount();
            var currMargin = JSON.parse(exchange.GetRawJSON()).CurrMargin;
            var unit = parseInt((account.Balance+currMargin-obj.keepBalance) * (obj.riskRatio / 100) / N / obj.symbolDetail.VolumeMultiple);
            var canOpen = parseInt((account.Balance-obj.keepBalance) / (opCode == 1 ? obj.symbolDetail.LongMarginRatio : obj.symbolDetail.ShortMarginRatio) / (lastPrice * 1.2) / obj.symbolDetail.VolumeMultiple);
            unit = Math.min(unit, canOpen);
            if (unit < obj.symbolDetail.MinLimitOrderVolume) {
                obj.setLastError("可开 " + unit + " 手 无法开仓, " + (canOpen >= obj.symbolDetail.MinLimitOrderVolume ? "风控触发" : "资金限制"));
                return;
            }
            obj.setTask((opCode == 1 ? ACT_LONG : ACT_SHORT), unit, function(ret) {
                if (!ret) {
                    obj.setLastError("下单失败");
                    return;
                }
                Log(obj.symbolDetail.InstrumentName, obj.marketPosition == 0 ? "开仓" : "加仓", "离市周期", obj.leavePeriod, suffix);
                obj.N = N;
                obj.openPrice = ret.price;
                obj.holdPrice = ret.position.Price;
                if (obj.marketPosition == 0) {
                    obj.status.open++;
                }
                obj.holdAmount = ret.position.Amount;
                obj.marketPosition += opCode == 1 ? 1 : -1;
                obj.status.vm = [obj.marketPosition, obj.openPrice, N, obj.leavePeriod, obj.preBreakoutFailure];
                _G(obj.symbol, obj.status.vm);
            });
        };
        var vm = null;
        if (RMode === 0) {
            vm = _G(obj.symbol);
        } else {
            vm = JSON.parse(VMStatus)[obj.symbol];
        }
        if (vm) {
            Log("准备恢复进度, 当前合约状态为", vm);
            obj.reset(vm[0], vm[1], vm[2], vm[3], vm[4]);
        } else {
            if (needRestore) {
                Log("没有找到" + obj.symbol + "的进度恢复信息");
            }
            obj.reset();
        }
        return obj;
    }
};

function onexit() {
    Log("已退出策略...");
}

function main() {
    if (exchange.GetName().indexOf('CTP') == -1) {
        throw "只支持商品期货CTP";
    }
    SetErrorFilter("login|ready|流控|连接失败|初始|Timeout");
    var mode = exchange.IO("mode", 0);
    if (typeof(mode) !== 'number') {
        throw "切换模式失败, 请更新到最新托管者!";
    }
    while (!exchange.IO("status")) {
        Sleep(3000);
        LogStatus("正在等待与交易服务器连接, " + new Date());
    }
    var positions = _C(exchange.GetPosition);
    if (positions.length > 0) {
        Log("检测到当前持有仓位, 系统将开始尝试恢复进度...");
        Log("持仓信息", positions);
    }
    Log("风险系数:", RiskRatio, "N值周期:", ATRLength, "系统1: 入市周期", EnterPeriodA, "离市周期", LeavePeriodA, "系统二: 入市周期", EnterPeriodB, "离市周期", LeavePeriodB, "加仓系数:", IncSpace, "止损系数:", StopLossRatio, "单品种最多开仓:", MaxLots, "次");
    var initAccount = _bot.GetAccount();
    var initMargin = JSON.parse(exchange.GetRawJSON()).CurrMargin;
    var keepBalance = _N((initAccount.Balance + initMargin) * (KeepRatio/100), 3);
    Log("资产信息", initAccount, "保留资金:", keepBalance);
    
    var tts = [];
    var filter = [];
    var arr = Instruments.split(',');
    for (var i = 0; i < arr.length; i++) {
        var symbol = arr[i].replace(/^\s+/g, "").replace(/\s+$/g, "");
        if (typeof(filter[symbol]) !== 'undefined') {
            Log(symbol, "已经存在, 系统已自动过滤");
            continue;
        }
        filter[symbol] = true;
        var hasPosition = false;
        for (var j = 0; j < positions.length; j++) {
            if (positions[j].ContractType == symbol) {
                hasPosition = true;
                break;
            }
        }
        var obj = TTManager.New(hasPosition, symbol, keepBalance, RiskRatio, ATRLength, EnterPeriodA, LeavePeriodA, EnterPeriodB, LeavePeriodB, UseEnterFilter, IncSpace, StopLossRatio, MaxLots);
        tts.push(obj);
    }
    

    var preTotalHold = -1;
    var lastStatus = '';
    while (true) {
        if (GetCommand() === "暂停/继续") {
            Log("暂停交易中...");
            while (GetCommand() !== "暂停/继续") {
                Sleep(1000);
            }
            Log("继续交易中...");
        }
        while (!exchange.IO("status")) {
            Sleep(3000);
            LogStatus("正在等待与交易服务器连接, " + new Date() + "\n" + lastStatus);
        }
        var tblStatus = {
            type: "table",
            title: "持仓信息",
            cols: ["合约名称", "持仓方向", "持仓均价", "持仓数量", "持仓盈亏", "加仓次数", "开仓次数", "止损次数", "成功次数", "当前价格", "N"],
            rows: []
        };
        var tblMarket = {
            type: "table",
            title: "运行状态",
            cols: ["合约名称", "合约乘数", "保证金率", "交易时间", "柱线长度", "上线", "下线", "止损价", "离市价", "异常描述", "发生时间"],
            rows: []
        };
        var totalHold = 0;
        var vmStatus = {};
        var ts = new Date().getTime();
        var holdSymbol = 0;
        for (var i = 0; i < tts.length; i++) {
            tts[i].Poll();
            var d = tts[i].Status();
            if (d.holdAmount > 0) {
                vmStatus[d.symbol] = d.vm;
                holdSymbol++;
            }
            tblStatus.rows.push([d.symbolDetail.InstrumentName, d.holdAmount == 0 ? '--' : (d.marketPosition > 0 ? '多' : '空'), d.holdPrice, d.holdAmount, d.holdProfit, Math.abs(d.marketPosition), d.open, d.st, d.cover, d.lastPrice, d.N]);
            tblMarket.rows.push([d.symbolDetail.InstrumentName, d.symbolDetail.VolumeMultiple, _N(d.symbolDetail.LongMarginRatio, 4) + '/' + _N(d.symbolDetail.ShortMarginRatio, 4), (d.isTrading ? '是#0000ff' : '否#ff0000'), d.recordsLen, d.upLine, d.downLine, d.stopPrice, d.leavePrice, d.lastErr, d.lastErrTime]);
            totalHold += Math.abs(d.holdAmount);
        }
        var now = new Date();
        var elapsed = now.getTime() - ts;
        var tblAssets = _bot.GetAccount(true);
        var nowAccount = _bot.Account();
       
        if (tblAssets.rows.length > 10) {
            // replace AccountId
            tblAssets.rows[0] = ["InitAccount", "初始资产", initAccount];
        } else {
            tblAssets.rows.unshift(["NowAccount", "当前可用", nowAccount], ["InitAccount", "初始资产", initAccount]);
        }
        lastStatus = '`' + JSON.stringify([tblStatus, tblMarket, tblAssets]) + '`\n轮询耗时: ' + elapsed + ' 毫秒, 当前时间: ' + now.toLocaleString() + ', 星期' + ['日', '一', '二', '三', '四', '五', '六'][now.getDay()] + ", 持有品种个数: " + holdSymbol;
        if (totalHold > 0) {
            lastStatus += "\n手动恢复字符串: " + JSON.stringify(vmStatus);
        }
        LogStatus(lastStatus);
        if (preTotalHold > 0 && totalHold == 0) {
            LogProfit(nowAccount.Balance - initAccount.Balance - initMargin);
        }
        preTotalHold = totalHold;
        Sleep(LoopInterval * 1000);
    }
}
```

> 策略出处

https://www.fmz.com/strategy/17289

> 更新时间

2018-03-23 22:33:42
