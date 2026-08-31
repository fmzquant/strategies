
> Name

高频翻转百分比追踪动量策略-High-Frequency-Flip-Percentage-Tracking-Momentum-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/122c7f4588175c3de33.png)

#### Overview

The High-Frequency Flip Percentage Tracking Momentum Strategy is a high-frequency trading approach based on the Kaufman Adaptive Moving Average (KAMA). This strategy uses the KAMA indicator on a 1-hour timeframe as its primary reference while executing trades on shorter timeframes, such as 15 minutes. The core concept involves rapidly flipping between long and short positions as the price crosses the KAMA line, with a 1% profit target to secure small but frequent gains. This method aims to capitalize on short-term market fluctuations while controlling risk through quick profit-taking.

#### Strategy Principles

1. Utilize the KAMA line on a 1-hour timeframe as the main trend indicator.
2. Open a long position when the price crosses above the KAMA line, and a short position when it crosses below.
3. When holding a long position, if the price crosses below the KAMA line, close the long and open a short; vice versa for short positions.
4. Set a 1% profit target. Once reached, immediately close the position and reset the account balance.
5. Use 90% of the account balance as the position size for each trade.
6. Execute trades on a shorter timeframe (e.g., 15 minutes) to capture more trading opportunities.

The strategy's core lies in using the KAMA line to capture short-term trends and adapting to market fluctuations through frequent position flipping. The 1% profit target ensures quick profit locking, reducing holding time and potential risk.

#### Strategy Advantages

1. High-frequency trading characteristics: The strategy can capture short-term market volatility, increasing trading frequency and potential profit opportunities.

2. Risk control: By setting a 1% profit target, the strategy can quickly lock in small profits, reducing risk exposure per trade.

3. High adaptability: The KAMA indicator has adaptive features, allowing it to adjust sensitivity under different market conditions, enhancing the strategy's adaptability.

4. High capital efficiency: The strategy uses 90% of the account balance as position size, fully utilizing available funds.

5. Drawdown control: Frequent small profits help control maximum drawdown, making the strategy more stable.

6. Leverage potential: Due to lower drawdowns, the strategy has the potential to use higher leverage to amplify returns.

7. Full automation: The strategy logic is clear and easy to implement for fully automated trading, reducing human intervention.

#### Strategy Risks

1. Over-trading: High-frequency flipping may lead to excessive trading, increasing transaction costs and slippage losses.

2. Unfavorable in choppy markets: In sideways, choppy markets, frequent long-short flips may result in accumulated small losses.

3. Missing trends: The 1% profit target may cause early exits in strong trend markets, missing out on larger profit opportunities.

4. False breakout risk: Frequent price crosses around the KAMA line may trigger multiple false breakout trades.

5. Money management risk: Using 90% of the account balance as position size may rapidly erode capital during consecutive losses.

6. Limited applicability: The strategy may only be suitable for highly volatile markets, underperforming in low volatility environments.

7. Technical dependency: The strategy heavily relies on the KAMA indicator; if the indicator fails, it may lead to significant losses.

#### Strategy Optimization Directions

1. Dynamic take-profit: Consider changing the fixed 1% profit target to a dynamic take-profit based on ATR or volatility to adapt to different market conditions.

2. Entry filtering: Introduce additional filtering conditions (such as RSI, volume) to reduce false breakout trades.

3. Trend strength assessment: Evaluate trend strength before entry, only trading when trends are clear to avoid frequent trading in choppy markets.

4. Position management optimization: Implement a more flexible position sizing strategy, adjusting position size based on account performance or market volatility.

5. Multi-timeframe analysis: Incorporate analysis from longer timeframes to improve trade direction accuracy.

6. Stop-loss mechanism: Introduce appropriate stop-loss mechanisms to prevent excessive losses on individual trades.

7. Parameter optimization: Optimize KAMA parameters to find the best combination of fast and slow periods.

8. Market adaptability: Develop a market state recognition mechanism to automatically adjust strategy parameters or pause trading under different market conditions.

#### Conclusion

The High-Frequency Flip Percentage Tracking Momentum Strategy is an innovative high-frequency trading method based on the KAMA indicator. By quickly capturing short-term trend changes and setting fixed profit targets, this strategy aims to achieve frequent small profits. Its advantages lie in high adaptability, low drawdown, and potential high capital efficiency, but it also faces challenges such as over-trading and risks in choppy markets.

By optimizing entry conditions, introducing dynamic take-profits, and improving position management, this strategy has the potential to further enhance its performance and stability. However, traders should fully recognize its risks when using this strategy and make appropriate adjustments based on personal risk preferences and market conditions. Overall, this is a promising quantitative trading strategy, particularly suitable for investors seeking high-frequency, low-risk trading opportunities.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-07-23 00:00:00
end: 2024-07-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// indicator('TeeLek Flip 1 Percent', shorttitle='TeeLek Flip 1 Percent', overlay=true)
strategy("TeeLek Flip 1 Percent", shorttitle="TeeLek Flip 1 Percent", overlay=true)

// ----------------------------------------
// Input
// ----------------------------------------
BALANCE_USDT = input.float(1000, title="Start Balance (USDT)", minval=100)
PERCENT_POSITION_SIZE = input.float(90, title="Position Size (%USDT)", minval=1, maxval=100)
PERCENT_TAKE_PROFIT = input.float(10, title="Take Profit (%)", minval=0.1, maxval=100)
// KAMA Setup
KAMA_PERIOD = int(10)
KMA_FAST_LEN = input.int(5, "KMA Fast Legnth", minval=1,group="KAMA Setup")
KMA_SLOW_LEN = input.int(50, "KMA Slow Legnth", minval=1,group="KAMA Setup")

// ----------------------------------------
// Function
// ----------------------------------------
pine_kama(source) =>
    price_change = math.abs(source - source[KAMA_PERIOD])
    sum_price_change = math.sum(math.abs(source - source[1]), KAMA_PERIOD)
    fastest = 2/(KMA_FAST_LEN + 1)
    slowest = 2/(KMA_SLOW_LEN + 1)
    ER = price_change / sum_price_change
    SC =  math.pow((ER * (fastest-slowest) + slowest), 2)
    alpha = SC
    sum = 0.0
    sum := na(sum[1]) ? source : sum[1] + SC * (source - nz(sum[1]))

// ----------------------------------------
// Variable
// ----------------------------------------
var CurrentBalance_USDT = float(0)
var Accom_USDT = float(0)
var PositionSize_USDT = float(0)
var PositionSize_BTC = float(0)
var PositionTarget_USDT = float(0)
var TargetPrice = float(0)

var Long_BTC = float(0)
var Long_AvgPrice = float(0)
var Short_BTC = float(0)
var Short_AvgPrice = float(0)

var Long_Profit = float(0)
var Short_Profit = float(0)
// เริ่มต้นจากจำนวน Balanace ที่กำหนดมาให้
if CurrentBalance_USDT==0
    CurrentBalance_USDT:=BALANCE_USDT

// ----------------------------------------
// Signal
// ----------------------------------------
// kama line
kama_1h = request.security(syminfo.tickerid, "60",pine_kama(close))

// ----------------------------------------
// Strategy Preparing
// ----------------------------------------
// คำนวณ Position Size เตรียมเอาไว้
PositionSize_USDT:=CurrentBalance_USDT*PERCENT_POSITION_SIZE/100
PositionSize_BTC:=PositionSize_USDT/close
// คำนวณหามูลค่าเป้าหมาย ถ้าถึงก็จะขายเลย
PositionTarget_USDT:=CurrentBalance_USDT+(CurrentBalance_USDT*PERCENT_TAKE_PROFIT/100)

// ถ้ายังไม่ได้เปิด Order // ให้รอ ราคาตัดเส้น KAMA 1H ก่อน
if Long_BTC==0 and Short_BTC==0
    // ตัดขึ้น ให้ซื้อขึ้น Long
    if close>kama_1h and close[1]<=kama_1h[1]
        strategy.entry("L", strategy.long)
        Long_BTC:=PositionSize_BTC
        Long_AvgPrice:=close
    // ตัดลง ให้ซื้อลง  Short
    else if close<kama_1h and close[1]>=kama_1h[1]
        strategy.entry("S", strategy.short)
        Short_BTC:=PositionSize_BTC
        Short_AvgPrice:=close

// ----------------------------------------
// Strategy Switch Side
// ----------------------------------------
// ถ้าเปิด Long อยู่
if Long_BTC>0 
    // ถ้าตัดลง ให้ปิด Long แล้วซื้อลง Short
    if close<kama_1h and close[1]>=kama_1h[1]
        strategy.close_all("X")
        strategy.entry("S", strategy.short)
        Accom_USDT:=Accom_USDT+(close*Long_BTC)-(Long_AvgPrice*Long_BTC)
        Long_AvgPrice:=0
        Long_BTC:=0
        Short_AvgPrice:=close
        Short_BTC:=PositionSize_BTC
// ถ้าเปิด Short อยู่
if Short_BTC>0
    // ตัดขึ้น ให้ปิด Short แล้วซื้อขึ้น Long
    if close>kama_1h and close[1]<=kama_1h[1]
        strategy.close_all("X")
        strategy.entry("L", strategy.long)
        Accom_USDT:=Accom_USDT+(Short_AvgPrice*Short_BTC)-(close*Short_BTC)
        Short_AvgPrice:=0
        Short_BTC:=0
        Long_AvgPrice:=close
        Long_BTC:=PositionSize_BTC

// ----------------------------------------
// Strategy Take Profit
// ----------------------------------------
// ถ้าเปิด Long อยู่
if Long_BTC>0
    // คำนวณหาราคา Target price
    TargetPrice:=(PositionTarget_USDT+(Long_AvgPrice*Long_BTC)-(CurrentBalance_USDT+Accom_USDT))/Long_BTC
    // ถ้าราคามากกว่าราคาเป้าหมายก็ปิดทำกำไรได้เลย
    if close>=TargetPrice
        strategy.close_all("Take Profit")
        // เก็บกำไรเป็นทุน ไปเริ่มรอบใหม่
        CurrentBalance_USDT:=CurrentBalance_USDT+(close*Long_BTC)-(Long_AvgPrice*Long_BTC)
        Long_BTC:=0
        Long_AvgPrice:=0
        Accom_USDT:=0

// ถ้าเปิด Short อยู่
if Short_BTC>0
    // คำนวณหาราคา Target price
    TargetPrice:=((CurrentBalance_USDT+Accom_USDT)+(Short_AvgPrice*Short_BTC)-PositionTarget_USDT)/Short_BTC
    // ถ้าราคามากกว่าราคาเป้าหมายก็ปิดทำกำไรได้เลย
    if close<=TargetPrice
        strategy.close_all("Take Profit")
        // เก็บกำไรเป็นทุน ไปเริ่มรอบใหม่
        CurrentBalance_USDT:=CurrentBalance_USDT+(Short_AvgPrice*Short_BTC)-(close*Short_BTC)
        Short_BTC:=0
        Short_AvgPrice:=0
        Accom_USDT:=0

// ----------------------------------------
// Draw
// ----------------------------------------
// KAMA
plot(kama_1h,"KAMA 1H", #f18a23 , linewidth = 2)

// ----------------------------------------
// Alert
// ----------------------------------------

// ----------------------------------------
// Info Table
// ----------------------------------------

```

> Detail

https://www.fmz.com/strategy/458037

> Last Modified

2024-07-29 14:12:08
