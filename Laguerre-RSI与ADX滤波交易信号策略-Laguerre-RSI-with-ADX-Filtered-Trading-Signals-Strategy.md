
> Name

Laguerre-RSI与ADX滤波交易信号策略-Laguerre-RSI-with-ADX-Filtered-Trading-Signals-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c42bce585af4bffd71.png)


#### Overview
This strategy generates buy and sell signals using the Laguerre RSI indicator and filters the signals using the ADX indicator. When the Laguerre RSI crosses above or below predefined buy and sell levels, and the ADX is above a set threshold, the strategy produces buy or sell signals. This approach of combining a fast and a slow indicator allows for timely capture of trading opportunities when the trend strength is sufficient while avoiding trading when the trend is unclear.

#### Strategy Principles
The Laguerre RSI is a momentum indicator used to measure the speed and strength of price changes. It is based on the Laguerre filter and is more responsive to price changes compared to the traditional RSI. The strategy generates signals by comparing the Laguerre RSI with predefined buy and sell levels.

The ADX indicator measures the strength of a price trend, with higher values indicating a stronger trend. The strategy sets an ADX threshold to enter trades only when the trend strength is sufficient and to stay on the sidelines when the trend is not clear. This helps to improve the reliability of the signals and avoid frequent trading.

The strategy uses crossovers of the Laguerre RSI to trigger buy and sell signals. It enters a long position when the indicator crosses above the buy level and a short position when it crosses below the sell level. At the same time, the ADX must be above the preset threshold to confirm the trend strength. This dual-condition design aims to capture trading opportunities in strong trends.

#### Strategy Advantages
1. The Laguerre RSI captures price changes responsively, enabling timely generation of trading signals.
2. The ADX filter ensures trading only when the trend is clear, improving the reliability of signals.
3. The parameters are adjustable, allowing users to set buy and sell levels and the ADX threshold according to their preferences.
4. The code is concise and efficient, easy to understand and implement.
5. The strategy is applicable to various markets and time frames, offering good versatility.

#### Strategy Risks
1. The Laguerre RSI may generate frequent false signals in choppy markets, leading to overtrading.
2. The ADX filter may delay signal generation, missing some trading opportunities.
3. Fixed buy and sell levels cannot adapt to dynamic changes in the market.
4. The strategy does not include stop-loss, exposing it to the risk of uncontrolled single-trade losses.
5. It lacks position sizing and money management, making it difficult to control overall risk.

#### Strategy Optimization Directions
1. Introduce adaptive buy and sell levels that adjust dynamically based on the magnitude of price fluctuations. This helps adapt to different market states and reduce false signals.
2. Optimize the ADX filter by setting more dynamic thresholds to start trading early in the trend. This can help capture trends earlier and increase profits.
3. Incorporate stop-loss and take-profit mechanisms to control single-trade risk. Avoid excessive losses on holdings while timely locking in profits.
4. Combine other auxiliary indicators, such as trading volume and volatility, to improve signal reliability.
5. Introduce position sizing and money management to control overall risk exposure. Dynamically adjust the percentage of funds for each trade based on the strength of the market trend and account equity.

#### Summary
The Laguerre RSI with ADX filtered trading strategy is a trend-following approach. It utilizes a fast indicator to capture price changes while confirming trend strength with a slow indicator. This combination allows for timely trading when the trend is clear while staying on the sidelines when the trend is uncertain. The strategy's advantages lie in its simplicity and wide applicability, but it also has issues such as frequent trading and insufficient risk control. Future enhancements can focus on signal optimization, risk management improvements, and position sizing to achieve more robust returns.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-11 00:00:00
end: 2024-05-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy('Laguerre RSI with Buy/Sell Signals and ADX Filter', shorttitle='LaRSI_ADX Signals', overlay=false)

// Kullanıcı girdileri
src = input(title='Source', defval=close)
alpha = input.float(title='Alpha', minval=0, maxval=1, step=0.1, defval=0.2)
buyLevel = input(20, title='Buy Level')
sellLevel = input(80, title='Sell Level')
adxLength = input(14, title='ADX Length')
adxSmoothing = input(14, title='ADX Smoothing')
adxLevel = input(20, title='ADX Level') // adxLevel tanımlamasını ekledik

// ADX hesaplaması
[diPlus, diMinus, adx] = ta.dmi(adxLength, adxSmoothing)

// Laguerre RSI hesaplamaları
gamma = 1 - alpha
L0 = 0.0
L0 := (1 - gamma) * src + gamma * nz(L0[1])
L1 = 0.0
L1 := -gamma * L0 + nz(L0[1]) + gamma * nz(L1[1])
L2 = 0.0
L2 := -gamma * L1 + nz(L1[1]) + gamma * nz(L2[1])
L3 = 0.0
L3 := -gamma * L2 + nz(L2[1]) + gamma * nz(L3[1])
cu = (L0 > L1 ? L0 - L1 : 0) + (L1 > L2 ? L1 - L2 : 0) + (L2 > L3 ? L2 - L3 : 0)
cd = (L0 < L1 ? L1 - L0 : 0) + (L1 < L2 ? L2 - L1 : 0) + (L2 < L3 ? L3 - L2 : 0)
temp = cu + cd == 0 ? -1 : cu + cd
LaRSI = temp == -1 ? 0 : cu / temp

// Alım ve satım sinyalleri
longCondition = ta.crossover(100 * LaRSI, buyLevel) and adx > adxLevel
shortCondition = ta.crossunder(100 * LaRSI, sellLevel) and adx > adxLevel

// Strateji giriş ve çıkışları
strategy.entry('Long', strategy.long, when=longCondition)
strategy.entry('Short', strategy.short, when=shortCondition)

// Göstergeleri çizme
plot(100 * LaRSI, title='LaRSI', linewidth=2, color=color.new(color.blue, 0))
hline(buyLevel, title='Buy Level', color=color.new(color.green, 0), linestyle=hline.style_dotted)
hline(sellLevel, title='Sell Level', color=color.new(color.red, 0), linestyle=hline.style_dotted)
plot(adx, title='ADX', color=color.new(color.orange, 0))

```

> Detail

https://www.fmz.com/strategy/451723

> Last Modified

2024-05-17 15:01:17
