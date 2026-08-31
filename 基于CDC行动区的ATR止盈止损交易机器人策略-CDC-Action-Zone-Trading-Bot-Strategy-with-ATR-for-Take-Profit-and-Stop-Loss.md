
> Name

基于CDC行动区的ATR止盈止损交易机器人策略-CDC-Action-Zone-Trading-Bot-Strategy-with-ATR-for-Take-Profit-and-Stop-Loss

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ca0a88661898c92098.png)


#### Overview
This strategy is a trading bot strategy based on the CDC action zone. It uses the 12-period and 26-period Exponential Moving Averages (EMA) to determine market trends, going long when the short-term EMA is above the long-term EMA and going short when the opposite is true. The strategy employs Average True Range (ATR) to set dynamic take profit and stop loss levels. The take profit level is determined based on ATR and a multiplier, while the stop loss level is fixed at 5% of the current closing price.

#### Strategy Principles
1. Calculate the 12-period and 26-period EMAs to determine market trends.
2. Calculate ATR to set dynamic take profit and stop loss levels.
3. When the short-term EMA is above the long-term EMA, a buy signal is generated, and a long position is opened.
4. When the short-term EMA is below the long-term EMA, a sell signal is generated, and a short position is opened.
5. The take profit level is determined based on ATR and a multiplier, and the position is closed when the price reaches the take profit level.
6. The stop loss level is fixed at 5% of the current closing price, and the position is closed when the price reaches the stop loss level.

#### Strategy Advantages
1. Using EMAs to capture market trends can effectively adapt to different market conditions.
2. Employing ATR to set dynamic take profit levels can better protect profits.
3. Fixed stop loss levels help control risk and limit losses to an acceptable range.
4. The code structure is clear and easy to understand and modify, making it suitable for further optimization.

#### Strategy Risks
1. EMAs are lagging indicators and may generate false signals when the market changes rapidly.
2. ATR-based take profit levels may not protect profits in time during high market volatility.
3. Fixed stop loss levels may lead to premature position closures in some cases, missing out on potential profits.
4. The strategy does not consider trading costs and slippage, so actual trading results may differ from backtesting results.

#### Strategy Optimization Directions
1. Experiment with other trend indicators, such as MACD or moving average crossovers, to improve signal accuracy.
2. Optimize the ATR multiplier and take profit/stop loss percentages to better adapt to different market conditions.
3. Introduce dynamic stop loss mechanisms, such as trailing stops or volatility-based stops, to better control risk.
4. Consider trading costs and slippage, and choose appropriate trading instruments and trading sessions to improve the strategy's actual performance.

#### Summary
This strategy is an ATR-based take profit and stop loss trading bot strategy based on the CDC action zone. It uses EMAs to capture market trends, ATR to set dynamic take profit levels, and fixed percentage stop losses to control risk. Although the strategy has certain advantages, it still has some risks and room for improvement. With further optimization and testing, the strategy may achieve good performance in actual trading.



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
strategy("CDC Action Zone Trading Bot with ATR for Take Profit and 5% Stop Loss", overlay=true)

// ดึงข้อมูลราคาปิด
close_price = close

// คำนวณเส้น EMA 12 และ EMA 26
ema12 = ta.ema(close_price, 12)
ema26 = ta.ema(close_price, 26)

// คำนวณ ATR
atr_length = input.int(14, title="ATR Length")
atr = ta.atr(atr_length)

// กำหนด Multiplier สำหรับ ATR Trailing Stoploss
mult_atr_stoploss = input.float(2.5, title="ATR Stoploss Multiplier")

// คำนวณ ATR Trailing Stoploss
prev_stoploss = close_price
for i = 1 to 10
    prev_stoploss := math.max(prev_stoploss, high[i] - mult_atr_stoploss * atr)

// กำหนด Take Profit เป็น ATR Trailing Stoploss
takeProfitPercent = input.float(10, title="Take Profit (%)") / 100
takeProfit = close_price + (close_price - prev_stoploss) * takeProfitPercent

// กำหนด Stop Loss เป็น 5% ของราคาปิดปัจจุบัน
stopLossPercent = input.float(5, title="Stop Loss (%)") / 100
stopLoss = close_price * stopLossPercent

// กำหนดสีแท่งกราฟ
buyColor = input.color(color.green, title="Buy Color")
sellColor = input.color(color.red, title="Sell Color")
neutralColor = input.color(color.gray, title="Neutral Color")
color = if (ema12 > ema26)
    buyColor
else if (ema12 < ema26)
    sellColor
else
    neutralColor

// สัญญาณ Buy
buySignal = (color == buyColor) and (color[1] != buyColor)

// สัญญาณ Sell
sellSignal = (color == sellColor) and (color[1] != sellColor)

// เปิด Position Long
if (buySignal)
    strategy.entry("Long", strategy.long)

// เปิด Position Short
if (sellSignal)
    strategy.entry("Short", strategy.short)

// ปิด Position เมื่อถึง Take profit
if (strategy.position_size > 0 and close_price > takeProfit)
    strategy.exit("Long", profit=takeProfit)

// ปิด Position เมื่อถึง Stop loss
if (strategy.position_size > 0 and close_price < stopLoss)
    strategy.exit("Long", loss=stopLoss)

// ปิด Position เมื่อถึง Take profit
if (strategy.position_size < 0 and close_price < takeProfit)
    strategy.exit("Short", profit=takeProfit)

// ปิด Position เมื่อถึง Stop loss
if (strategy.position_size < 0 and close_price > stopLoss)
    strategy.exit("Short", loss=stopLoss)

```

> Detail

https://www.fmz.com/strategy/453266

> Last Modified

2024-06-03 16:19:32
