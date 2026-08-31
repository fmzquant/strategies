
> Name

技术指标策略-风险管理策略-自适应趋势跟踪策略Technical-Indicator-Strategy-Risk-Management-Strategy-Adaptive-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b67f1a5479bed5900f.png)


#### Overview

This strategy is an adaptive trend-following trading system based on Exponential Moving Averages (EMA) and Smoothed Directional Indicators (SDI). It combines multiple technical indicators and risk management tools to capture market trends and control risk. The strategy uses crossovers of fast and slow EMAs along with the direction of SDI to determine market trends and generate buy and sell signals. Additionally, the strategy incorporates risk management features such as take profit, stop loss, and trailing stops to protect profits and limit losses.

The core strength of this strategy lies in its adaptability and comprehensive risk management approach. Through the use of adjustable parameters such as EMA periods, SDI smoothing, and risk management thresholds, traders can optimize the strategy for different market conditions and personal risk preferences. The flexible setting of leverage and position size further enhances the strategy's adaptability, making it suitable for various trading styles and capital sizes.

#### Strategy Principles

1. Indicator Calculations:
   - Calculate fast and slow EMAs, along with their smoothed versions.
   - Compute SDI, including positive and negative directional indicators.

2. Trade Signal Generation:
   - Long condition: Positive DI is greater than negative DI, and fast EMA is above slow EMA.
   - Short condition: Negative DI is greater than positive DI, and fast EMA is below slow EMA.

3. Position Management:
   - Use adjustable leverage and equity percentage to determine trade size.
   - Close opposite positions and open new ones when entry conditions are met.

4. Risk Management:
   - Implement optional take profit, stop loss, and trailing stop features.
   - Dynamically adjust trailing stop levels to lock in profits.

5. Time Filtering:
   - Set start and end dates for trading, automatically closing positions outside the specified time range.

#### Strategy Advantages

1. Trend Capturing Ability: Effectively identifies and follows market trends by combining EMA and SDI.

2. High Adaptability: Adapts to different market conditions through adjustable parameters.

3. Comprehensive Risk Management: Integrates take profit, stop loss, and trailing stops for all-round risk control.

4. Flexible Position Control: Adjustable leverage and capital usage ratio to suit different risk appetites.

5. Backtesting Friendly: Supports historical data backtesting for strategy optimization.

6. Emotion Neutral: Based on objective indicators, reducing the impact of subjective emotions.

7. Versatility: Can be applied to different timeframes and trading instruments.

#### Strategy Risks

1. Overtrading: May generate frequent trades in choppy markets, increasing costs.

2. Lagging Nature: EMA and SDI are lagging indicators, potentially slow to react to trend reversals.

3. False Breakout Risk: May misinterpret short-term fluctuations as trends, leading to incorrect trades.

4. Parameter Sensitivity: Performance highly dependent on parameter settings, requiring continuous optimization.

5. Market Environment Dependency: May underperform in certain market conditions.

6. Leverage Risk: High leverage can amplify losses, requiring cautious use.

7. Technology Dependence: Relies on stable technical environment, system failures may cause losses.

#### Strategy Optimization Directions

1. Dynamic Parameter Adjustment: Implement adaptive adjustment of EMA and SDI parameters to suit different market phases.

2. Multi-Timeframe Analysis: Integrate signals from multiple time periods to improve trend judgment accuracy.

3. Volatility Filtering: Incorporate volatility indicators like ATR to adjust trading rules during high volatility periods.

4. Market State Recognition: Introduce market state classification (trend/range) to optimize trading logic accordingly.

5. Capital Management Optimization: Implement dynamic position adjustment based on account profit and loss status.

6. Indicator Combination: Consider adding complementary indicators like RSI or MACD to enhance signal reliability.

7. Machine Learning Integration: Introduce machine learning algorithms to optimize parameter selection and signal generation.

#### Conclusion

This adaptive trend-following strategy combining EMA and SDI demonstrates powerful market adaptability and risk management capabilities. Through flexible parameter settings and comprehensive risk control measures, it provides traders with a reliable quantitative trading framework. The core advantages of the strategy lie in its sensitive trend capture and strict risk control, enabling it to maintain stable performance across different market environments.

However, traders still need to be aware of potential risks inherent in the strategy, such as lag and parameter sensitivity. Through continuous optimization and improvement, especially in areas like dynamic parameter adjustment, multi-timeframe analysis, and market state recognition, the strategy has the potential to further enhance its performance and stability.

Overall, this strategy provides a solid foundation for quantitative trading, suitable for investors seeking systematic and disciplined trading methods. By deeply understanding the strategy principles and combining them with personal trading styles, traders can effectively use this tool to enhance their competitive edge in the financial markets.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-06-01 00:00:00
end: 2024-06-30 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © erdas0

//@version=5
strategy("Strategy SEMA SDI Webhook", overlay=true, slippage = 1, commission_value = 0.035, default_qty_type=strategy.percent_of_equity, default_qty_value=50, initial_capital = 1000, calc_on_order_fills = true, process_orders_on_close = true)
// Start and end dates
dts=input(false,"",inline="dts")
dte=input(false,"",inline="dte")
start_date = input(timestamp("2023-01-01 00:00:00"), "Start Date",inline="dts") 
end_date = input(timestamp("2124-01-01"), "End Date",inline="dte") 
times = true
// Initial capital
leverage= input.int(10, "Leverage", minval=1,inline="qty") //Leverage Test
usdprcnt= input.int(50, "%", minval=1,inline="qty")
qty= input(false,"Inital USDT ◨",inline="qty")
initial_capital = qty ? (strategy.initial_capital+strategy.netprofit)/close*leverage*usdprcnt/100 : na
//Level Inputs
tpon=input(false,"TP ◨",group ="Take Profit/Stop Loss", inline="1")
sloc=input(true,"SL ◨",group ="Take Profit/Stop Loss", inline="1")
tron=input(true,"Trailing ◨",group ="Take Profit/Stop Loss", inline="1")

tp = tpon ? input.float(25, "Take Profit %", minval=0.1,step=0.1,group ="Take Profit/Stop Loss", inline="2") : na
sl = sloc ? input.float(4.8, "Stop Loss %", minval=0.1,step=0.1,group ="Take Profit/Stop Loss", inline="2") : na
tr = tron ? input.float(1.9, "Trailing Stop ", minval=0.1,step=0.1,group ="Take Profit/Stop Loss", inline="4") : na

// Take profit and stop loss levels
dir=strategy.position_size/math.abs(strategy.position_size) //Directions
newtrade=strategy.closedtrades>strategy.closedtrades[1]
pftpcnt=dir<0 ? (strategy.position_avg_price-low)/strategy.position_avg_price*100 : dir>0 ? (high-strategy.position_avg_price)/strategy.position_avg_price*100 : na //max profit

pftpr= (1 + pftpcnt*dir/100) * strategy.position_avg_price //Trailing Price
take_profit = (1 + tp*dir/100) * strategy.position_avg_price
stop_loss = (1 - sl*dir/100) * strategy.position_avg_price

var float maxpft=na //max profit percent
maxpft := newtrade ? 0 : strategy.openprofit > 0 ?  math.max(pftpcnt,maxpft) : maxpft
var float Tr=na //Trailing
Tr := newtrade ? na : pftpcnt >= tr and maxpft-pftpcnt >= tr ?  close : Tr

//Inputs
ocema=input(true, title='EMA ◨',group="Inputs",inline="2")
ocsd=input(true, title='SDI ◨',group="Inputs",inline="2")
ocsm=input(true, title='Smooth ◨',group="Inputs",inline="2")
lenf = input.int(58, "Fast Ema", minval=1,group ="Inputs", inline="3")
lens = input.int(70, "Slow Ema", minval=1,group ="Inputs", inline="3")
slen = input.int(3, "Smooth", minval=1,group ="Inputs", inline="4")
dilen = input.int(1, title="DI Length", minval=1,group ="SDI", inline="5")
sdi = input.int(6, title="DI Smooth", minval=1,group ="SDI", inline="5")

//EMA
emaf=ta.ema(close,lenf)
emas=ta.ema(close,lens)
semaf=ta.ema(emaf,slen)
semas=ta.ema(emas,slen)
//SDI
dirmov(len,smt) =>
	up = ta.change(high)
	down = -ta.change(low)
	plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
	minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange = ta.rma(ta.tr, len)
	plus = ta.ema(fixnan(100 * ta.rma(plusDM, len) / truerange),smt)
	minus = ta.ema(fixnan(100 * ta.rma(minusDM, len) / truerange),smt)
	[plus, minus]
[plus,minus]=dirmov(dilen,sdi)
pm=ta.ema(plus-minus,10) 
sdcl= plus>minus ? color.new(color.green,80) :plus<minus ? color.new(color.red,80) : na
cpm= pm>pm[1] ? color.lime : pm<pm[1] ? color.red : color.yellow
barcolor(cpm,title="PM Color")

//Plot
plot(ocsm ? semaf:emaf,"Fast Ema",color=color.green)
plot(ocsm ? semas:semas,"Slow Ema",color=color.red)
// Conditions
Long = (ocsd ? plus>minus:true) and (ocema ? (ocsm ? semaf:emaf)>(ocsm ? semas:emas):true)
Short = (ocsd ? plus<minus:true) and (ocema ? (ocsm ? semaf:emaf)<(ocsm ? semas:emas):true)

// Strategy conditions
if Long and times
    strategy.close("Short","Close S")
    strategy.entry("Long", strategy.long, comment="L",qty = initial_capital)
if strategy.position_size>0
    strategy.exit("Long LTP", "Long", limit=take_profit, stop=stop_loss, comment="LSL",comment_profit = "LTP")
if Tr and strategy.position_size>0
    strategy.exit("Long LTP", "Long", limit=take_profit, stop=pftpr, comment="Tr",comment_profit = "LTP")

if Short and times
    strategy.close("Long","Close L")
    strategy.entry("Short", strategy.short, comment="S",qty = initial_capital)
if strategy.position_size<0
    strategy.exit("Short STP", "Short", limit=take_profit, stop=stop_loss, comment="SSL",comment_profit ="STP" )
if Tr and strategy.position_size<0
    strategy.exit("Short STP", "Short", limit=take_profit, stop=pftpr, comment="Tr",comment_profit = "STP")

if not times
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/458084

> Last Modified

2024-07-29 17:25:26
