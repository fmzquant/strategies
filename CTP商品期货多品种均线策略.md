
> 策略名称

CTP商品期货多品种均线策略

> 策略作者

小小梦

> 策略描述

- 只支持操作CTP商品期货
- 支持自动或手动恢复进度
- 可同时操作多个不同品种
- 增加时间段区分与各种网络错误问题的应对处理

基于[CTP商品期货多品种海龟交易策略](https://www.fmz.com/strategy/17289)修改，用于学习。

相关文章：
https://www.fmz.com/bbs-topic/5235


> 策略参数



|参数|默认值|描述|
|----|----|----|
|Instruments|rb888,MA888,jd888|合约列表|
|LoopInterval|3|轮询周期(秒)|
|RMode|0|进度恢复模式: 自动|手动|
|VMStatus|{}|手动恢复字符串|
|WXPush|true|推送交易信息|
|MaxTaskRetry|5|开仓最多重试次数|
|KeepRatio|10|预留保证金比例|
|FastPeriodArr|10,12,14|快线周期参数|
|SlowPeriodArr|20,14,30|慢线周期参数|




|按钮|默认值|描述|
|----|----|----|
|暂停/继续|__button__|暂停/继续|


> 源码 (javascript)

``` javascript
/*backtest
start: 2019-07-01 09:00:00
end: 2020-03-25 15:00:00
period: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
*/

var _bot = $.NewPositionManager();

var Manager = {
    New: function(needRestore, symbol, keepBalance, fastPeriod, slowPeriod) {
        var symbolDetail = _C(exchange.SetContractType, symbol);
        if (symbolDetail.VolumeMultiple == 0 || symbolDetail.MaxLimitOrderVolume == 0 || symbolDetail.MinLimitOrderVolume == 0 || symbolDetail.LongMarginRatio == 0 || symbolDetail.ShortMarginRatio == 0) {
            Log(symbolDetail);
            throw "合约信息异常";
        } else {
            Log("合约", symbolDetail.InstrumentName, "一手", symbolDetail.VolumeMultiple, "份, 最大下单量", symbolDetail.MaxLimitOrderVolume, "保证金率:", _N(symbolDetail.LongMarginRatio), _N(symbolDetail.ShortMarginRatio), "交割日期", symbolDetail.StartDelivDate);
        }

        // 声明枚举量
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

        // 构造对象
        var obj = {
            symbol: symbol,
            keepBalance: keepBalance,
            // 设置策略相关参数
            fastPeriod: fastPeriod,
            slowPeriod: slowPeriod
        };

        // 初始化任务对象
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

        obj.lastPrice = 0;
        obj.symbolDetail = symbolDetail;

        // 持仓状态信息
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

            symbolDetail: symbolDetail,
            lastErr: "",
            lastErrTime: "",
            // 可以增加一些显示的数值属性
            
            isTrading: false
        };

        // 设置错误的功能函数
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

        // 恢复函数
        obj.reset = function(marketPosition) {
            if (typeof(marketPosition) !== 'undefined') {
                obj.marketPosition = marketPosition;
                // 例如多品种海龟策略，需要恢复N值，入市周期、离市周期等程序运行中的数据，可以在此处恢复，如不清楚，可以参考原版多品种海龟策略此处的代码
                
                var pos = _bot.GetPosition(obj.symbol, marketPosition > 0 ? PD_LONG : PD_SHORT);
                if (pos) {
                    obj.holdPrice = pos.Price;
                    obj.holdAmount = pos.Amount;
                    Log(obj.symbol, "仓位", pos);
                } else {
                    throw "恢复" + obj.symbol + "的持仓状态出错, 没有找到仓位信息";
                }
                
                // 可以根据策略，打印一些恢复后的数据，参考原版多品种海龟策略
                Log("恢复", obj.symbol, "持仓均价:", obj.holdPrice, "持仓数量:", obj.holdAmount);
                obj.status.vm = [obj.marketPosition];
            } else {
                obj.marketPosition = 0;
                obj.holdPrice = 0;
                
                obj.holdAmount = 0;
                obj.holdProfit = 0;
            }
            obj.holdProfit = 0;
            obj.lastErr = "";
            obj.lastErrTime = "";
        };

        // 更新状态，返回用于显示的状态数据
        obj.Status = function() {
            
            obj.status.marketPosition = obj.marketPosition;
            obj.status.holdPrice = obj.holdPrice;
            obj.status.holdAmount = obj.holdAmount;
            obj.status.lastPrice = obj.lastPrice;
            if (obj.lastPrice > 0 && obj.holdAmount > 0 && obj.marketPosition !== 0) {
                // 计算收益
                obj.status.holdProfit = _N((obj.lastPrice - obj.holdPrice) * obj.holdAmount * symbolDetail.VolumeMultiple, 4) * (obj.marketPosition > 0 ? 1 : -1);
            } else {
                obj.status.holdProfit = 0;
            }
            return obj.status;
        };

        // 处理交易的逻辑层面，设置交易任务的函数
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

        // 处理交易任务的函数
        obj.processTask = function() {
            var insDetail = exchange.SetContractType(obj.symbol);
            if (!insDetail) {
                return ERR_SET_SYMBOL;
            }
            var SlideTick = 1;     // 滑价可以根据合约设置
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

        // 策略逻辑执行函数
        obj.Poll = function(subroutine) {
        	// 判断交易时段
            obj.status.isTrading = $.IsTrading(obj.symbol);
            if (!obj.status.isTrading) {
                return;
            }

            // 执行下单交易任务
            if (obj.task.action != ACT_IDLE) {
                var retCode = obj.processTask();
                if (obj.task.action != ACT_IDLE) {
                    obj.setLastError("任务没有处理成功: " + errMsg[retCode] + ", " + obj.task.desc + ", 重试: " + obj.task.retry);
                } else {
                    obj.setLastError();
                }
                return;
            }
            // 调用Poll时如果设置了subroutine参数，只运行到此处，这个是程序设计的一个小技巧
            if (typeof(subroutine) !== 'undefined' && subroutine) {
                return;
            }

            // 根据参数设置微信推送
            var suffix = WXPush ? '@' : '';
            // switch symbol
            _C(exchange.SetContractType, obj.symbol);

            // 获取K线数据
            var records = exchange.GetRecords();
            if (!records) {
                obj.setLastError("获取K线失败");
                return;
            }
            obj.status.recordsLen = records.length;

            if (records.length < (obj.fastPeriod + 2) || records.length < (obj.slowPeriod +2)) {
                obj.setLastError("K线长度小于 均线周期：" + obj.fastPeriod + "或" + obj.slowPeriod);
                return;
            }

            var opCode = 0; // 0: IDLE 空闲, 1: LONG 做多, 2: SHORT 做空, 3: CoverALL 当前合约全部平仓。opCode 是操作码，以下策略逻辑检测到条件后设置对应的操作码
            var lastPrice = records[records.length - 1].Close;
            obj.lastPrice = lastPrice;

            var fastMA = TA.EMA(records, obj.fastPeriod)
            var slowMA = TA.EMA(records, obj.slowPeriod)
            
            // 策略逻辑
            if (obj.marketPosition === 0) {         // 不持仓时
                // 根据交易逻辑赋值opCode信号，程序后续根据信号处理
                if(fastMA[fastMA.length - 3] < slowMA[slowMA.length - 3] && fastMA[fastMA.length - 2] > slowMA[slowMA.length - 2]) {           // long   均线金叉做多
                    opCode = 1
                } else if (fastMA[fastMA.length - 3] > slowMA[slowMA.length - 3] && fastMA[fastMA.length - 2] < slowMA[slowMA.length - 2]) {   // short  均线死叉做空
                    opCode = 2
                }
            } else {                                 // 持仓时
                if(obj.marketPosition < 0 && fastMA[fastMA.length - 3] < slowMA[slowMA.length - 3] && fastMA[fastMA.length - 2] > slowMA[slowMA.length - 2]) {           // 持空头仓位，金叉，平仓
                    opCode = 3
                } else if (obj.marketPosition > 0 && fastMA[fastMA.length - 3] > slowMA[slowMA.length - 3] && fastMA[fastMA.length - 2] < slowMA[slowMA.length - 2]) {   // 持多头仓位，死叉，平仓
                    opCode = 3
                }
                
                // 可以设计更加复杂的交易逻辑，加仓、减仓、止损、止盈等，可以参考原版多品种海龟策略
            }
            
            // 如果不触发任何条件，操作码为0，返回
            if (opCode == 0) {
                return;
            }

            // 执行平仓
            if (opCode == 3) {
                obj.setTask(ACT_COVER, 0, function(ret) {   // 设置回调，清空保存的持久化数据
                    obj.reset();
                    _G(obj.symbol, null);
                });
                return;
            }

            // 参考原版多品种海龟交易策略
            /*
            if (Math.abs(obj.marketPosition) >= obj.maxLots) {
                obj.setLastError("禁止开仓, 超过最大持仓 " + obj.maxLots);
                return;
            }
            */

            var account = _bot.GetAccount();
            var canOpen = parseInt((account.Balance-obj.keepBalance) / (opCode == 1 ? obj.symbolDetail.LongMarginRatio : obj.symbolDetail.ShortMarginRatio) / (lastPrice * 1.2) / obj.symbolDetail.VolumeMultiple);
            var unit = Math.min(1, canOpen);    // 开仓数量处理

            // 设置交易任务
            obj.setTask((opCode == 1 ? ACT_LONG : ACT_SHORT), unit, function(ret) {
                if (!ret) {
                    obj.setLastError("下单失败");
                    return;
                }

                // 下单成功后，打印一些信息，保存一些数据，参考原版多品种海龟交易策略
                
                obj.holdPrice = ret.position.Price;
                obj.holdAmount = ret.position.Amount;
                obj.marketPosition += opCode == 1 ? 1 : -1;
                obj.status.vm = [obj.marketPosition];
                _G(obj.symbol, obj.status.vm);
            });
        };

        // 对象构造函数New函数的其它处理工作
        var vm = null;
        if (RMode === 0) {
            vm = _G(obj.symbol);
        } else {
            vm = JSON.parse(VMStatus)[obj.symbol];
        }
        if (vm) {
            Log("准备恢复进度, 当前合约状态为", vm);
            // 恢复进度，和reset函数传入参数相关，当前策略只有一个持仓参数，可以参考原版多品种海龟策略加以比较学习
            obj.reset(vm[0]);
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
    // 可以打印一些策略设置的参数

    var initAccount = _bot.GetAccount();
    var initMargin = JSON.parse(exchange.GetRawJSON()).CurrMargin;
    var keepBalance = _N((initAccount.Balance + initMargin) * (KeepRatio/100), 3);
    Log("资产信息", initAccount, "保留资金:", keepBalance);
    
    var tts = [];
    var filter = [];
    var arr = Instruments.split(',');
    var arrFastPeriod = FastPeriodArr.split(',')
    var arrSlowPeriod = SlowPeriodArr.split(',')
    if (arr.length != arrFastPeriod.length || arr.length != arrSlowPeriod.length) {
        throw "均线周期参数与添加合约数量不匹配，请检查参数！"
    }
    for (var i = 0; i < arr.length; i++) {
        var symbol = arr[i].replace(/^\s+/g, "").replace(/\s+$/g, "");
        if (typeof(filter[symbol]) !== 'undefined') {
            throw symbol + "已经存在，请检查参数!"
        }
        filter[symbol] = true;
        var hasPosition = false;
        for (var j = 0; j < positions.length; j++) {
            if (positions[j].ContractType == symbol) {
                hasPosition = true;
                break;
            }
        }
        var fastPeriod = parseInt(arrFastPeriod[i])
        var slowPeriod = parseInt(arrSlowPeriod[i])
        var obj = Manager.New(hasPosition, symbol, keepBalance, fastPeriod, slowPeriod)
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
            cols: ["合约名称", "持仓方向", "持仓均价", "持仓数量", "持仓盈亏", "加仓次数", "当前价格"],
            rows: []
        };
        var tblMarket = {
            type: "table",
            title: "运行状态",
            cols: ["合约名称", "合约乘数", "保证金率", "交易时间", "柱线长度", "异常描述", "发生时间"],
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
            tblStatus.rows.push([d.symbolDetail.InstrumentName, d.holdAmount == 0 ? '--' : (d.marketPosition > 0 ? '多' : '空'), d.holdPrice, d.holdAmount, d.holdProfit, Math.abs(d.marketPosition), d.lastPrice]);
            tblMarket.rows.push([d.symbolDetail.InstrumentName, d.symbolDetail.VolumeMultiple, _N(d.symbolDetail.LongMarginRatio, 4) + '/' + _N(d.symbolDetail.ShortMarginRatio, 4), (d.isTrading ? '是#0000ff' : '否#ff0000'), d.recordsLen, d.lastErr, d.lastErrTime]);
            totalHold += Math.abs(d.holdAmount);
        }

        // 显示状态栏信息
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

https://www.fmz.com/strategy/193043

> 更新时间

2020-03-26 17:17:47
