
> 策略名称

价格高低点与一目均线双重趋势策略|Price high and low - Ichimoku trend strategy

> 策略作者

littleDreamXX

> 策略描述

[trans]
- 策略名称：价格高低点与一目均线双重趋势策略
- 数据周期：15M等
- 支持：商品期货
- 官方网站：www.quantinfo.com

![IMG](https://www.fmz.com/upload/asset/487949c7affb8521d9c041610551c3cd.png) 

- 主图：

  LINE1指标线，公式：LINE1^^(HHV(H,N1)+LLV(L,N1))*0.5;

  LINE2指标线，公式：LINE2^^(HHV(H,N2)+LLV(L,N2))*0.5;

||

- Strategy Name: Price high and low - Ichimoku trend strategy
- Data cycle: 15M, etc.
- Support: Commodity Futures

   ![IMG](https://www.fmz.com/upload/asset/5988d1b7eb989f7a2e345fba35201cc9.png)  
   ![IMG](https://www.fmz.com/upload/asset/a0c6881a0bac6f2c89ffe8fc137be941.png)  
   ![IMG](https://www.fmz.com/upload/asset/227a3bb45cd8ab1bf54e64cdda96650b.png) 

- main chart：
  LINE1 index line，formula：LINE1^^(HHV(H,N1)+LLV(L,N1))*0.5;
  LINE2 index line，formula：LINE2^^(HHV(H,N2)+LLV(L,N2))*0.5;

[/trans]

> 策略参数



|参数|默认值|描述|
|----|----|----|
|N1|150|高点低点均值1周期|the highest of high price N1 ago/ the lowest of low price N1 ago|
|N2|500|高点低点均值2周期|the highest of high price N2 ago/ the lowest of low price N2 ago|
|SLOSS|2|止损百分比|stop loss percentage|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-07-01 00:00:00
end: 2018-08-16 00:00:00
period: 15m
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
args: [["N1",90],["N2",150]]
*)

LINE1^^(HHV(H,N1)+LLV(L,N1))*0.5;
LINE2^^(HHV(H,N2)+LLV(L,N2))*0.5;

BKVOL=0 AND BARPOS>N2 AND REF(LINE1,1)<REF(LINE2,1) AND LINE1>=LINE2,BPK;
SKVOL=0 AND BARPOS>N2 AND REF(LINE1,1)>REF(LINE2,1) AND LINE1<=LINE2,SPK;

BKVOL=0 AND H>=HHV(H,N1),BK;
SKVOL=0 AND L<=LLV(L,N1),SK;

C<BKPRICE*(1-SLOSS*0.01),SP(BKVOL);
C>SKPRICE*(1+SLOSS*0.01),BP(SKVOL);
AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/128415

> 更新时间

2018-12-17 17:16:35
