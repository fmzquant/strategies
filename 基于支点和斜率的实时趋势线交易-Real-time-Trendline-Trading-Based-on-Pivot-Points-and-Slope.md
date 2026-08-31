
> Name

基于支点和斜率的实时趋势线交易-Real-time-Trendline-Trading-Based-on-Pivot-Points-and-Slope

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/165c259e6acf0d3007b.png)


#### Overview
This strategy uses pivot points (PivotHigh and PivotLow) to identify swing highs and lows in price and draws upward and downward trendlines based on these points. The slope of the trendlines is calculated using methods such as ATR (Average True Range), standard deviation, or linear regression, and then adjusted by a slope factor. When the price breaks through a trendline, the strategy generates a buy or sell signal.

#### Strategy Principle
1. Use the ta.pivothigh() and ta.pivotlow() functions to detect swing highs (ph) and swing lows (pl) over a certain lookback period.
2. Calculate the slope of the trendlines based on the selected calculation method (ATR, standard deviation, or linear regression) and adjust it by multiplying with a slope factor (mult).
3. Using the slope and pivot point prices, calculate the current values of the upward trendline (upper) and downward trendline (lower).
4. Determine if the current closing price has broken through a trendline: if the closing price is above the upward trendline, an upward breakout signal is generated; if the closing price is below the downward trendline, a downward breakout signal is generated.
5. Plot the trendlines on the chart, with an option to extend the lines.
6. Trade based on the breakout signals: go long on an upward breakout and go short on a downward breakout.

#### Strategy Advantages
1. The strategy generates trading signals based on objective facts of price behavior (pivot points and trendlines), providing a degree of reliability and stability.
2. The slope of the trendlines can be dynamically adjusted based on market volatility, adapting to different market conditions.
3. Users can flexibly choose the slope calculation method and parameter settings to optimize strategy performance.
4. The strategy provides both real-time and delayed signal modes to meet the needs of different users.
5. The built-in alert function can help users timely capture trading opportunities.

#### Strategy Risks
1. In choppy markets or when trends are unclear, the strategy may generate frequent false signals, leading to decreased profitability.
2. The performance of the strategy depends on parameter settings; inappropriate parameters may cause the strategy to fail or generate excessive trades.
3. In delayed signal mode, due to the existence of backtesting, actual trading results may differ from historical test results.

#### Strategy Optimization Directions
1. Introduce more technical indicators or price behavior features, such as trading volume and volatility, to assist in confirming trendline breakout signals and improve signal quality.
2. Filter trading signals by considering factors such as the duration and magnitude of trendline breakouts to reduce false signals.
3. Optimize position management and risk control, such as dynamically adjusting position size based on trend strength or volatility, and setting reasonable stop-loss and take-profit levels.
4. Optimize parameters using machine learning or optimization algorithms to find the best parameter combinations.

#### Summary
This strategy utilizes pivot points and trendline slopes to construct a real-time trendline trading system. By capturing trendline breakout events, the strategy can trade in the early stages of trend formation. Although the strategy has certain advantages, it is still necessary to be aware of its risks in choppy markets and further enhance the strategy's robustness and profitability by introducing more information, optimizing signal filtering, position management, and other methods.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|Swing Detection Lookback|
|v_input_float_1|true|Slope|
|v_input_string_1|0|Slope Calculation Method: Atr|Stdev|Linreg|
|v_input_1|true|backpaint|
|v_input_2|true|Show Extended Lines|
|v_input_color_1|teal|(?Style)Up Trendline Color|
|v_input_color_2|red|Down Trendline Color|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-04-20 00:00:00
end: 2024-04-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(" only Ajay ", overlay=true)

//------------------------------------------------------------------------------
//Settings
//------------------------------------------------------------------------------{
length = input.int(14, 'Swing Detection Lookback')
mult = input.float(1., 'Slope', minval = 0, step = .1)
calcMethod = input.string('Atr', 'Slope Calculation Method', options = ['Atr','Stdev','Linreg'])
backpaint = input(true, tooltip = 'Backpainting offset displayed elements in the past. Disable backpainting to see real time information returned by the indicator.')

//Style
upCss = input.color(color.teal, 'Up Trendline Color', group = 'Style')
dnCss = input.color(color.red, 'Down Trendline Color', group = 'Style')
showExt = input(true, 'Show Extended Lines')

//------------------------------------------------------------------------------}
//Calculations
//------------------------------------------------------------------------------{
var upper = 0.
var lower = 0.
var slope_ph = 0.
var slope_pl = 0.

var offset = backpaint ? length : 0

n = bar_index
src = close

ph = ta.pivothigh(length, length)
pl = ta.pivotlow(length, length)

//Slope Calculation Method
slope = switch calcMethod
    'Atr'    => ta.atr(length) / length * mult
    'Stdev'  => ta.stdev(src,length) / length * mult
    'Linreg' => math.abs(ta.sma(src * n, length) - ta.sma(src, length) * ta.sma(n, length)) / ta.variance(n, length) / 2 * mult

//Get slopes and calculate trendlines
slope_ph := ph ? slope : slope_ph
slope_pl := pl ? slope : slope_pl

upper := ph ? ph : upper - slope_ph
lower := pl ? pl : lower + slope_pl

var upos = 0
var dnos = 0
upos := ph ? 0 : close > upper - slope_ph * length ? 1 : upos
dnos := pl ? 0 : close < lower + slope_pl * length ? 1 : dnos

//------------------------------------------------------------------------------}
//Extended Lines
//------------------------------------------------------------------------------{
// var uptl  = line.new(na,na,na,na, color = upCss, style = line.style_dashed, extend = extend.right)
// var dntl  = line.new(na,na,na,na, color = dnCss, style = line.style_dashed, extend = extend.right)

// if ph and showExt
//     uptl.set_xy1(n-offset, backpaint ? ph : upper - slope_ph * length)
//     uptl.set_xy2(n-offset+1, backpaint ? ph - slope : upper - slope_ph * (length+1))

// if pl and showExt
//     dntl.set_xy1(n-offset, backpaint ? pl : lower + slope_pl * length)
//     dntl.set_xy2(n-offset+1, backpaint ? pl + slope : lower + slope_pl * (length+1))

//------------------------------------------------------------------------------}
//Plots
//------------------------------------------------------------------------------{
plot(backpaint ? upper : upper - slope_ph * length, 'Upper', color = ph ? na : upCss, offset = -offset)
plot(backpaint ? lower : lower + slope_pl * length, 'Lower', color = pl ? na : dnCss, offset = -offset)

//Breakouts
upBreakout = upos > upos[1]
dnBreakout = dnos > dnos[1]

if (upBreakout)
    strategy.entry("Up Breakout", strategy.long)

if (dnBreakout)
    strategy.entry("Down Breakout", strategy.short)

//------------------------------------------------------------------------------}
//Alerts
//------------------------------------------------------------------------------{
alertcondition(upos > upos[1], 'Upward Breakout', 'Price broke the down-trendline upward')
alertcondition(dnos > dnos[1], 'Downward Breakout', 'Price broke the up-trendline downward')

//------------------------------------------------------------------------------}

```

> Detail

https://www.fmz.com/strategy/449520

> Last Modified

2024-04-26 15:34:28
