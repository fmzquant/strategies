
> 策略名称

筑底形态ZDZB策略

> 策略作者

Hukybo

> 策略描述

一、摘要
二级市场交易至今，充斥着各种各样的交易方法，其中如何抄底逃顶一直是许多交易者孜孜以求的交易方法。本篇我们就发明者量化实现一个筑底ZDZB策略。
[点击阅读更多内容](https://www.fmz.com/bbs-topic/5852)

> 策略参数



|参数|默认值|描述|
|----|----|----|
|N1|125|N1|
|N2|5|N2|
|N3|20|N3|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2020-01-01 00:00:00
end: 2020-07-04 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
*)

//N1周期内CLOSE>=REF(CLOSE,1)的次数与N1周期内CLOSE<REF(CLOSE,1)的次数的比值
A:=COUNT(CLOSE>=REF(CLOSE,1),N1)/COUNT(CLOSE<REF(CLOSE,1),N1);
B:MA(A,N2);//N2周期内的A的简单移动平均；
D:MA(A,N3);//N3周期内的A的简单移动平均；
CROSS(B,D),BPK;//B上穿D，买平开；
CROSS(D,B),SPK;//D下穿B，卖平开；
AUTOFILTER;

```

> 策略出处

https://www.fmz.com/strategy/217704

> 更新时间

2020-07-06 08:40:27
