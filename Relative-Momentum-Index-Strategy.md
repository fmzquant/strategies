
> Name

Relative-Momentum-Index-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12591b9386780ef286c.png)



### Overview

The Relative Momentum Index (RMI) strategy is an improved version based on the momentum index. It calculates price momentum over a period to determine if the market is overbought or oversold, in order to capture reversal opportunities.

### Strategy Logic

The RMI calculation formula is as follows:

```
xMom = xPrice - xPrice[Length]  // Price change over Length periods
xMU = If xMom >= 0: previous xMU minus xMU/Length plus xMom; else: previous xMU
xMD = If xMom <= 0: previous xMD minus xMD/Length plus absolute value of xMom; else: 0 
RM = xMU / xMD
RMI = 100 * (RM / (1 + RM))
```

First calculate the price change xMom over Length periods. If xMom>=0, meaning price rises, accumulate it into xMU; if xMom<0, meaning price drops, accumulate its absolute value into xMD. RM is the ratio between xMU and xMD, representing the momentum of ups and downs. RMI normalizes RM into the range of 0-100.

When RMI is higher than the threshold SellZone, the market is overbought, go short. When RMI is lower than BuyZone, the market is oversold, go long.

### Advantages

- Compared to RSI, RMI is more sensitive and can capture reversal opportunities earlier.
- RMI measures the momentum of ups and downs, less affected by consolidation. 
- Based on momentum, RMI can better determine overbought/oversold status.

### Risks

- Like other reversal strategies, RMI has the risk of being stopped out by strong trends. Long signals may get breached.
- RMI parameters need to be optimized for different products, otherwise the results may be poor.
- Overbought/oversold thresholds need to be set reasonably, otherwise too many false signals may occur.

Risks can be reduced by widening stop loss, optimizing parameters, combining with trend strategies etc.

### Improvement

RMI strategy can be improved from the following aspects:

- Optimize Length parameter to maximize return.
- Optimize overbought/oversold thresholds to reduce false signals.  
- Add stop loss to control single loss.
- Combine with trend following or moving average strategies to increase winning rate.
- Select appropriate trading sessions based on product characteristics to improve stability.

### Conclusion

RMI strategy captures short-term pullback opportunities by measuring price momentum change. Compared to RSI, RMI is more sensitive and robust to consolidation. But risks of being stopped out exist. Parameters need to be optimized and combined with trend strategies to maximize performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Length|
|v_input_2|40|BuyZone|
|v_input_3|70|SellZone|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-02 00:00:00
end: 2023-10-21 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 19/10/2017
// The Relative Momentum Index (RMI) was developed by Roger Altman. Impressed 
// with the Relative Strength Index's sensitivity to the number of look-back 
// periods, yet frustrated with it's inconsistent oscillation between defined 
// overbought and oversold levels, Mr. Altman added a momentum component to the RSI.
// As mentioned, the RMI is a variation of the RSI indicator. Instead of counting 
// up and down days from close to close as the RSI does, the RMI counts up and down 
// days from the close relative to the close x-days ago where x is not necessarily 
// 1 as required by the RSI). So as the name of the indicator reflects, "momentum" is 
// substituted for "strength".   
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Relative Momentum Index", shorttitle="RMI")
xPrice = close
Length = input(20, minval=1)
BuyZone = input(40, minval=1)
SellZone = input(70, minval=1)
reverse = input(false, title="Trade reverse")
// hline(0, color=gray, linestyle=dashed)
// hline(SellZone, color=red, linestyle=line)
// hline(BuyZone, color=green, linestyle=line)
xMom = xPrice - xPrice[Length]
xMU = iff(xMom >= 0, nz(xMU[1], 1) - (nz(xMU[1],1) / Length) + xMom, nz(xMU[1], 1))
xMD = iff(xMom <= 0, nz(xMD[1], 1) - (nz(xMD[1],1) / Length) + abs(xMom), nz(xMD[1], 0))
RM = xMU / xMD
nRes = 100 * (RM / (1+RM))
pos = iff(nRes < BuyZone, 1,
	   iff(nRes > SellZone, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )  
plot(nRes, color=blue, title="RMI")
```

> Detail

https://www.fmz.com/strategy/430902

> Last Modified

2023-11-02 17:21:45
