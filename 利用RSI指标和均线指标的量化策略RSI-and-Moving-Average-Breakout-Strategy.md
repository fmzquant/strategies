
> Name

利用RSI指标和均线指标的量化策略RSI-and-Moving-Average-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19c78e00dcb443de6fc.png)
 [trans]
#### 概述

双RSI均线突破策略是一种同时利用RSI指标和均线指标来进行判断交易时机的量化策略。该策略的核心思想是在RSI指标达到超买超卖区域时,利用均线的方向来过滤信号,寻找更优质的突破点进行建仓。

#### 策略原理  

1. 根据用户设定的参数,分别计算RSI指标和简单移动均线SMA。

2. 当RSI上穿设定的超卖线(默认30)时,如果价格低于LONG退出均线,则产生多头信号。

3. 当RSI下穿设定的超买线(默认70)时,如果价格高于SHORT退出均线,则产生空头信号。 

4. 用户可以选定过滤均线,当价格位于过滤均线之上时,才会产生信号。

5. 仓位的退出判断是按照LONG退出均线和SHORT退出均线来进行的。

#### 优势分析

1. 双指标设计,综合参考了市场两大因素,提高决策的准确性。

2. 合理利用RSI指标的反转特征,寻找反转的时间点。

3. 均线过滤增加判断的严谨性,避免追高杀跌。

4. 允许自定义参数,可以针对不同品种和周期进行优化。

5. 简单的逻辑设计,容易理解和修改。

#### 风险分析  

1. RSI指标容易产生垂直颈线,density指标可降低此问题。

2. 大周期下的RSI容易失效,可降低参数优化或辅助其他指标。  

3. 均线有滞后性,可适当缩短均线长度或辅助MACD等指标。

4. 简单的判断条件,可以引入更多指标确保交易信号效果。

#### 优化方向

1. 优化RSI参数或引入Density指标降低假信号概率。

2. 结合趋势及波动指标如DMI、BOLL来确定趋势及支撑位。

3. 引入MACD等指标替代或配合均线判断。

4. 增加开仓条件逻辑,防止不理想的突破信号。

#### 总结

双RSI均线突破策略综合运用RSI指标判断超买超卖与均线判断趋势的方法,在理论上可以有效抓取反转机会。该策略灵活简约,容易上手,同时也适合不同品种的优化,是一种值得推荐的量化入门策略。通过引入更多指标来辅助判断,该策略可以进一步增强决策效果,提高盈利概率。

||

#### Overview  

The RSI and Moving Average Breakout Strategy is a quantitative strategy that utilizes both the RSI indicator and moving average lines to determine trading opportunities. The core idea of this strategy is to seek better breakout points with the direction of moving averages when RSI reaches overbought or oversold levels.  

#### Strategy Logic

1. Calculate RSI indicator and Simple Moving Average lines based on user-defined parameters.

2. When RSI crosses above the oversold line (default 30), a long signal is generated if price is below the LONG exit Moving Average.  

3. When RSI crosses below the overbought line (default 70), a short signal is generated if price is above the SHORT exit Moving Average.

4. Users can choose to filter signals based on a trend Moving Average line. Signals are only generated when price is above or below the filtering Moving Average.  

5. Exits are determined by the LONG and SHORT exit Moving Average lines.

#### Advantage Analysis  

1. Dual indicator design improves accuracy by incorporating two major market factors.

2. Utilizes the mean-reversion characteristic of RSI effectively to locate turning points. 

3. Additional filter with Moving Averages increases logic rigor to avoid chasing tops and bottoms.  

4. Customizable parameters allow optimizations across different products and timeframes.

5. Simple logic makes it easy to comprehend and modify.

#### Risk Analysis

1. Whipsaws are common with RSI, Density indicator could help.  

2. RSI tends to fail on larger timeframes, parameters can be adjusted or additional indicators can assist.

3. Moving Averages have lagging effect, lengths could be shortened or indicators like MACD can assist.  

4. More indicators should be introduced to validate signals due to the basic logic.

#### Optimization Directions  

1. Optimize RSI parameters or introduce Density indicator to reduce false signals.

2. Incorporate trend and volatility indicators like DMI and BOLL to locate trends and supports.

3. Introduce MACD to replace or complement Moving Average judgements. 

4. Add more logic conditions on entry signals to avoid unfavorable breakouts.

#### Conclusion

The RSI and Moving Average Breakout Strategy combines the overbought-oversold detection of RSI and trend determination of Moving Averages to capitalize on mean-reversion opportunities theoretically. The strategy is intuitive and easy to use for beginners, and can be optimized across different products, making it a recommended starter quantitative strategy. More auxiliary indicators could be introduced to further validate signals and improve profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Long Only or Short Only or Both?: Both|Long Only|Short Only|
|v_input_2|14|RSI Length|
|v_input_3|70|Upper Threshold|
|v_input_4|30|Lower Threshold|
|v_input_5|5|Long Exit SMA Length|
|v_input_6|5|Short Exit SMA Length|
|v_input_7|0|Trend SMA Filter?: Above|Below|Don't Include|
|v_input_8|200|Trend SMA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-16 00:00:00
end: 2024-01-23 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Global Market Signals: RSI Strategy.
//@version=4
strategy("GMS: RSI Strategy", overlay=true)

LongShort = input(title="Long Only or Short Only or Both?", type=input.string, defval="Both", options=["Both", "Long Only", "Short Only"])
RSILength = input(title="RSI Length", type = input.integer ,defval=14)
RSIUpper = input(title="Upper Threshold", type = input.float ,defval=70)
RSILower = input(title="Lower Threshold", type = input.float ,defval=30)
LongExit = input(title="Long Exit SMA Length", type = input.integer ,defval=5)
ShortExit = input(title="Short Exit SMA Length", type = input.integer ,defval=5)
AboveBelow = input(title="Trend SMA Filter?", type=input.string, defval="Above", options=["Above", "Below", "Don't Include"])
TrendLength = input(title="Trend SMA Length", type = input.integer ,defval=200)


//Long Side

if LongShort =="Long Only" and AboveBelow == "Above"
    strategy.entry("LONG", true, when = rsi(close,RSILength)<RSILower and close< sma(close,LongExit) and close>sma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
if LongShort =="Long Only" and AboveBelow == "Below"
    strategy.entry("LONG", true, when = rsi(close,RSILength)<RSILower and close< sma(close,LongExit) and close<sma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
if LongShort =="Long Only" and AboveBelow == "Don't Include"
    strategy.entry("LONG", true, when = rsi(close,RSILength)<RSILower and close< sma(close,LongExit))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
if LongShort =="Both" and AboveBelow == "Above"
    strategy.entry("LONG", true, when = rsi(close,RSILength)<RSILower and close< sma(close,LongExit) and close>sma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
if LongShort =="Both" and AboveBelow == "Below"
    strategy.entry("LONG", true, when = rsi(close,RSILength)<RSILower and close< sma(close,LongExit) and close<sma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
if LongShort =="Both" and AboveBelow == "Don't Include"
    strategy.entry("LONG", true, when = rsi(close,RSILength)<RSILower and close< sma(close,LongExit))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
    
//SHORT SIDE

if LongShort =="Short Only" and AboveBelow == "Above"
    strategy.entry("SHORT", false, when = rsi(close,RSILength)>RSIUpper and close> sma(close,ShortExit) and close>sma(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
if LongShort =="Short Only" and AboveBelow == "Below"
    strategy.entry("SHORT", false, when = rsi(close,RSILength)>RSIUpper and close> sma(close,ShortExit) and close<sma(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
if LongShort =="Short Only" and AboveBelow == "Don't Include"
    strategy.entry("SHORT", false, when = rsi(close,RSILength)>RSIUpper and close> sma(close,ShortExit))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
if LongShort =="Both" and AboveBelow == "Above"
    strategy.entry("SHORT", false, when = rsi(close,RSILength)>RSIUpper and close> sma(close,ShortExit) and close>sma(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
if LongShort =="Both" and AboveBelow == "Below"
    strategy.entry("SHORT", false, when = rsi(close,RSILength)>RSIUpper and close> sma(close,ShortExit) and close<sma(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
if LongShort =="Both" and AboveBelow == "Don't Include"
    strategy.entry("SHORT", false, when = rsi(close,RSILength)>RSIUpper and close> sma(close,ShortExit))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
    
    
    
    
    
   




```

> Detail

https://www.fmz.com/strategy/439860

> Last Modified

2024-01-24 14:31:01
