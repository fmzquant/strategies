
> Name

EMA-Crossover-Trend-Following-Strategy-436779

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/461bd0ac2fdde8fe03.png)

## Overview  

This strategy adopts EMA crossover to track price trends. It goes long when the fast EMA crosses above the slow EMA, and closes position when the fast EMA crosses below the slow EMA. Mainly suitable for products with obvious trends, effectively following trends and gaining excess returns.

## Strategy Logic

The core indicator of this strategy is EMA. The EMA formula is:  

EMA(t)=C(t)×2/(n+1)+EMA(t-1)×(n-1)/(n+1)

Where t is the current tick, C(t) is the current closing price, and n is the N parameter value. EMA is a moving average technique with a weighted factor, assigning more weight to recent prices, thus reacting faster to the latest price changes.

The strategy constructs fast and slow EMAs and takes fast EMA crossing above slow EMA as the buy signal, and fast EMA crossing below slow EMA as the sell signal. The fast EMA crossing above indicates the start of a new round of rise, while fast EMA crossing below indicates the end of the upside trend and the start of a pullback.  

## Advantage Analysis   

The advantages of this strategy are:

1. The logic is simple and easy to understand and implement;  
2. Utilize the simple and practical EMA to judge price trends, avoiding missing major trends;
3. Few parameters to adjust and optimize, mainly relying on fast and slow EMAs;  
4. Able to follow upside trends after buying;  
5. Able to avoid pullbacks after selling, mitigating risks;
6. Sufficient backtest data with high reliability.

## Risk Analysis   

The main risks are:   

1. High probability of false signals from EMA;  
2. Frequent signal when market is ranging as EMAs easily crossover;
3. Unable to timely stop loss when sudden events cause sharp direction change;  
4. Limited optimization space that actual performance may underperform backtest results.

To reduce the above risks, the following optimizing measures can be adopted:  

1. Adding filter conditions with other indicators to avoid false signals;  
2. Adjusting parameters to reduce signal frequency;   
3. Adding stop loss strategy to control single loss;
4. Testing different time period parameters to find the optimum.  

## Optimization Directions   

The strategy can be optimized from the following aspects:  

1. Composite indicators across multiple timeframes, e.g. combining weekly or monthly trends;   
2. Adding filter conditions to avoid false breakout, e.g. volume, Bollinger Bands etc;   
3. Dynamic adjustment of parameters according to real-time market changes;  
4. Incorporating other indicators to build models, e.g. grid, regression algorithms.  

## Summary   

In summary, this is a simple and practical trend following strategy utilizing EMA to judge price trends. The logic is clear and easy to implement. The advantages lie in the simplicity to adjust parameters and effectively follow trends. The disadvantages are prone to false signals and actual performance may underperform backtests. Next steps of optimization can focus on adding filters, dynamic parameters, model building to make the strategy more robust.  


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 Jan 2020 00:00 +0000)|開始時間|
|v_input_2|timestamp(31 Dec 2050 23:59 +0000)|結束時間|
|v_input_3|5|Fast EMA Length|
|v_input_4|20|Slow EMA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-20 00:00:00
end: 2023-12-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("EMA交叉策略by GPT",
     format = format.inherit,
     overlay = true,
     default_qty_type= strategy.percent_of_equity,
     default_qty_value = 100,
     currency = currency.USD,
     initial_capital = 1000000)


// 定義回測交易開始和結束時間的變數
start_time = input(title="開始時間", type=input.time, defval=timestamp("01 Jan 2020 00:00 +0000"))
end_time = input(title="結束時間", type=input.time, defval=timestamp("31 Dec 2050 23:59 +0000"))


// 判斷是否在回測交易時間範圍內
in_range = true


// Define input variables
fast_length = input(title="Fast EMA Length", type=input.integer, defval=5)
slow_length = input(title="Slow EMA Length", type=input.integer, defval=20)


// Define EMAs
fast_ema = ema(close, fast_length)
slow_ema = ema(close, slow_length)


// Define buy and sell signals
buy_signal = crossover(fast_ema, slow_ema)
sell_signal = crossunder(fast_ema, slow_ema)


// Buy signal
if in_range and buy_signal
    strategy.entry("Buy", strategy.long, when=in_range)
   
// Sell signal
if in_range and sell_signal
    strategy.close("Buy", when=sell_signal)
```

> Detail

https://www.fmz.com/strategy/436779

> Last Modified

2023-12-27 16:31:15
