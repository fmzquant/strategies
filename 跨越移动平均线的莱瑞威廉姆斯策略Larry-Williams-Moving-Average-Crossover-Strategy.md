
> Name

跨越移动平均线的莱瑞威廉姆斯策略Larry-Williams-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b119df0f714f755970.png)
[trans]

## 概述

该策略是一个简单经典的跨越移动平均线策略,由著名交易员莱瑞·威廉姆斯创造。策略使用 9 日简单移动平均线作为快线,21 日指数移动平均线作为慢线。当价格上涨突破 9 日线时做多,当价格下跌突破 9 日线时做空。为过滤假突破,还引入 21 日线辅助判断趋势。

## 策略原理

该策略基于移动平均线的黄金交叉和死亡交叉来判断做多和做空机会。当快线从下方上穿慢线时为黄金交叉,表示行情转 bullish,这样的突破做多;当快线 从上方下穿慢线时为死亡交叉,表示行情转 bearish,这样的突破做空。 

为避免出现假突破导致虚拟损失,策略还引入 21 日线判断大趋势。只有在快线突破的同时,价格也突破 21 日线时,才采取交易行动。这样可以有效过滤掉许多假突破。

具体来说,做多的信号是:快线上涨突破昨日高点,同时快线突破 21 日线,这样多头才确立;做空信号是:快线下跌突破昨日低点,同时快线突破 21 日线,这样空头才确立。

## 优势分析

该策略优势主要体现在:

1. 策略思路简单,容易理解和实现。
2. 移动平均线技术成熟,使用广泛。
3. 引入 21 日线有效过滤假突破。
4. 采用昨日极值点位进场,可以防止被套。
5. 策略参数比较稳健,不容易过拟合。

## 风险分析

该策略主要存在以下风险:

1. 行情剧烈波动时,移动平均线生成滞后,可能错过最佳进场点位。
2. 行情平行震荡时,容易产生频繁的小亏损。
3. 无法有效应对突发事件引起的重大行情变化。

针对上述风险,可以通过以下方法加以优化和控制:

1. 引入 MACD 指标辅助判断,获取更多实时性信号。
2. 调高移动平均线周期参数,降低交易频率。
3. 增加止损策略,控制单笔亏损。

## 优化方向  

该策略主要可以从以下几个方向进行优化:

1. 参数优化。可以通过更系统的方法对 MA 周期参数组合进行测试,找到更优参数。

2. 增加止损。设定合理的移动止损、缩量止损等方法,有效控制单笔亏损。

3. 结合其他指标。引入 MACD、ATR、KD 等其他指标信号,获得更多维度的确认,提高策略稳定性。

4. 优化出场机制。研究不同类型的离场策略,如反转信号离场、移动止盈离场等方法。

## 总结

该跨越移动平均线策略总体而言是一个非常典型和实用的趋势跟踪策略。它有着易于理解和实现的优点,同时也存在一些改进空间。通过参数优化、止损优化、多指标结合等方法,可以持续对该策略进行改进,使其成为一个更加稳定和实用的交易系统。

||

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

[/trans]

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
