
> Name

均线和高低点相对强弱策略Relative-Strength-Strategy-Based-on-Price

> Author

阿基米德的浴缸

> Strategy Description

[trans]
- 策略名称：基于价格相对强的弱策略
- 数据周期：1H
- 支持：商品期货、数字货币、数字货币期货
- 官方网站：www.quantinfo.com


  ![IMG](https://www.fmz.com/upload/asset/2e346e6e3b2edda65576ffe7d35e104b.png) 



- 主图：
  均线，公式： MAN^^MA(C,N);


- 副图：
  无

||

- Strategy Name: Relative Strength Strategy Based on Price
- Data cycle: 1H
- Support: Commodity Futures, Digital Currency and Digital Currency Futures

  ![IMG](https://www.fmz.com/upload/asset/45096a9dbc8e6361219bd4957494ac60.png)  
  ![IMG](https://www.fmz.com/upload/asset/bcf5916794bbc6d9e5e8332b6fa9798c.png) 

- Main chart:
  MA, formula: MAN^^MA(C,N);
- Secondary chart:
  none

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|N|100|均线指标参数|MA index parameter|
|M|2|止损差价系数|stop loss difference coefficient|


> Source (MyLanguage)

``` pascal
(*backtest
start: 2018-02-01 00:00:00
end: 2018-04-27 00:00:00
period: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
args: [["ContractType","rb888",126961]]
*)

MAN^^MA(C,N);
B_MA:=C>MAN;
S_MA:=C<MAN;

S_K1:=SUM((H-C)*V,N)/SUM((H-L)*V,N)>0.5;
B_K1:=SUM((C-L)*V,N)/SUM((H-L)*V,N)>0.5;

CO:=IF(C>O,C-O,0);
OC:=IF(C<O,O-C,0);
S_K2:=SUM(OC*V,N)/SUM(ABS(C-O)*V,N)>0.5;
B_K2:=SUM(CO*V,N)/SUM(ABS(C-O)*V,N)>0.5;

B_K1 AND B_K2 AND B_MA AND H>=HHV(H,N),BPK;
S_K1 AND S_K2 AND S_MA AND L<=LLV(L,N),SPK;

STOPLOSS:=M*MA(H-L,N);
C<BKPRICE-STOPLOSS,SP(BKVOL);
C>SKPRICE+STOPLOSS,BP(SKVOL);

S_MA AND BKHIGH>BKPRICE+STOPLOSS,SP(BKVOL);
B_MA AND SKLOW<SKPRICE-STOPLOSS,BP(SKVOL);
```

> Detail

https://www.fmz.com/strategy/129078

> Last Modified

2018-12-18 10:25:23
