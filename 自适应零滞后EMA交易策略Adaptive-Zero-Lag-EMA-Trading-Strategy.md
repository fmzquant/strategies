
> Name

自适应零滞后EMA交易策略Adaptive-Zero-Lag-EMA-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略利用自适应零滞后EMA指标进行趋势判断和交易信号产生。该EMA指标可动态调整参数,有效消除滞后问题。属于典型的趋势跟踪交易策略。

策略原理:

1. 计算自适应零滞后EMA指标,包含余弦法和I-Q法两种自适应算法。

2. EMA为正常EMA指标,EC为自适应零滞后EMA。

3. 当EC上穿EMA时做多,EC下穿EMA时做空。

4. 计算误差曲线,设定阈值过滤假信号。

5. 设置固定止损止盈点数,以锁定收益和控制风险。

该策略的优势:

1. 自适应EMA可有效减小指标滞后。

2. 阈值过滤提高信号质量,避免假突破。

3. 止损止盈方式简单实用,易于操作。

该策略的风险:

1. 自适应EMA参数不稳定,存在失效的可能。

2. 固定止损止盈难以适应市场的变化。

3. 无法限制单笔亏损大小,存在较大损失风险。

总之,该策略采用自适应EMA指标进行趋势跟踪,可在一定程度上减小滞后问题,但需要关注参数稳定性,并配合优化的止损止盈机制以控制风险。

||

This strategy uses the Adaptive Zero Lag EMA indicator for trend determination and trade signals. The adaptive EMA dynamically tunes parameters to eliminate lag. It aims for trend following.

Strategy Logic: 

1. Calculate Adaptive Zero Lag EMA with cosine and I-Q adaptive algorithms.

2. EMA is normal EMA, EC is adaptive zero lag EMA.

3. Go long when EC crosses above EMA, and short when crossing below.

4. Compute error curve and set threshold to filter false signals.

5. Use fixed points for stop loss and take profit for risk control.

Advantages:

1. Adaptive EMA significantly reduces indicator lag. 

2. Threshold filtering improves signal quality and avoids false breakouts.

3. Simple stops and targets are easy to implement.

Risks: 

1. Adaptive EMA parameters can become unstable.

2. Fixed stops/targets fail to adapt to changing market conditions. 

3. No limit on loss size, risks large losing trades.

In summary, this strategy uses adaptive EMA for trend following, reducing lag to some extent. But parameter stability and optimized stops are needed to control risks.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|0|Security Type: Forex|Metal Spot|Cryptocurrency|Custom|
|v_input_3|true|Custom # of Contracts|
|v_input_4|100|Max Lots|
|v_input_5|20|Period|
|v_input_6|0|Adaptive Method: Cos IFM|Off|I-Q IFM|Average|
|v_input_7|8|Gain Limit|
|v_input_8|0.05|Threshold|
|v_input_9|70|SL Points|
|v_input_10|10|TP Points|
|v_input_11|0.01|Risk|
|v_input_12|true|From Month|
|v_input_13|true|From Day|
|v_input_14|2019|From Year|
|v_input_15|true|To Month|
|v_input_16|true|To Day|
|v_input_17|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-05 00:00:00
end: 2023-09-12 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="Adaptive Zero Lag EMA v2 (w/ Backtest Date Range)", shorttitle="AZLEMA", overlay = true,  commission_type=strategy.commission.cash_per_contract, slippage = 5, pyramiding=1, calc_on_every_tick=true)

src = input(title="Source",  defval=close)
secType = input(title="Security Type", options=["Forex", "Metal Spot", "Cryptocurrency","Custom"], defval="Forex")
contracts = input(title="Custom # of Contracts", defval=1, step=1)
limit = input(title="Max Lots",  defval=100)
Period = input(title="Period",  defval = 20)
adaptive = input(title="Adaptive Method", options=["Off", "Cos IFM", "I-Q IFM", "Average"], defval="Cos IFM")
GainLimit = input(title="Gain Limit",  defval = 8)
Threshold = input(title="Threshold",  defval=0.05, step=0.01)
fixedSL = input(title="SL Points", defval=70)
fixedTP = input(title="TP Points", defval=10)
risk = input(title='Risk', defval=0.01, step=0.01)

// === INPUT BACKTEST RANGE ===
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2019, title = "From Year", minval = 2015)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2015)

// === FUNCTION EXAMPLE ===
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => true

range = 50 //input(title="Max Period",  defval=60, minval=8, maxval=100)

PI = 3.14159265359
lenIQ = 0.0
lenC = 0.0

//##############################################################################
//I-Q IFM
//##############################################################################
if(adaptive=="I-Q IFM" or adaptive=="Average")
    imult = 0.635
    qmult = 0.338
    inphase = 0.0
    quadrature = 0.0
    re = 0.0
    im = 0.0
    deltaIQ = 0.0
    instIQ = 0.0
    V = 0.0
    
    P = src - src[7]
    inphase := 1.25*(P[4] - imult*P[2]) + imult*nz(inphase[3])
    quadrature := P[2] - qmult*P + qmult*nz(quadrature[2])
    re := 0.2*(inphase*inphase[1] + quadrature*quadrature[1]) + 0.8*nz(re[1])
    im := 0.2*(inphase*quadrature[1] - inphase[1]*quadrature) + 0.8*nz(im[1])
    if (re!= 0.0)
        deltaIQ := atan(im/re)
    for i=0 to range
        V := V + deltaIQ[i]
        if (V > 2*PI and instIQ == 0.0)
            instIQ := i
    if (instIQ == 0.0)
        instIQ := nz(instIQ[1])
    lenIQ := 0.25*instIQ + 0.75*nz(lenIQ[1])

//##############################################################################
//COSINE IFM
//##############################################################################
if(adaptive == "Cos IFM" or adaptive == "Average")
    s2 = 0.0
    s3 = 0.0
    deltaC = 0.0
    instC = 0.0
    v1 = 0.0
    v2 = 0.0
    v4 = 0.0
    
    v1 := src - src[7]
    s2 := 0.2*(v1[1] + v1)*(v1[1] + v1) + 0.8*nz(s2[1])
    s3 := 0.2*(v1[1] - v1)*(v1[1] - v1) + 0.8*nz(s3[1])
    if (s2 != 0)
        v2 := sqrt(s3/s2)
    if (s3 != 0)
        deltaC := 2*atan(v2)
    for i = 0 to range
        v4 := v4 + deltaC[i]
        if (v4 > 2*PI and instC == 0.0)
            instC := i - 1
    if (instC == 0.0)
        instC := instC[1]
    lenC := 0.25*instC + 0.75*nz(lenC[1])

if (adaptive == "Cos IFM")
    Period := round(lenC)
if (adaptive == "I-Q IFM")
    Period := round(lenIQ)
if (adaptive == "Average")
    Period := round((lenC + lenIQ)/2)

//##############################################################################
//ZERO LAG EXPONENTIAL MOVING AVERAGE
//##############################################################################
LeastError = 1000000.0
EC = 0.0
Gain = 0.0
EMA = 0.0
Error = 0.0
BestGain = 0.0

alpha =2/(Period + 1)
EMA := alpha*src + (1-alpha)*nz(EMA[1])

for i = -GainLimit to GainLimit
    Gain := i/10
    EC := alpha*(EMA + Gain*(src - nz(EC[1]))) + (1 - alpha)*nz(EC[1])
    Error := src - EC
    if(abs(Error)<LeastError)
        LeastError := abs(Error)
        BestGain := Gain

EC := alpha*(EMA + BestGain*(src - nz(EC[1]))) + (1-alpha)*nz(EC[1])

plot(EC, title="EC", color=orange, linewidth=2)
plot(EMA, title="EMA", color=red, linewidth=2)

//##############################################################################
//Trade Logic & Risk Management
//##############################################################################
buy = crossover(EC,EMA) and 100*LeastError/src > Threshold
sell = crossunder(EC,EMA) and 100*LeastError/src > Threshold

secScaler = secType == "Forex" ? 100000 : secType == "Metal Spot" ? 100 : secType == "Cryptocurrency" ? 10000 : secType == "Custom" ? contracts : 0
strategy.initial_capital = 50000
balance = strategy.initial_capital + strategy.netprofit
if (time>timestamp(2016, 1, 1 , 0, 0) and balance > 0)
    //LONG
    lots = ((risk * balance)/fixedSL)*secScaler
    lots := lots > limit * secScaler ? limit * secScaler : lots
    strategy.entry("BUY", strategy.long,  oca_name="BUY",  when=buy and window())
    strategy.exit("B.Exit", "BUY", qty_percent = 100, loss=fixedSL, trail_offset=15, trail_points=fixedTP)
    //SHORT
    strategy.entry("SELL", strategy.short,  oca_name="SELL",when=sell and window())
    strategy.exit("S.Exit", "SELL", qty_percent = 100, loss=fixedSL, trail_offset=15, trail_points=fixedTP)

```

> Detail

https://www.fmz.com/strategy/426573

> Last Modified

2023-09-13 14:22:55
