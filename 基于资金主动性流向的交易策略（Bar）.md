
> 策略名称

基于资金主动性流向的交易策略（Bar）

> 策略作者

Hukybo

> 策略描述

#### 摘要
价格不是上就是下，长期而言，价格的涨跌概率应各是50%，那么要正确预测未来的价格，就需要实时获取影响价格的全部因素，然后给每个因素一个正确权重，最后作出客观理性分析。要把影响价格的全部因素罗列出来，可能会写满整个屏幕。

概括为：全球经济环境、国家宏观政策、相关产业政策、供需关系、国际事件、利率与汇率、通货膨胀与紧缩、市场心理、未知因素等等。预测也就变成了一个工程浩大，又不可能完成的任务。所以很早的时候，我就明白市场不可预测。那么在市场中所有的预测，都变成了假设，交易也成了概率游戏，这就有意思了。

[点击阅读更多内容](https://www.fmz.com/bbs-topic/4961)

> 策略参数



|参数|默认值|描述|
|----|----|----|
|contractType|rb000|合约类型|
|hgLen|50|周期长度|
|len|10|数据长度|
|openValve|4|开仓阈值|
|unit|true|单位|


> 源码 (javascript)

``` javascript
/*backtest
start: 2016-01-01 09:00:00
end: 2019-12-31 15:00:00
period: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
*/

var p = $.NewPositionManager(); //调用商品期货交易类库

//持仓数据处理
function positions(name) {
    var self = {};
    var mp = _C(exchange.GetPosition); //获取持仓
    if (mp.length == 0) {
        self.amount = 0;
    }
    for (var i = 0; i < mp.length; i++) { //持仓数据处理
        if (mp[i].ContractType == name) {
            if (mp[i].Type == PD_LONG || mp[i].Type == PD_LONG_YD) {
                self.amount = mp[i].Amount;
            } else if (mp[i].Type == PD_SHORT || mp[i].Type == PD_SHORT_YD) {
                self.amount = -mp[i].Amount;
            }
            self.profit = mp[i].Profit;
        } else {
            self.amount = 0;
        }
    }
    return self;
}

//行情数据处理函数
function data() {
    var self = {};
    var barVol = [];
    var bars = _C(exchange.GetRecords); //获取bar数据
    if (bars.length < len * 2) { //控制bar数据数组的长度
        return;
    }
    for (var i = len; i > 0; i--) {
        var barSub_1 = bars[bars.length - (i + 1)].Close - bars[bars.length - (i + 2)].Close; //计算当前收盘价与上个bar收盘价的价差
        if (barSub_1 > 0) { //如果价格涨了，就在数组里面添加正数
            barVol.push(bars[bars.length - (i + 1)].Volume * (bars[bars.length - (i + 1)].High - bars[bars.length - (i + 1)].Low));
        } else if (barSub_1 < 0) { //如果价格跌了，就在数组里面添加负数
            barVol.push(-bars[bars.length - (i + 1)].Volume * (bars[bars.length - (i + 1)].High - bars[bars.length - (i + 1)].Low));
        }
    }
    if (barVol.length > len) {
        barVol.shift(); //释放多余的数据
    }
    self.barIn = 0;
    self.barOut = 0;
    for (var v = 0; v < barVol.length; v++) {
        if (barVol[v] > 0) {
            self.barIn += barVol[v]; //合并全部主动流入的资金
        } else {
            self.barOut -= barVol[v]; //合并全部主动流出的资金
        }
    }
    self.barRatio = self.barIn / Math.abs(self.barOut); //计算主动流入资金与主动流出资金的比值
    bars.pop(); //删除未结束的bar数据
    self.close = bars[bars.length - 1].Close; //获取上根K线的收盘价
    self.hh = TA.Highest(bars, hgLen, 'High'); //获取前高
    self.ll = TA.Lowest(bars, hgLen, 'Low'); //获取前低
    return self;
}

//交易函数
function trade() {
    var myData = data(); //执行data函数
    if (!myData) {
        return;
    }
    var mp = positions(contractType); //获取持仓信息
    var myAmount = mp.amount; //获取持仓数量
    var myProfit = mp.profit; //获取持仓浮动盈亏
    if (myAmount > 0 && myData.close < myData.ll) {
        p.Cover(contractType, unit); //多头平仓
    }
    if (myAmount < 0 && myData.close > myData.hh) {
        p.Cover(contractType, unit); //空头平仓
    }
    if (myAmount == 0) {
        if (myData.barRatio > openValve) {
            p.OpenLong(contractType, unit); //多头开仓
        } else if (myData.barRatio < 1 / openValve) {
            p.OpenShort(contractType, unit); //空头开仓
        }
    }
}

//程序主入口，从这里启动
function main() {
    while (true) { //进入循环
        if (exchange.IO("status")) { //如果是开市时间
            _C(exchange.SetContractType, contractType); //订阅合约
            trade(); //执行trade函数
        }
    }
}
```

> 策略出处

https://www.fmz.com/strategy/87698

> 更新时间

2020-01-21 15:29:52
