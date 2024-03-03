
> Name

基于三重指数移动平均和线性回归的趋势跟踪策略Trend-Following-Strategy-Based-on-Triple-EMA-and-Linear-Regression

> Author

ChaoZhang

> Strategy Description



[trans]
本策略名称为“基于三重指数移动平均和线性回归的趋势跟踪策略”。该策略通过三重指数移动平均线和线性回归线的交叉来识别趋势方向,并设定自适应止损以锁定利润。

三重指数移动平均线(TEMA)综合了单一EMA和双重EMA的优点,能更灵敏地捕捉价格变化趋势。线性回归线反映价格长期均衡趋势。当短期的TEMA上穿长期的线性回归线时,判断为上涨趋势形成,考虑做多;反之则考虑做空。

进入仓位后,策略采用基于ATR指标的自适应止损方式来锁定利润。它根据市场波动率设定和调整止损距离。这避免止损过于固定,也使止损可以跟随市场波动自适应调整。

该策略的优势是指标组合识别趋势方向较为准确,自适应止损机制也较为先进。但参数设定需要根据具体品种谨慎测试和优化,始终紧跟市场变化进行调整。

总之,多种技术指标的合理融合应用,配合严格的风险管理措施,可以提高策略交易的效率和规避风险的能力。


||



This strategy is named “Trend Following Strategy Based on Triple EMA and Linear Regression”. It uses crossover of the triple exponential moving average and linear regression line to identify trend direction, and sets adaptive stop loss to lock in profits.

The triple EMA (TEMA) combines the strengths of single EMA and double EMA to more sensitively capture price trend changes. Linear regression line reflects the long-term equilibrium trend of prices. When the short-term TEMA crosses above the long-term linear regression line, it signals an uptrend for considering long trades. The opposite suggests downtrends for considering shorts.

After entry, the strategy uses an ATR-based adaptive stop loss mechanism to lock in profits. It sets and adjusts stop distance based on market volatility. This avoids fixed stops while allowing stops to adaptively trail market fluctuations. 

The advantage of this strategy is the indicator combo identifies trend direction relatively accurately. The adaptive stop loss method is also more advanced. But parameters need prudent testing and optimization for specific products, constantly adapting to market changes.

In summary, the reasonable integration of multiple technical indicators, together with strict risk management measures, can improve the efficiency of strategy trading and the ability to mitigate risks.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|What trades should be taken : : LONG|SHORT|BOTH|NONE|
|v_input_2|0|First Trend Line : : TEMA|LSMA|EMA|SMA|
|v_input_3|0|First Trend Line : : LSMA|TEMA|EMA|SMA|
|v_input_4|25|Length of the First Trend Line|
|v_input_5|100|Length of the Second Trend Line|
|v_input_6|15|Long Take Profit 1 %|
|v_input_7|20|Long Take Profit 1 Qty|
|v_input_8|30|Long Take Profit 2%|
|v_input_9|20|Long Take Profit 2 Qty|
|v_input_10|5|stop loss in %|
|v_input_11|3.5|SL Mutiplier|
|v_input_12|8|ATR period|
|v_input_13_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_14|2016|Backtest Start Year|
|v_input_15|true|Backtest Start Month|
|v_input_16|true|Backtest Start Day|
|v_input_17|9999|Backtest Stop Year|
|v_input_18|12|Backtest Stop Month|
|v_input_19|31|Backtest Stop Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-02-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Wunderbit Trading

//@version=4
strategy("Automated Bitcoin (BTC) Investment Strategy", overlay=true, initial_capital=5000,pyramiding = 0, currency="USD", default_qty_type=strategy.percent_of_equity, default_qty_value=100,  commission_type=strategy.commission.percent,commission_value=0.1)

////////////  Functions

Atr(p) =>
    atr = 0.
    Tr = max(high - low, max(abs(high - close[1]), abs(low - close[1])))
    atr := nz(atr[1] + (Tr - atr[1])/p,Tr)

//TEMA
TEMA(series, length) =>
    if (length > 0)
        ema1 = ema(series, length)
        ema2 = ema(ema1, length)
        ema3 = ema(ema2, length)
        (3 * ema1) - (3 * ema2) + ema3
    else
        na
tradeType = input("LONG", title="What trades should be taken : ", options=["LONG", "SHORT", "BOTH", "NONE"])

///////////////////////////////////////////////////
/// INDICATORS
source=close

/// TREND
trend_type1 = input("TEMA", title ="First Trend Line : ", options=["LSMA", "TEMA","EMA","SMA"])
trend_type2 = input("LSMA", title ="First Trend Line : ", options=["LSMA", "TEMA","EMA","SMA"])

trend_type1_length=input(25, "Length of the First Trend Line")
trend_type2_length=input(100, "Length of the Second Trend Line")

leadLine1 = if trend_type1=="LSMA"
    linreg(close, trend_type1_length, 0)
else if trend_type1=="TEMA"
    TEMA(close,trend_type1_length)
else if trend_type1 =="EMA"
    ema(close,trend_type1_length)
else
    sma(close,trend_type1_length)

leadLine2 = if trend_type2=="LSMA"
    linreg(close, trend_type2_length, 0)
else if trend_type2=="TEMA"
    TEMA(close,trend_type2_length)
else if trend_type2 =="EMA"
    ema(close,trend_type2_length)
else
    sma(close,trend_type2_length)

p3 = plot(leadLine1, color= #53b987, title="EMA", transp = 50, linewidth = 1)
p4 = plot(leadLine2, color= #eb4d5c, title="SMA", transp = 50, linewidth = 1)
fill(p3, p4, transp = 60, color = leadLine1 > leadLine2 ? #53b987 : #eb4d5c)

//Upward Trend
UT=crossover(leadLine1,leadLine2)
DT=crossunder(leadLine1,leadLine2)

// TP/ SL/  FOR LONG
// TAKE PROFIT AND STOP LOSS
long_tp1_inp = input(15, title='Long Take Profit 1 %', step=0.1)/100
long_tp1_qty = input(20, title="Long Take Profit 1 Qty", step=1)

long_tp2_inp = input(30, title='Long Take Profit 2%', step=0.1)/100
long_tp2_qty = input(20, title="Long Take Profit 2 Qty", step=1)

long_take_level_1 = strategy.position_avg_price * (1 + long_tp1_inp)
long_take_level_2 = strategy.position_avg_price * (1 + long_tp2_inp)

long_sl_input = input(5, title='stop loss in %', step=0.1)/100
long_sl_input_level = strategy.position_avg_price * (1 - long_sl_input)

// Stop Loss
multiplier = input(3.5, "SL Mutiplier", minval=1, step=0.1)
ATR_period=input(8,"ATR period", minval=1, step=1)

// Strategy
//LONG STRATEGY CONDITION

SC = input(close, "Source", input.source)
SL1 = multiplier * Atr(ATR_period)  // Stop Loss
Trail1 = 0.0
Trail1 :=  iff(SC < nz(Trail1[1], 0) and SC[1] < nz(Trail1[1], 0), min(nz(Trail1[1], 0), SC + SL1), iff(SC > nz(Trail1[1], 0), SC - SL1, SC + SL1))
Trail1_high=highest(Trail1,50)

// iff(SC > nz(Trail1[1], 0) and SC[1] > nz(Trail1[1], 0), max(nz(Trail1[1], 0), SC - SL1),

entry_long=crossover(leadLine1,leadLine2) and Trail1_high < close
exit_long = close < Trail1_high or crossover(leadLine2,leadLine1) or close < long_sl_input_level

///// BACKTEST PERIOD ///////
testStartYear = input(2016, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear, testStartMonth, testStartDay, 0, 0)

testStopYear = input(9999, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear, testStopMonth, testStopDay, 0, 0)

testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false

if testPeriod()
    if tradeType=="LONG" or tradeType=="BOTH"
        if strategy.position_size == 0 or strategy.position_size > 0
            strategy.entry("long", strategy.long, comment="BUY", when=entry_long)
            strategy.exit("TP1", "long", qty_percent=long_tp1_qty, limit=long_take_level_1)
            strategy.exit("TP2", "long", qty_percent=long_tp2_qty, limit=long_take_level_2)
            strategy.close("long", when=exit_long, comment="SL" )


// LONG POSITION

plot(strategy.position_size > 0 ? long_take_level_1 : na, style=plot.style_linebr, color=color.green, linewidth=1, title="1st Long Take Profit")
plot(strategy.position_size > 0 ? long_take_level_2 : na, style=plot.style_linebr, color=color.green, linewidth=1, title="2nd Long Take Profit")
plot(strategy.position_size > 0 ? Trail1_high : na, style=plot.style_linebr, color=color.red, linewidth=1, title="Long Stop Loss")
```

> Detail

https://www.fmz.com/strategy/426610

> Last Modified

2023-09-13 17:13:36
