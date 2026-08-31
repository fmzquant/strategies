
> Name

Random-Entry-Point-Strategy

> Author

ChaoZhang

> Strategy Description




Random Entry Point Trading Strategy

The Random Entry Point trading strategy uses randomly generated integers to determine entries for long and short trades. This strategy adheres to the golden rule of trading: "Let profits rise and cut losses quickly". 

The principles of this strategy are:

1. Set a random integer, e.g. 6. 

2. Every time a new candle forms, take the current volume modulo the random integer to get a random number between 0-5.

3. Split 0-5 into two halves, 0-2 for long trades, 3-5 for short trades. 

4. If the random number falls between 0-2 and there is no current position, go long. If it falls between 3-5 and there is no position, go short.

5. Set a stop loss and take profit after entering trades, e.g. -5% SL, 15% TP. Wait for SL/TP to trigger.

6. Clear positions after SL/TP is hit, and wait for next random signal. 

7. Repeat steps 1-6 to continuously take random long/short positions.

8. Law of large numbers ensures profitability in the long run, SL controls risk.

The advantages of this strategy are simplicity of implementation, no need to predict market direction, long term profitability by following random signals. However, the randomness also introduces some risk, potentially large losses in the short term requiring sufficient capital. Parameters like SL/TP also significantly impact performance and need careful backtesting for optimization.

In summary, the Random Entry Point strategy relies on law of large numbers for profitability, uses SL/TP to control risk, suitable for investors with sufficient capital for long term use.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|6|Random integer|
|v_input_2|-5|Stop loss|
|v_input_3|15|Take profit|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-11 00:00:00
end: 2023-04-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// strategy(title="Random entry points",overlay=true, default_qty_type=strategy.cash, default_qty_value=500, currency="USD", initial_capital = 1000, commission_type=strategy.commission.percent, commission_value=0.07)

i = input(defval = 6, title = 'Random integer', type = input.integer)
stop_loss = input(defval = -5, title = 'Stop loss', type = input.integer)
take_profit = input(defval = 15, title = 'Take profit', type = input.integer)

random = volume % i
trade_area = float(i) / 2

var profit = 0.0
var start_price = 0.0
var in_deal = false

if not in_deal
    profit := 0.0 

if random < trade_area and not in_deal
    in_deal := true
    start_price := close
    strategy.entry("long", true)
   
if in_deal
    profit := (close / start_price -1) * 100
   
if profit < stop_loss or profit > take_profit
    strategy.close("long")
    in_deal := false
```

> Detail

https://www.fmz.com/strategy/426471

> Last Modified

2023-09-12 14:11:33
