
> Name

SMA-Based-Intelligent-Trailing-Stop-Strategy-with-Intraday-Pattern-Recognition

> Author

ChaoZhang

> Strategy Description
![IMG](https://www.fmz.com/upload/asset/6701dfa5622f7c083e.png)

#### Overview
This is a strategy based on the 18-day Simple Moving Average (SMA18), combining intraday pattern recognition and intelligent trailing stop mechanisms. The strategy primarily observes the price relationship with SMA18, along with intraday high and low positions, to execute long entries at optimal times. It employs a flexible stop-loss approach, offering both fixed stop-loss points and a two-day low trailing stop option.

#### Strategy Principles
The core logic includes several key elements:
1. Entry conditions based on price position relative to the 18-day moving average, with options for breakout or above-line entries
2. Analysis of intraday candlestick patterns, particularly focusing on Inside Bar patterns, to improve entry accuracy
3. Selective trading based on day-of-week characteristics
4. Entry price setting using limit orders with small upward offset from lows to improve fill probability
5. Dual stop-loss mechanisms: fixed stops based on entry price or trailing stops based on two-day lows

#### Strategy Advantages
1. Combines technical indicators and price patterns for more reliable entry signals
2. Flexible trading time selection mechanism for market-specific optimization
3. Intelligent stop-loss system that both protects profits and allows adequate price movement
4. Highly adjustable parameters for different market environments
5. Effective false signal reduction through Inside Bar pattern filtering

#### Strategy Risks
1. Fixed stops may trigger early exits in volatile markets
2. Trailing stops might lock in minimal profits during quick reversals
3. Frequent Inside Bars during consolidation may lead to overtrading
Mitigation measures:
- Dynamic stop-loss adjustment based on market volatility
- Addition of trend confirmation indicators
- Implementation of minimum profit targets to filter low-quality trades

#### Optimization Directions
1. Incorporate volatility indicators (like ATR) for dynamic stop-loss adjustment
2. Add volume analysis dimension to improve signal reliability
3. Develop smarter date selection algorithms based on historical performance
4. Implement trend strength filters to avoid trading in weak trends
5. Enhance Inside Bar recognition algorithms for improved pattern identification

#### Summary
This strategy constructs a comprehensive trading system by combining multiple analytical dimensions. Its core strengths lie in flexible parameter settings and intelligent stop-loss mechanisms, enabling adaptation to various market environments. Through continuous optimization and improvement, the strategy shows promise for maintaining stable performance across different market conditions.
> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2025-01-16 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":49999}]
*/

//@version=5
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © zweiprozent

strategy('Buy Low over 18 SMA Strategy', overlay=true, default_qty_value=1)
xing = input(false, title='crossing 18 sma?')
sib = input(false, title='trade inside Bars?')
shortinside = input(false, title='trade inside range bars?')
offset = input(title='offset', defval=0.001)
belowlow = input(title='stop below low minus', defval=0.001)
alsobelow = input(false, title='Trade only above 18 sma?')
tradeabove = input(false, title='Trade with stop above order?')
trailingtwo = input(false, title='exit with two days low trailing?')


insideBar() =>  //and high <= high[1] and low >= low[1] ? 1 : 0
    open <= close[1] and close >= open[1] and close <= close[1] or open >= close[1] and open <= open[1] and close <= open[1] and close >= close[1] ? 1 : 0

inside() =>
    high <= high[1] and low >= low[1] ? 1 : 0
enterIndex = 0.0
enterIndex := enterIndex[1]

inPosition = not na(strategy.position_size) and strategy.position_size > 0
if inPosition and na(enterIndex)
    enterIndex := bar_index
    enterIndex



//if strategy.position_size <= 0 

//    strategy.exit("Long", stop=low[0]-stop_loss,comment="stop loss")


//if not na(enterIndex) and bar_index - enterIndex + 0 >= 0 

//    strategy.exit("Long", stop=low[0]-belowlow,comment="exit")

//    enterIndex := na

T_Low = request.security(syminfo.tickerid, 'D', low[0])
D_High = request.security(syminfo.tickerid, 'D', high[1])
D_Low = request.security(syminfo.tickerid, 'D', low[1])
D_Close = request.security(syminfo.tickerid, 'D', close[1])
D_Open = request.security(syminfo.tickerid, 'D', open[1])

W_High2 = request.security(syminfo.tickerid, 'W', high[1])
W_High = request.security(syminfo.tickerid, 'W', high[0])
W_Low = request.security(syminfo.tickerid, 'W', low[0])
W_Low2 = request.security(syminfo.tickerid, 'W', low[1])
W_Close = request.security(syminfo.tickerid, 'W', close[1])
W_Open = request.security(syminfo.tickerid, 'W', open[1])

//longStopPrice  = strategy.position_avg_price * (1 - stopl)
// Go Long - if prev day low is broken and stop loss prev day low
entryprice = ta.sma(close, 18)

//(high[0]<=high[1]or close[0]<open[0]) and low[0]>vwma(close,30) and time>timestamp(2020,12,0,0,0)

showMon = input(true, title='trade tuesdays?')
showTue = input(true, title='trade wednesdayy?')
showWed = input(true, title='trade thursday?')
showThu = input(true, title='trade friday?')
showFri = input(true, title='trade saturday?')
showSat = input(true, title='trade sunday?')
showSun = input(true, title='trade monday?')

isMon() =>
    dayofweek(time('D')) == dayofweek.monday and showMon
isTue() =>
    dayofweek(time('D')) == dayofweek.tuesday and showTue
isWed() =>
    dayofweek(time('D')) == dayofweek.wednesday and showWed
isThu() =>
    dayofweek(time('D')) == dayofweek.thursday and showThu
isFri() =>
    dayofweek(time('D')) == dayofweek.friday and showFri
isSat() =>
    dayofweek(time('D')) == dayofweek.saturday and showSat
isSun() =>
    dayofweek(time('D')) == dayofweek.sunday and showSun


clprior = close[0]
entryline = ta.sma(close, 18)[1]
//(isMon() or isTue()or isTue()or  isWed() 
noathigh = high < high[1] or high[2] < high[3] or high[1] < high[2] or low[1] < ta.sma(close, 18)[0] and close > ta.sma(close, 18)[0]

if noathigh and time > timestamp(2020, 12, 0, 0, 0) and (alsobelow == false or high >= ta.sma(close, 18)[0]) and (isMon() or isTue() or isWed() or isThu() or isFri() or isSat() or isSun()) and (high >= high[1] or sib or low <= low[1])  //((sib == false and inside()==true) or inside()==false) and (insideBar()==true or shortinside==false)
    if tradeabove == false
        strategy.entry('Long', strategy.long, limit=low + offset * syminfo.mintick, comment='long')
    if tradeabove == true and (xing == false or clprior < entryline)  // and high<high[1] 
        strategy.entry('Long', strategy.long, stop=high + offset * syminfo.mintick, comment='long')


//if time>timestamp(2020,12,0,0,0) and isSat()  
//    strategy.entry("Long", strategy.long, limit=0, comment="long")


//strategy.exit("Long", stop=low-400*syminfo.mintick)

//strategy.exit("Long", stop=strategy.position_avg_price-10*syminfo.mintick,comment="exit")
//strategy.exit("Long", stop=low[1]-belowlow*syminfo.mintick, comment="stop")

if strategy.position_avg_price > 0 and trailingtwo == false and close > strategy.position_avg_price
    strategy.exit('Long', stop=strategy.position_avg_price, comment='stop')

if strategy.position_avg_price > 0 and trailingtwo == false and (low > strategy.position_avg_price or close < strategy.position_avg_price)
    strategy.exit('Long', stop=low[0] - belowlow * syminfo.mintick, comment='stop')

if strategy.position_avg_price > 0 and trailingtwo
    strategy.exit('Long', stop=ta.lowest(low, 2)[0] - belowlow * syminfo.mintick, comment='stop')



```

> Detail

https://www.fmz.com/strategy/478726

> Last Modified

2025-01-17 16:04:09
