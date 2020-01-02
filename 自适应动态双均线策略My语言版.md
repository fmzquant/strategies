
> 策略名称

自适应动态双均线策略My语言版

> 策略作者

Hukybo

> 策略描述

# 摘要
我们知道价格变化的速度本身就在变化，传统简单均线受困于固定周期参数，这使得不论市场的走势如何，短期均线灵敏度高，更贴近价格走势，但在市场震荡时期反复转向，造成频繁发出错误开平仓信号；长期均线在趋势判断上更加可靠，但在市场加速上涨或下跌时反应迟钝，造成错过最佳的买卖点。

因此虽然传统简单均线可以在一定程度适应行情，但是却很难根据市场变化去进行调整，进而更好的把握趋势。特别在长期震荡行情中，不仅得不到正收益而且付出高额的交易成本，为了解决这个问题，我们引入考夫曼创立的自适应均线。

[点击阅读更多内容](https://www.fmz.com/digest-topic/4463)



> 源码 (麦语言)

``` pascal
(*backtest
start: 2015-02-22 00:00:00
end: 2019-10-18 00:00:00
period: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
args: [["SlideTick",2,126961],["ContractType","rb000",126961]]
*)

DIRECTION:=CLOSE-REF(CLOSE,10);
VOLATILITY:=SUM(ABS((CLOSE-REF(CLOSE,1))),10);
ER:=ABS(DIRECTION/VOLATILITY);
FASTSC:=2/(2+1);
SLOWSC:=2/(30+1);
SSC:=ER*(FASTSC-SLOWSC)+SLOWSC;
CONSTANT:SSC*SSC;
AMA1:EMA(MA(CLOSE,CONSTANT),1),COLORGREEN,LINETHICK3;
AMA2:EMA(MA(CLOSE,CONSTANT),10),COLORGREEN,LINETHICK3;
AMA1 > REF(AMA1, 1) && AMA2 > REF(AMA2, 1) && AMA1 > AMA2, BK;
AMA1 < REF(AMA1, 1) && AMA2 < REF(AMA2, 1) && AMA1 < AMA2, SK;
BKVOL > 1 && AMA1 < REF(AMA1, 1) || AMA2 < REF(AMA2, 1) || AMA1 < AMA2, SP;
SKVOL > 1 &&AMA1 > REF(AMA1, 1) || AMA2 > REF(AMA2, 1) || AMA1 > AMA2, BP;
AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/170606

> 更新时间

2019-11-22 14:05:24
