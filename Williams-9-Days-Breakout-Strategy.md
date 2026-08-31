
> Name

Williams-9-Days-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1e3de40bcbcc0bf8ddd.png)



### Overview

This strategy is based on the 9-day breakout concept of Larry Williams, by monitoring the direction of 9-day moving average to determine the trend, and taking positions at breakout points to follow the trend.

### Strategy Logic

- Use 9-day EMA as an indicator to judge the trend 
- When price breaks out above EMA from below, it is judged as bullish and long position is taken
- When price breaks out below EMA from above, it is judged as bearish and short position is taken
- Buy signal: Opening price is lower than 9-day EMA, closing price is higher than 9-day EMA
- Sell signal: Opening price is higher than 9-day EMA, closing price is lower than 9-day EMA

Specifically:

1. Calculate the 9-day EMA
2. Check if the candle of the day satisfies the buy condition, i.e. opening price is lower than 9-day EMA, closing price is higher than 9-day EMA
3. If satisfied, take long position at closing price, with stop loss set at previous high
4. Check if the candle of the day satisfies the sell condition, i.e. opening price is higher than 9-day EMA, closing price is lower than 9-day EMA  
5. If satisfied, exit the previous long position, with take profit set at previous low

The above constitutes the complete logic of buy and sell.

### Advantage Analysis 

This is a relatively simple trend following strategy with the following strengths:

1. Using EMA to judge trend direction can effectively filter out price noise
2. Taking positions at EMA breakout can timely capture trend reversal  
3. Adopting previous high as stop loss and previous low as take profit can lock in trend profits
4. The trading rules are clear and simple, easy to understand and implement, suitable for beginners
5. High capital usage efficiency, no need to hold positions all the time, only short-term positions at trend breakouts

### Risks and Optimization

The strategy also has some risks and deficiencies, which can be further optimized from the following aspects:

1. The 9-day EMA period setting may not be flexible enough for different products and market conditions, adaptive EMA period can be introduced
2. Using only 9-day EMA to judge trend may be too simple, multiple time frame EMAs or other indicators can be combined  
3. Transaction costs and slippage are not considered, which can significantly affect PnL in live trading
4. No stop loss and take profit ratios are set, unable to control risk reward of individual trades
5. Entry signals may oscillate multiple times, generating unnecessary small orders, filters can be added

In summary, the strategy can be improved through dynamic parameter optimization, multifactor judgement, transaction cost management, risk-reward control etc, to make the strategy more robust across different market conditions.  

### Conclusion

The Williams 9-day breakout strategy is a relatively classic short-term trend following strategy. The core idea is simple and clear, using EMA to determine trend direction, taking positions at breakout points, following the trend and managing risks. The strategy is easy to understand and implement, with high capital usage efficiency, but also has some deficiencies. We can optimize it from multiple perspectives to make the parameters more dynamic, judgement rules more rigorous, risk control more complete, thereby adapting to a wider range of market conditions and improving the stability and profitability.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-16 00:00:00
end: 2023-10-16 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("larry willians teste2", overlay=true)

//Window of time
start     = timestamp(2019, 00, 00, 00, 00)  // backtest start window
finish    = timestamp(2019, 12, 31, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"  

ema9=ema(close,9) // Ema de 9 periodos

//Condições de compra
c1= (open< ema9 and close > ema9) //abrir abaixo da ema9 e fechar acima da ema9

if(window())
    if(c1)
        strategy.entry("Compra", true, stop = high) // Coloca ordem stopgain no topo anterior
    else
        strategy.cancel("Compra") // Cancela a ordem se o proximo candle não "pegar"
        
//codições de venda
v1= (open> ema9 and close < ema9) // abrir acima da ema9 e fechar abaixo ema9

if(window())
    if (v1)
        strategy.exit("Venda", from_entry = "Compra", stop = low) // Saida da entrada com stop no fundo anterior
    else
        strategy.cancel("Venda") //Cancela a ordem se o proximo candle não "pegar"


```

> Detail

https://www.fmz.com/strategy/429463

> Last Modified

2023-10-17 13:51:15
