
> 策略名称

双均线DDI策略|Double Average Lines -DDI Strategy

> 策略作者

littleDreamXX

> 策略描述

[trans]
- 策略思路：双均线确定方向，用DDI指标，确定进场时点，比例止损和回撤止盈
- 数据周期：15M
- 策略适用：数字货币、商品期货
- 官方网站：www.quantinfo.com

- 主图指标线：
  VAR2^^MA(C,PARAM2);
  VAR3^^MA(VAR2,PARAM1);

- 副图指标线：
  VAR9:MA(VAR8,2*PARAM1);
  VAR10:MA(VAR9,PARAM1);
  VAR8:VAR6-VAR7;

![IMG](https://www.fmz.com/upload/asset/e83641b0567b242687792b105de8e211.png)

||

- Strategy idea: Use double average lines to determine the direction; 
- use the DDI indicator to determine when to open position; 
 - proportional to determine the stop loss and take profit

 - Data cycle: 15M

   ![IMG](https://www.fmz.com/upload/asset/09e140c314c2cd3829cb03f89f502ac6.png)  

   ![IMG](https://www.fmz.com/upload/asset/5a2ed54d056607b1432ae31cb5c0903d.png) 

 - Main chart:
   VAR2^^MA(C, PARAM2);
   VAR3^^MA(VAR2, PARAM1);

- Secondary chart:
  VAR9: MA (VAR8, 2*PARAM1);
  VAR10: MA (VAR9, PARAM1);
  VAR8: VAR6-VAR7;

[/trans]

> 策略参数



|参数|默认值|描述|
|----|----|----|
|PARAM1|60|均线2的参数|parameter of average line 2|
|PARAM2|300|均线1的参数|parameter of average line 1|
|PARAM3|true|价格系数|price coefficient|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-11-01 00:00:00
end: 2018-12-14 00:00:00
period: 15m
exchanges: [{"eid":"Futures_BitMEX","currency":"XBT_USD"}]
args: [["TradeAmount",100,126961],["ContractType","XBTUSD",126961]]
*)

VAR2^^MA(C,PARAM2);
VAR3^^MA(VAR2,PARAM1);

VAR4:=IFELSE((HIGH+LOW)<=(REF(HIGH,1)+REF(LOW,1)),0,MAX(ABS(HIGH-REF(HIGH,1)),ABS(LOW-REF(LOW,1)))),NODRAW;
VAR5:=IFELSE((HIGH+LOW)>=(REF(HIGH,1)+REF(LOW,1)),0,MAX(ABS(HIGH-REF(HIGH,1)),ABS(LOW-REF(LOW,1)))),NODRAW;
VAR6:=SUM(VAR4,PARAM1)/(SUM(VAR4,PARAM1)+SUM(VAR5,PARAM1)),NODRAW;
VAR7:=SUM(VAR5,PARAM1)/(SUM(VAR5,PARAM1)+SUM(VAR4,PARAM1)),NODRAW;
VAR8:VAR6-VAR7;
VAR9:MA(VAR8,2*PARAM1);
VAR10:MA(VAR9,PARAM1);

BUYK:=BARPOS>PARAM2 AND C>VAR2 AND VAR2>VAR3 AND VAR8>0 AND VAR9>VAR10;
SELLK:=BARPOS>PARAM2 AND C<VAR2 AND VAR2<VAR3 AND VAR8<0 AND VAR9<VAR10;

SELLY:=C<VAR2 AND C>BKPRICE*(1+0.01*PARAM3);
BUYY:=C>VAR2 AND C<SKPRICE*(1-0.01*PARAM3);

SELLS:=C<BKPRICE*(1-PARAM3*0.01);
BUYS:=C>SKPRICE*(1+PARAM3*0.01);

BKVOL=0 AND BUYK,BK;
SKVOL=0 AND SELLK,SK;

SELLS,SP(BKVOL);
BUYS,BP(SKVOL);

SELLY,SP(BKVOL);
BUYY,BP(SKVOL);
```

> 策略出处

https://www.fmz.com/strategy/128133

> 更新时间

2019-08-20 10:35:47
