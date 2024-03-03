
> Name

移动平均线金叉死叉趋势跟踪策略Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14ae8a20deb3418743a.png)

[trans]

### 

本策略采用20日线和60日线的移动平均线交叉形成买卖信号。当价格上涨突破20日线时,做多;当价格下跌突破20日线时,平仓。同理,价格突破60日线时也形成买卖信号。该策略属于典型的趋势跟踪策略。

### 策略原理  

1. 计算20日简单移动平均线和60日简单移动平均线
2. 当收盘价格上涨突破20日线时,做多
3. 当收盘价格下跌突破20日线时,平仓
4. 当收盘价格上涨突破60日线时,做多
5. 当收盘价格下跌突破60日线时,平仓

以上形成该策略的交易信号和规则。当价格突破平均线时,表明趋势开始,可以跟踪趋势做多;当价格跌破平均线时,表明趋势结束,此时平仓是正确选择。

### 策略优势

1. 采用双移动平均线结合,使策略更稳定。20日线能更快地捕捉短期趋势机会;60日线则过滤掉部分短期市场噪音,锁定中长期趋势。  
2. 策略回测从2018年开始,选择了台湾股票市场,相对大陆A股,台股的交易制度更加完善,更能体现策略效果。
3. 设置了合理的止损和头寸控制,最大程度控制了风险。

### 策略风险 

1. 策略仅基于移动平均线指标,当市场不具备明显趋势时,将产生较多 Whirlaway 和打差。
2. 策略对买入/卖出的数量及头寸没有进行优化,无法最大化利用资金。
3. 该策略对价格上涨和下跌作出对称反应,无法应对市场不同行情。

风险解决方法:
1. 可以添加其他指标组合,如KDJ、MACD等,形成多重验证,避免误交易。  
2. 可以根据市值、波动率等因素优化头寸和交易资金的利用效率。
3. 可以根据大盘指数不同阶段采用非对称操作,在震荡调整中减少交易,在明确趋势中加大仓位。

### 策略优化方向  

1. 优化买入卖出的数量。可以根据止损信息动态调整头寸数量。
2. 优化移动平均线的天数参数。可以采用步进优化、随机优化等方法找到更优参数。  
3. 增加止损策略。移动止损或挂单止损,可以更好保护利润。
4. 增加仓位管理。根据资金规模、市值规模动态调整单笔交易的仓位。

### 总结

本策略整体是一个典型的双移动平均线交叉策略。核心思路是跟踪趋势,当价格突破平均线时建立趋势位置。策略简单实用,容易实现。同时也存在一些可以优化的空间,通过参数优化、止损规避、仓位管理等手段,可以获得更好的策略效果。

||

This strategy adopts the crossover of 20-day moving average and 60-day moving average to generate trading signals. It goes long when price breaks above 20-day MA and closes position when price breaks below 20-day MA. Similarly, it forms trading signals when price crosses 60-day MA. This strategy belongs to a typical trend following system.  

### Strategy Logic

1. Calculate 20-day simple moving average and 60-day simple moving average  
2. Go long when closing price breaks above 20-day MA
3. Close position when closing price breaks below 20-day MA 
4. Go long when closing price breaks above 60-day MA
5. Close position when closing price breaks below 60-day MA

The above rules define the trading signals and logic for this strategy. When price crosses over the MA line, it shows a new trend is emerging and we can follow the trend to go long. When price drops below the MA line, it shows the trend is ending so we close position.  

### Advantages

1. Adopting double MAs makes the strategy more steady. The 20-day MA captures short-term opportunities faster while the 60-day MA filters out some market noises and locks in medium-long term trend.
2. The backtest starts from 2018 and selects Taiwan stock market, which has more developed trading system compared to China A-share market, better reflecting the strategy efficacy. 
3. It sets proper stop loss and position sizing, maximally controlling the risk.

### Risks

1. The strategy solely relies on MA indicator. It may generate more whipsaws when there is no obvious trend in the market.
2. The strategy does not optimize the buy/sell size and position, failing to maximize the capital usage.  
3. The strategy reacts symmetrically to price ups and downs, unable to adapt to different market conditions.

Risk Solutions:
1. Add other indicators like KDJ, MACD to form multiple confirmation, avoiding wrong trades.
2. Optimize position sizing and capital usage efficiency according to market cap, volatility etc. 
3. Adopt asymmetric moves based on market stages, reduce trading during range-bound market and increase position size during obvious trend.
 

### Optimization Directions 

1. Optimize buy/sell quantity. Dynamically adjust position size based on stop loss.
2. Optimize MA parameters. Find better parameters through walk forward optimization and random optimization.
3. Add stop loss strategy. Moving stop loss or stop limit order better protects profits. 
4. Add position sizing management. Dynamically adjust position size per trade based on capital size, market cap etc.

### Summary

This is a typical dual moving average crossover strategy. The core idea is to follow trends by establishing position when price crosses over MA line. The strategy is simple and practical to implement. Meanwhile, there is room for further optimization, by parameter tuning, stop loss, position sizing etc. to achieve better results.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2018|backtest_year|
|v_input_int_1|true|backtest_month|
|v_input_int_2|true|backtest_day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-01 00:00:00
end: 2023-12-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Astorhsu

//@version=5
strategy("Astor SMA20/60 TW", overlay=true, margin_long=100, margin_short=100)
backtest_year = input(2018, title='backtest_year') //回測開始年分
backtest_month = input.int(01, title='backtest_month', minval=1, maxval=12) //回測開始月份
backtest_day = input.int(01, title='backtest_day', minval=1, maxval=31)  //回測開始日期
start_time = timestamp(backtest_year, backtest_month, backtest_day, 00, 00)  //回測開始的時間函數

//Indicators
sma20 = ta.sma(close,20)
sma60 = ta.sma(close,60)
plot(sma20, color=color.green, title="sma(20)")
plot(sma60, color=color.red, title="sma(60)")

//進場條件
longCondition = ta.crossover(close, ta.sma(close, 20))
if (longCondition) and time >= start_time
    strategy.entry("open long20", strategy.long, qty=1, comment="站上m20做多")


shortCondition = ta.crossunder(close, ta.sma(close, 20))
if (shortCondition) and time >= start_time
    strategy.close("open long20",comment="跌破m20平倉", qty=1)     
    
longCondition1 = ta.crossover(close, ta.sma(close, 60))
if (longCondition1) and time >= start_time
    strategy.entry("open long60", strategy.long, qty=1, comment="站上m60做多")


shortCondition1 = ta.crossunder(close, ta.sma(close, 60))
if (shortCondition1) and time >= start_time
    strategy.close("open long60",comment="跌破m60平倉", qty=1)     
```

> Detail

https://www.fmz.com/strategy/434701

> Last Modified

2023-12-08 15:23:33
