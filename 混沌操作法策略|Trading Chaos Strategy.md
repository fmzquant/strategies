
> 策略名称

混沌操作法策略|Trading Chaos Strategy

> 策略作者

littleDreamXX

> 策略描述

[trans]
- 策略名称：混沌操作法策略
- 支持：商品期货 ， 数字货币， 数字货币期货
- 使用周期：日线
- 官方网站：www.quantinfo.com

  ![IMG](https://www.fmz.com/upload/asset/a740c3a88fe1e0accb0c6a77fb11721c.png) 


- 主图：

  Y线，公式：Y^^SMA(REF(HL,N3),N4,1);

  YRG最大，公式：MAX_YRG^^MAX(MAX(Y,R),G); 

  YRG最小，公式：MIN_YRG^^MIN(MIN(Y,R),G); 

  TOP_FRACTAL，公式：TOP_FRACTAL^^VALUEWHEN(H>=MAX_YRG,TOP);
  
  BOTTOM_FRACTAL，公式：BOTTOM_FRACTAL^^VALUEWHEN(L<=MIN_YRG,BOTTOM);

- 副图：
  
  无

||

- Strategy Name: Trading Chaos Strategy
- Support: Commodity Futures, Digital Currency, Digital Currency Futures
- Cycle: Daily

  ![IMG](https://www.fmz.com/upload/asset/a0b8ae48baf0cb4acb6b5e85c0d34e28.png)  
  ![IMG](https://www.fmz.com/upload/asset/5011913cd4b40176810ca8ce3067f0d3.png) 

- Main chart:
  Y line, formula: Y ^^ SMA (REF (HL, N3), N4, 1);
  YRG maximum, formula: MAX_YRG^^ MAX (MAX (Y, R), G);
  YRG minimum, formula: MIN_YRG^^^ MIN (MIN (Y, R), G);
  TOP_FRACTAL, formula: TOP_FRACTAL^^^ VALUEWHEN (H >= MAX_YRG, TOP);
  BOTTOM_FRACTAL, formula: BOTTOM_FRACTAL^^^ VALUEWHEN (L<=MIN_YRG, BOTTOM);

- Secondary chart:
  none

[/trans]

> 策略参数



|参数|默认值|描述|
|----|----|----|
|N1|3|参数N1|parameter N1|
|N2|5|参数N2|parameter N2|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-11-13 00:00:00
end: 2018-12-13 00:00:00
period: 1h
exchanges: [{"eid":"Huobi","currency":"BTC_USDT","balance":10000,"stocks":3}]
*)

N3:=N1+N2;
N4:=N2+N3;

HL:=(H+L)/2;

Y^^SMA(REF(HL,N3),N4,1);
R:=SMA(REF(HL,N2),N3,1);
G:=SMA(REF(HL,N1),N2,1);

TOP_N:=BARSLAST(REF(H,2)=HHV(H,5))+2;
BOTTOM_N:=BARSLAST(REF(L,2)=LLV(L,5))+2;

TOP:=REF(H,TOP_N);
BOTTOM:=REF(L,BOTTOM_N);

MAX_YRG^^MAX(MAX(Y,R),G); 
MIN_YRG^^MIN(MIN(Y,R),G); 

TOP_FRACTAL^^VALUEWHEN(H>=MAX_YRG,TOP);
BOTTOM_FRACTAL^^VALUEWHEN(L<=MIN_YRG,BOTTOM);

BKVOL=0 AND C>=TOP_FRACTAL AND TOP_FRACTAL>MAX_YRG,BPK;
SKVOL=0 AND C<=BOTTOM_FRACTAL AND BOTTOM_FRACTAL<MIN_YRG,SPK;

C<Y,SP(BKVOL);
C>Y,BP(SKVOL);

```

> 策略出处

https://www.fmz.com/strategy/129077

> 更新时间

2018-12-18 10:26:10
