
> 策略名称

RangeBreak策略与波动率相结合的实战应用

> 策略作者

Hukybo

> 策略描述

**策略简介**
RangeBreak策略最初来源于期货和外汇交易，属于日内突破策略的一种。在《Futures Truth Magazine》（美国权威交易系统评选杂志）中曾经连续多年排名前十。无论是专业的投资机构还是个人交易者都在广泛使用。但是，如果一个交易策略被大众广为所知，那么这个交易策略在实战中的应用就会大打折扣。所以，这篇文章的目的，不是介绍RangeBreak策略让大家生搬硬套，而是通过对RangeBreak策略的学习，让大家从一个盈利的交易系统中融会贯通，提高交易的能力。

点击：[阅读更加详细的策略介绍](https://www.fmz.com/digest-topic/4038)

> 策略参数



|参数|默认值|描述|
|----|----|----|
|N|0.5|N|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2015-02-22 00:00:00
end: 2019-07-13 00:00:00
period: 5m
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
args: [["RunMode",1,126961],["SlideTick",0,126961],["ContractType","ZC888",126961]]
*)

Q:=BARSLAST(DATE<>REF(DATE,1))+1;  // 判断是不是新一天的K线
DIFF:=REF(HHV(HIGH,Q),Q)-REF(LLV(LOW,Q),Q);  // 昨日最高价与最低价的价格差
OO:=VALUEWHEN(Q=1,OPEN);  // 当天开盘价
UP^^OO+DIFF*N1;  // 上轨
DOWN^^OO-DIFF*N2;  // 下轨
TIME>=0905&&TIME<1455&&CLOSE>UP,BK;  // 多头开仓
TIME>=0905&&TIME<1455&&CLOSE<DOWN,SK;  // 空头开仓
TIME>=1455,CLOSEOUT;  // 收盘平仓
AUTOFILTER;  // 信号过滤
```

> 策略出处

https://www.fmz.com/strategy/156836

> 更新时间

2019-07-16 16:49:03
