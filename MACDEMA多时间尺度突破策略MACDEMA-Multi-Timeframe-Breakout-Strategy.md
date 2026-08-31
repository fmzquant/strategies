
> Name

MACDEMA多时间尺度突破策略MACDEMA-Multi-Timeframe-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1eee16fe385df3387e5.png)

## Overview

This strategy combines the MACD indicator and multiple EMA lines to capture strong market trends from two timeframes - weekly and intraday. It uses the MACD indicator on the weekly chart to determine the overall trend direction, and three EMA lines (5-day, 15-day, 30-day) on the intraday chart to confirm the trend and make trades at breakout points. The main idea is to follow strong trends and ride the big waves, entering trades when the short-term EMA breaks above the long-term EMA, and exiting when the EMAs pull back or stop-loss conditions are triggered.

## Strategy Principle

1. Weekly MACD determines overall trend: Calculate the weekly MACD indicator and compare the difference between the current week's and previous week's MACD histogram values. A positive difference indicates an uptrend, while a negative difference indicates a downtrend. Update the trend direction every Monday at market open.

2. Multiple EMA lines confirm trend: Plot the 5-day, 15-day and 30-day EMA lines on the intraday chart. When the short-term EMA runs above and away from the long-term EMA, the trend is up; conversely, the trend is down.

3. Trade at EMA crossover points:
   - Long entry: When the weekly MACD trend is up and the intraday close crosses above the 15-day EMA, go long. Set the stop-loss at a fixed points below the entry price, or exit when the 5-day EMA crosses below the 15-day EMA. 
   - Short entry: When the weekly MACD trend is down and the 5-day EMA crosses below the 30-day EMA, go short. Set the stop-loss at a fixed points above the entry price, or exit when the 5-day EMA crosses above the 15-day EMA.

4. Adding positions: No additional entry conditions set for now.

## Advantage Analysis

1. Combining two timeframes makes the trend determination more reliable. The weekly MACD avoids getting stuck in range-bound markets, while the intraday EMA crossovers capture each wave within the trend.

2. The choice of 5/15/30-day EMAs on the intraday chart effectively filters out noise and captures clear trends.

3. The stop-loss settings are reasonable, controlling risk on individual trades. Combining fixed point stop-loss with EMA stop-loss allows both loss control and trend following.

4. The modular code design, with key components like MACD and EMA calculations, is highly reusable and extensible.

## Risk Analysis

1. Improper selection of the MACD histogram difference threshold may lead to overly loose or strict trend criteria, causing misjudgments. Backtesting and parameter optimization can help select the optimal threshold.

2. Improper selection of intraday EMA parameters - too short may lead to overtrading, while too long may miss opportunities. Backtesting and parameter optimization can help select the optimal parameter combination. 

3. Improper fixed stop-loss points - setting it too tight may lead to frequent stop-outs, while too wide may lead to excessive losses per trade. Customized stop-loss based on the volatility characteristics of each instrument can help.

4. EMAs may lag at trend turning points, potentially missing the best entry/exit points. But in the long run, it can still effectively control risks and produce good overall performance.

## Optimization Directions 

1. Consider adding other indicators like RSI on top of the weekly MACD to confirm trend strength and improve accuracy.

2. Consider adding other indicators like CCI as additional filters for the intraday EMA crossover signals to reduce trading frequency and risk.

3. Set customized stop-loss points based on the historical volatility of each stock to better suit its characteristics. 

4. Consider adding strategy rules for scaling in and out of positions - gradually adding on strong trends and reducing on weakening trends to improve capital efficiency.

## Summary

The MACD+EMA Multi-Timeframe Breakout Strategy is a trend-following strategy with a scientific basis for both trend determination and confirmation. It can effectively capture the main market trends and generate stable returns. Meanwhile, the strategy is quite complete in risk control, effectively limiting drawdowns through reasonable stop-loss and exit rules. However, there are also some shortcomings, such as lagging trend signals and lack of scaling rules, which can be further optimized and improved upon. Overall, this is a very worthwhile quantitative trading strategy to learn and utilize.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(Jan 19 2024 00:00:01)|start_time|
|v_input_2|timestamp(MAR 19 2024 23:59:59)|end_time|
|v_input_int_1|100|손절 수준|
|v_input_3|true|EMA Length|
|v_input_4|3|EMA Length|
|v_input_5|6|EMA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-03-16 00:00:00
end: 2024-03-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


// 1) 전주와 전전주의 히스토그램의 차이를 계산하여, 매주 월요일에 매매 방향을 표시하고, 
// 2) 5일, 15일, 30일 선을 호출하여 평행하게 그리고, 매매 방향에 따라 
// 3) 분봉기준의 이동평균선 매매전략  
// 4) 수익 실현은 미설정 해둠 


//@version=5
strategy('Last week MACD+ 15day, 30day break through, by Ho.J', overlay=true, initial_capital=30000, commission_value = 7.5, commission_type=strategy.commission.cash_per_order, slippage = 0)

// 백테스팅 기간 설정
start_time = input(timestamp("Jan 19 2024 00:00:01"), confirm = true)
end_time = input(timestamp("MAR 19 2024 23:59:59"), confirm = true)
is_in_time = true
stopLoss = input.int(100, title="손절 수준")


// 지난주 값 불러오기 입력 매개변수, 1은 5일, 3은 15일, 6은 30일 이동평균선을 구하는 변수임
emaLength1 = input(1, title="EMA Length")
emaLength2 = input(3, title="EMA Length")
emaLength3 = input(6, title="EMA Length")
timeframePeriod = "W" // 'D'는 일간 데이터를 의미


// 분봉기준 EMA 계산
shortEMA = ta.ema(close, 50)
mediumEMA = ta.ema(close, 60)
longEMA = ta.ema(close, 150)


// 분봉기준 EMA 그리기
plot(shortEMA, color=color.blue, title="5일 EMA")
plot(mediumEMA, color=color.orange, title="15일 EMA")
plot(longEMA, color=color.red, title="30일 EMA")



// 주간 MACD 계산, 전주와 전전주 히스토그램을 계산하여 상대적인 상승, 하락을 계산 
[macdLine, signalLine, _] = ta.macd(close, 12, 26, 9)
histogram = macdLine - signalLine
histLastWeek = request.security(syminfo.tickerid, timeframePeriod, histogram[1], lookahead=barmerge.lookahead_on)
histWeekBeforeLast = request.security(syminfo.tickerid, timeframePeriod, histogram[2], lookahead=barmerge.lookahead_on)
histDiff = histLastWeek - histWeekBeforeLast


// 현재 주의 월요일 첫 봉인지 확인
isMondayFirstBar = (dayofweek == dayofweek.monday) and (hour == 09) and (minute == 00) // 여기서 시간은 시장 개장 시간에 따라 조정해야 함


// 월요일 첫봉에, 주간 MACD 히스토그램이 상승하면 '매수', 하락하면 '매도' 표시
var label myLabel = na
if (isMondayFirstBar)
    if (histDiff > 0)
        myLabel := label.new(bar_index, high, "이번주는 매수만", color=color.green, textcolor=color.white, style=label.style_label_down, size=size.large)
    else if (histDiff < 0)
        myLabel := label.new(bar_index, low, "이번주는 매도만", color=color.red, textcolor=color.white, style=label.style_label_up, size=size.large)


// 지난주 EMA 값 요청
// 'lookahead'를 사용하여 지난 데이터를 기준으로 계산
lastWeekEMA1 = request.security(syminfo.tickerid, timeframePeriod, ta.ema(close[1], emaLength1), lookahead=barmerge.lookahead_on)
lastWeekEMA2 = request.security(syminfo.tickerid, timeframePeriod, ta.ema(close[1], emaLength2), lookahead=barmerge.lookahead_on)
lastWeekEMA3 = request.security(syminfo.tickerid, timeframePeriod, ta.ema(close[1], emaLength3), lookahead=barmerge.lookahead_on)

// 지난주 EMA 그리기
plot(lastWeekEMA1, color=color.red, title="Last Week EMA1")
plot(lastWeekEMA2, color=color.rgb(157, 126, 126), title="Last Week EMA2")
plot(lastWeekEMA3, color=color.rgb(199, 192, 192), title="Last Week EMA3")


// 매수/매도 조건
buySignal = ta.crossover(close, lastWeekEMA2) and histDiff > 0
// addbuySignal = ta.crossover(close, lastWeekEMA3) and histDiff > 0

sellSignal = ta.crossunder(shortEMA, longEMA) and histDiff < 0
// addSellSignal = ta.crossunder(close, lastWeekEMA3) and histDiff < 0


// 매수 조건
if (buySignal)
    strategy.entry('Buy', strategy.long)
    alert('Buy Signal', alert.freq_once_per_bar_close)
	
// if (addbuySignal)
   // strategy.entry('Buy', strategy.long)
   // alert('add Buy Signal', alert.freq_once_per_bar_close)

if (strategy.position_size > 0 and ((strategy.position_avg_price - close) >= stopLoss) or ta.crossunder(close, mediumEMA))
    strategy.close('Buy')
    alert('Close Buy Signal', alert.freq_once_per_bar_close)

// 매도 조건
if (sellSignal)
    strategy.entry('Sell', strategy.short)
    alert('Sell Signal', alert.freq_once_per_bar_close)
	
//if (addSellSignal)
   // strategy.entry('Sell', strategy.short)
   // alert('add Sell Signal', alert.freq_once_per_bar_close)

if (strategy.position_size < 0 and ((close - strategy.position_avg_price) >= stopLoss) or ta.crossover(shortEMA, mediumEMA))
    strategy.close('Sell')
    alert('Close Sell Signal', alert.freq_once_per_bar_close)
```

> Detail

https://www.fmz.com/strategy/445788

> Last Modified

2024-03-22 11:13:12
