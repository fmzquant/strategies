
> 策略名称

双均线策略与相对强弱RSI指标组合|Combination of Double MA and RSI

> 策略作者

littleDreamXX

> 策略描述

[trans]

- 策略名称：双均线策略与相对强弱RSI指标组合
- 数据周期：15M，30M等
- 支持：商品期货、数字货币
- 官方网站：www.quantinfo.com

![IMG](https://www.fmz.com/upload/asset/9955a36cca1be0e9d73f99fa8bdb4ac8.png) 

- 主图：
  均线1，公式：MA1^^EMA(C,N1);
  均线2，公式：MA2^^EMA(C,N2);

- 副图：
  RSI，公式：RSIVALUE:SMA(MAX(CLOSE-REF(CLOSE,1),0),LENGTH,1)/SMA(ABS(CLOSE-REF(CLOSE,1)),LENGTH,1)*100;

||

- Strategy Name: Combination of Double MA and RSI
- Data Cycle: 15M, 30M, etc.
- Support: Commodity Futures

  ![IMG](https://www.fmz.com/upload/asset/3115dab65deb2ed7d795cdabb32d88be.png)  
  ![IMG](https://www.fmz.com/upload/asset/1a352942b56f16cddab02f1692c909f2.png) 

- Main chart:
  MA 1, formula: MA1 ^^ EMA (C, N1);
  MA 2, formula: MA2 ^^ EMA (C, N2);

- Secondary chart:
  RSI, formula:
  RSIVALUE:SMA(MAX(CLOSE-REF(CLOSE,1),0),LENGTH,1)/SMA(ABS(CLOSE-REF(CLOSE,1)),LENGTH,1)*100;


[/trans]

> 策略参数



|参数|默认值|描述|
|----|----|----|
|SLOSS|true|止损百分比|Stop Loss Percentage|
|N1|50|均线1参数|MA1 parameter|
|N2|300|均线2参数|MA2 parameter|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-11-05 00:00:00
end: 2018-12-05 00:00:00
period: 15m
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD"}]
args: [["ContractType","this_week",126961]]
*)

MA1^^EMA(C,N1);
MA2^^EMA(C,N2);

LENGTH:=9;
OVERBOUGHT:=70;
OVERSOLD:=100-OVERBOUGHT;
RSIVALUE:SMA(MAX(CLOSE-REF(CLOSE,1),0),LENGTH,1)/SMA(ABS(CLOSE-REF(CLOSE,1)),LENGTH,1)*100;
BUYK:=BKVOL=0 AND BARPOS>N2 AND MA1>MA2 AND C>MAX(MA1,MA2) AND CROSSUP(RSIVALUE,OVERBOUGHT);
SELLK:=SKVOL=0 AND BARPOS>N2 AND MA1<MA2 AND C<MIN(MA1,MA2) AND CROSSDOWN(RSIVALUE,OVERSOLD);
SELLY:=MA1<MA2 AND C>BKPRICE*(1+SLOSS*0.01);
BUYY:=MA1>MA2 AND C<SKPRICE*(1-SLOSS*0.01);
SELLS:=C<BKPRICE*(1-SLOSS*0.01);
BUYS:=C>SKPRICE*(1+SLOSS*0.01);

BUYK,BK;
SELLK,SK;
SELLY,SP(BKVOL);
BUYY,BP(SKVOL);
SELLS,SP(BKVOL);
BUYS,BP(SKVOL);
```

> 策略出处

https://www.fmz.com/strategy/128250

> 更新时间

2019-08-20 10:29:50
