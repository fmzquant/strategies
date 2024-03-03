
> Name

随机入场出场策略Random-Entry-and-Exit-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

随机入场出场策略是一种通过在交易过程中随机决定入场和出场时间的策略。该策略利用随机数生成器来模拟入场和出场的决策。

## 策略原理

该策略的核心逻辑是:

1. 每根K线都会随机生成一个0到100之间的数字。

2. 如果随机数小于设定的入场概率阈值,则开仓入场。默认入场概率为10%。

3. 如果随机数小于设定的出场概率阈值,则平仓出场。默认出场概率为3%。

4. 可以选择三种方向:只做多、只做空、随机方向。默认为只做多。

5. 也可以设置交易开始的年份,避开特大行情剧变的年份。

通过设置不同的入场概率、出场概率和方向参数,可以模拟不同类型交易者的随机交易行为,考察在随机交易下不同市场的表现。

## 优势分析

- 模拟真实交易者随机决策的行为,接近真实市场情况。

- 可以测试在随机交易下不同市场的表现差异。

- 可以找到哪些市场即使随机交易也能获得正收益。

- 可以将随机交易作为基准策略,用于检验其他策略的优势。

## 风险分析

- 无法利用市场趋势获利,无法确定入场时机。

- 随机出场可能在不利位置止损。

- 在具有明确方向性的市场表现不佳。

- 需优化入场出场概率,以免过于频繁或保仓时间过短。

- 可考虑加入止损机制,避免亏损扩大。

## 优化方向 

- 调整入场出场概率,找到适合不同市场的组合。

- 加入止损策略,控制单笔亏损。

- 优化仓位管理,降低单笔风险。

- 在趋势明确时,可改为趋势跟踪策略。

- 结合统计学分析寻找哪些市场随机交易效果较好。

## 总结

随机入场出场策略通过模拟交易者的随机决策,测试了不同市场在随机交易下的表现。该策略原理简单,可以作为基准来检验其他策略的效果。但其本身存在无法捕捉趋势,止损管理不完善等问题。我们可以通过调整参数组合、加入止损、优化仓位管理等方式来改进该策略,使其成为具有实际价值的量化交易策略。

|| 

## Overview

The random entry and exit strategy is a strategy that randomly decides entry and exit timing during trading. It utilizes a random number generator to simulate entry and exit decisions. 

## Strategy Logic

The core logic of this strategy is:

1. Every candlestick will randomly generate a number between 0 to 100. 

2. If the random number is lower than the set entry threshold, a position will be opened. The default entry probability is 10%.

3. If the random number is lower than the set exit threshold, the position will be closed. The default exit probability is 3%.

4. There are three direction choices: long only, short only, or random direction. The default is long only.

5. The start year can also be set to avoid years with huge market swings.

By setting different combinations of entry probability, exit probability and direction, we can simulate random trading behaviors of different types of traders and examine the performance of random trading in different markets.

## Advantage Analysis 

- Simulates real trader's random decision making, close to real market situations.

- Can test the performance differences of random trading in various markets.  

- Can find which markets can generate positive returns even with random trading.

- Can use random trading as a benchmark strategy to test advantages of other strategies.

## Risk Analysis

- Unable to profit from market trends, unable to determine optimal entry timing.

- Random exit may stop loss at unfavorable levels. 

- Performs poorly in markets with a clear directional bias.

- Need to optimize entry/exit probability to avoid over-trading or insufficient holding period. 

- Consider adding stop loss to avoid enlarged losses.

## Optimization Directions

- Adjust entry/exit probability to find suitable combinations for different markets.

- Add stop loss strategies to control single trade loss.

- Optimize position sizing to lower single trade risk.  

- Switch to trend following strategies when trend is clear.

- Use statistical analysis to find which markets favor random trading.

## Summary 

The random entry and exit strategy tests different markets' performance under simulated random trader decisions. The strategy logic is simple and can serve as a benchmark to examine other strategies. However, it has its flaws like failing to capture trends and lack of proper stop loss management. We can improve the strategy by adjusting parameter combinations, adding stops, optimizing position sizing etc, to turn it into a viable quant trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Direction: Long Only|Short Only|Random|
|v_input_2|10|Percent Chance to Enter|
|v_input_3|3|Percent Chance to Exit|
|v_input_4|2020|Start Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-04 00:00:00
end: 2023-10-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
args: [["v_input_1",2]]
*/

//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © gregoirejohnb
//
// "tHe MaRkEtS aRe RaNdOm", say moron academics.
//
// The purpose of this study is to show that most markets are NOT random! Most markets show a clear bias where we can make such easy money, that a random number generator can do it.
// 
// === HOW THE INDICATOR WORKS ===
// 
// -The study will randomly enter the market
// -The study will randomly exit the market if in a trade
// -You can choose a Long Only, Short Only, or Bidirectional strategy
//
// === DEFAULT VALUES AND THEIR LOGIC ===
// 
// Percent Chance to Enter Per Bar: 10%
// Percent Chance to Exit Per Bar: 1%
// Direction: Long Only
// Commission: 0
//
// Each bar has a 10% chance to enter the market. Each bar has a 1% to exit the market [if in a trade]. It will only enter long.
//
// I included zero commission for simplication. It's a good exercise to include a commission/slippage to see just how much trading fees take from you.
// 
// === TIPS ===
//
// -Increasing "Percent Chance to Exit" will shorten the time in a trade. You can see the "Avg # Bars In Trade" go down as you increase. If "Percent Chance to Exit" is too high, the study won't be in the market long enough to catch any movement, possibly exiting on the same bar most of the time.
// -If you're getting the red screen, that means the strategy lost so much money it went broke. Try reducing the percent equity on the Properties tab.
// -Switch the start year to avoid black swan events like the covid drop in 2020.
// -
// === FINDINGS ===
//
// Most markets lose money with a "Random" direction strategy.
// Most markets lose ALL money with a "Short Only" strategy.
// Most markets make money with a "Long Only" strategy.
// 
// Try this strategy on: Bitcoin (BTCUSD) and the NASDAQ (QQQ).
//
// There are two popular memes right now: "Bitcoin to the moon" and "Stocks only go up". Both are seemingly true. Bitcoin was the best performing asset of the 2010's, gaining several billion percent in gains. The stock market is on a 100 year long uptrend. Why? BECAUSE FIAT CURRENCIES ALWAYS GO DOWN! This is inflation. If we measure the market in terms of others assets instead of fiat, the Long Only strategy doesn't work anymore.
// Try this strategy on: Bitcoin/GLD (BTCUSD/GLD), the Eurodollar (EURUSD), and the S&P 500 measured in gold (SPY/GLD).
// 
// Bitcoin measured in gold (BTCUSD/GLD) still works with a Long Only strategy because Bitcoin increased in value over both USD and gold.
// The Eurodollar (EURUSD) generally loses money no matter what, especially if you add any commission. This makes sense as they are both fiat currencies with similar inflation schedules.
// Gold and the S&P 500 have gained roughly the same amount since ~2000. Some years will show better results for a long strategy, while others will favor a short strategy. Now look at just SPY or GLD (which are both measured in USD by default!) and you'll see the same trend again: a Long Only strategy crushes even when entering and exiting randomly.
//
// === "JUST TELL ME WHAT TO DO, YOU NERD!" ===
//
// Bulls always win and Bears always lose because fiat currencies go to zero.
//
strategy(title="Random Entries Work", shorttitle="REW", overlay=true, pyramiding=0, default_qty_type=strategy.percent_of_equity, default_qty_value=100, currency=currency.USD,commission_type=strategy.commission.percent,commission_value=0)

// === GENERAL INPUTS ===
strategy = input(defval="Long Only",title="Direction",options=["Long Only", "Short Only", "Random"])
enter_frequency = input(defval=10,minval=1,maxval=100,title="Percent Chance to Enter")
exit_frequency = input(defval=3, minval=0,maxval=100,title="Percent Chance to Exit",tooltip="This should be much lower than Percent Chance to Enter. Higher values decrease time in market. Lower values increase time in market.")
start_year = input(defval=2020, title="Start Year")


// === LOGIC ===
r = random(0,100)
enter = enter_frequency > r[0]
exit = exit_frequency > r[0]
direction = random(0,100) >= 50

// === STRATEGY - LONG POSITION EXECUTION ===
enterLong() =>
    strategy.opentrades == 0 and enter and (strategy == "Long Only" or (strategy == "Random") and direction) and 
       time > timestamp(start_year, 01, 01, 01, 01)
exitLong() =>
    exit
strategy.entry(id="Long", long=strategy.long, when=enterLong())
strategy.close(id="Long", when=exitLong())
// === STRATEGY - SHORT POSITION EXECUTION ===
enterShort() =>
    strategy.opentrades == 0 and enter and (strategy == "Short Only" or (strategy == "Random" and not direction)) and 
       time > timestamp(start_year, 01, 01, 01, 01)
exitShort() =>
    exit
strategy.entry(id="Short", long=strategy.short, when=enterShort())
strategy.close(id="Short", when=exitShort())
```

> Detail

https://www.fmz.com/strategy/428974

> Last Modified

2023-10-11 15:17:28
