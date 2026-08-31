
> Name

MACD与限制性马丁格尔相结合的高级策略-Advanced-MACD-Strategy-with-Limited-Martingale

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f245491b735f033b85.png)

#### Overview
This strategy combines the MACD indicator and the Martingale money management method to capture trending market movements while controlling risks. The strategy uses the crossover of the MACD fast line and slow line as trading signals, and adopts a limited number of Martingale approach to control position size. When a losing trade occurs, the strategy will double the number of contracts for the next trade, up to a maximum of three times, in order to recover previous losses. At the same time, the strategy sets take-profit and stop-loss conditions to further control risks.

#### Strategy Principles
1. Use the crossover of the MACD fast line (default period of 12) and slow line (default period of 26) as trading signals. Go long when the fast line crosses above the slow line, and go short when the fast line crosses below the slow line.
2. The initial number of contracts is 0.02. When a losing trade occurs, double the number of contracts for the next trade, up to a maximum of three times. If profitability is not achieved after three doublings, reset the number of contracts to the initial value of 0.02.
3. Set take-profit conditions: For long positions, close the position when the price rises 1.5% above the entry price; for short positions, close the position when the price falls 1% below the entry price.
4. Set stop-loss conditions: For long positions, close the position when the price falls 1% below the entry price; for short positions, close the position when the price rises 1% above the entry price.

#### Strategy Advantages
1. By combining the MACD trend-following indicator and the Martingale money management method, the strategy can profit from trending markets while controlling drawdowns.
2. The strategy uses a limited number of Martingale approach, avoiding the risk of unlimited leveraging.
3. Clear take-profit and stop-loss conditions are set, further controlling risks.
4. The code logic is clear and easy to understand and implement.

#### Strategy Risks
1. Although the Martingale method limits the number of leveraging, there is still a risk of over-leveraging, leading to large losses.
2. The MACD indicator may diverge from the price, causing trading signals to become invalid.
3. Fixed take-profit and stop-loss ratios may not adapt to different market conditions, resulting in premature taking of profits or stopping of losses.

#### Strategy Optimization Directions
1. Consider dynamically adjusting the Martingale leveraging ratio and number of times based on current market volatility and account risk tolerance.
2. Combine other technical indicators such as RSI and Bollinger Bands with MACD signals to form more reliable trading signals.
3. Adopt adaptive take-profit and stop-loss methods, such as ATR-based take-profit and stop-loss, or dynamically adjust take-profit and stop-loss ratios based on market trends and volatility.
4. Introduce a position management module to dynamically adjust the position size of each trade based on factors such as account balance and risk tolerance.

#### Summary
By combining the MACD indicator and the Martingale money management method, this strategy seeks to profit from trending markets while controlling risks. The strategy logic is clear and easy to implement, but there are still risks associated with Martingale leveraging and limitations of fixed take-profit and stop-loss ratios. In the future, the strategy can be optimized by dynamically adjusting the leveraging approach, optimizing trading signals, adopting adaptive take-profit and stop-loss methods, and implementing position management to improve the robustness and profitability of the strategy.





> Source (PineScript)

``` pinescript
/*backtest
start: 2024-05-01 00:00:00
end: 2024-05-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Advanced MACD Strategy with Limited Martingale", overlay=true, initial_capital=500)

// MACD 설정 변경
fastLength = 15
slowLength = 30
signalSmoothing = 9
[macdLine, signalLine, _] = ta.macd(close, fastLength, slowLength, signalSmoothing)

// 계약수 및 이전 거래 결과 기록
var float contractSize = 0.02 // 계약 수를 0.05로 시작
var int martingaleCount = 0 // 마틴게일 카운트
var float lastTradeResult = 0

// 매수 및 매도 조건
longCondition = ta.crossover(macdLine, signalLine)
shortCondition = ta.crossunder(macdLine, signalLine)

// 매수 신호
if (longCondition)
    strategy.entry("Long", strategy.long, qty=contractSize)
    lastTradeResult := strategy.netprofit

// 매도 신호
if (shortCondition)
    strategy.entry("Short", strategy.short, qty=contractSize)
    lastTradeResult := strategy.netprofit

// 익절 및 손절 조건
strategy.close("Long", when=(close / strategy.position_avg_price >= 1.015))
strategy.close("Short", when=(strategy.position_avg_price / close >= 1.01))
strategy.close("Long", when=(close / strategy.position_avg_price <= 0.99))
strategy.close("Short", when=(strategy.position_avg_price / close <= 0.99))

// 마틴게일 전략 적용
if (strategy.netprofit < lastTradeResult)
    if (martingaleCount < 3)
        contractSize := contractSize * 2
        martingaleCount := martingaleCount + 1
    else
        contractSize := 0.02 // 리셋 할 때 0.05로 리셋
        martingaleCount := 0
else
    contractSize := 0.02 // 초기화
    martingaleCount := 0

// 매수, 매도 포인트 화살표로 표시
plotshape(series=longCondition, location=location.belowbar, color=color.green, style=shape.labelup, text="Buy")
plotshape(series=shortCondition, location=location.abovebar, color=color.red, style=shape.labeldown, text="Sell")
```

> Detail

https://www.fmz.com/strategy/453225

> Last Modified

2024-06-03 10:43:00
