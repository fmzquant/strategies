
> 策略名称

利用相对强弱RSI实现低买高卖 - 商品期货MY语言策略

> 策略作者

Hukybo

> 策略描述

在中国商品期货投机市场中，价格的涨跌就像多方和空方拔河比赛，哪方的力量更强大，价格趋势就会跟着哪个方向走，因此分析期货市场中的双方力量就很重要，而RSI指标就是分析多方和空方力量的神器。

[点击阅读更多内容](https://www.fmz.com/bbs-topic/6350)

> 策略参数



|参数|默认值|描述|
|----|----|----|
|LEN|50|周期长度|
|VALUE|50|阈值|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2015-02-22 00:00:00
end: 2020-12-16 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
args: [["VALUE",90],["ContractType","a888",126961]]
*)

YC := REF(C, 1);  // 上根K线收盘价
U := MAX(C - YC, 0);  // 计算收盘价与上根K线收盘价的差，在该差值与0之间取最大值
D := ABS(C - YC);  // 计算收盘价与上根K线收盘价的差，取该差值绝对值的2周期移动平均值
RS := SMA(U, 2, 1) / SMA(D, 2, 1);  // 分别计算U和D的2周期平均值，计算U和D的比值
RSI ^^ RS * 100;  // 将比率乘以100，保证了其值范围在0~100之间
AVERAGE ^^ MA(C, LEN);
C < AVERAGE AND RSI < 100 - VALUE, BK;
C > AVERAGE AND RSI < 100 - VALUE, BP;
C > AVERAGE AND RSI > VALUE, SK;
C < AVERAGE AND RSI > VALUE, SP;
AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/242488

> 更新时间

2020-12-29 15:25:36
