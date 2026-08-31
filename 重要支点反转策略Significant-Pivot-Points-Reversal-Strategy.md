
> Name

重要支点反转策略Significant-Pivot-Points-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ce944a720ed9db1712.png)

### Overview  

This strategy optimizes the traditional pivot points reversal strategy by calculating the ATR and setting ATR filters to eliminate insignificant pivot points, only trading on truly significant ones.   

### Strategy Logic  

The core logic is to identify significant peak and trough pivot points. The key steps to calculate significant peak pivots are:

1. Calculate ATR and set the ATR filter factor atr_mult. 
2. Traverse a certain number of bars on the left (set by leftBars), if the peak pivot is higher than any high + ATR*atr_mult on the left, the pivot is invalid.
3. Traverse a certain number of bars on the right (set by rightBars), if the peak pivot is higher than any high + ATR*atr_mult on the right, the pivot is invalid.  
4. If the peak pivot remains valid after the above tests, return it as an important peak pivot.

The logic for calculating significant trough pivots is similar.  

After obtaining the significant pivots, go short when price breaks an important peak pivot, and go long when it breaks an important trough pivot.

### Advantage Analysis   

The main advantages of this strategy are:  

1. The ATR and atr_mult filter can eliminate insignificant fluctuations and only trade truly significant pivots, avoiding unnecessary trades.  
2. The dynamic ATR parameter can adjust the trading range automatically in volatile markets, preventing over-trading.
3. Pivot points reversal itself has relatively high win rate and profitability.  

### Risk Analysis   

The main risks are:   

1. Improper ATR parameters may filter out too many valid trades. If ATR is too high, valid pivots could be eliminated.  
2. Risk of being trapped still exists, need to set stop loss to control risk.  
3. Reversal strategies are sensitive to transaction costs, reasonable stop loss and take profit should be set.  

To control the above risks, optimize from the following aspects:
1. Optimize ATR parameters to ensure enough trading opportunities.  
2. Set reasonable stop loss and take profit ratios.
3. Adjust position sizing to reduce transaction cost impact.  

### Optimization Directions   

Further optimization directions include:  

1. Combining with other indicators to determine market regime, avoiding trading reversals in trending markets. Consider MACD, KDJ etc.  

2. Adding machine learning algorithms to auto-optimize parameters. Methods like genetic algorithms, random forest can be used to find optimum parameter sets.  

3. Training models using quantitative data to find optimal ATR range. More historical data improves parameter selection accuracy.   

4. Consider combining with other strategies, utilizing strengths of different strategy types. For example, combining with trend following strategy, reverse during ranging, trend-follow during sustained trends.

### Conclusion   

This significant pivot reversal strategy filters out meaningless minor fluctuations by calculating ATR and setting filters. Only trading reversals on significant pivots can effectively improve strategy profitability. Meanwhile, it also increases parameter optimization difficulty. The optimal parameters need to be found by comprehensive consideration of ATR range, stop loss/take profit ratios etc. If optimized thoroughly, it can become a highly efficient and stable short-term trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|4|PP Left Bars|
|v_input_2|2|PP Right Bars|
|v_input_3|14|ATR Length|
|v_input_4|0.1|ATR Mult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("QuantNomad - Significant Pivot Reversal Strategy", shorttitle = "SPPS", overlay=true)

// Inputs 
leftBars   = input(4,   title = 'PP Left Bars')
rightBars  = input(2,   title = 'PP Right Bars')
atr_length = input(14,  title = 'ATR Length')
atr_mult   = input(0.1, title = 'ATR Mult')

// Pivot High Significant Function
pivotHighSig(left, right) =>
    pp_ok = true
    atr   = atr(atr_length)
    
    for i = 1 to left
        if (high[right] < high[right+i] + atr * atr_mult)
            pp_ok := false
    for i = 0 to right-1
        if (high[right] < high[i] + atr * atr_mult)
            pp_ok := false
    
    pp_ok ? high[right] : na

// Pivot Low Significant Function
pivotLowSig(left, right) =>
    pp_ok = true
    atr   = atr(atr_length)
    
    for i = 1 to left
        if (low[right] > low[right+i] - atr * atr_mult)
            pp_ok := false
    for i = 0 to right-1
        if (low[right] > low[i] - atr * atr_mult)
            pp_ok := false
    
    pp_ok ? low[right] : na


swh = pivotHighSig(leftBars, rightBars)
swl = pivotLowSig (leftBars, rightBars)

swh_cond = not na(swh)

hprice = 0.0
hprice := swh_cond ? swh : hprice[1]

le = false
le := swh_cond ? true : (le[1] and high > hprice ? false : le[1])

if (le)
    strategy.entry("PivRevLE", strategy.long, comment="PivRevLE", stop=hprice + syminfo.mintick)

swl_cond = not na(swl)

lprice = 0.0
lprice := swl_cond ? swl : lprice[1]


se = false
se := swl_cond ? true : (se[1] and low < lprice ? false : se[1])

if (se)
    strategy.entry("PivRevSE", strategy.short, comment="PivRevSE", stop=lprice - syminfo.mintick)
```

> Detail

https://www.fmz.com/strategy/440342

> Last Modified

2024-01-29 14:58:15
