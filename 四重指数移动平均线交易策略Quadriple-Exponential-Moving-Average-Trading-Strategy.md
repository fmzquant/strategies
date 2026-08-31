
> Name

四重指数移动平均线交易策略Quadriple-Exponential-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9237409b3648d52333.png)


## Overview  

The Quadriple Exponential Moving Average (EMA) trading strategy is a typical trend-following strategy that tracks multiple exponential moving averages. It simultaneously tracks the 13-day, 21-day, 55-day and 8-day EMAs and generates trading signals based on their crossover situations to determine market trends.  

## Strategy Logic  

The core logic of this strategy is to track the crossover situations between the 4 EMAs - EMA13, EMA21, EMA55 and EMA8. Specifically, it follows these trading rules:  

1. When EMA55 crosses below EMA21, and EMA21 is above EMA55, EMA13 is above EMA21, and EMA8 is above EMA13, go long.  

2. When EMA55 crosses above EMA21, and EMA21 is below EMA55, EMA13 is below EMA21, and EMA8 is below EMA13, go short.

3. When EMA55 crosses above EMA21, if already long, close long position and open short position.  

4. When EMA55 crosses below EMA21, if already short, close short position and open long position.

5. Set stop loss at 150 points and take profit at 1000 points for both long and short trades.

As we can see, this strategy uses the crossover between EMA55 and EMA21 to judge the major trend direction. The relative positions of EMA13, EMA21 and EMA8 are then used to optimize entry timings.  

## Advantage Analysis 

The Quadriple EMA strategy has these advantages:

1. Using multiple EMAs can accurately determine market trends. EMA55 vs EMA21 judges the major trend while EMA13, EMA21 and EMA8 optimize entry timings to improve efficiency.   

2. The strategy logic is simple and clear, easy to understand and implement.  

3. The smoothing nature of EMAs helps filter market noise and avoid traps. 

4. This strategy can be broadly applied to different products like stocks, forex, crypto etc as it has no special requirements.

## Risks and Improvements

The risks of this strategy include:

1. Tracking EMAs may lead to losses or late trend reversal signals when trend reverses. Adjusting EMA parameters or adding other indicators could help.  

2. Stop loss and take profit points may need adjustment for different products. Dynamic SL/TP can optimize this.

3. Further parameter optimization with machine learning algorithms may also improve performance.  

4. Incorporating volatility metrics to lower position sizes during high volatility periods could help control risks.

## Conclusion  

The Quadriple EMA strategy is a relatively simple trend-following strategy. It uses multiple EMAs to depict market trends and generate trading signals accordingly. The strategy is concise, easy to implement, and broadly applicable across different products. However, we should also note the risks of passive trend switch and further improve it by adding more supplemental indicators or optimizing parameters.




> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-24 00:00:00
end: 2023-11-30 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="Quadriple EMA Strategy", overlay=true, pyramiding=1, currency=currency.USD, initial_capital=10000, default_qty_type=strategy.cash, default_qty_value=10000)

ema13 = ta.ema(close, 13)
ema21 = ta.ema(close, 21)
ema55 = ta.ema(close, 55)
ema8 = ta.ema(close, 8)

plot(ema13, color=color.green, title="ema13")
plot(ema21, color=color.orange, title="ema21")
plot(ema55, color=color.red, title="ema55")
plot(ema8, color=color.blue, title="ema8")

if ta.crossunder(ema55, ema21) and strategy.position_size == 0 and ema21>ema55 and ema13>ema21 and ema8>ema13
	strategy.entry("Enter Long", strategy.long)
    strategy.exit("Exit Long", from_entry="Enter Long", loss=150, profit=1000)

if (ta.crossover(ema55, ema21) and strategy.position_size == 0) and ema21<ema55 and ema13<ema21 and ema8<ema13
	strategy.entry("Enter Short", strategy.short)
    strategy.exit("Exit Short", from_entry="Enter Short", loss=150, profit=1000)

if ta.crossover(ema55,ema21)
    strategy.close("Enter Long")
    strategy.entry("Enter Short", strategy.short)

if ta.crossunder(ema55,ema21)
    strategy.close("Enter Short")
    strategy.entry("Enter Long", strategy.long)

```

> Detail

https://www.fmz.com/strategy/433971

> Last Modified

2023-12-01 18:29:07
