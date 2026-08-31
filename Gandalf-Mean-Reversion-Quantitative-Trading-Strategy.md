
> Name

Gandalf-Mean-Reversion-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11996521f6f353fc85b.png)


### Overview

The Gandalf quantitative trading strategy is a mean reversion strategy based on median price lines. It determines the current trend direction by calculating weighted average price, median price line and body middle price, to find optimal entry points. When a trend reversal is detected, it will quickly cut losses and exit. The strategy combines the ideas of trend following and trend reversal strategies.

### Strategy Logic

The core logic of Gandalf strategy is to compare the magnitude relationship between weighted average price, median price line and body middle price, to judge the current trend direction and strength. 

Specifically, it calculates the following prices:

- Weighted average price: (Highest price + Lowest price + Close price + Close price) / 4
- Median price line: (Highest price + Lowest price) / 2  
- Body middle price: (Open price + Close price) / 2

When entering a position, it compares the magnitude relationship between the weighted average price, median price line and body middle price of the last two bars, to determine whether it fits the characteristics of a starting trend.

For example, if the weighted average price is below the median price line, and the body middle price is also below the weighted average price, it indicates the price is falling, which presents a shorting opportunity.

When stopping loss, it continues to compare the magnitude relationship between these prices, to judge whether there are signs of trend reversal. If the weighted average price is above the body middle price, and the median price line is below the weighted average price, it indicates a trend reversal, and should cut loss immediately.

By comparing the price magnitude relationship, Gandalf strategy realizes the judgment and tracking of trends. It can find optimal entry timing, and also quickly detect trend reversals to stop loss.

### Advantages

The Gandalf strategy has the following advantages:

1. Using median price line to determine trend direction can effectively filter market noise and lock in the major trend.

2. The entry condition combining multiple price comparisons can more reliably determine the start of a trend.

3. The stop loss condition also uses price comparison to judge trend reversal, which allows fast stop loss and risk control.

4. Adopting conditional orders for entry can get in at ideal prices. 

5. Preset maximum profit take times and holding period upper limit can lock in profits and control single trade risks.

6. The code structure is clear and simple, easy to understand and modify.

7. Parameters can be adjusted based on personal risk preference, easy to optimize.

8. Applicable to trending products, able to capture trending profits.

In summary, the Gandalf strategy utilizes median line to determine trend, sets profit taking and stop loss conditions, and can effectively control risks while tracking trends, making it a reliable trend following strategy.

### Risks

The Gandalf strategy also has some risks to note:

1. As a trend following strategy, it will produce more small losses when trend is unclear or frequently reversing.

2. Unable to effectively determine trend reversal points, may lead to expanding losses.

3. Prone to being trapped in range-bound markets.

4. Relies on parameter settings, parameters need adjusting for different products.

5. Unidirectional holding, unable to profit from reverse trends. 

6. High failure rate of conditional orders, may wait long for entry.

Risk management measures:

1. Adopt small position sizing, partial entry, to control single loss.

2. Set stop loss line, fast stop loss. Or adopt moving stop loss or trailing stop loss.

3. Optimize parameters to suit current product. Use other indicators to assist trend judgment.

4. Consider martingale to lower cost basis.

5. Trade products with obvious trends, higher profit confidence. 

6. Relax entry criteria appropriately to improve entry probability.

### Improvement Directions

The Gandalf strategy can also be improved in the following aspects:

1. Build trend judgment indicators to assist in determining timing of trend reversals, such as adding MACD, Bollinger Bands etc.

2. Add discrete optimization functions to auto optimize parameters and adapt to more products.

3. Increase machine learning algorithms, train neural networks or SVM models on historical data to judge trends.

4. Add more profit taking methods, like moving profit take, parabolic profit take.

5. Combine related products for spread trading or stat arb strategies. 

6. Add state prediction based on Hidden Markov Model to judge market regime.

7. Construct combined strategies, like combining with moving average strategies for multi-strategy management.

8. Explore optimization of trading strategy combinations to find optimal portfolio weights.

In summary, the Gandalf strategy can be expanded and optimized in multiple dimensions like trend judgment, automatic optimization, risk management, to make the strategy more robust and reliable.

### Conclusion

The Gandalf quantitative strategy is a simple yet effective strategy based on price comparison to determine trends. It combines the ideas of trend following and quick stop loss, and can effectively control risks. The strategy logic is clear and easy to understand, parameters can be adjusted based on personal risk preferences. But it also has some profit fluctuation and holding risks, requiring proper optimization and management. Overall, the Gandalf strategy is a reliable, easy to grasp and optimize trend following strategy, suitable for pursuing steady trend profits.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Quantity (0 to auto calc)|
|v_input_2|10000|Money to spend on single trade|
|v_input_3|6|Max Profit Close|
|v_input_4|8|Max Total Bars|
|v_input_5|-0.08|Distance from low price to place entry limit|
|v_input_6|true|Use Alt Exit|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-22 00:00:00
end: 2023-10-29 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

// The GandalfProjectResearchSystem strategy, as discussed in
// “System Development Using Artificial Intelligence”
// by Domenico D’Errico and Giovanni Trombetta
strategy("Gandalf Project Research System", overlay=true)

// Inputs
Quantity = input(0, title="Quantity (0 to auto calc)")
Single_Trade_Money = input(10000, minval=1, title="Money to spend on single trade")
MaxProfitCloses = input(6, minval=1, title="Max Profit Close")
MaxBars = input(8, minval=1, title="Max Total Bars")
Enter_Gap = input(-0.08, title="Distance from low price to place entry limit")
AltExit = input(true, title="Use Alt Exit")

// Calculate Order Quantity
Ncon = Single_Trade_Money / close

// Misc Variables
src = close
BarsSinceEntry = 0
MaxProfitCount = 0
MedBodyPrice = (open + close) / 2.0
Weighted = (high + low + close + close) / 4.0
Median = (high + low) / 2.0

// Enter Conditions
Cond00 = strategy.position_size == 0
Cond01 = ((Weighted[1] < Median[1] and Median[2] <= Weighted[1] and MedBodyPrice[2] <= Weighted[3]) or (Weighted[1] < Median[3] and MedBodyPrice[0] < Median[2] and MedBodyPrice[1] < MedBodyPrice[2]))
Entry01 = Cond00 and Cond01

// Update Exit Variables
BarsSinceEntry := Cond00 ? 0 : nz(BarsSinceEntry[1]) + 1
MaxProfitCount := Cond00 ? 0 : (close > strategy.position_avg_price and BarsSinceEntry > 1) ? nz(MaxProfitCount[1]) + 1 : nz(MaxProfitCount[1])

// Exit Conditions
eCond01 = BarsSinceEntry - 1 >= MaxBars
eCond02 = MaxProfitCount >= MaxProfitCloses
eCond03 = ((Weighted[1] < MedBodyPrice[1] and Median[2] == MedBodyPrice[3] and MedBodyPrice[1] <= MedBodyPrice[4]) or (Weighted[2] < MedBodyPrice[0] and Median[4] <= Weighted[3] and MedBodyPrice[1] <= Weighted[1]) or (Weighted[2] < MedBodyPrice[0] and Median[4] <= Weighted[3] and MedBodyPrice[1] <= Weighted[1]))
eCond04 = AltExit ? true : close - strategy.position_avg_price < 0
Exit01 = not Cond00 and (eCond01 or eCond02 or (eCond03 and eCond04))

// Entries
strategy.entry(id="L1", long=true, limit=low + Enter_Gap, qty=(Quantity > 0 ? Quantity : Ncon), when=Entry01)
 
// Exits
strategy.close("L1", Exit01)

```

> Detail

https://www.fmz.com/strategy/430542

> Last Modified

2023-10-30 10:33:17
