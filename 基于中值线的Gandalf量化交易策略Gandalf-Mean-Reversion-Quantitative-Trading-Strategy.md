
> Name

基于中值线的Gandalf量化交易策略Gandalf-Mean-Reversion-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11996521f6f353fc85b.png)

[trans]

### 概述

Gandalf量化交易策略是一种基于中值线的趋势跟踪策略。它通过计算加权平均价、中值线和实体中间价格,判断当前趋势方向,以寻找较优入场点。当检测到趋势反转时,它会快速止损退出。该策略结合了趋势跟踪和趋势反转的策略思想。

### 策略原理

Gandalf策略的核心逻辑是比较加权平均价、中值线和实体中间价格的大小关系,以判断当前趋势方向和力度。

具体来说,它会计算以下价格:

- 加权平均价:(最高价 + 最低价 + 收盘价 + 收盘价) / 4
- 中值线:(最高价 + 最低价) / 2
- 实体中间价格:(开盘价 + 收盘价) / 2

在入场时,它会比较前两根K线的加权平均价、中值线和实体中间价格的大小关系,判断是否符合趋势启动的特征。

例如,如果加权平均价低于中值线,并且实体中间价格也低于加权平均价,说明价格正在下跌,这是一个做空的机会。

在止损退出时,它会继续比较这几个价格的大小关系,判断趋势是否发生反转的迹象。如果加权平均价高于实体中间价格,并且中值线也低于加权平均价,说明趋势发生反转,应该立即止损。

通过这种比较价格大小关系的方法,Gandalf策略实现了对趋势的判断和跟踪。它既可以找到较好的入场时机,也可以快速检测到趋势反转从而止损。

### 策略优势

Gandalf策略具有以下几点优势:

1. 使用中值线判断趋势方向,可以有效过滤市场噪音,锁定主要趋势。

2. 入场条件结合多种价格比较,可以更可靠地判断趋势启动。

3. 停损条件也利用价格比较判断趋势反转,可以快速止损,控制风险。

4. 采用条件单下单方式,可以在理想价格附近进场。

5. 可预先设置止盈次数和持仓上限,可以锁定盈利并控制单笔交易风险。

6. 代码结构清晰简单,容易理解和修改。

7. 可针对个人风险偏好调整参数,易于优化。

8. 适用于趋势性品种,可获取趋势 추赚利润。

总的来说,Gandalf策略利用中值线判断趋势,设置止盈止损条件,可以有效控制风险追踪趋势,是一种可靠的趋势跟踪策略。

### 策略风险

Gandalf策略也存在一定的风险需要注意:

1. 作为趋势跟踪策略,在趋势不明显或反转频繁时,会产生较多小亏损。

2. 无法有效判断趋势反转点,可能导致亏损扩大。

3. 在盘整行情中,容易被套利。

4. 依赖参数设置,不同品种需要调整参数。

5. 单边持仓,无法利用反向行情获利。

6. 条件单失败率较高,可能长时间等待入场。

对应风险管理措施:

1. 采用小仓位,分批进场,控制单笔损失。

2. 设置止损线,快速止损。或采用移动止损跟踪止损位。

3. 优化参数,调整至适合当前品种。可辅助以其他指标判断趋势。 

4. 可采用马丁格尔补仓方式,降低成本。

5. 交易具有明显趋势的品种,利润置信度高。

6. 适当放宽入场条件,兼顾入场概率。

### 策略优化方向 

Gandalf策略还可从以下几个方面进行优化:

1. 构建趋势判断指标,辅助判断趋势反转时机。例如加入MACD,布林带等判断。

2. 加入离散优化功能,自动优化参数,适应更多品种。

3. 增加机器学习算法,利用历史数据训练判断趋势的神经网络或SVM模型。

4. 增加止盈方式,如移动止盈,指数移动止盈。

5. 结合相关产品,进行价差套利或统计套利。

6. 加入基于隐马尔可夫模型的状态预测,判断行情状态。

7. 构建复合策略,如与均线策略组合,实现多策略管理。

8. 探索交易策略组合优化,找到组合权重。

综合来说,Gandalf策略可以在趋势判断、自动优化、风险管理等多个层面进行扩展与优化,使策略更稳定可靠。

### 总结

Gandalf量化策略是一种基于价格比较判断趋势的简单有效策略。它结合趋势跟踪与快速止损的思想,能够有效控制风险。该策略逻辑清晰易懂,可根据个人风险偏好调整参数。但它也存在一定盈利波动和持仓风险,需要进行适当优化管理。总体来说,Gandalf策略是一个可靠、易于掌握和优化的趋势跟踪策略,适合用来追求稳定的趋势利润。

||

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

[/trans]

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
