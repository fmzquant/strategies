
> Name

威廉姆斯9日趋势突破策略Williams-9-Days-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1e3de40bcbcc0bf8ddd.png)

[trans]


### 概述

该策略基于拉里·威廉姆斯的9日突破理念,通过监测9日移动平均线的方向判断趋势,在突破点进行入场,跟随趋势运行。

### 策略原理

- 使用9日指数移动平均线EMA作为判断趋势的指标
- 当价格从EMA下方突破上方时,判断为看涨,进行买入
- 当价格从EMA上方突破下方时,判断为看跌,进行卖出
- 买入信号:开盘价低于9日EMA,收盘价高于9日EMA
- 卖出信号:开盘价高于9日EMA,收盘价低于9日EMA

具体来说:

1. 计算9日EMA
2. 判断当日K线是否满足买入条件,即开盘价低于9日EMA,收盘价高于9日EMA
3. 如果满足,则在收盘价位置入场做多,止损价设为之前高点
4. 判断当日K线是否满足卖出条件,即开盘价高于9日EMA,收盘价低于9日EMA
5. 如果满足,则在之前做多入场点出场卖出,止盈价设为之前低点

以上构成了完整的买入和卖出逻辑。

### 优势分析

这是一个较为简单的趋势跟踪策略,具有以下优势:

1. 以EMA判断趋势方向,可以有效滤除价格小幅波动的噪音
2. 在EMA突破点入场,可以及时捕捉趋势转折
3. 采用之前高点作为止损,之前低点作为止盈,可以锁定趋势获利
4. 交易规则清晰简单,容易理解实现,适合新手学习
5. 资金使用效率高,不需要全程持仓,只在趋势突破点短期持仓

### 风险及优化

该策略也存在一些风险与不足,可以从以下方面进一步优化:

1. EMA周期设定为9日,对不同品种和市场情况可能不够灵活,可以引入自适应EMA周期
2. 仅用9日EMA判断趋势可能过于简单,可以引入多重时间周期EMA或其他指标进行组合判断
3. 未考虑交易成本和滑点,实盘中这两者会对盈亏产生较大影响
4. 没有设置止损止盈比例,无法控制单笔交易风险收益比
5. 入场信号可能出现多次震荡,产生多个不必要的小单,可以设置过滤条件

综上,该策略可以从动态参数优化、多因子判断、交易成本管理、风险收益控制等方面进行改进,使策略更稳健适应不同市场状态。

### 总结

威廉姆斯9日突破策略是一个较为经典的短期趋势策略,核心思想简单清晰,以EMA判断趋势方向,在突破点入场,跟随趋势运行并适时止盈止损。该策略易于理解实现,资金使用效率高,但也存在一些不足之处。我们可以通过多角度优化,使策略参数更加动态灵活,判断规则更严谨全面,风险收益控制更完善,从而适应更广泛的市场情况,提高策略稳定性和盈利能力。

||


### Overview

This strategy is based on the 9-day breakout concept of Larry Williams, by monitoring the direction of 9-day moving average to determine the trend, and taking positions at breakout points to follow the trend.

### Strategy Logic

- Use 9-day EMA as an indicator to judge the trend 
- When price breaks out above EMA from below, it is judged as bullish and long position is taken
- When price breaks out below EMA from above, it is judged as bearish and short position is taken
- Buy signal: Opening price is lower than 9-day EMA, closing price is higher than 9-day EMA
- Sell signal: Opening price is higher than 9-day EMA, closing price is lower than 9-day EMA

Specifically:

1. Calculate the 9-day EMA
2. Check if the candle of the day satisfies the buy condition, i.e. opening price is lower than 9-day EMA, closing price is higher than 9-day EMA
3. If satisfied, take long position at closing price, with stop loss set at previous high
4. Check if the candle of the day satisfies the sell condition, i.e. opening price is higher than 9-day EMA, closing price is lower than 9-day EMA  
5. If satisfied, exit the previous long position, with take profit set at previous low

The above constitutes the complete logic of buy and sell.

### Advantage Analysis 

This is a relatively simple trend following strategy with the following strengths:

1. Using EMA to judge trend direction can effectively filter out price noise
2. Taking positions at EMA breakout can timely capture trend reversal  
3. Adopting previous high as stop loss and previous low as take profit can lock in trend profits
4. The trading rules are clear and simple, easy to understand and implement, suitable for beginners
5. High capital usage efficiency, no need to hold positions all the time, only short-term positions at trend breakouts

### Risks and Optimization

The strategy also has some risks and deficiencies, which can be further optimized from the following aspects:

1. The 9-day EMA period setting may not be flexible enough for different products and market conditions, adaptive EMA period can be introduced
2. Using only 9-day EMA to judge trend may be too simple, multiple time frame EMAs or other indicators can be combined  
3. Transaction costs and slippage are not considered, which can significantly affect PnL in live trading
4. No stop loss and take profit ratios are set, unable to control risk reward of individual trades
5. Entry signals may oscillate multiple times, generating unnecessary small orders, filters can be added

In summary, the strategy can be improved through dynamic parameter optimization, multifactor judgement, transaction cost management, risk-reward control etc, to make the strategy more robust across different market conditions.  

### Conclusion

The Williams 9-day breakout strategy is a relatively classic short-term trend following strategy. The core idea is simple and clear, using EMA to determine trend direction, taking positions at breakout points, following the trend and managing risks. The strategy is easy to understand and implement, with high capital usage efficiency, but also has some deficiencies. We can optimize it from multiple perspectives to make the parameters more dynamic, judgement rules more rigorous, risk control more complete, thereby adapting to a wider range of market conditions and improving the stability and profitability.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-16 00:00:00
end: 2023-10-16 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("larry willians teste2", overlay=true)

//Window of time
start     = timestamp(2019, 00, 00, 00, 00)  // backtest start window
finish    = timestamp(2019, 12, 31, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"  

ema9=ema(close,9) // Ema de 9 periodos

//Condições de compra
c1= (open< ema9 and close > ema9) //abrir abaixo da ema9 e fechar acima da ema9

if(window())
    if(c1)
        strategy.entry("Compra", true, stop = high) // Coloca ordem stopgain no topo anterior
    else
        strategy.cancel("Compra") // Cancela a ordem se o proximo candle não "pegar"
        
//codições de venda
v1= (open> ema9 and close < ema9) // abrir acima da ema9 e fechar abaixo ema9

if(window())
    if (v1)
        strategy.exit("Venda", from_entry = "Compra", stop = low) // Saida da entrada com stop no fundo anterior
    else
        strategy.cancel("Venda") //Cancela a ordem se o proximo candle não "pegar"


```

> Detail

https://www.fmz.com/strategy/429463

> Last Modified

2023-10-17 13:51:15
