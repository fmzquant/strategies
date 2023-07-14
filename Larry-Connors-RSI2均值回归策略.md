
> Name

Larry-Connors-RSI2均值回归策略

> Author

homily



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Y|70|Y|


> Source (MyLanguage)

``` pascal
(*backtest
start: 2018-01-01 00:00:00
end: 2020-05-12 00:00:00
period: 15m
basePeriod: 15m
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD"}]
args: [["TradeAmount",5000,126961],["MaxAmountOnce",5000,126961],["ContractType","quarter",126961]]
*)


//https://school.stockcharts.com/doku.php?id=trading_strategies:rsi2
//http://gbeced.github.io/pyalgotrade/docs/v0.20/html/sample_rsi2.html


liang:=INTPART(1*MONEYTOT*REF(C,1)/100);

LC := REF(CLOSE,1);
RSI2: SMA(MAX(CLOSE-LC,0),2,1)/SMA(ABS(CLOSE-LC),2,1)*100;

ma1:=MA(CLOSE,Y);

CLOSE>ma1 AND RSI2>90,SK(liang);
CLOSE>ma1 AND RSI2<10,BP(SKVOL);

CLOSE<ma1 AND RSI2<10,BK(liang);
CLOSE<ma1 AND RSI2>90,SP(BKVOL);


AUTOFILTER;
```

> Detail

https://www.fmz.com/strategy/207157

> Last Modified

2020-05-14 09:50:47
