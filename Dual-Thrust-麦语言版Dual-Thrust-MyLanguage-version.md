
> Name

Dual-Thrust-麦语言版Dual-Thrust-MyLanguage-version

> Author

阿基米德的浴缸

> Strategy Description

[trans]
> 基本原理

- 在当天收盘，计算两个值： 最高价－收盘价，和收盘价－最低价。然后取这两个值较大的那个，乘以k值，结果称为触发值。
- 在第二天开盘，记录开盘价，然后在价格超过（开盘＋触发值）时马上买入，或者价格低于（开盘－触发值）时马上卖空。
- 这个系统是反转系统，没有单独止损。也就是说，反向信号也同时就是平仓信号。

`Dual Thrust 策略包含完整的图表显示, 图表动态更新，模板引用等功能, 可做学习模板使用.`

策略的详细介绍 : http://xueqiu.com/5256769224/32429363


- 主图
  上轨：公式：UPTRACK^^O+KS*RG;
  下轨：公式：DOWNTRACK^^O-KX*RG;

- 副图：
  无

||

- Fundamental:
  At the close of the day, two values are calculated: the highest price - the closing price, and the closing price - the lowest price. Then take the larger one and multiply it by the value   of k. The result is called the trigger value.
  At the opening of the next day, record the opening price, then buy immediately when the price exceeds (opening price + trigger value), or sell short when the price is lower than (opening price - trigger value).
  This system is a reversal system with no separate stop loss. In other words, the reverse signal is also the closing signal.

  ![IMG](https://www.fmz.com/upload/asset/d2d373289db613f356811d9314775b83.jpg)  
  ![IMG](https://www.fmz.com/upload/asset/c6c5a6c53fa4f0c9c5971df9349e1dca.png)  
  ![IMG](https://www.fmz.com/upload/asset/65fd01ff1e7b844006ba18ad0ea3dedf.png) 

- Main chart:
  Upper track: formula: UPTRACK^^O+KSRG;
  Lower track: formula: DOWNTRACK^^O-KXRG;

- Secondary chart:
  none

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|N|4|计算周期|Period: calculate period|
|KS|0.5|上轨系数|upper track coefficient|
|KX|0.5|下轨系数|lower track coefficient|


> Source (MyLanguage)

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


C>UPTRACK,BPK;
C<DOWNTRACK,SPK;

```

> Detail

https://www.fmz.com/strategy/128884

> Last Modified

2019-08-20 10:47:50
