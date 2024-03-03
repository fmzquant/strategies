
> Name

Random-Entry-Point-Strategy

> Author

ChaoZhang

> Strategy Description



[trans]
随机点位交易策略

随机点位交易策略利用随机整数产生的数值来决定做多或做空的时机。本策略遵循交易的黄金法则:“让利润上升,快速止损”。
本策略的原理是:

1. 设置一个随机整数,例如6。

2. 每次K线形成时,用当日的成交量取余随机整数,得到0-5的一个随机数。 

3. 将0-5划分成两半,0-2做多,3-5做空。

4. 如果随机数落在0-2,且当前无仓位,则做多;如果随机数落在3-5,且当前无仓位,则做空。

5. 做多做空后设置止损点和止盈点,例如止损-5%,止盈15%,等待止损止盈。

6. 止损止盈后清仓,等待下一轮随机信号。

7. 重复1-6,持续进行随机多空交易。

8. 大数定律保证最终会有利润,同时设置止损可以控制风险。

该策略优点是实现简单,不需要预测市场方向,跟随随机信号可以长期获利。但随机性也带来一定风险,短期내可能出现较大亏损,需要有足够的资金支撑。此外,参数设置如止损点、止盈点也会对策略影响很大,需要仔细测试优化找到最佳参数。

总的来说,随机点位交易策略依靠大数定律实现盈利,设置止损止盈控制风险,适合有充足资金的投资者长期使用。

||

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

[/trans]

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
