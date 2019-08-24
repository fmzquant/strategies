
> 策略名称

肯特纳通道升级版金肯特纳kingkeltner策略

> 策略作者

Hukybo

> 策略描述

**策略简介**
肯特纳通道是由Chester W. Keltner在上个世纪60年代发明的一个交易系统，其核心思想是均线理论。并且当时该系统在非常长的一段时间内，得到了令人瞩目的成绩。虽然原版的肯特纳通道系统没有刚出现时那么有效，但它的核心思想，至今都对交易界产生很深远的影响。
[点击阅读更多内容](https://www.fmz.com/bbs-topic/4104)



> 源码 (麦语言)

``` pascal
(*backtest
start: 2019-01-01 00:00:00
end: 2019-07-27 00:00:00
period: 1h
exchanges: [{"eid":"Futures_BitMEX","currency":"XBT_USD"}]
args: [["MAN",20],["TradeAmount",10000,126961],["SlideTick",2,126961],["ContractType","XBTUSD",126961]]
*)

// 参数
MAN:=20;
ATRN:=50;

JG:=(HIGH+LOW+CLOSE)/3;  // 基础价格
ZG^^MA(JG,MAN);  // 中轨
TRUEHIGH1:=IF(HIGH>REF(C,1),HIGH,REF(C,1));
TRUELOW1:=IF(LOW<=REF(C,1),LOW,REF(C,1));
TRUERANGE1:=IF(ISLASTBAR,H-L,TRUEHIGH1-TRUELOW1);  // 计算真实波动幅度
SG^^ZG+MA(TRUERANGE1,ATRN);  // 上轨
XG^^ZG-MA(TRUERANGE1,ATRN);  // 下轨

ZG>REF(ZG,1)&&C>SG,BK;  // 中轨向上，并且价格升破上轨，开多单
C<ZG,SP;  // 持有多单时，价格跌破中轨，平多单
ZG<REF(ZG,1)&&C<XG,SK;  // 中轨向下，并且价格跌破下轨，开空单
C>ZG,BP;  // 持有空单时，价格升破中轨，平空单
AUTOFILTER;  // 设置信号过滤方式
```

> 策略出处

https://www.fmz.com/strategy/159285

> 更新时间

2019-07-27 16:28:56
