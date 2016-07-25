/*
策略出处: https://www.botvs.com/strategy/17289
策略名称: CTP商品期货多品种海龟交易策略
策略作者: Zero
策略描述:

- 只支持操作CTP商品期货
- 支持自动或手动恢复进度
- 可同时操作多个不同品种
- 移仓功能目前正在加入中


`有商品期货操作经验的用户, 可以免费申请注册码使用`

请下载最新托管者并比较版本号是否最新
``` text
$ ./robot -v
BotVS docker 3.0 compiled at 2016-07-05T09:56:18+0800
```

 https://dn-filebox.qbox.me/d33687abb648c489b6883296685e8717ea3f44ca.png


参数              默认值                                                                                                              描述
--------------  ---------------------------------------------------------------------------------------------------------------  -----------------------
Instruments     MA701,CF701,zn1701,SR701,pp1701,l1701,hc1610,ni1701,i1701,v1701,rb1610,jm1701,ag1612,al1701,jd1701,cs1701,p1701  合约列表
LoopInterval    3                                                                                                                轮询周期(秒)
RiskRatio       true                                                                                                             % Risk Per N ( 0 - 100)
ATRLength       20                                                                                                               ATR计算周期
EnterPeriodA    20                                                                                                               系统一入市周期
LeavePeriodA    10                                                                                                               系统一离市周期
EnterPeriodB    55                                                                                                               系统二入市周期
LeavePeriodB    20                                                                                                               系统二离市周期
UseEnterFilter  true                                                                                                             使用入市过滤
IncSpace        0.5                                                                                                              加仓间隔(N的倍数)
StopLossRatio   2                                                                                                                止损系数(N的倍数)
MaxLots         4                                                                                                                单品种加仓次数
RMode           0                                                                                                                进度恢复模式: 自动|手动
VMStatus        {}                                                                                                               手动恢复字符串
WXPush          true                                                                                                             推送交易信息
*/


var _bot = $.NewPositionManager();

var TTManager = {
    New: function(needRestore, symbol, riskRatio, atrLen, enterPeriodA, leavePeriodA, enterPeriodB, leavePeriodB, useFilter,
        multiplierN, multiplierS, maxLots) {

        // subscribe
        var symbolDetail = _C(exchange.SetContractType, symbol);
        if (symbolDetail.VolumeMultiple == 0 || symbolDetail.MaxLimitOrderVolume == 0 || symbolDetail.MinLimitOrderVolume == 0 || symbolDetail.LongMarginRatio == 0 || symbolDetail.ShortMarginRatio == 0) {
            Log(symbolDetail);
            throw "合约信息异常";
        } else {
            Log("合约", symbolDetail.InstrumentName, "一手", symbolDetail.VolumeMultiple, "份, 最大下单量", symbolDetail.MaxLimitOrderVolume, "保证金率:", _N(symbolDetail.LongMarginRatio), _N(symbolDetail.ShortMarginRatio), "交割日期", symbolDetail.StartDelivDate);
        }

        var obj = {
            symbol: symbol,
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
            lastErrTime: ""
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
        obj.Poll = function() {
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
                    obj.leavePeriod = (enterPeriod == obj.enterPeriodA) ? obj.leavePeriodA : obj.leavePeriodB;
                }
            } else {
                var spread = obj.marketPosition > 0 ? (obj.openPrice - lastPrice) : (lastPrice - obj.openPrice);
                if (spread > (obj.N * 2)) {
                    opCode = 3;
                    obj.preBreakoutFailure = true;
                    Log(obj.symbolDetail.InstrumentName, "止损平仓", suffix);
                    obj.status.st++;
                } else if (-spread > (0.5 * obj.N)) {
                    opCode = obj.marketPosition > 0 ? 1 : 2;
                } else if (records.length > obj.leavePeriod) {
                    if ((obj.marketPosition > 0 && lastPrice < TA.Lowest(records, obj.leavePeriod, 'Low')) ||
                        (obj.marketPosition < 0 && lastPrice > TA.Highest(records, obj.leavePeriod, 'High'))) {
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
                _bot.Cover(obj.symbol);
                obj.reset();
                _G(obj.symbol, null);
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
            var unit = parseInt(account.Balance * (obj.riskRatio / 100) / N / obj.symbolDetail.VolumeMultiple);
            var canOpen = parseInt(account.Balance / (opCode == 1 ? obj.symbolDetail.LongMarginRatio : obj.symbolDetail.ShortMarginRatio) / (lastPrice * 1.2) / obj.symbolDetail.VolumeMultiple);
            unit = Math.min(unit, canOpen);
            if (unit < obj.symbolDetail.MinLimitOrderVolume) {
                obj.setLastError("可开 " + unit + " 手 过小无法开仓");
                return;
            }


            var ret = null;
            if (opCode == 1) {
                ret = _bot.OpenLong(obj.symbol, unit);
            } else {
                ret = _bot.OpenShort(obj.symbol, unit);
            }
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
                throw "没有找到" + obj.symbol + "的进度恢复信息";
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
    }
    Log("风险系数:", RiskRatio, "N值周期:", ATRLength, "系统1: 入市周期", EnterPeriodA, "离市周期", LeavePeriodA, "系统二: 入市周期", EnterPeriodB, "离市周期", LeavePeriodB, "加仓系数:", IncSpace, "止损系数:", StopLossRatio, "单品种最多开仓:", MaxLots, "次");
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
        var obj = TTManager.New(hasPosition, symbol, RiskRatio, ATRLength, EnterPeriodA, LeavePeriodA, EnterPeriodB, LeavePeriodB, UseEnterFilter, IncSpace, StopLossRatio, MaxLots);
        tts.push(obj);
    }
    var initAccount = _bot.GetAccount();
    Log("资产信息", initAccount);

    var preTotalHold = -1;
    var lastStatus = '';
    while (true) {
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
            title: "数据信息",
            cols: ["合约名称", "合约乘数", "保证金率", "柱线长度", "上线", "下线", "异常描述", "发生时间"],
            rows: []
        };
        var totalHold = 0;
        var vmStatus = {};
        var ts = new Date().getTime();
        for (var i = 0; i < tts.length; i++) {
            tts[i].Poll();
            var d = tts[i].Status();
            if (d.holdAmount > 0) {
                vmStatus[d.symbol] = d.vm;
            }
            tblStatus.rows.push([d.symbolDetail.InstrumentName, d.holdAmount == 0 ? '--' : (d.marketPosition > 0 ? '多' : '空'), d.holdPrice, d.holdAmount, d.holdProfit, Math.abs(d.marketPosition), d.open, d.st, d.cover, d.lastPrice, d.N]);
            tblMarket.rows.push([d.symbolDetail.InstrumentName, d.symbolDetail.VolumeMultiple, _N(d.symbolDetail.LongMarginRatio, 4) + '/' + _N(d.symbolDetail.ShortMarginRatio, 4), d.recordsLen, d.upLine, d.downLine, d.lastErr, d.lastErrTime]);
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
        lastStatus = '`' + JSON.stringify([tblStatus, tblMarket, tblAssets]) + '`\n轮询耗时: ' + elapsed + ' 毫秒, 当前时间: ' + now.toLocaleString();
        if (totalHold > 0) {
            lastStatus += "\n手动恢复字符串: " + JSON.stringify(vmStatus);
        }
        LogStatus(lastStatus);
        if (preTotalHold > 0 && totalHold == 0) {
            LogProfit(nowAccount.Balance - initAccount.Balance);
        }
        preTotalHold = totalHold;
        Sleep(LoopInterval * 1000);
    }
}
