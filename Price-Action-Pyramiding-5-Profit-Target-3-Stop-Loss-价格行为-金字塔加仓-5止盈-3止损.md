
> Name

Price-Action-Pyramiding-5-Profit-Target-3-Stop-Loss-价格行为-金字塔加仓-5止盈-3止损

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/bd597cacbaa34e943c.png)


#### Overview
This strategy uses price action and pyramiding methods to open a position when the price drops by 5%, and then continues to add positions through pyramiding until the price rises by 5% to close the position. The main advantage of this strategy is that it enters the market early in the trend formation and increases profit opportunities through pyramiding. At the same time, the strategy also sets a 3% stop loss to control risk.

#### Strategy Principle
1. When the price drops by 5%, open a long position.
2. Within the next 5 candles, if the price continues to fall, continue to add positions, up to 4 times.
3. When the price rises by 5%, close all positions to realize profits.
4. If the price hits the 3% stop loss during the pyramiding process, close all positions and stop loss exit.

#### Strategy Advantages
1. Enters the market early in the trend formation, capturing the opportunity of price reversal.
2. Increases profit opportunities through pyramiding.
3. Sets a stop loss to control risk.
4. Runs 24 hours without manual intervention.

#### Strategy Risks
1. If the price drops rapidly during the pyramiding process, it may trigger a stop loss, resulting in losses.
2. If the price fluctuates significantly before reaching the take profit level, it may reduce profits.
3. If the market experiences severe volatility or black swan events, the strategy may incur significant losses.

#### Strategy Optimization Directions
1. Optimize the proportion of position adding and closing, such as considering adding positions when the price drops by 3% and closing positions when the price rises by 7%. This can increase profit opportunities while controlling risk.
2. Introduce more technical indicators, such as RSI and MACD, to assist in judging the trend and timing of opening and closing positions.
3. Set different parameters for different market environments and varieties to adapt to different market characteristics.

#### Summary
This strategy uses price action and pyramiding methods to enter the market early in the trend formation and increases profit opportunities through multiple position adding. At the same time, the strategy also sets a stop loss to control risk. Although the strategy may face some risks, through further optimization, such as adjusting the proportion of position adding and closing, introducing more technical indicators, etc., the stability and profitability of the strategy can be improved.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|1000|Investicijų suma|
|v_input_2|3|Nuostolio procentas (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-04-24 00:00:00
end: 2024-04-29 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("G Strategija su piramidavimu", overlay=true)


// Vartotojo įvestis investicijų sumai
investment_amount = input(1000.0, title="Investicijų suma")


// Nustatyti nuostolių ir pelno pasiekimo procentus
lossPercentage = input(3, title="Nuostolio procentas (%)") / 100


// Kintamasis saugoti atidarytoms pozicijoms
var int[] entryIndexes = array.new_int(0)
var float[] entryPrices = array.new_float(0)


// Kintamasis, nustatantis, ar turėtume atidaryti naują poziciją
var bool should_buy = false
var int open_candle_count = 0
var int positionCounter = 1 // Pozicijos skaitiklis


// Įėjimo logika (pirkti, kai kaina krenta)
if (hour >= 0 and hour <= 23) // Tikrina, ar yra 24 valandų
    should_buy := false
    for i = 1 to 5
        should_buy := should_buy or (close < close[i] * (1 - lossPercentage))
    if (should_buy and open_candle_count >= 5)
        strategy.entry("Pirkti_" + str.tostring(positionCounter), strategy.long, qty=investment_amount / close)
        array.push(entryIndexes, bar_index)  // Įrašyti atidarymo laiko indeksą
        array.push(entryPrices, close) // Įrašyti atidarymo kainą
        open_candle_count := 0
        positionCounter := positionCounter + 1 // Atnaujinti pozicijos skaitiklį
    else
        open_candle_count := open_candle_count + 1


// Išėjimo logika (uždaryti, kai pasiekiamas pelno lygis)
for i = 0 to array.size(entryIndexes) - 1
    var float takeProfitPrice = na // Nustatyti pradinę reikšmę "na"
    if array.size(entryPrices) > i and array.size(entryPrices) > 0
        takeProfitPrice := array.get(entryPrices, i) * 1.05 // Skaičiuojamas pelno pasiekimo lygis: 5% aukščiau atidarymo kainos
    strategy.exit("TakeProfit_" + str.tostring(i+1), "Pirkti_" + str.tostring(i+1), limit=takeProfitPrice) // Pridėti pelno pasiekimo lygį kaip išėjimo lygį
```

> Detail

https://www.fmz.com/strategy/449949

> Last Modified

2024-04-30 16:20:28
