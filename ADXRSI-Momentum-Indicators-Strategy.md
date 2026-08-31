
> Name

ADXRSI-Momentum-Indicators-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13ea780e8d31b825e6f.png)

### Overview

This strategy utilizes momentum indicators ADX, RSI and Bollinger Bands to determine market trends and overbought/oversold situations, in order to implement automated trading for buying low and selling high.

### Strategy Principles  

1. ADX indicator determines trend. When ADX is greater than 32, it indicates a trending market.

2. RSI indicator determines overbought/oversold levels. When RSI crosses above 30, it signals an oversold market. When RSI crosses below 70, it signals an overbought market.

3. Bollinger Bands determine consolidation and breakout. When close price breaks above the upper band, it signals the end of consolidation and upside breakout. When close price breaks below the lower band, it signals the end of consolidation and downside breakout.

Based on the indicators above, the trading strategy is defined as follows:

Buy condition:  
1. ADX>32, in trend  
2. RSI crosses above 30, oversold
3. Close price below lower Bollinger band, end of downtrend consolidation   

Sell condition:
1. ADX>32, in trend
2. RSI crosses below 70, overbought  
3. Close price above upper Bollinger band, end of uptrend consolidation

### Advantage Analysis   

This strategy utilizes multiple indicators to determine market conditions, avoiding the probability of error when relying on a single indicator. By determining trend and overbought/oversold status, it can effectively capture market turning points and achieve buy low sell high.

Compared to using trend indicators alone, this strategy can capture short-term opportunities in a timelier manner. Compared to using solely oscillators, this strategy can better grasp the trend direction. Therefore, it retains the advantage of tracking trends, while also having the flexibility of mean-reversion trading. It is a potentially efficient quantitative strategy.  

### Risk Analysis

The main risks of this strategy includes:  

1. Risk of false signals from indicators. Indicators may fail when markets experience extreme events.  

2. Risk of stops being too tight. Short-term market fluctuations may take out the position if stops are too close.   

3. Risk of overfitting. If indicator parameters are merely fitted to historical data, the stability would be questionable and may fail to adapt to changing market dynamics.

Risk management measures:

1. Manually intervene under abnormal market conditions to pause the strategy and avoid losses from false signals.  

2. Set reasonable stop distance, combining with moving averages to determine stop levels, avoiding being stopped out prematurely.   

3. Introduce Parameter Tuning module, dynamically optimize parameters using Walk Forward Analysis to ensure robustness.  

### Optimization Directions   

The main aspects to improve this strategy includes:  

1. Optimize indicator parameters, using machine learning algorithms tailored to each market.

2. Feature engineering, introducing more technical indicators and training models like SVM to improve signal accuracy.  

3. Incorporate breakout strategies based on characteristics of each market using price channels, supports/resistances etc. to enhance stability.   

4. Optimize profit taking and stop loss mechanisms by introducing trailing stops, moving stops etc. to maximize profit and effectively control risks.   

### Conclusion

This medium-term quantitative trading strategy utilizes multiple technical indicators like ADX, RSI and Bollinger Bands to determine market conditions and places trades when significant structural changes are identified. The logic is clear and interpretable, drastically reducing reliance on a single indicator. Meanwhile, risks like false signals, overly tight stops and parameter overfitting needs to be addressed through risk management and model optimization to enhance stability and efficiency.  



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|ADX Smoothing|
|v_input_2|14|DI Length|
|v_input_3|20|threshold|
|v_input_4|7|Periodo RSI|
|v_input_5|30|Livello Ipervenduto|
|v_input_6|70|Livello Ipercomprato|
|v_input_7|50|Periodo BB|
|v_input_8|2|Dev BB|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-10 00:00:00
end: 2023-12-01 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("DAX Shooter 5M Strategy", overlay=true)

//Creo ADX
adxlen = input(14, title="ADX Smoothing")
dilen = input(14, title="DI Length")
th = input(title="threshold", type=input.integer, defval=20)
dirmov(len) =>
    up = change(high)
    down = -change(low)
    plusDM = na(up) ? na : up > down and up > 0 ? up : 0
    minusDM = na(down) ? na : down > up and down > 0 ? down : 0
    truerange = rma(tr, len)

    plus = fixnan(100 * rma(plusDM, len) / truerange)
    minus = fixnan(100 * rma(minusDM, len) / truerange)

    [plus, minus]

adx(dilen, adxlen) =>
    [plus, minus] = dirmov(dilen)
    sum = plus + minus
    adx = 100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
    adx


[plus, minus] = dirmov(dilen)
sig = adx(dilen, adxlen)

//Creo RSI

src = close
len = input(7, minval=1, title="Periodo RSI")
up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - 100 / (1 + up / down)
bandainf = input(30, title="Livello Ipervenduto")
bandasup = input(70, title="Livello Ipercomprato")


//Creo Bande di Bollinger

source = close
length = input(50, minval=1, title="Periodo BB")
mult = input(2.0, minval=0.001, maxval=50, title="Dev BB")

basis = sma(source, length)
dev = mult * stdev(source, length)

upper = basis + dev
lower = basis - dev

plot(basis, color=color.white)
p1 = plot(upper, color=color.aqua)
p2 = plot(lower, color=color.aqua)
fill(p1, p2)

//Stabilisco regole di ingresso

if crossover(rsi, bandainf) and adx(dilen, adxlen) > 32 and low < lower
    strategy.entry("COMPRA", strategy.long, limit=upper, oca_name="DaxShooter", comment="COMPRA")
else
    //strategy.exit("exit", "COMPRA", loss = 90) 
    strategy.cancel(id="COMPRA")

if crossunder(rsi, bandasup) and adx(dilen, adxlen) > 32 and high > upper
    strategy.entry("VENDI", strategy.short, limit=lower, oca_name="DaxShooter",comment="VENDI")
else
    //strategy.exit("exit", "VENDI", loss = 90)
    strategy.cancel(id="VENDI")

//Imposto gli alert
buy= crossover(rsi, bandainf) and adx(dilen, adxlen) > 32 and low < lower
sell= crossunder(rsi, bandasup) and adx(dilen, adxlen) > 32 and high > upper
alertcondition(buy, title='Segnale Acquisto', message='Compra DAX')
alertcondition(sell, title='Segnale Vendita', message='Vendi DAX')

//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)

```

> Detail

https://www.fmz.com/strategy/435001

> Last Modified

2023-12-11 16:06:30
