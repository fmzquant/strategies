
> 策略名称

Dual Thrust (麦语言版)

> 策略作者

littleDreamXX

> 策略描述

> 基本原理

- 在当天收盘，计算两个值： 最高价－收盘价，和收盘价－最低价。然后取这两个值较大的那个，乘以k值，结果称为触发值。
- 在第二天开盘，记录开盘价，然后在价格超过（开盘＋触发值）时马上买入，或者价格低于（开盘－触发值）时马上卖空。
- 这个系统是反转系统，没有单独止损。也就是说，反向信号也同时就是平仓信号。

> 图解

 https://dn-filebox.qbox.me/ab06814528c0ae8c54c6bebaea4438325968fbe5.jpg 

`Dual Thrust 策略包含完整的图表显示, 图表动态更新，模板引用等功能, 可做学习模板使用.`

策略的详细介绍 : http://xueqiu.com/5256769224/32429363


- 主图
  上轨：公式：UPTRACK^^O+KS*RG;
  下轨：公式：DOWNTRACK^^O-KX*RG;

- 副图：
  无

> 策略参数



|参数|默认值|描述|
|----|----|----|
|N|4|计算周期|
|KS|0.5|上轨系数|
|KX|0.5|下轨系数|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-01-01 00:00:00
end: 2018-02-28 00:00:00
period: 1d
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD"}]
args: [["ContractType","this_week",126961]]
*)

HH:=HV(H,N);
HC:=HV(C,N);
LL:=LV(L,N);
LC:=LV(C,N);

RG:=MAX(HH-LC,HC-LL);
UPTRACK^^O+KS*RG;
DOWNTRACK^^O-KX*RG;

// 交易信号
C>UPTRACK,BPK;
C<DOWNTRACK,SPK;
// 嵌入的JS 代码调整至 手册，有兴趣 可以研究。
```

> 策略出处

https://www.fmz.com/strategy/128884

> 更新时间

2018-12-06 12:09:22
