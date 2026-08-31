
> Name

Malas-Adaptive-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/136d8da30c04548e636.png)

## Overview

The Mala Adaptive Moving Average Strategy is a quantitative trading strategy based on the MESA Adaptive Moving Average indicator developed by John Ehlers. The strategy uses sine waves to make trading decisions, buying at lows, selling at highs. By sliding adjustment of parameters, the sine wave can adapt itself to different products and market environments.

## Strategy Logic  

The Mala Adaptive Moving Average strategy uses a sine wave generator to produce trading signals. The sine wave is determined by the shadow cast on the vertical axis by a rotating vector (called the phasor). When the vector rotates 360 degrees, one cycle is completed. Buying signals are generated when the vector passes one angle, and selling signals when it passes another angle. Thus, trading decisions are defined in terms of angles in the frequency domain rather than waveform characteristics in the time domain, making the strategy more robust across different futures contracts and market conditions.   

Specifically, the strategy first smoothes and detrends the price, then calculates two components of the sine wave: the in-phase component I and the quadrature component Q. These two components are superimposed and filtered by phase shifting to obtain the final Re and Im. Re and Im reflect the frequency information of the sine wave. The period period can be derived from atan(Im/Re). A smoothed period smoothperiod is determined based on the expected period range. The period and phase information determine the MAMA and FAMA curves, the crossovers of which produce trading signals. The parameter alpha is dynamically adjusted within a certain range based on period and phase change rate deltapahse, allowing the indicator to adapt itself to changes in market conditions.  

## Advantage Analysis

The Mala Adaptive Moving Average Strategy has the following advantages:

1. Using sine waves and phases as trading signals makes the strategy more robust, unaffected by waveform characteristics in the time domain.

2. The adaptability of periods and parameters enables strong adaptiveness to market changes. 

3. MAMA and FAMA curves depend solely on price features without lag, capturing trend reversals in a timely manner.

4. Sensitivity of the strategy can be adjusted through parameter tuning to suit different trading styles.

5. The clear and simple logic facilitates comprehension, modification and application for research and teaching.

## Risk Analysis  

The Mala Adaptive Moving Average Strategy also carries the following risks:

1. Relying on sine curve periods and phases, abnormal price distortions may generate incorrect signals.  

2. Hard boundaries set in period estimation cause insufficient smoothness in period changes.

3. Phase locking and period locking around key points lead to oscillations of the curves, potentially missing optimal entries and exits.  

4. Adaptability of parameters and curves decreases during intensified market volatility.

5. As a technical indicator, the strategy tends to produce false breakouts and wrong signals around important technical levels.

These risks could be alleviated through more smoothed parameters, signal filtering with other indicators, position sizing adjustment, etc.

## Optimization Directions

The Mala Adaptive Moving Average Strategy can be improved in the following aspects:

1. Improve period and parameter calculation for more natural smoothness, e.g., introducing statistical methods for better price modeling.

2. Filter signals with volatility, volume and fundamentals to enhance accuracy. 

3. Optimize parameter settings and slippage control to reduce trading costs and improve robustness.  

4. Introduce machine learning and genetic algorithms for dynamic parameter optimization.

5. Develop combinations with trend and mean-reversion systems based on different entries and exits to improve profitability.

## Conclusion
The Mala Adaptive Moving Average Strategy uses sine wave analysis to generate trading signals, automatically adapting itself to market changes through dynamic parameter tuning, making it quite robust and widely applicable. Compared to other adaptive moving average strategies, it demonstrates higher practicability and stability. But as a technical strategy, it is subject to wrong signals around important technical levels, requiring filtering and optimization with auxiliary tools. With continuous improvement, this strategy has the potential to become a recommended adaptive trading system.  

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.5|fastlimit|
|v_input_2|0.05|slowlimit|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-30 00:00:00
end: 2023-12-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © dongyun

//@version=4
strategy("自适应移动平均的MESA系统", overlay=true)

fastlimit = input(0.5,'')
slowlimit = input(0.05,'')

smooth = 0.0
detrender = 0.0
I1 = 0.0
Q1 = 0.0
JI = 0.0
JQ = 0.0
I2 = 0.0
Q2 = 0.0
Re = 0.0
Im = 0.0
period = 0.0
smoothperiod = 0.0
phase = 0.0
deltaphase = 0.0
alpha = 0.0
MAMA = 0.0
FAMA = 0.0
price = 0.0

price := (high + low)/2
PI = 2 * asin(1)

if (bar_index > 5)
	smooth := (4*price + 3*price[1] + 2*price[2] + price[3])/10
	detrender := (.0962*smooth + .5769*nz(smooth[2]) - .5769*nz(smooth[4]) - .0962*nz(smooth[6]))*(.075*nz(period[1]) + .54)

	// compute InPhase and Quadrature components
	Q1 := (.0962*detrender + .5769*nz(detrender[2]) - .5769*nz(detrender[4]) - .0962*nz(detrender[6]))*(.075*nz(period[1]) + .54)

	I1 := nz(detrender[3])

	// advance the pulse of i1 and q1 by 90 degrees
	JI := (.0962*I1 + .5769*nz(I1[2]) - .5769*nz(I1[4]) - .0962*nz(I1[6]))*(.075*nz(period[1]) + .54)
	JQ := (.0962*Q1 + .5769*nz(Q1[2]) - .5769*nz(Q1[4]) - .0962*nz(Q1[6]))*(.075*nz(period[1]) + .54)

	//phase addition for 3-bar averaging 
	I2 := I1 - JQ
	Q2 := Q1 + JI

	//smooth the i and q components before applying
	I2 := .2*I2 + .8*nz(I2[1])
	Q2 := .2*Q2 + .8*nz(Q2[1])

	// hymodyne discriminator
	Re := I2*I2[1] + Q2*nz(Q2[1])
	Im := I2*Q2[1] + Q2*nz(I2[1])
	Re := .2*Re + .8*nz(Re[1])
	Im := .2*Im + .8*nz(Im[1])

	if (Im != 0 and Re != 0)
		period := 2 * PI/atan(Im/Re)

	if (period > 1.5 * nz(period[1]))
		period := 1.5*nz(period[1])

	if (period < .67*nz(period[1]))
		period := .67*nz(period[1])

	if (period < 6)
		period := 6

	if (period > 50)
		period := 50

	period := .2*period + .8*nz(period[1])
	smoothperiod := .33*period + .67*nz(smoothperiod[1])

	if (I1 != 0)
		phase := (180/PI) * atan(Q1/I1)

	deltaphase := nz(phase[1]) - phase

	if (deltaphase < 1)
		deltaphase := 1

	alpha := fastlimit/deltaphase
	if(alpha < slowlimit)
		alpha := slowlimit

	MAMA := alpha*price + (1 - alpha)*nz(MAMA[1])
	FAMA := .5*alpha*MAMA + (1 - .5*alpha)*nz(FAMA[1])

	if (FAMA < MAMA)
		strategy.entry("Long", strategy.long)
	else
		if (FAMA > MAMA)
			strategy.entry("Short", strategy.short)

```

> Detail

https://www.fmz.com/strategy/434527

> Last Modified

2023-12-07 11:08:18
