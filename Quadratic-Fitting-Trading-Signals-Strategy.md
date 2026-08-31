
> Name

Quadratic-Fitting-Trading-Signals-Strategy

> Author

ChaoZhang

> Strategy Description


### Overview

This strategy fits a quadratic curve to high/low points of bars to generate trading signals when price breaks through the fitted lines. It attempts to identify key support/resistance levels mathematically for breakout trading.

### Strategy Logic

The key components and rules are:

1. Curve fitting on high/low points using quadratic regression.

2. Buy signal when close breaks above upper band.

3. Sell signal when close breaks below lower band.

4. N periods verification to avoid false breaks.

5. No fixed exit rules, optimize exits via backtesting.

The strategy tries to identify key prices mathematically and trade the breakouts, a typical breakout system.

### Advantages

Compared to other breakout systems, the main advantages are:

1. Mathematical fitting is more objective than subjective judgment.

2. Novel approach combining technical analysis and statistical models. 

3. Multi-period verification avoids false breaks.

4. Backtesting can optimize exits and holding period.

5. Easy to implement with flexible adjustments.

6. Model updates automatically without manual intervention.

7. Can test parameter robustness across products and timeframes.

8. Potential to optimize further with machine learning.

9. Overall novel approach with exploratory value.

### Risks

However, the risks are:

1. Fitting performance depends on parameter tuning, overfitting risk.

2. Fitted lines lag, cannot completely avoid losses. 

3. No volume confirmation, risk of being trapped.

4. Statistical arbitrage is challenging for persistent alpha.

5. Limited backtest period, need to verify robustness. 

6. Multi-market adaptability requires validation.

7. Fixed size lacks dynamic adjustment. 

8. Need strict evaluation of reward/risk ratios.

### Enhancements

Based on the analysis, enhancements may involve:

1. Test parameter robustness across market regimes.

2. Add volume confirmation indicators.

3. Optimize entry/exit logic for higher quality signals.

4. Build dynamic position sizing models. 

5. Incorporate stops to limit losses.

6. Optimize risk management strategies.

7. Rolling window backtest validation.

8. Evaluate multi-market stability.

9. Leverage machine learning for model optimization.

### Conclusion

In summary, this strategy has some innovative value and experimentation merit. But the long-term viability of statistical arbitrage remains unproven. Comprehensive in-sample testing on robustness, risk/reward is key to prevent overfitting and maintain adaptability.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|═══════════════ From ═══════════════|
|v_input_2|true|Month|
|v_input_3|true|Day|
|v_input_4|2019|Year|
|v_input_5|true|════════════════ To ════════════════|
|v_input_6|31|Month|
|v_input_7|12|Day|
|v_input_8|9999|Year|
|v_input_9|true|══════════════ Config ══════════════|
|v_input_10|6|p|
|v_input_11|30|length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-23 00:00:00
end: 2023-09-22 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

strategy(title = " Strategy Quadratic Semaphore ",
         shorttitle = "SQS",
         overlay = true,
         precision = 8,
         calc_on_order_fills = true,
         calc_on_every_tick = true,
         backtest_fill_limits_assumption = 0,
         default_qty_type = strategy.fixed,
         default_qty_value = 2,
         initial_capital = 10000,
         pyramiding=5,
         currency = currency.USD,
         linktoseries = true)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

backTestSectionFrom = input(title = "═══════════════ From ═══════════════", defval = true, type = input.bool)

FromMonth         = input(defval = 1, title = "Month", minval = 1)
FromDay           = input(defval = 1, title = "Day", minval = 1)
FromYear          = input(defval = 2019, title = "Year", minval = 2014)

backTestSectionTo = input(title = "════════════════ To ════════════════", defval = true, type = input.bool)
ToMonth           = input(defval = 31, title = "Month", minval = 1)
ToDay             = input(defval = 12, title = "Day", minval = 1)
ToYear            = input(defval = 9999, title = "Year", minval = 2014)

Config            = input(title = "══════════════ Config ══════════════", defval = true, type = input.bool)
p = input(6)
length = input(30)
//
backTestPeriod() => (time > timestamp(FromYear, FromMonth, FromDay, 00, 00)) and (time < timestamp(ToYear, ToMonth, ToDay, 23, 59))
//
//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

x1 = bar_index
x2 = sqrt(x1)
y = high
//
S11 = sum(x2,length) - sqrt(sum(x1,length)) / length  
S12 = sum(x1*x2,length) - (sum(x1,length) * sum(x2,length)) / length  
S22 = sum(sqrt(x2),length) - sqrt(sum(x2,length)) / length            
Sy1 = sum (y*x1,length) - (sum(y,length) * sum(x1,length)) / length   
Sy2 = sum (y*x2,length) - (sum(y,length) * sum(x2,length)) / length   
//
max1 = sma(x1,length) 
max2 = sma(x2,length)
may = sma(y,length)
b2 = ((Sy1 * S22) - (Sy2*S12))/(S22*S11 - sqrt(S12))
b3 = ((Sy2 * S11) - (Sy1 * S12))/(S22 * S11 - sqrt(S12))
b1 = may - b2*max1 - b3*max2
qr = b1 + b2*x1 + b3*x2
//
yl = low
//
Sy1l = sum(yl*x1,length) - (sum(yl,length) * sum(x1,length)) / length  
Sy2l = sum(yl*x2,length) - (sum(yl,length) * sum(x2,length)) / length  
//
mayl = sma(yl,length)
b2l = ((Sy1l * S22) - (Sy2l*S12))/(S22*S11 - sqrt(S12))
b3l = ((Sy2l * S11) - (Sy1l * S12))/(S22 * S11 - sqrt(S12))
b1l = mayl - b2l*max1 - b3l*max2
qrl = b1l + b2l*x1 + b3l*x2
//
period = round(p/2)+1
hh = qr[period]
ll = qrl[period]
countH = 0
countL = 0
buy=0
sell=0
//
for i = 1 to period-1
    if qr[i]<hh
        countH:=countH+1
    if qrl[i]>ll
        countL:=countL+1

for i = period+1 to p+1
    if qr[i]<hh
        countH:=countH+1
    if qrl[i]>ll
        countL:=countL+1

if countH==p
    pivotH = high[period]
    buy := 1
    
if countL==p
    pivotL = low[period]
    sell := 1
//    
plotshape(buy == 1 , text='?', style=shape.arrowup, location=location.belowbar, color=#32CD32, textcolor=color.white, offset=0, transp=0,size=size.auto)
plotshape(sell == 1 , text='?', style=shape.arrowdown, location=location.abovebar, color=#FF0000, textcolor=color.white, offset=0, transp=0,size=size.auto)
//

if (backTestPeriod())
    strategy.entry("long", true, 1, when = buy == 1)
    strategy.entry("short", false, 1, when = sell == 1) 

```

> Detail

https://www.fmz.com/strategy/427677

> Last Modified

2023-09-23 15:40:57
