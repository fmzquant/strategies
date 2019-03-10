
> 策略名称

高低点与波动率ROC指标策略|Price high and low - ROC index strategy

> 策略作者

littleDreamXX

> 策略描述

[trans]
- 策略名称：高低点与波动率ROC指标策略
- 数据周期：15M等
- 支持：商品期货
- 官方网站：www.quantinfo.com

![IMG](https://www.fmz.com/upload/asset/1f5e3caa65a3871ae9c9d99f9c11bdf0.png)  
![IMG](https://www.fmz.com/upload/asset/ec4cbcbb036925739a04de90cadf1d8d.png) 

- 主图：
   N周期最高价，公式：HH^^HHV(H,N);
   N周期最低价，公式：LL^^LLV(L,N);

- 副图：
  ARC指标， 公式：ARC:SMA(RC,M,1);

||

- Strategy Name: Price high and low - ROC index strategy
- Data cycle: 15M, etc.
- Support: Commodity Futures

  ![IMG](https://www.fmz.com/upload/asset/b2adb08374654bb533bed3f55e502592.png)  
  ![IMG](https://www.fmz.com/upload/asset/b10e5232882a919868802de72ba6f613.png) 

- Main chart:
  The highest price of N cycle, formula: HH ^^ HHV (H, N);
  The lowest price of N cycle, formula: LL ^^ LLV (L, N);

- Secondary chart:
  ARC index, formula: ARC: SMA (RC, M, 1);

[/trans]

> 策略参数



|参数|默认值|描述|
|----|----|----|
|N|200|高低点周期参数|high and low cycle parameter|
|SLOSS|true|止损百分比|stop loss percentage|
|M|50|ARC参数|ARC index|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-03-03 00:00:00
end: 2018-03-31 00:00:00
period: 15m
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
args: [["ContractType","rb888",126961]]
*)

HH^^HHV(H,N);
LL^^LLV(L,N);
MD:=(HH+LL)/2;

UP:=H>=HH;
DOWN:=L<=LL;

RC:=CLOSE/REF(CLOSE,M);
ARC:SMA(RC,M,1);

BARPOS>N AND BKVOL=0 AND H>=HH AND ARC>1,BPK;
BARPOS>N AND SKVOL=0 AND L<=LL AND ARC<1,SPK;

DOWN AND C>BKPRICE*(1+SLOSS*0.01),SP(BKVOL);
UP AND C<SKPRICE*(1-SLOSS*0.01),BP(SKVOL);

C<BKPRICE*(1-SLOSS*0.01),SP(BKVOL);
C>SKPRICE*(1+SLOSS*0.01),BP(SKVOL);
AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/128417

> 更新时间

2018-12-17 16:58:17
