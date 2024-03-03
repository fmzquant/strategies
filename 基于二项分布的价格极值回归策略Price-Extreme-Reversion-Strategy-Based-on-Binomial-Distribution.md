
> Name

基于二项分布的价格极值回归策略Price-Extreme-Reversion-Strategy-Based-on-Binomial-Distribution

> Author

ChaoZhang

> Strategy Description



[trans]
本策略名称为“基于二项分布的价格极值回归策略”。该策略利用二项分布函数判断价格出现反转的概率,并设定双EMA均线策略产生交易信号。

策略的计算逻辑如下:

1. 计算最近20根K线中收盘价上涨的数量,并统计过去100根K线中上涨周期所占比例p。

2. 将上涨周期数量和概率p带入二项分布函数,计算出cumulative distribution function(CDF)。

3. 对CDF分别计算10日和20日的EMA均线。当快线上穿慢线时,认为价格极值回归的概率较大,产生买入信号。

4. 当快线下穿慢线时,价格可能处于短期高点,此时产生卖出信号。

该策略的优点是通过概率方法判断价格的极值回归时机。但参数需要根据市场调整,避免产生过多假信号。

总体来说,统计方法有助于客观发现价格行为规律。但最终仍需要交易者对市场保持敏锐判断力,妥善使用技术指标作为辅助工具。



||



This strategy is named “Price Extreme Reversion Strategy Based on Binomial Distribution”. It uses the binomial distribution function to estimate the probability of price reversals and sets a dual-EMA system to generate trade signals.

The logic is:

1. Calculate the number of up close bars in the recent 20 bars, and the percentage p of up periods in the past 100 bars.

2. Plug the up period counts and probability p into the binomial distribution function to compute the cumulative distribution function (CDF).

3. Apply 10-day and 20-day EMAs to the CDF. When the fast EMA crosses above the slow EMA, it signals a high probability of price extreme reversion, generating buy signals. 

4. When the fast EMA crosses below the slow EMA, prices may be peaking in the short run, producing sell signals here.

The advantage of this strategy is estimating price extreme reversion timing through probability methods. But parameters need market-adjusted optimization to avoid excessive false signals.

In conclusion, statistical techniques help uncover price behavior patterns objectively. But ultimately, traders still need keen market judgment to use technical indicators as supplementary tools.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-06 00:00:00
end: 2023-05-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © pieroliviermarquis

//@version=4
strategy("Binomial Strategy", overlay=false, default_qty_type= strategy.percent_of_equity, default_qty_value= 100, slippage=1, initial_capital= 10000, calc_on_every_tick=true)


factorial(length) =>
    n = 1
    if length != 0
        for i = 1 to length
            n := n * i
    n


binomial_pdf(success, trials, p) =>
    q = 1-p
    coef = factorial(trials) / (factorial(trials-success) * factorial(success))
    pdf = coef * pow(p, success) * pow(q, trials-success)
        
        
binomial_cdf(success, trials, p) =>
    q = 1-p
    cdf = 0.0
    for i = 0 to success
        cdf := cdf + binomial_pdf(i, trials, p)
        

up = close[0] > close[1] ? 1 : 0


//long-term probabilities
lt_lookback = 100
lt_up_bars = sum(up, lt_lookback)
prob = lt_up_bars/lt_lookback


//lookback for cdf
lookback = 20
up_bars = sum(up, lookback)
cdf = binomial_cdf(up_bars, lookback, prob)


//ema on cdf
ema1 = ema(cdf, 10)
ema2 = ema(cdf, 20)


plot(cdf*100)
plot(ema1*100, color=color.red)
plot(ema2*100, color=color.orange)


buy = ema1 > ema2
sell = ema1 < ema2


//////////////////////Bar Colors//////////////////

var color buy_or_sell = na

if buy == true
    buy_or_sell := #3BB3E4
else if sell == true
    buy_or_sell := #FF006E
    
barcolor(buy_or_sell)

///////////////////////////Orders////////////////

if buy
    strategy.entry("Long", strategy.long, comment="")

if sell
    strategy.close("Long", comment="Sell")

```

> Detail

https://www.fmz.com/strategy/426601

> Last Modified

2023-09-13 16:47:22
