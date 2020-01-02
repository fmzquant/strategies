
> 策略名称

裸K上下影线在交易策略中的应用

> 策略作者

Hukybo

> 策略描述

K线本身并没有什么价值，它只是一段数据的容器。从最底层的Tick数据流开始，根据时间周期划分成一段一段，每个周期内的第一个价格就是开盘价，最后一个价格就是收盘价，周期内最高的那个价格就是最高价，周期内最低的那个价格就是最低价，每个容器里面都储存着开高低收、成交量、时间等数据。这就是K线的由来，本篇我们将用上下影线战法，试着开发一个交易策略。
[点击阅读更多内容](https://www.fmz.com/bbs-topic/4259)

> 策略参数



|参数|默认值|描述|
|----|----|----|
|BN|true|BN|
|SN|0.1|SN|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2019-01-16 00:00:00
end: 2019-09-11 00:00:00
period: 15m
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
args: [["ContractType","rb2001",126961]]
*)

UP: HIGH - IFELSE(ISUP, CLOSE, OPEN);  // 上影线
MIDDLE: IFELSE(ISUP, CLOSE, OPEN) - IFELSE(ISUP, OPEN, CLOSE);  // K线实体
DOWN: IFELSE(ISUP, OPEN, CLOSE) - LOW;  // 下影线

DOWN > (MIDDLE + UP) * BN, BK;  // 多头开仓
UP > (MIDDLE + DOWN) * SN, SP;  // 空头开仓
UP > (MIDDLE + DOWN) * SN, SK;  // 多头平仓
DOWN > (MIDDLE + UP) * BN, BP;  // 空头平仓
AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/165130

> 更新时间

2019-09-12 10:36:40
