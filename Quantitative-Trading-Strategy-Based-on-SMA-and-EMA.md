
> Name

Quantitative-Trading-Strategy-Based-on-SMA-and-EMA

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/118ccfb3e5431cfeb24.png)
### I. Strategy Overview  

This strategy is named "Quantitative Trading Strategy Based on SMA and EMA". Its main idea is to combine SMA lines and EMA lines with different parameters to construct trading signals.

### II. Strategy Principle   

1. Calculate the SMA9, SMA50, SMA180 of close price and EMA20.  

2. Determine buy and sell signals based on the relationship between close price and support sup and resistance res. Generate buy signal BuySignal when close breaks through sup, and generate sell signal SellSignal when close breaks through res.   

3. When buy signal triggers, execute long position strategy; when sell signal triggers, close long position.  

4. When sell signal triggers, execute short position strategy; when buy signal triggers, close short position.

### III. Advantage Analysis   

1. Combining multiple moving averages to form trading signals improves accuracy and stability.  

2. Calculating dynamic support and resistance makes trading signals more reliable.

3. Adopting high, medium and low volatility moving averages considers both long-term trend and short-term breakthroughs, improving the strategy's profitability.  

4. Supporting both long and short positions can obtain profits in trending and sideways markets.

### IV. Risk Analysis  

1. SMA has lagging effect, which may delay buy and sell signals and affect strategy performance. 

2. No stop loss mechanism, losses may expand.

3. Insufficient backtesting data, parameters need to be adjusted according to the market.  

4. Relying on technical indicators, unable to cope with black swan events.

Solutions:
1. Adjust SMA periods properly. 
2. Set reasonable stop loss.
3. Increase sample size for backtesting, adjust parameters.
4. Improve risk control mechanisms.  

### V. Optimization  

1. Add volatility based stop loss to control single loss.  

2. Add machine learning models to assist with trend judgment and signal generation.

3. Add key price analysis to improve support and resistance accuracy.  

4. Test different parameter combinations to find better parameters.

### VI. Summary

This strategy combines the technical indicators of SMA and EMA to construct trading signals, and calculates dynamic support and resistance to form a complete buy and sell logic. The advantages are flexible parameters, two-way trading, adaptable to different markets, but it also faces issues like lagging and inadequate stop loss. Future optimizations can be made in aspects like stop loss, trend judgment, key price analysis to improve stability and profitability.]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|SMA1|
|v_input_2|50|SMA2|
|v_input_3|180|SMA3|
|v_input_4|20|EMA1|
|v_input_5|3|BUY/SELL Swing|
|v_input_6|false|BUY/SELL Bar Color|
|v_input_7|false|BUY/SELL Background Color|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-10 00:00:00
end: 2023-12-11 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="StrategySMA 9/50/180 | EMA 20 | BUY/SELL", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

//SMA and EMA code
smaInput1 = input(9, title="SMA1")
smaInput2 = input(50, title="SMA2")
smaInput3 = input(180, title="SMA3")
emaInput1 = input(20, title="EMA1")
sma1 = sma(close, smaInput1)
sma2 = sma(close, smaInput2)
sma3 = sma(close, smaInput3)
EMA1 = ema(close, emaInput1)
plot(sma1, color= color.red , title="SMA1")
plot(sma2, color = color.blue, title="SMA2")
plot(sma3, color= color.white, title="SMA3")
plot(EMA1, color = color.yellow, title="EMA1")

no=input(3,title="BUY/SELL Swing")
Barcolor=input(false,title="BUY/SELL Bar Color")
Bgcolor=input(false,title="BUY/SELL Background Color")
res=highest(high,no)
sup=lowest(low,no)
avd=iff(close>res[1],1,iff(close<sup[1],-1,0))
avn=valuewhen(avd!=0,avd,0)
tsl=iff(avn==1,sup,res)

// Buy/sell signals
BuySignal = crossover(close, tsl)
SellSignal = crossunder(close, tsl)

// Enter long position
strategy.entry("Buy", strategy.long, when=BuySignal)

// Exit long position
strategy.exit("Sell", "Buy", when=SellSignal)

// Enter short position
strategy.entry("Sell", strategy.short, when=SellSignal)

// Exit short position
strategy.exit("Buy", "Sell", when=BuySignal)

colr = close>=tsl ? color.green : close<=tsl ? color.red : na
plot(tsl, color=colr)

```

> Detail

https://www.fmz.com/strategy/435104

> Last Modified

2023-12-12 12:31:25
