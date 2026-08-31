
> Name

Trade03-Dual-Moving-Average-Volatility-Difference-Filter

> Author

作手君TradeMan

> Strategy Description

To give back to the FMZ platform and community, this file shares strategy ideas, code, and templates.

Introduction:
Volume-price factor combination

✱ Contact (welcome to exchange ideas, discuss, and learn together)
WECHAT: haiyanyydss
TEL: https://t.me/JadeRabbitcm
✱ Fully automatic CTA & HFT trading system @2018 - 2023

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|S1|100|S1|
|percent|10|percent|


> Source (MyLanguage)

``` pascal
(*backtest
start: 2018-01-01 00:00:00
end: 2021-06-30 23:59:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD","stocks":10}]
args: [["percent",5],["ContractType","quarter",126961]]
*)

S2:=10*S1;
	
ST:=1;
	
//LOTS:=MAX(1,INTPART(percent/100*MONEYTOT/(C*MARGIN*UNIT)));//金本
LOTS:= MAX(1,INTPART(percent/100*MONEYTOT*C/(MARGIN*UNIT)));//币本

MA1^^EMA(REF(C,1),S2);//均线1
MA2^^EMA(MA1,S1);//均线2

DBF:=IF((HIGH+LOW)<=(REF(HIGH,1)+REF(LOW,1)),0,MAX(ABS(HIGH-REF(HIGH,1)),ABS(LOW-REF(LOW,1))));//如果当前BAR线的高低和比前一根BAR线高低和小，取0，如果大，取HIGH-HIGH[1]和LOW-LOW[1]中的最大值；
KBF:=IF((HIGH+LOW)>=(REF(HIGH,1)+REF(LOW,1)),0,MAX(ABS(HIGH-REF(HIGH,1)),ABS(LOW-REF(LOW,1))));//如果当前BAR线的高低和比前一根BAR线高低和大，取0，如果小，取HIGH-HIGH[1]和LOW-LOW[1]中的最大值；
DBL:=(DBF+S1)/((DBF+S1)+(KBF+S1));//将DBF计算的差值与DBF+KBF的和做比值，即为变化率；
KBL:=(KBF+S1)/((KBF+S1)+(DBF+S1));//将KBL计算的差值与KBF+DBF的和做比值，即为变化率；
CHANGE:=DBL-KBL;//多空变化率做差，得到波动差；
MACHANGE:=MA(CHANGE,S1);//计算波动差S1周期内平均值；
MACHANGE2:=EMA(MACHANGE,S1);//将波动差均值二次平滑得均线；

BUYK:=BARPOS>S2 AND REF(C,1)>MA1 AND MA1>MA2 AND CHANGE>0 AND MACHANGE>MACHANGE2;//多头开仓条件
SELLK:=BARPOS>S2 AND REF(C,1)<MA1 AND MA1<MA2 AND CHANGE<0 AND MACHANGE<MACHANGE2;//空调开仓条件

SELLY:=REF(C,1)<MA1 AND REF(C,1)>BKPRICE*(1+0.01*ST);//多头止盈
BUYY:=REF(C,1)>MA1 AND REF(C,1)<SKPRICE*(1-0.01*ST);//空头止盈


BKVOL<=0 AND REF(BUYK,1),BPK(LOTS);

SKVOL<=0 AND REF(SELLK,1),SPK(LOTS);
	
BKVOL>0 AND  REF(SELLY,1),SP(BKVOL);

SKVOL>0 AND  REF(BUYY,1),BP(SKVOL);

```

> Detail

https://www.fmz.com/strategy/425797

> Last Modified

2023-09-04 22:33:22
