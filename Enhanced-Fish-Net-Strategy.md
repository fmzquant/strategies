
> Name

Enhanced-Fish-Net-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]
改良型渔网策略

该策略对经典的渔网策略进行了改进,加入了买卖信号阈值、移动止损等功能,形成较为完整的趋势追踪体系。

渔网策略通过计算价格的力度中心来判断市场趋势,力度中心反映了价格和成交量的关系。当力度中心上升时表示多头力量增强,下降时表示空头力量增强,因此可以据此产生交易信号。

计算力度中心的关键在于价格与时间的关系。简单来说,最近发生的价格变动影响趋势判断的权重更大,久远的价格变动权重更小。因此计算时,乘以一个随时间衰减的权重。这样高位发生的交易对总体判断影响更大。

但原始的渔网策略只根据力度中心曲线的方向判断多空,很容易在横盘时被套牢。这次改进加入了确定的买卖信号阈值,只有在力度中心超过一定幅度时才发出信号,这样可以过滤掉许多噪音信号。

此外,改进版本实现了移动止损和固定止损相结合的出场机制。进入趋势后,移动止损可以随行情的推移不断调整,实现流动的风险控制。而固定止损则可以更加可靠地防止突发事件造成的损失。

当然,力度中心指标对复杂行情的判断力较弱,移动止损在设定不当时也可能被突破,这需要交易者保持警惕,适时优化参数。但总的来说,这套改进型渔网策略机制更加完备,可以产生较好的稳定收益。

||Enhanced Fish Net Strategy 

This strategy improves on the classic Fish Net strategy by adding buy/sell signal thresholds and trailing stop loss to form a more complete trend following system.

The Fish Net strategy judges market trends by calculating the price centroid force, which reflects the relationship between price and volume. Rising centroid force indicates strengthening bullish power, while falling represents bearish strength, so trading signals can be generated accordingly. 

The key in calculating centroid force lies in the relationship between price and time. In simple terms, recent price changes have greater weights in influencing the overall trend judgment, while older prices have smaller weights. So when calculating, a time-decaying weight is multiplied. This makes transactions happening at higher levels impact the total judgment more.

But the original Fish Net only judged long/short based on the direction of the centroid curve, easily getting caught in sideways movements. This improved version adds defined buy/sell signal thresholds, only generating signals when the centroid force exceeds certain magnitude, filtering out much noise.

In addition, the improved version implements a combined mechanism of trailing stop loss and fixed stop loss for exits. After entering a trend, the trailing stop loss can keep adjusting along with price action, achieving dynamic risk control. The fixed stop loss can more reliably prevent losses from sudden events.

Of course, the centroid force indicator has limited capabilities in complex markets, and trailing stops can also be penetrated if improperly set, so traders need to stay alert and optimize parameters in a timely manner. But overall, the enhanced mechanism of this improved Fish Net strategy is more comprehensive, and can generate decent steady returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_source_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_1|20|Period|
|v_input_2|0|Use Transform?: Inphase-Quadrature|Hilbert|False|
|v_input_3|108|Min. Period|
|v_input_4|-2.41|Buy Treshold (-)|
|v_input_5|2.43|Sell Treshold (+)|
|v_input_6|300|SL Activation|
|v_input_7|true|SL Trigger|
|v_input_8|150|TP Activation|
|v_input_9|50|TP Trigger|
|v_input_10|true|From Month|
|v_input_11|true|From Day|
|v_input_12|2019|From Year|
|v_input_13|true|To Month|
|v_input_14|true|To Day|
|v_input_15|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-04 00:00:00
end: 2023-09-11 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// Copyright nilux: https://www.tradingview.com/u/nilux/
// Based on the original of dasanc: https://www.tradingview.com/u/dasanc/

strategy("FSCG-TSSL", "FSCG-TSSL Mod Backtest", default_qty_type = strategy.percent_of_equity, default_qty_value = 100, initial_capital = 100000, slippage = 5)
Price = input.source(close, "Source")
Length = input(20,"Period")
transform = input("Inphase-Quadrature","Use Transform?",options=["Hilbert","Inphase-Quadrature","False"])
min = input(108,"Min. Period")
buyTreshold = input(-2.41, title = "Buy Treshold (-)", type = float, defval=-2.0, minval = -2.50, maxval = -0.01, step = 0.01)
sellTreshold = input(2.43, title = "Sell Treshold (+)", type = float, defval=2.0, minval = 0.01, maxval = 2.50, step = 0.01)

// === TSSL ===
fixedSL = input(title="SL Activation", defval=300)
trailSL = input(title="SL Trigger", defval=1)
fixedTP = input(title="TP Activation", defval=150)
trailTP = input(title="TP Trigger", defval=50)

// === BACKTEST RANGE ===
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2019, title = "From Year", minval = 2015)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2015)
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)
window()  => time >= start and time <= finish ? true : false

getIQ(src,min,max) =>
    PI = 3.14159265359
    P = src - src[7]
    lenIQ = 0.0
    lenC = 0.0
    imult = 0.635
    qmult = 0.338
    inphase = 0.0
    quadrature = 0.0
    re = 0.0
    im = 0.0
    deltaIQ = 0.0
    instIQ = 0.0
    V = 0.0
    
    inphase := 1.25*(P[4] - imult*P[2]) + imult*nz(inphase[3])
    quadrature := P[2] - qmult*P + qmult*nz(quadrature[2])
    re := 0.2*(inphase*inphase[1] + quadrature*quadrature[1]) + 0.8*nz(re[1])
    im := 0.2*(inphase*quadrature[1] - inphase[1]*quadrature) + 0.8*nz(im[1])
    if (re!= 0.0)
        deltaIQ := atan(im/re)
    for i=0 to max
        V := V + deltaIQ[i]
        if (V > 2*PI and instIQ == 0.0)
            instIQ := i
    if (instIQ == 0.0)
        instIQ := nz(instIQ[1])
    lenIQ := 0.25*instIQ + 0.75*nz(lenIQ[1],1)
    length = lenIQ<min ? min : lenIQ


getHT(src) =>
    Price = src
    Imult = .635
    Qmult = .338
    PI = 3.14159
    InPhase = 0.0
    Quadrature = 0.0
    Phase = 0.0
    DeltaPhase = 0.0
    InstPeriod = 0.0
    Period = 0.0
    Value4 = 0.0
    
    if(n > 5)
        //Detrend Price
        Value3 = Price - Price[7]
        //Compute InPhase and Quadrature components
        InPhase := 1.25*(Value3[4] - Imult*Value3[2]) + Imult*nz(InPhase[3])
        Quadrature := Value3[2] - Qmult*Value3 + Qmult*nz(Quadrature[2])
        //Use ArcTangent to compute the current phase
        if(abs(InPhase + InPhase[1]) > 0)
            Phase := 180/PI * atan(abs((Quadrature + Quadrature[1]) / (InPhase + InPhase[1])))
        //Resolve the ArcTangent ambiguity
        if(InPhase < 0 and Quadrature > 0)
            Phase := 180 - Phase
        if(InPhase < 0 and Quadrature < 0)
            Phase := 180 + Phase
        if(InPhase > 0 and Quadrature < 0)
            Phase := 360 - Phase
        //Compute a differential phase, resolve phase wraparound, and limit delta phase errors
        DeltaPhase := Phase[1] - Phase
        if(Phase[1] < 90 and Phase > 270)
            DeltaPhase := 360 + Phase[1] - Phase
        if(DeltaPhase < 1)
            DeltaPhase := 1
        if(DeltaPhase > 60)
            DeltaPhase := 60
        //Sum DeltaPhases to reach 360 degrees. The sum is the instantaneous period.
        for i = 0 to 50
            Value4 := Value4 + DeltaPhase[i]
            if(Value4 > 360 and InstPeriod == 0)
                InstPeriod := i
        //Resolve Instantaneous Period errors and smooth
        if(InstPeriod == 0)
            InstPeriod = nz(InstPeriod[1])
        Period := .25*(InstPeriod) + .75*Period[1]
    Period
    
//Get highest val in period
getHighest(src, len)=>
    H = src[len]
    for i=0 to len
        if src[i]>H
            H := src[i]
    H
    
//Get lowest val in period
getLowest(src, len)=>
    L = src[len]
    for i=0 to len
        if src[i]<L
            L := src[i]
    L

if transform == "Hilbert"
    Length := round(getHT(Price)/2)
if transform == "Inphase-Quadrature"
    Length := round(getIQ(Price,min,50)/2)
if Length<min
    Length := min
    

Num = 0.0
Denom = 0.0
CG = 0.0
MaxCG = 0.0
MinCG = 0.0
Value1 = 0.0
Value2 = 0.0
Value3 = 0.0
for i = 0 to Length - 1
    Num := Num + (1 + i)*(Price[i])
    Denom := Denom + (Price[i])
if(Denom != 0)
    CG := -Num/Denom + (Length + 1) / 2
MaxCG := getHighest(CG, Length)
MinCG := getLowest(CG, Length)
if(MaxCG != MinCG)
    Value1 := (CG - MinCG) / (MaxCG - MinCG)
Value2 := (4*Value1 + 3*Value1[1] + 2*Value1[2] + Value1[3]) / 10
Value3 := .5*log((1+1.98*(Value2-.5))/(1-1.98*(Value2-.5)))

plot(Value3, "CG",orange, linewidth=2)
plot(Value3[1], "Trigger",green, linewidth=2)
hline(0,color=color(black,60))
hline(2,linestyle=hline.style_solid,color=color(black,70))
hline(-2,linestyle=hline.style_solid,color=color(black,70))

sell = crossover(Value3[1],Value3) and Value3 > sellTreshold
buy = crossunder(Value3[1],Value3) and Value3 < buyTreshold

strategy.entry("Long", strategy.long, when= buy and window())
strategy.exit("Exit", loss=fixedSL, trail_offset=trailTP, trail_points=fixedTP)
strategy.exit("Exit", when= sell)

strategy.entry("Short", strategy.short, when= sell and window())
strategy.exit("Exit", loss=fixedSL, trail_offset=trailTP, trail_points=fixedTP)
strategy.exit("Exit", when= buy)
```

> Detail

https://www.fmz.com/strategy/426455

> Last Modified

2023-09-12 10:52:10
