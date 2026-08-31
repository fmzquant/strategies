
> Name

跨越移动平均线的莱瑞威廉姆斯策略Larry-Williams-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b119df0f714f755970.png)

## Overview

This is a simple and classic moving average crossover strategy created by famous trader Larry Williams. The strategy uses 9-day simple moving average as the fast line and 21-day exponential moving average as the slow line. It goes long when the price breaks above the 9-day line, and goes short when the price breaks below the 9-day line. To filter false breakouts, the 21-day line is also used to confirm the trend.  

## Strategy Logic  

The strategy is based on golden crossover and death crossover of moving averages to determine long and short opportunities. When the fast line breaks above the slow line from below, it is a golden crossover, indicating a change to a bullish trend. Such breakout is used for going long. When the fast line breaks below the slow line from above, it is a death crossover, indicating a change to a bearish trend. Such breakout is used for going short.   

To avoid false breakouts leading to virtual losses, the 21-day line is also used to determine the major trend. Only when the fast line breaks out and the price also breaks the 21-day line, will trade actions be taken. This can effectively filter out many false breakouts.  

Specifically, the long signal is triggered when: the fast line breaks above yesterday's high and breaks above the 21-day line. The short signal is triggered when: the fast line breaks below yesterday’s low and breaks below the 21-day line.  

## Advantage Analysis

The main advantages of this strategy are:  

1. The strategy idea is simple and easy to understand and implement.  
2. The moving average technique is mature and widely used.  
3. Introduction of the 21-day line effectively filters false breakouts.   
4. Using yesterday's extreme points to enter positions can prevent being trapped.    
5. The strategy parameters are relatively robust without overfitting easily.   

## Risk Analysis   

The main risks of this strategy are:   

1. In volatile markets, the moving averages lag and may miss the best entry points.   
2. In range-bound markets with sideways price action, frequent small losses may occur.   
3. It cannot respond effectively to sudden events and significant trend changes.   

To address these risks, optimizations can be made in the following aspects:  

1. Introduce MACD indicator for more real-time signals.   
2. Increase the MA period parameters to lower trading frequency.  
3. Add stop loss strategies to control single trade loss amount.   

## Optimization Directions   

The main optimization directions for this strategy include:  

1. Parameter optimization. More systematic methods can be used to test different MA period combinations to find better parameters.  

2. Add stop loss. Set proper moving stop loss, percentage stop loss etc to effectively control single trade loss.  

3. Combine other indicators. Introduce signals from MACD, ATR, KD etc to obtain more confirmation dimensions and improve strategy stability.  

4. Optimize exit mechanisms. Research different types of exit methods like reversal signal exits, moving profit-taking exits etc.  

## Conclusion  

In summary, this moving average crossover strategy is a very typical and practical trend following strategy. It has the advantage of being easy to understand and implement, and also has room for improvement. Through methods like parameter optimization, stop loss optimization, multi-indicator combination etc, continuous improvements can be made to turn it into a more stable and practical trading system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|9|Media Curta|
|v_input_int_2|21|Media Curta|
|v_input_int_3|15|Percentual Ganho|
|v_input_int_4|5|Percental  Perda|


> Source (PineScript)

``` pinescript
// @_benac
//@version=5
strategy('Larry', overlay=true , initial_capital=1000 )


////////////////////////////////////////////////////////
//                                                    //
//                                                    //
//                 Codigo Operacional                 //
//                                                    //
//                                                    //
////////////////////////////////////////////////////////

// Usage for Stocks , or Criptos with value bigger then 1, cuz of 0.01 ´pip.
// Daily timeframe
//Observation Point
start     = timestamp(2020, 00, 00, 00, 00)         // backtest start window
finish    = timestamp(2022, 01, 07, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"  

if time < start 
    strategy.close_all("Closing All")

// Take infos from inputs. 
inp_mmshort = input.int(defval = 9, title = "Media Curta"  )
inp_mminter = input.int(defval = 21, title = "Media Curta"  )

// Risk Manager, here define max and min 
inp_max = input.int(defval = 15, title = "Percentual Ganho"  )
inp_min = input.int(defval = 5, title = "Percental  Perda"  )

// Converting the input to % 
pmax = (inp_max / 100 )
pmin =  (inp_min / 100)

// Infos From Moving Average
mm_short = ta.sma(close , inp_mmshort)
mm_inter = ta.ema(close , inp_mminter)


// Trend Logic
//Long Condition 

//Setup do Larry Willians Bem Simples , media virou para cima e rompeu a maxima de referencia, compra. 
tendencia_alta = mm_short[2] > mm_short[1] and mm_short > mm_short[1] and close > high[1] and close > mm_short and mm_short > mm_inter
tendencia_baixa = mm_short[2] < mm_short[1] and mm_short < mm_short[1] and close > low[1] and close < mm_short and mm_short < mm_inter

// Creating the entry
if tendencia_alta 
    strategy.entry("Compra" , strategy.long , stop = low - 0.01  )
    stop_inst = low - 0.01 
if tendencia_baixa 
    strategy.entry("Venda" , strategy.short , stop= high + 0.01  )
    stop_inst = high + 0.01


// TrailingStop Creation

// Sell Position
if strategy.position_size < 0 
    gain_p = strategy.opentrades.entry_price(0) - (strategy.opentrades.entry_price(0) * pmax) 
    stop_p = strategy.opentrades.entry_price(0) + (strategy.opentrades.entry_price(0) * pmin) 
    // Managing the position
    if close < gain_p 
        strategy.close_all(comment = " 1 - Ganho : " + str.tostring( gain_p) + " Perda : " + str.tostring( stop_p)  )
    if close > stop_p 
        strategy.close_all(comment = " 2 - Ganho : " + str.tostring( gain_p) + " Perda : " + str.tostring( stop_p)  )
    
    if  high > mm_short[1]
        strategy.close_all(comment = " 3 - Ganho : " + str.tostring( gain_p) + " Perda : " + str.tostring( stop_p)  )
      

// Buy Position    
if strategy.position_size > 0
    gain_p = strategy.opentrades.entry_price(0) + (strategy.opentrades.entry_price(0) * pmax) 
    stop_p = strategy.opentrades.entry_price(0) - (strategy.opentrades.entry_price(0) * pmin) 
    // Managing the position
    if close > gain_p 
        strategy.close_all(comment = " 1- Ganho : " + str.tostring( gain_p) + " Perda : " + str.tostring( stop_p)  )
    if close < stop_p 
        strategy.close_all(comment = " 2 -Ganho : " + str.tostring( gain_p) + " Perda : " + str.tostring( stop_p)  )
    if low < mm_short[1]
        strategy.close_all(comment = " 3 -Ganho : " + str.tostring( gain_p) + " Perda : " + str.tostring( stop_p)  )
        


```

> Detail

https://www.fmz.com/strategy/436639

> Last Modified

2023-12-26 15:03:16
