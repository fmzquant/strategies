
> 策略名称

能量潮OBV在量化交易中的详细用法和实战技巧

> 策略作者

Hukybo

> 策略描述

**策略简介**
古代打仗有一句这样的成语：“兵马未动，粮草先行”。在交易中也有一句类似的话：“量在价先”。意思是说：价格的上涨和下跌，背后都是成交量在推动，一切风吹草动，最先反应在成交量上。于是呢，就有人发明了衡量成交量的能量潮指标（On Balance Volume，OBV）。

能量潮（OBV）是上个世纪60年代由格兰维尔（Joe Granville）发明，虽然其中的算法很简单，但是在交易的“价、量、时、空”四个要素中，以“量”为切入点，得到了很多交易者的青睐。作为交易市场中的人气指标，能量潮可以很直观的反应出价格与成交量的相互关系，从而帮助交易者从更多的角度观察市场。

[点击查看更多内容](https://www.fmz.com/bbs-topic/4118)



> 源码 (麦语言)

``` pascal
N:=10;
OBV:=SUM(IFELSE(CLOSE>REF(CLOSE,1),VOL,IFELSE(CLOSE<REF(CLOSE,1),-VOL,0)),0);
TR:=MAX(MAX((HIGH-LOW),ABS(REF(CLOSE,1)-HIGH)),ABS(REF(CLOSE,1)-LOW));
ATR:=MA(TR,N);
B:EMA2(OBV*ATR,N);
D:EMA2(OBV*ATR,N*2);
B>REF(B,1) && D>REF(D,1) && B>D,BK;
B<REF(B,1) || D<REF(D,1) || B<D,SP;
B<REF(B,1) && D<REF(D,1) && B<D,SK;
B>REF(B,1) || D>REF(D,1) || B>D,BP;
AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/159997

> 更新时间

2019-07-31 19:44:46
