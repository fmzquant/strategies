
> Name

Benchmark-Value-or-Moving-Average-Crossover-Strategy

> Author

cyberking

> Strategy Description

Benchmark values
Sell when the high reference level is above BTC 10000, or when MA(10) < MA(30).
Buy when the pivot reference level is below BTC 6725, or when MA(10) > MA(30).
Stoploss is set to 8, meaning an 8% stop-loss level.
The strategy is intended for the daily timeframe. Backtest results are acceptable on daily candles, but poor on lower timeframes.
This is a trend-based indicator strategy.
*The 10000 and 6725 reference levels are chosen using Gann-style reasoning.
![IMG](https://www.fmz.com/upload/asset/149338fe3f9011badc20c.png)  ![IMG](https://www.fmz.com/upload/asset/14947231d56707e5f7e8c.png)

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|HGH|10000|High level|
|MMD|6725|Pivot level|
|STOPLOSS|8|Stop-loss percentage|


> Source (MyLanguage)

``` pascal
(*backtest
start: 2019-01-05 00:00:00
end: 2020-02-29 00:00:00
period: 1d
exchanges: [{"eid":"Huobi","currency":"BTC_USDT"}]
*)
//
MA10:=MA(C,10);
MA30:=MA(C,30);

买入开仓价:=VALUEWHEN(BARSBK=1,O);
卖出开仓价:=VALUEWHEN(BARSSK=1,O);
//开仓条件

BUYCONDITION:=REF(C,1) < MMD OR CROSSUP(MA10,MA30);
SELLCONDITION:=REF(C,1) > HGH OR CROSSDOWN(MA10,MA30);

BKVOL=0 AND BUYCONDITION,BK;
SKVOL=0 AND SELLCONDITION,SK;

//离场条件
BKVOL>0 AND SELLCONDITION,SP;
SKVOL>0 AND BUYCONDITION,BP;
// 启动止损
SKVOL>0 AND HIGH>=卖出开仓价*(1+STOPLOSS*0.01),BP;
BKVOL>0 AND LOW<=买入开仓价*(1-STOPLOSS*0.01),SP;
AUTOFILTER;
```

> Detail

https://www.fmz.com/strategy/187874

> Last Modified

2020-03-02 11:22:35
