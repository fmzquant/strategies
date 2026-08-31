
> Name

趋势过滤与异常退出的平滑移动平均止损止盈策略-Smooth-Moving-Average-Stop-Loss-Take-Profit-Strategy-with-Trend-Filter-and-Exception-Exit

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f38fdf21a90bb8e63c.png)

#### Overview
This strategy utilizes indicators such as the Smooth Moving Average (SMA), Relative Strength Index (RSI), True Range (TR), and Volume Moving Average (Volume MA) in combination with trend filters, volume, and volatility conditions to execute trades when specific criteria are met. The main idea behind this strategy is to enter a long position when the price is below the SMA200, the trend is downward, and both volume and volatility are low. Stop loss and take profit levels are set upon entry. Additionally, the strategy incorporates an exception exit mechanism, closing the position when the RSI exceeds 70 or when the preset stop loss or take profit levels are reached.

#### Strategy Principles
1. Calculate indicators such as SMA, RSI, Volume MA, and TR MA
2. Determine if the current trend is upward or downward
3. Check if the current volume and volatility are low
4. Enter a long position when the price is below the SMA200 and the low volume and volatility conditions are met
5. Set the stop loss at 95% and the take profit at 150% of the entry price
6. Exit the trade when the RSI exceeds 70 or when the preset stop loss or take profit levels are reached
7. Force close the position when the trend changes and the price breaks through the SMA

#### Advantage Analysis
1. This strategy combines multiple technical indicators for a more comprehensive analysis of market conditions
2. The trend filter and volume/volatility conditions help avoid trading in unfavorable market environments
3. Setting clear stop loss and take profit levels effectively manages risk
4. The exception exit mechanism allows for timely position closing in specific situations, preventing further losses

#### Risk Analysis
1. The strategy's performance may be affected by the choice of parameter settings
2. In some cases, the price may quickly reverse after triggering the entry condition, leading to losses
3. The strategy does not consider fundamental factors and may be influenced by significant events

#### Optimization Directions
1. Consider incorporating additional technical indicators such as MACD, Bollinger Bands, etc., to improve entry and exit accuracy
2. Optimize the stop loss and take profit level settings, such as using trailing stops or dynamic take profit
3. Dynamically adjust strategy parameters based on different market conditions
4. Introduce a risk management module, including position sizing and money management

#### Summary
This strategy combines multiple technical indicators with trend filters, volume, and volatility conditions to execute trades in specific situations. By setting clear stop loss and take profit levels and implementing an exception exit mechanism, the strategy effectively manages risk. However, the strategy has certain limitations, as factors such as parameter selection and market anomalies may impact its performance. Future improvements can be made by incorporating more indicators, optimizing parameter settings, and adding risk management components.



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
strategy("Strategia Stop Loss & Take Profit z Filtrem Trendu i Wyjątkiem", shorttitle="Smooth MA SL & TP with Exception", overlay=true)

// Parametry
tp_multiplier = input.float(1.5, title="Mnożnik Take Profit")
sl_percent = input.float(5, title="Procent Stop Loss")
wait_bars = input.int(3, title="Liczba Oczekiwanych Świec")
sma_period = input.int(200, title="Okres SMA")
rsi_period = input.int(14, title="Okres RSI")
vol_ma_period = input.int(20, title="Okres Średniej Wolumenu")
tr_ma_period = input.int(20, title="Okres Średniej Rzeczywistego Zakresu")

// Obliczenie Gładkiej Średniej Kroczącej
sma = ta.sma(close, sma_period)

// Obliczenie RSI
rsi = ta.rsi(close, rsi_period)

// Filtr Trendu
uptrend = close > sma
downtrend = close < sma

// Warunek konsolidacji: Niski wolumen i niska zmienność
niski_wolumen = volume < ta.sma(volume, vol_ma_period)
niska_zmienosc = ta.tr(true) < ta.sma(ta.tr(true), tr_ma_period)

// Warunek Wejścia (Long): Cena poniżej SMA 200 i filtr trendu w strefie czerwonej
warunek_wejscia = close < sma and niski_wolumen and niska_zmienosc and not uptrend

// Warunek Wyjścia ze strategii
warunek_wyjscia = downtrend and close > sma and ta.crossover(close, sma)

// Ustalanie Stop Loss i Take Profit
var float stop_loss = na
var float take_profit = na

var int indeks_wejscia = na

if (warunek_wejscia)
    stop_loss := close * (1 - sl_percent / 100)
    take_profit := close * (1 + tp_multiplier)
    indeks_wejscia := bar_index

// Handel
if (warunek_wejscia)
    strategy.entry("Long", strategy.long)

// Warunek Wyjścia: RSI w strefie wykupienia lub Stop Loss/Take Profit
if (strategy.opentrades != 0)
    if (rsi > 70)
        strategy.exit("Take Profit/Stop Loss", "Long", limit=take_profit)
    else if (bar_index - indeks_wejscia == wait_bars)
        strategy.exit("Take Profit/Stop Loss", "Long", stop=stop_loss, limit=take_profit)

// Wyjątek: Warunek Wyjścia z Longów na podstawie zmiany trendu
if (warunek_wyjscia)
    strategy.close("Long")

// Rysowanie RSI
rsi_plot = plot(rsi, title="RSI", color=color.blue)

// Rysowanie Gładkiej Średniej Kroczącej
sma_plot = plot(sma, color=color.gray, title="Smooth MA", linewidth=2)

// Rysowanie Filtru Trendu
fill(sma_plot, rsi_plot, color=downtrend ? color.new(color.red, 90) : na)

```

> Detail

https://www.fmz.com/strategy/453279

> Last Modified

2024-06-03 16:54:04
