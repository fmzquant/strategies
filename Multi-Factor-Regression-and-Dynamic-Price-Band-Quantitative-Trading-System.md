
> Name

Multi-Factor-Regression-and-Dynamic-Price-Band-Quantitative-Trading-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17a976a8997f5e784bb.png)

[trans]
#### 概述
本策略是一个基于多因子回归与动态价格带的量化交易系统。核心逻辑是通过多因子回归模型预测价格走势,结合BTC主导地位、交易量、滞后价格等多个市场因子,构建上下价格带用于信号生成。策略集成了异常值过滤、动态仓位管理、移动止损等多个风险管理模块,是一个全面且稳健的交易系统。

#### 策略原理
策略主要包含以下核心组件:
1. 回归预测模块:使用多因子线性回归模型预测价格。因子包括BTC主导地位、交易量、价格滞后项、交互项等。通过计算各因子的beta系数来衡量其对价格的影响程度。
2. 动态价格带:基于预测价格和残差标准差构建上下价格带,用于识别超买超卖。
3. 信号生成:当价格突破下轨且RSI超卖时产生做多信号;突破上轨且RSI超买时产生做空信号。
4. 风险管理:包含异常值过滤(Z分数法)、止损止盈、ATR移动止损等多重保护机制。
5. 动态仓位:基于ATR和预设风险比例动态调整开仓规模。

#### 策略优势
1. 多因子整合:综合考虑多个市场因子,提供全面的市场视角。
2. 自适应性强:价格带会根据市场波动动态调整,适应不同市场环境。
3. 完善的风险控制:多层次的风险管理确保资金安全。
4. 灵活可配置:大量参数可调,易于根据不同市场特点优化。
5. 信号可靠性高:多重过滤机制提高信号质量。

#### 策略风险
1. 模型风险:回归模型依赖历史数据,在市场剧烈变化时可能失效。
2. 参数敏感性:众多参数需要精心调优,参数设置不当会影响策略表现。
3. 计算复杂度:多因子计算较为复杂,可能影响实时性能。
4. 市场环境依赖:在震荡市场中表现可能优于趋势市场。

#### 策略优化方向
1. 因子选择优化:可以引入更多市场因子,如市场情绪指标、链上数据等。
2. 动态参数调整:开发自适应参数调整机制,提高策略适应性。
3. 机器学习增强:引入机器学习方法优化预测模型。
4. 信号过滤增强:开发更多信号过滤条件提高准确率。
5. 组合策略整合:与其他策略组合使用提高稳定性。

#### 总结
该策略是一个理论扎实、设计完善的量化交易系统。通过多因子回归模型预测价格,结合动态价格带生成交易信号,配备全面的风险管理机制。策略具有较强的适应性和可配置性,适合各种市场环境。通过持续优化和改进,该策略有望在实盘交易中取得稳定收益。 || 

#### Overview
This strategy is a quantitative trading system based on multi-factor regression and dynamic price bands. The core logic is to predict price movements through a multi-factor regression model, combining multiple market factors such as BTC dominance, trading volume, and lagged prices to construct price bands for signal generation. The strategy integrates multiple risk management modules including outlier filtering, dynamic position management, and trailing stops, making it a comprehensive and robust trading system.

#### Strategy Principles
The strategy includes the following core components:
1. Regression Prediction Module: Uses multi-factor linear regression to predict prices. Factors include BTC dominance, volume, price lags, and interaction terms. Beta coefficients measure each factor's impact on price.
2. Dynamic Price Bands: Constructs upper and lower price bands based on predicted price and residual standard deviation to identify overbought/oversold conditions.
3. Signal Generation: Generates long signals when price breaks below lower band with oversold RSI; short signals when price breaks above upper band with overbought RSI.
4. Risk Management: Multiple protection mechanisms including outlier filtering (Z-score method), stop-loss/take-profit, and ATR-based trailing stops.
5. Dynamic Positioning: Adjusts position size dynamically based on ATR and preset risk ratio.

#### Strategy Advantages
1. Multi-factor Integration: Provides comprehensive market perspective by considering multiple market factors.
2. Strong Adaptability: Price bands adjust dynamically to market volatility, adapting to different market conditions.
3. Comprehensive Risk Control: Multi-layered risk management ensures capital safety.
4. Flexible Configuration: Numerous adjustable parameters for optimization across different markets.
5. High Signal Reliability: Multiple filtering mechanisms improve signal quality.

#### Strategy Risks
1. Model Risk: Regression model relies on historical data, may fail during dramatic market changes.
2. Parameter Sensitivity: Multiple parameters require careful tuning, improper settings affect strategy performance.
3. Computational Complexity: Multi-factor calculations may impact real-time performance.
4. Market Environment Dependency: May perform better in ranging markets than trending markets.

#### Optimization Directions
1. Factor Selection Optimization: Introduce additional market factors like sentiment indicators and on-chain data.
2. Dynamic Parameter Adjustment: Develop adaptive parameter adjustment mechanisms.
3. Machine Learning Enhancement: Incorporate machine learning methods to optimize prediction model.
4. Signal Filter Enhancement: Develop additional signal filtering conditions to improve accuracy.
5. Strategy Integration: Combine with other strategies to improve stability.

#### Summary
This strategy is a theoretically sound and well-designed quantitative trading system. It predicts prices through a multi-factor regression model, generates trading signals using dynamic price bands, and features comprehensive risk management mechanisms. The strategy demonstrates strong adaptability and configurability, suitable for various market environments. Through continuous optimization and improvement, this strategy shows promise for achieving stable returns in live trading.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-12-17 00:00:00
end: 2025-01-16 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":49999}]
*/

//@version=5
strategy(  title           = "CorrAlgoX", overlay         = true,pyramiding      = 1, initial_capital = 10000, default_qty_type= strategy.percent_of_equity, default_qty_value=200)

//====================================================================
//=========================== GİRİŞLER ================================
//====================================================================

// --- (1) REGRESYON VE OUTLIER AYARLARI
int   lengthReg         = input.int(300, "Regression Window",   minval=50)
bool  useOutlierFilter  = input.bool(false, "Z-skoru ile Outlier Filtrele")

// --- (2) FİYAT GECİKMELERİ
bool  usePriceLag2      = input.bool(false, "2 Bar Gecikmeli Fiyatı Kullan")

// --- (3) STOP-LOSS & TAKE-PROFIT
float stopLossPerc      = input.float(3.0,  "Stop Loss (%)",   step=0.1)
float takeProfitPerc    = input.float(5.0,  "Take Profit (%)", step=0.1)

// --- (4) REZİDÜEL STD BANTI
int   lengthForStd      = input.int(50, "StdDev Length (residual)", minval=2)
float stdevFactor       = input.float(2.0, "Stdev Factor", step=0.1)

// --- (5) RSI FİLTRESİ
bool  useRsiFilter      = input.bool(true, "RSI Filtresi Kullan")
int   rsiLen            = input.int(14, "RSI Length",   minval=1)
float rsiOB             = input.float(70, "RSI Overbought", step=1)
float rsiOS             = input.float(30, "RSI Oversold",   step=1)

// --- (6) TRAILING STOP
bool  useTrailingStop   = input.bool(false, "ATR Tabanlı Trailing Stop")
int   atrLen            = input.int(14, "ATR Length",   minval=1)
float trailMult         = input.float(1.0, "ATR multiplier", step=0.1)

// --- (7) DİNAMİK POZİSYON BÜYÜKLÜĞÜ (ATR tabanlı)
bool  useDynamicPos     = input.bool(false, "Dinamik Pozisyon Büyüklüğü Kullan")
float capitalRiskedPerc = input.float(1.0, "Sermaye Risk Yüzdesi", step=0.1, tooltip="Her işlemde risk alınacak sermaye yüzdesi")

// --- (8) ETKİLEŞİM VE LOG(HACİM) KULLANIMI
bool  useSynergyTerm    = input.bool(true, "BTC.D * Hacim Etkileşim Terimi")
bool  useLogVolume      = input.bool(true, "Hacmi Logaritmik Kullan")

//====================================================================
//======================= VERİLERİ AL & HAZIRLA =======================
//====================================================================

// Mevcut enstrüman fiyatı
float realClose = close

// BTC Dominance (aynı TF)
float btcDom    = request.security("SWAP", timeframe.period, close)

// Hacim
float vol       = volume

// Gecikmeli fiyatlar
float priceLag1 = close[1]
float priceLag2 = close[2]  // (isteğe bağlı)

//----------------- Outlier Filtrelemesi (Z-Skoru) ------------------//
float priceMean  = ta.sma(realClose, lengthReg)
float priceStdev = ta.stdev(realClose, lengthReg)

float zScore     = (priceStdev != 0) ? (realClose - priceMean) / priceStdev : 0
bool  isOutlier  = math.abs(zScore) > 3.0

float filteredClose = (useOutlierFilter and isOutlier) ? na : realClose

// Fiyatın stdev'i (filtrelenmiş)
float fCloseStdev = ta.stdev(filteredClose, lengthReg)

//====================================================================
//=============== ORTALAMA, STDEV, KORELASYON HESAPLARI ==============
//====================================================================

// BTC.D
float btcDomMean    = ta.sma(btcDom, lengthReg)
float btcDomStdev   = ta.stdev(btcDom, lengthReg)
float corrBtcDom    = ta.correlation(btcDom, filteredClose, lengthReg)

// Hacim
float volMean       = ta.sma(vol, lengthReg)
float volStdev      = ta.stdev(vol, lengthReg)
float corrVol       = ta.correlation(vol, filteredClose, lengthReg)

// Fiyat Lag1
float plag1Mean     = ta.sma(priceLag1, lengthReg)
float plag1Stdev    = ta.stdev(priceLag1, lengthReg)
float corrPLag1     = ta.correlation(priceLag1, filteredClose, lengthReg)

// Fiyat Lag2 (isteğe bağlı)
float plag2Mean     = ta.sma(priceLag2, lengthReg)
float plag2Stdev    = ta.stdev(priceLag2, lengthReg)
float corrPLag2     = ta.correlation(priceLag2, filteredClose, lengthReg)

// BTC.D * Hacim (synergyTerm)
float synergyTerm   = btcDom * vol
float synergyMean   = ta.sma(synergyTerm, lengthReg)
float synergyStdev  = ta.stdev(synergyTerm, lengthReg)
float corrSynergy   = ta.correlation(synergyTerm, filteredClose, lengthReg)

// Log(Hacim)
float logVolume     = math.log(vol + 1.0)
float logVolMean    = ta.sma(logVolume, lengthReg)
float logVolStdev   = ta.stdev(logVolume, lengthReg)
float corrLogVol    = ta.correlation(logVolume, filteredClose, lengthReg)

//====================================================================
//===================== FONKSIYON: BETA HESAPLAMA =====================
//====================================================================
// Pine Script'te fonksiyonlar şöyle tanımlanır (tip bildirmeyiz):
getBeta(corrVal, stdevX) =>
    (stdevX != 0 and not na(corrVal) and fCloseStdev != 0)? corrVal * (fCloseStdev / stdevX)  : 0.0

//====================================================================
//======================== BETA KATSAYILARI ===========================
//====================================================================

// BTC Dominance
float betaBtcDom  = getBeta(corrBtcDom,  btcDomStdev)
// Hacim
float betaVol     = getBeta(corrVol,     volStdev)
// Fiyat Lag1
float betaPLag1   = getBeta(corrPLag1,   plag1Stdev)
// Fiyat Lag2
float betaPLag2   = getBeta(corrPLag2,   plag2Stdev)
// synergy
float betaSynergy = getBeta(corrSynergy, synergyStdev)
// logVol
float betaLogVol  = getBeta(corrLogVol,  logVolStdev)

//====================================================================
//===================== TAHMİNİ FİYAT OLUŞTURMA ======================
//====================================================================

float alpha  = priceMean
bool canCalc = not na(filteredClose) and not na(priceMean)

float predictedPrice = na
if canCalc
    // Farklar
    float dBtcDom   = (btcDom - btcDomMean)
    float dVol      = (vol    - volMean)
    float dPLag1    = (priceLag1 - plag1Mean)
    float dPLag2    = (priceLag2 - plag2Mean)
    float dSynergy  = (synergyTerm - synergyMean)
    float dLogVol   = (logVolume   - logVolMean)

    float sumBeta   = 0.0
    sumBeta += betaBtcDom  * dBtcDom
    sumBeta += betaVol     * dVol
    sumBeta += betaPLag1   * dPLag1

    if usePriceLag2
        sumBeta += betaPLag2 * dPLag2

    if useSynergyTerm
        sumBeta += betaSynergy * dSynergy

    if useLogVolume
        sumBeta += betaLogVol * dLogVol

    predictedPrice := alpha + sumBeta

//====================================================================
//======================= REZİDÜEL & BANT ============================
//====================================================================

float residual   = filteredClose - predictedPrice
float residStdev = ta.stdev(residual, lengthForStd)

float upperBand  = predictedPrice + stdevFactor * residStdev
float lowerBand  = predictedPrice - stdevFactor * residStdev

//====================================================================
//========================= SİNYAL ÜRETİMİ ===========================
//====================================================================

bool longSignal  = (realClose < lowerBand)
bool shortSignal = (realClose > upperBand)

//------------------ RSI Filtresi (opsiyonel) -----------------------//
float rsiVal       = ta.rsi(realClose, rsiLen)
bool rsiOversold   = (rsiVal < rsiOS)
bool rsiOverbought = (rsiVal > rsiOB)

if useRsiFilter
    longSignal  := longSignal  and rsiOversold
    shortSignal := shortSignal and rsiOverbought

//====================================================================
//=============== DİNAMİK POZİSYON & GİRİŞ/ÇIKIŞ EMİRLERİ ============
//====================================================================

float myAtr      = ta.atr(atrLen)
float positionSize = na

if useDynamicPos
    float capitalRisked   = strategy.equity * (capitalRiskedPerc / 100.0)
    float riskPerUnit     = (stopLossPerc/100.0) * myAtr
    positionSize          := (riskPerUnit != 0.0) ? (capitalRisked / riskPerUnit) : na

// Long
if longSignal
    if useDynamicPos and not na(positionSize)
        strategy.entry("Long", strategy.long, qty=positionSize)
    else
        strategy.entry("Long", strategy.long)

// Short
if shortSignal
    if useDynamicPos and not na(positionSize)
        strategy.entry("Short", strategy.short, qty=positionSize)
    else
        strategy.entry("Short", strategy.short)

// Stop-Loss & Take-Profit
if strategy.position_size > 0
    strategy.exit( "Long Exit", "Long",stop  = strategy.position_avg_price * (1 - stopLossPerc/100),  limit = strategy.position_avg_price * (1 + takeProfitPerc/100))

if strategy.position_size < 0
    strategy.exit("Short Exit", "Short", stop  = strategy.position_avg_price * (1 + stopLossPerc/100),limit = strategy.position_avg_price * (1 - takeProfitPerc/100))

//------------------ TRAILING STOP (opsiyonel) ----------------------//
if useTrailingStop
    if strategy.position_size > 0
        strategy.exit(  "Long Exit TS", "Long",  trail_points = myAtr * trailMult,  trail_offset = myAtr * trailMult )
    if strategy.position_size < 0
        strategy.exit( "Short Exit TS", "Short", trail_points = myAtr * trailMult, trail_offset = myAtr * trailMult)

//====================================================================
//======================== GRAFİK ÇİZİMLER ===========================
//====================================================================
plot(realClose,      color=color.white,  linewidth=1, title="Fiyat")
plot(predictedPrice, color=color.yellow, linewidth=2, title="PredictedPrice")
plot(upperBand,      color=color.red,    linewidth=1, title="Üst Band")
plot(lowerBand,      color=color.lime,   linewidth=1, title="Alt Band")

plotshape( useOutlierFilter and isOutlier, style=shape.circle, color=color.red, size=size.tiny, location=location.abovebar, title="Outlier", text="Outlier")
```

> Detail

https://www.fmz.com/strategy/478722

> Last Modified

2025-01-17 15:57:53
