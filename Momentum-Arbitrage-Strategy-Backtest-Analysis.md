
> Name

Momentum-Arbitrage-Strategy-Backtest-Analysis

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/172c6227d7c8a0e0084.png)



### I. Strategy Name 

Based on the key features of this strategy, I name it "Momentum Arbitrage Strategy".

### II. Strategy Overview

This strategy generates trading signals by calculating the Chande Momentum Oscillator and setting upper and lower thresholds, forming arbitrage opportunities for profits.

### III. Strategy Logic

The code first sets parameters Length, TopBand and LowBand, where Length represents the number of days for momentum calculation, and TopBand and LowBand represent the upper and lower thresholds.

It then calculates the absolute momentum xMom over the past Length days, and the simple moving average of xMom over Length days, xSMA_mom.

After that, it calculates the cumulative momentum over Length days, xMomLength. 

Next, it calculates the momentum oscillator nRes, which equals xMomLength divided by xSMA_mom then multiplied by Length, amplified by 100.

Based on the comparison between nRes and the thresholds, it determines long or short direction and stores it in pos.

Finally, it adjusts pos based on whether reverse trading is enabled, generates trading signal possig, and creates long/short entries.

### IV. Strategy Strengths

1. Identify potential trend turning points using momentum indicator, benefiting trend catching.

2. Form clear long/short signals combined with threshold filtering, avoiding wrong trades. 

3. Apply reverse trading logic to obtain reversal opportunities.

4. Large tunable parameter space, can be optimized for different products and timeframes.

5. Visualized parameters are intuitive, easy to grasp trading logic.

### V. Strategy Risks

1. Only consider momentum, may miss opportunities formed by other technical indicators.

2. Momentum breakout does not necessarily represent trend reversal, wrong judgement risk exists.

3. Although reverse trading has profit potential, it may also amplify losses.  

4. Improper parameter optimization may lead to over-trading or missing best entry points.

5. Need to filter out short-term momentum distortions caused by sudden events.

Risks can be controlled by combining other indicators like trend and volatility to confirm signal reliability, adjusting parameters to lower trade frequency, relaxing stop loss properly, etc.

### VI. Strategy Optimization Directions

1. Add other technical indicator filters to improve signal accuracy.

Confirm close price is above moving average system, or volatility is within normal range, before triggered momentum signals.

2. Optimize parameters according to product characteristics. 

For more volatile products, relax the normal threshold range to lower trade frequency.

3. Multi-timeframe optimization based on different time periods.

Use smaller period Length for intraday ultra-short term trading. Adjust parameters based on weekly or monthly charts for medium-long term trends.

4. Set bottom divergence condition. 

For buy signals, require price to be above previous trough to avoid fake reversal signals.

### VII. Conclusion

The strategy mainly identifies short-term trend reversals through momentum indicator, with parameter filtering to generate trade signals, balancing trend following and reversal capturing. The risks are controllable. Further research and application with multi-timeframe optimization and combining other technical indicators can improve strategy performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Length|
|v_input_2|70|TopBand|
|v_input_3|-70|LowBand|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-24 00:00:00
end: 2023-10-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 07/02/2017
//    This indicator plots Chande Momentum Oscillator. This indicator was 
//    developed by Tushar Chande. A scientist, an inventor, and a respected 
//    trading system developer, Mr. Chande developed the CMO to capture what 
//    he calls "pure momentum". For more definitive information on the CMO and 
//    other indicators we recommend the book The New Technical Trader by Tushar 
//    Chande and Stanley Kroll.
//    The CMO is closely related to, yet unique from, other momentum oriented 
//    indicators such as Relative Strength Index, Stochastic, Rate-of-Change, 
//    etc. It is most closely related to Welles Wilder`s RSI, yet it differs 
//    in several ways:
//        - It uses data for both up days and down days in the numerator, thereby 
//          directly measuring momentum;
//        - The calculations are applied on unsmoothed data. Therefore, short-term 
//          extreme movements in price are not hidden. Once calculated, smoothing 
//          can be applied to the CMO, if desired;
//        - The scale is bounded between +100 and -100, thereby allowing you to 
//          clearly see changes in net momentum using the 0 level. The bounded scale 
//          also allows you to conveniently compare values across different securities.
////////////////////////////////////////////////////////////
strategy(title="CMO (Chande Momentum Oscillator)", shorttitle="CMO")
Length = input(9, minval=1)
TopBand = input(70, minval=1)
LowBand = input(-70, maxval=-1)
reverse = input(false, title="Trade reverse")
// hline(0, color=gray, linestyle=dashed)
// hline(TopBand, color=red, linestyle=line)
// hline(LowBand, color=green, linestyle=line)
xMom = abs(close - close[1])
xSMA_mom = sma(xMom, Length)
xMomLength = close - close[Length]
nRes = 100 * (xMomLength / (xSMA_mom * Length))
pos = iff(nRes > TopBand, 1,
	   iff(nRes <= LowBand, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
         iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue)
plot(nRes, color=blue, title="CMO")
```

> Detail

https://www.fmz.com/strategy/430117

> Last Modified

2023-10-25 11:10:59
