
> Name

动量均线交叉和MACD过滤的海肯阿什蜡烛策略Momentum-Crossover-Moving-Average-and-MACD-Filter-Heikin-Ashi-Candlestick-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/6b21e5b99b97829522.png)

[trans]

## 概述

本策略运用海肯阿什蜡烛技术辅以均线交叉信号和MACD指标进行过滤,构建趋势跟踪策略。策略可以在不同时间周期内捕捉市场趋势,利用均线交叉产生交易信号,再通过MACD指标过滤假Signals,在回测试中表现出较高的盈利率。

## 策略原理

本策略主要运用三大技术指标:

1. 海肯阿什蜡烛技术。该技术通过修改收盘价构建出“无影线”的蜡烛线。这可以更清晰地表现出价格的真实趋势,过滤掉过多的市场噪音。

2. 指数移动均线(EMA)。快速EMA用于捕捉短期趋势,慢速EMA用于判断长期趋势方向。当快速EMA上穿慢速EMA时产生买入信号;当快速EMA下穿慢速EMA时产生卖出信号。

3. MACD指标。该指标结合快慢EMA,当MACD主线高于Signal线时为看涨信号,当主线低于Signal线时为看跌信号。

本策略的交易信号来自快速EMA和慢速EMA的金叉死叉。为了过滤假Signals,策略引入MACD指标进行辅助判断,只有当MACD指标发出同向信号时才会生成最终的交易信号,这大大降低了错误交易的概率。

具体来说,当快速EMA上穿慢速EMA(金叉)和MACD主线高于Signal线(看涨信号)同时出现时,产生买入信号;当快速EMA下穿慢速EMA(死叉)和MACD主线低于Signal线(看跌信号)同时出现时,产生卖出信号。

这种结合均线交叉和MACD指标的过滤方式,可以有效识别市场关键的转折点,顺势捕捉价格趋势。

## 策略优势

本策略具有以下几个突出优势:

1. 捕捉趋势信号的概率大大提高。运用海肯阿什蜡烛技术可更清晰判断趋势,两均线的交叉系统产生信号的效力也非常强,结合MACD过滤后可靠性更高。

2. 回撤风险较小。MACD作为辅助判断指标可在一定程度上规避止损风险,有效减少平仓亏损的情况。

3. 可调参数较多。海肯阿什蜡烛的周期、均线系统的快慢周期、MACD的参数等都可根据市场调整,使策略更能适应不同行情。

4. 实现较为简单清晰。以海肯阿什蜡烛表示价格,辅以常用指标进行判定,易于编程实现,代码简洁,容易理解。

5. 资金使用效率较高。策略采用趋势跟踪法则,大部分时间能使资金随市场主流方向运作,有效利用资金量产生收益。


## 策略风险

本策略也存在以下一些可能的风险:

1. 市场出现剧烈波动时,可能出现较大亏损。当价格出现大幅跳空或短期内快速反转时,止损措施可能会被突破,造成超出预期的损失。

2. MACD过滤误判的可能。MACD作为辅助指标也可能产生误判,从而导致策略错误建仓或平仓。

3. 参数设置过于死板。固定的参数组合不一定能适应多变的市场,可能错过良好的交易机会。

4. 交易频率可能过高。跟随趋势建立仓位的方法可能造成频繁交易,增加交易成本和滑点损失。


为了规避和减小上述风险,可采取如下措施:

1. 设置止损位,限制单笔亏损。同时也不要过度追涨杀跌,控制仓位规模。

2. 调整MACD的参数,降低辅助指标发出错误信号的概率。也可以引入其他指标进行多重验证。

3. 建立参数优化机制。采用机器学习等方法自动优化参数组合,使策略更具适应性。

4. 适当放宽交易信号的触发条件,降低交易频率。也可以设置最小价格变动量才触发交易。

## 策略优化

本策略还具有很大的优化空间,可以从以下几个方面入手:

1. 海肯阿什蜡烛的时段优化。可以测试更长或更短的蜡烛周期,找到更能表达市场趋势的时段区间。

2. 均线系统的参数调整。修改快慢EMA的周期参数,找到最佳的参数组合。

3. MACD指标的多参数优化。调整MACD的快慢均线和Signal线的参数,寻找最优参数。

4. 策略风险管理模块的加强。设置更科学的止损和止盈规则,也可加入仓位控制、资金管理等模块。

5. 加入更多辅助指标。比如引入KD、RSI等其他指标进行多因子验证,提高信号质量。

6. 应用机器学习技术。使用神经网络、遗传算法等方法实时优化策略参数,使策略更具适应性。

通过技术指标的迭代组合、参数的持续优化、风险控制模块的加强等方法,本策略可以得到进一步提升,更稳定、高效的获利。

## 总结

本策略结合海肯阿什蜡烛和均线交叉系统捕捉市场趋势,以MACD指标进行辅助过滤,可有效识别关键转折点,产生高可靠性的交易信号。策略回测表现优异,具有获利概率高、回撤风险小、可调性强等优点。同时也需要注意风险控制,防范极端行情的冲击。通过持续的优化与改进,本策略具备成为量化交易高效策略的潜力。

||

## Overview

This strategy utilizes the Heikin-Ashi candlestick technique combined with moving average crossover signals and MACD indicator for filtration to construct a trend-following strategy. The strategy can capture market trends in different timeframes, generating trading signals through moving average crossovers, and then filtering out false signals via the MACD indicator, demonstrating high profitability in backtests.

## Strategy Logic  

The strategy mainly leverages three major technical indicators:

1. Heikin-Ashi Candlesticks. It modifies the closing price to construct "shadowless" candlestick bars, which can more clearly exhibit true price trends, filtering out excessive market noise.

2. Exponential Moving Average (EMA). The fast EMA captures short-term trends while the slow EMA judges long-term trend directions. A buy signal is generated when the fast EMA crosses above the slow EMA; A sell signal is generated when the fast EMA crosses below the slow EMA.

3. MACD Indicator. It combines fast and slow EMAs. When the MACD line is above the signal line, it is a bullish signal; when below, it's a bearish signal.

The trading signals of this strategy come from the golden/dead cross of the fast and slow EMAs. To filter out false signals, the MACD indicator is introduced for auxiliary judgment. Only when the MACD gives out a signal that aligns with the EMA crossover will the final trading signal be triggered, which greatly reduces the probability of wrong trades. 

Specifically, when the fast EMA crosses above the slow EMA (golden cross) and the MACD line goes above the signal line (bullish signal) simultaneously, a buy signal is generated; when the fast EMA crosses below the slow EMA (dead cross) and the MACD line goes below the signal line (bearish signal) at the same time, a sell signal is generated.

This combination of moving average crossover and MACD filtration can effectively identify key inflection points in the market and capture price trends accordingly.

## Advantages  

The strategy has the following outstanding edges:

1. Greatly improved probability of capturing trend signals. The Heikin-Ashi technique offers clearer trend judgment, while the strength of crossover signals from the two EMAs is also powerful. The reliability is even higher after integrating the MACD filter.

2. Relatively small drawdown risk. The MACD, serving as an auxiliary indicator, can mitigate stop-loss risks to some extent and effectively reduce unwanted liquidation losses. 

3. More tunable parameters. The periods of Heikin-Ashi candlesticks, fast/slow EMAs of the moving average system, parameters of the MACD etc. can all be adjusted based on market conditions to make the strategy more adaptive.

4. Simple and clear implementation. Using Heikin-Ashi candles to denote prices and aided with common indicators for determination, it is easy to program, with neat and concise codes that are intuitive to understand.

5. Higher capital usage efficiency. By trend-following, most of the time the strategy can align capital movements with the main market direction and generate returns more effectively.

## Risks

The strategy also has the following potential risks:

1. Severe whipsaws in the market may lead to heavy losses. When prices gap significantly or reverse rapidly in the short-term, stop-loss measures could fail, incurring losses way beyond expectations.

2. Possibilities of MACD misjudgment. MACD as an auxiliary indicator can also make wrong calls, resulting in the strategy wrongly establishing or closing positions.

3. Inflexible parameter settings. Fixed parameter combinations may not adapt to the ever-changing market, thus missing good trading opportunities. 

4. Potentially high trading frequency. Trend-following methods could induce frequent trades, increasing costs and slippage losses.

To mitigate and reduce the above risks, the following measures can be adopted:

1. Set stop-loss points to limit losses for single trades. Also, avoid over-chasing trends and control position sizes.  

2. Adjust MACD parameters to decrease incorrect signal probabilities. More indicators can also be introduced for multi-confirmation.

3. Build parameter optimization mechanisms. Employ machine learning etc. to auto-tune parameter combinations for higher adaptivity.  

4. Appropriately relax trigger conditions for trading signals to reduce trading frequency, or set minimum price change thresholds.

## Optimization

Great potential lies in further optimization of the strategy, including:
  
1. Optimize Heikin-Ashi candlestick durations. Test longer or shorter periods to find the ones that best exhibit market trends.

2. Adjust parameters of the moving average system. Modify periods of the fast/slow EMAs to discover optimal parameter sets. 

3. Multi-parameter optimization of the MACD. Fine-tune parameters of the fast/slow EMAs and MACD signal line to locate superior configurations. 

4. Reinforce risk management modules. Devise more scientific stop-loss/take-profit rules, integrate position sizing, capital management etc.

5. Introduce more auxiliary indicators. Add other indicators like KD, RSI for multi-factor confirmation, improving signal quality.

6. Employ machine learning techniques. Leverage neural networks, genetic algorithms etc. to real-time optimize strategy parameters for higher adaptivity.

With iterative combinations of technical indicators, continuous parameter optimizations, stronger risk control modules etc., significant performance boosts of the strategy can be expected for more steady and efficient profitability.

## Conclusion  

This strategy captures market trends by combining Heikin-Ashi candles and moving average crossovers, aided by MACD filtration for detecting high-reliability turning points and trading signals. Backtested results are outstanding, with edges like high winning probability, low drawdowns, high tunability. Meanwhile, risk control also needs attention to hedge impacts from extreme market moves. With continuous improvements and optimization, the strategy demonstrates great potential as a highly effective quantitative trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|15|Heikin Ashi Candle Time Frame|
|v_input_2|false|Heikin Ashi Candle Time Frame Shift|
|v_input_3|300|Time frame (Minutes. Not lower than chart)|
|v_input_4|false|Heikin Ashi EMA Time Frame Shift|
|v_input_5|16|Heikin Ashi EMA Period|
|v_input_6|false|Heikin Ashi EMA Shift|
|v_input_7|21|Slow EMA Period|
|v_input_8|false|Slow EMA Shift|
|v_input_9|false|With MACD filter|
|v_input_10|60|MACD Time Frame|
|v_input_11|true|MACD Shift|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-26 00:00:00
end: 2024-01-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
//Heikin Ashi Strategy  V1 by nachobuey

strategy("Heikin Ashi Strategy  V2",shorttitle="HAS V2",overlay=true)
res = input(title="Heikin Ashi Candle Time Frame",  defval="15")
hshift = input(0,title="Heikin Ashi Candle Time Frame Shift")
//res1 = input(title="Heikin Ashi EMA Time Frame", type=resolution, defval="180")
res1   = input(title="Time frame (Minutes. Not lower than chart)",defval="300")
mhshift = input(0,title="Heikin Ashi EMA Time Frame Shift")
fama = input(16,"Heikin Ashi EMA Period")
test = input(0,"Heikin Ashi EMA Shift")
sloma = input(21,"Slow EMA Period")
slomas = input(0,"Slow EMA Shift")
macdf = input(false,title="With MACD filter")
res2 = input(title="MACD Time Frame",  defval="60")
macds = input(1,title="MACD Shift")




//Heikin Ashi Open/Close Price
ha_t = heikinashi(syminfo.tickerid)
ha_open = request.security(ha_t, res, open[hshift])
ha_close = request.security(ha_t, res, close[hshift])
mha_close = request.security(ha_t, res1, close[mhshift])

//macd
[macdLine, signalLine, histLine] = macd(close, 12, 26, 9)
macdl = request.security(ha_t,res2,macdLine[macds])
macdsl= request.security(ha_t,res2,signalLine[macds])

//Moving Average
fma = ema(mha_close[test],fama)
sma = ema(ha_close[slomas],sloma)
plot(fma,title="MA",color=lime,linewidth=2,style=line)
plot(sma,title="SMA",color=red,linewidth=2,style=line)


//Strategy
golong =  crossover(fma,sma) and (macdl > macdsl or macdf == false )
goshort =   crossunder(fma,sma) and (macdl < macdsl or macdf == false )


strategy.entry("Long",strategy.long,when = golong)
strategy.entry("Short",strategy.short,when = goshort)

plotchar(golong,char="L", color=green)
plotchar(goshort,char="S", color=red)

alertcondition(golong, "HAS GO LONG", "OPEN LONG")
alertcondition(goshort, "HAS GO SHORT", "OPEN SHORT")


```

> Detail

https://www.fmz.com/strategy/437400

> Last Modified

2024-01-02 12:18:03
