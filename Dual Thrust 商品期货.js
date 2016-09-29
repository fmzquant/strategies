/*
策略出处: https://www.botvs.com/strategy/13011
策略名称: Dual Thrust 商品期货
策略作者: Zero
策略描述:

> 基本原理

- 在当天收盘，计算两个值： 最高价－收盘价，和收盘价－最低价。然后取这两个值较大的那个，乘以k值，结果称为触发值。
- 在第二天开盘，记录开盘价，然后在价格超过（开盘＋触发值）时马上买入，或者价格低于（开盘－触发值）时马上卖空。
- 这个系统是反转系统，没有单独止损。也就是说，反向信号也同时就是平仓信号。

> 图解

 https://dn-filebox.qbox.me/ab06814528c0ae8c54c6bebaea4438325968fbe5.jpg 

`Dual Thrust 策略包含完整的图表显示, 图表动态更新，模板引用等功能, 可做学习模板使用.`

策略的详细介绍 : http://xueqiu.com/5256769224/32429363


参数                默认值    描述
----------------  -----  -----------
ContractTypeName  MA701  合约品种
NPeriod           4      计算周期
Ks                0.5    上轨系数
Kx                0.5    下轨系数
AmountOP          true   开仓合约张数
Interval          2000   重试间隔(毫秒)
LoopInterval      3      轮询间隔(秒)
PeriodShow        500    图表最大显示K线柱数
NotifyWX          true   下单微信通知
CoverAll          false  启动策略时清空合约仓位
*/

var ChartCfg = {
    __isStock: true,
    title: {
        text: 'Dual Thrust 上下轨图'
    },
    yAxis: {
        plotLines: [{
            value: 0,
            color: 'red',
            width: 2,
            label: {
                text: '上轨',
                align: 'center'
            },
        }, {
            value: 0,
            color: 'green',
            width: 2,
            label: {
                text: '下轨',
                align: 'center'
            },
        }]
    },
    series: [{
        type: 'candlestick',
        name: '当前周期',
        id: 'primary',
        data: []
    }, {
        type: 'flags',
        onSeries: 'primary',
        data: [],
    }]
};

var STATE_IDLE = 0;
var STATE_LONG = 1;
var STATE_SHORT = 2;
var State = STATE_IDLE;

var LastBarTime = 0;
var UpTrack = 0;
var BottomTrack = 0;
var chart = null;
var Counter = {
    w: 0,
    l: 0
};

var manager = null;
var logSuffix = NotifyWX ? '@' : '';

function onTick(exchange) {
    if (!manager) {
        manager = $.NewPositionManager();
        if (_C(exchange.GetPosition).length > 0) {
            if (CoverAll) {
                manager.Cover(ContractTypeName);
                Log("已清空所有相关仓位");
            } else {
                throw "策略启动前不能有持仓.";
            }
        }
        Log('交易平台:', exchange.GetName(), _C(exchange.GetAccount));
        var insDetail = _C(exchange.SetContractType, ContractTypeName);
        Log("合约", insDetail.InstrumentName, "一手", insDetail.VolumeMultiple, "份, 最大下单量", insDetail.MaxLimitOrderVolume, "保证金率:", insDetail.LongMarginRatio.toFixed(4), insDetail.ShortMarginRatio.toFixed(4), "交割日期", insDetail.StartDelivDate);
        
    }

    var records = _C(exchange.GetRecords);
    if (!records || records.length <= NPeriod) {
        LogStatus("Calc Bars...");
        return;
    }
    var Bar = records[records.length - 1];
    if (LastBarTime !== Bar.Time) {
        var HH = TA.Highest(records, NPeriod, 'High');
        var HC = TA.Highest(records, NPeriod, 'Close');
        var LL = TA.Lowest(records, NPeriod, 'Low');
        var LC = TA.Lowest(records, NPeriod, 'Close');

        var Range = Math.max(HH - LC, HC - LL);

        UpTrack = _N(Bar.Open + (Ks * Range));
        DownTrack = _N(Bar.Open - (Kx * Range));
        if (LastBarTime > 0) {
            var PreBar = records[records.length - 2];
            chart.add(0, [PreBar.Time, PreBar.Open, PreBar.High, PreBar.Low, PreBar.Close], -1);
        } else {
            for (var i = Math.min(records.length, NPeriod * 3); i > 1; i--) {
                var b = records[records.length - i];
                chart.add(0, [b.Time, b.Open, b.High, b.Low, b.Close]);
            }
        }
        chart.add(0, [Bar.Time, Bar.Open, Bar.High, Bar.Low, Bar.Close]);
        ChartCfg.yAxis.plotLines[0].value = UpTrack;
        ChartCfg.yAxis.plotLines[1].value = DownTrack;
        ChartCfg.subtitle = {
            text: '上轨: ' + UpTrack + '  下轨: ' + DownTrack
        };
        chart.update(ChartCfg);
        chart.reset(PeriodShow);

        LastBarTime = Bar.Time;
    } else {
        chart.add(0, [Bar.Time, Bar.Open, Bar.High, Bar.Low, Bar.Close], -1);
    }

    LogStatus("Price:", Bar.Close, "Up:", UpTrack, "Down:", DownTrack, "Wins: ", Counter.w, "Losses:", Counter.l, "Date:", new Date());
    var msg;
    if (State === STATE_IDLE || State === STATE_SHORT) {
        if (Bar.Close >= UpTrack) {
            msg  = '做多 触发价: ' + Bar.Close + ' 上轨:' + UpTrack;
            if (State !== STATE_IDLE) {
                manager.Cover(ContractTypeName);
                var profit = manager.Profit();
                LogProfit(profit);
                msg += ' 平仓利润: ' + profit;
            }
            Log(msg + logSuffix);
            manager.OpenLong(ContractTypeName, AmountOP);
            State = STATE_LONG;
            chart.add(1, {x:Bar.Time, color: 'red', shape: 'flag', title: '多', text: msg});
        }
    }

    if (State === STATE_IDLE || State === STATE_LONG) {
        if (Bar.Close <= DownTrack) {
            msg = '做空 触发价: ' + Bar.Close + ' 下轨:' + DownTrack;
            if (State !== STATE_IDLE) {
                manager.Cover(ContractTypeName);
                var profit = manager.Profit();
                LogProfit(profit);
                msg += ' 平仓利润: ' + profit;
            }
            Log(msg + logSuffix);
            manager.OpenShort(ContractTypeName, AmountOP);
            chart.add(1, {x:Bar.Time, color: 'green', shape: 'circlepin', title: '空', text: msg});
            State = STATE_SHORT;
        }
    }
}

function onexit() {
    var pos = _C(exchange.GetPosition);
    if (pos.length > 0) {
        Log("警告, 退出时有持仓", pos);
    }
}

function main() {
    if (exchange.GetName() !== 'Futures_CTP') {
        throw "只支持传统商品期货(CTP)";
    }
    SetErrorFilter("login|ready");

    LogStatus("Ready...");
    LogProfitReset();
    chart = Chart(ChartCfg);
    chart.reset();

    LoopInterval = Math.max(LoopInterval, 1);
    while (true) {
        if (exchange.IO("status") && $.IsTrading(ContractTypeName)) {
            onTick(exchange);
        } else {
            LogStatus("未登录状态或不在交易时间段内");
        }
        Sleep(LoopInterval * 1000);
    }
}
