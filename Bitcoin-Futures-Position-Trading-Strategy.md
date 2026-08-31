
> Name

Bitcoin-Futures-Position-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1f3e70c1a025dc443e4.png)

Overview: This strategy uses BitMEX bitcoin futures position data to guide trades. It goes short when short positions increase and goes long when short positions decrease. Suitable for following “smart money” trading behavior.  

Strategy Logic:  
1. Use BitMEX bitcoin futures short positions as indicator. BitMEX is considered dominated by institutions and “smart money”.   
2. When short positions increase, go short on BTC spot. Institutions are adding to their short positions.  
3. When short positions decrease, go long on BTC spot. Institutions are reducing shorts, indicating bullish sentiment.
4. Use RSI indicator to detect peaks and troughs in short positions. RSI above 75 is peak signal, below 30 is trough signal.  
5. Enter long/short positions on peak/trough signals.  

Advantages Analysis:   
1. Uses position data from professional BitMEX traders, capturing institutional activity.  
2. RSI helps determine peaks/troughs, controlling trading risk.
3. Real-time monitoring of institutional moves to adjust own position accordingly.  
4. No need to analyze charts, directly follow “smart money” thinking. 
5. Backtest results look decent, respectable returns.  

Risk Analysis:   
1. Unable to tell if increase in shorts is speculative or hedging. Need to follow cautiously.   
2. BitMEX data has lag, may miss best entry price.   
3. Institutions are not 100% correct, failures happen.  
4. Poor RSI parameter tuning leads to false signals or missing signals.   
5. Stop loss too loose, single loss could be huge.   

Optimization Directions:
1. Optimize RSI parameters, test different holding periods.   
2. Try other indicators like KD, MACD to detect peaks/troughs.   
3. Tighter stop loss to limit single loss.  
4. Add exit conditions like trend reversal, breakers etc.  
5. Test applicability to other coins, e.g. follow BTC shorts to trade ETH.  

Summary:  
This strategy leverages BitMEX professional bitcoin futures traders to get timely signals. It helps investors gauge market sentiment and spot highs/lows. Also warns downside risks when whales are heavily short. Overall an interesting approach utilizing futures position data, but further refinement in parameters and risk control necessary before deploying live.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 Jan 2021)|Start Date|
|v_input_2|timestamp(01 Jan 2024)|Start Date|
|v_input_3|BTC_USDT:swap|Bitfinex Short Symbol|
|v_input_4|7|(?RSI Settings)Length|
|v_input_5|75|High Shorts Threshold|
|v_input_6|30|Low Shorts Threshold|
|v_input_float_1|25|(?Stop Loss Settings)Long Stop Loss (%)|
|v_input_float_2|25|Short Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-26 00:00:00
end: 2024-01-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Bitfinex Shorts Strat", 
     overlay=true,
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=10, precision=2, initial_capital=1000,
     pyramiding=2,
     commission_value=0.05)

//Backtest date range
StartDate = input(timestamp("01 Jan 2021"), title="Start Date")
EndDate = input(timestamp("01 Jan 2024"), title="Start Date")
inDateRange = true

symbolInput = input(title="Bitfinex Short Symbol", defval="BTC_USDT:swap")
Shorts = request.security(symbolInput, "", open)

// RSI Input Settings
length = input(title="Length", defval=7, group="RSI Settings" )
overSold = input(title="High Shorts Threshold", defval=75, group="RSI Settings" )
overBought = input(title="Low Shorts Threshold", defval=30, group="RSI Settings" )

// Calculating RSI
vrsi = ta.rsi(Shorts, length)
RSIunder = ta.crossover(vrsi, overSold)
RSIover = ta.crossunder(vrsi, overBought)

// Stop Loss Input Settings
longLossPerc = input.float(title="Long Stop Loss (%)", defval=25, group="Stop Loss Settings") * 0.01
shortLossPerc = input.float(title="Short Stop Loss (%)", defval=25, group="Stop Loss Settings") * 0.01

// Calculating Stop Loss
longStopPrice  = strategy.position_avg_price * (1 - longLossPerc)
shortStopPrice = strategy.position_avg_price * (1 + shortLossPerc)

// Strategy Entry
if (not na(vrsi))
	if (inDateRange and RSIover)
		strategy.entry("LONG", strategy.long, comment="LONG")
	if (inDateRange and RSIunder)
		strategy.entry("SHORT", strategy.short, comment="SHORT")

// Submit exit orders based on calculated stop loss price
if (strategy.position_size > 0)
    strategy.exit(id="LONG STOP", stop=longStopPrice)
if (strategy.position_size < 0)
    strategy.exit(id="SHORT STOP", stop=shortStopPrice)
```

> Detail

https://www.fmz.com/strategy/440084

> Last Modified

2024-01-26 15:01:24
