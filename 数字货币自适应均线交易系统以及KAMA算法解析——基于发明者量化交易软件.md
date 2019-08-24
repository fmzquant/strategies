
> 策略名称

数字货币自适应均线交易系统以及KAMA算法解析——基于发明者量化交易软件

> 策略作者

Hukybo

> 策略描述

**策略简介**
顾名思义自适应均线（KAMA）属于移动平均线（Moving Average）类别，但是与传统移动平均线不一样的是它很“聪明”。我们知道普通均线有很多缺点，比如：短期均线贴近价格走势，非常敏感，但是很容易产生虚假信号；长期均线在趋势判断上非常准确，但是往往行情已经走了一段，它才反应过来。KAMA的“聪明”就体现在，它能根据当前的市场状态，也就是波动率，来自主调节敏感性。其变现形式就是：在震荡行情中，KAMA的变化明显减慢；当趋势来临的时候，又反应迅速。那么在实盘中，它的好处就是：既能减少因“日常杂波”产生的交易成本，又能在行情起飞时及时上车。
点击：[阅读更加详细的策略介绍](https://www.fmz.com/digest-topic/4011)



> 源码 (麦语言)

``` pascal
(*backtest
start: 2017-07-01 00:00:00
end: 2019-07-01 00:00:00
period: 1d
exchanges: [{"eid":"Futures_BitMEX","currency":"XBT_USD"}]
args: [["SlideTick",0,126961],["ContractType","XBTUSD",126961]]
*)

%%
scope.KAMA = function() {
    var r = _C(exchange.GetRecords);
    if (r.length > 140) {
        var kama = talib.KAMA(r, 140);
        return kama[kama.length - 2];
    }
    return;
}
%%

K^^KAMA;
A:CLOSE;

K > REF(K, 1) && CLOSE > K,BK;
K < REF(K, 1) && CLOSE < K,SK;
K < REF(K, 1) || CLOSE < K,SP;
K > REF(K, 1) || CLOSE > K,BP;

AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/155663

> 更新时间

2019-07-16 16:50:15
