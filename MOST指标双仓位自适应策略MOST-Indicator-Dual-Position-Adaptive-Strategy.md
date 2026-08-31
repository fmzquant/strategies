
> Name

MOST指标双仓位自适应策略MOST-Indicator-Dual-Position-Adaptive-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18bf19ee25164991372.png)

#### Overview
This strategy is a dual-position adaptive quantitative trading strategy based on the MOST indicator. By calculating the long and short period lines of the MOST indicator and considering factors such as price and trading volume, the strategy adaptively adjusts the opening direction, position size, take-profit and stop-loss points to obtain stable returns. The strategy takes into account both trend and oscillation market states, and adapts to different market environments by dynamically adjusting parameters.

#### Strategy Principle
1. Calculate the long and short period lines of the MOST indicator, and determine the long and short direction by comparing the relationship between the current price and the position of the MOST indicator.
2. Adaptively adjust the opening position size according to the trend direction and strength. If the trend is strong, appropriately increase the position; if the trend is weak, appropriately reduce the position.
3. Set multiple take-profit and stop-loss points, and dynamically adjust the take-profit and stop-loss points according to market volatility to control risk.
4. Introduce trading time windows and filters to avoid trading when market volatility is high or the trend is unclear, improving the robustness of the strategy.
5. Comprehensively consider multiple indicators such as RSI and CCI to filter opening conditions and improve the accuracy of opening positions.

#### Strategy Advantages
1. Adaptive position adjustment: Dynamically adjust the opening position size according to the trend strength and market volatility, obtain more profits when the trend is strong, and control risks when the trend is weak.
2. Dynamic take-profit and stop-loss: Dynamically adjust the take-profit and stop-loss points according to market volatility, which can lock in profits in a timely manner and effectively control drawdowns.
3. Multi-indicator filtering: Comprehensively consider multiple indicators such as RSI and CCI to filter opening conditions, improve the accuracy of opening positions, and reduce the risk of misjudgment.
4. Strong adaptability: By setting trading time windows and filters, avoid trading when market volatility is high or the trend is unclear, improving the adaptability of the strategy.
5. Parameter optimization: The strategy has multiple parameters that can be optimized, such as the MOST indicator period, take-profit and stop-loss points, position size, etc. Parameters can be optimized according to different market environments and asset characteristics to improve strategy returns.

#### Strategy Risks
1. Parameter optimization risk: The strategy has multiple parameters that need to be optimized, and different parameter settings may lead to large differences in strategy performance, resulting in parameter optimization risk.
2. Overfitting risk: If parameter optimization is too complex, it may lead to strategy overfitting and poor performance on out-of-sample data.
3. Black swan event risk: The strategy is optimized based on historical data and may not be able to cope with extreme market conditions, such as black swan events.
4. Market risk: The strategy may experience large drawdowns when the trend is unclear or market volatility is high.

#### Strategy Optimization Direction
1. Introduce machine learning algorithms, such as support vector machines and random forests, to optimize opening conditions and position sizes, improving strategy returns and robustness.
2. Introduce market sentiment indicators, such as the panic index, to quantify market sentiment and timely adjust positions to control risks when market sentiment is extreme.
3. Introduce multi-factor models, such as fundamental factors and technical factors, to quantitatively score assets and select high-quality assets to improve strategy returns.
4. Introduce a capital management module to dynamically adjust position sizes according to account profit and loss, control drawdowns, and improve strategy robustness.
5. Perform parameter adaptive optimization to adaptively adjust strategy parameters according to changes in the market environment, improving strategy adaptability.

#### Summary
This strategy is a dual-position adaptive quantitative trading strategy based on the MOST indicator. By dynamically adjusting position sizes and take-profit and stop-loss points, it adapts to different market environments and obtains stable returns. At the same time, the strategy introduces multiple filtering conditions to improve the accuracy of opening positions and control drawdown risks. In the future, machine learning algorithms, market sentiment indicators, multi-factor models, etc. can be introduced to optimize the strategy and improve strategy returns and robustness. In summary, this strategy is a quantitative trading strategy with certain advantages and room for optimization.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-01 00:00:00
end: 2024-04-30 23:59:59
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//@strategy_alert_message {{strategy.order.alert_message}} 
//bu yukardaki otomatik olarak alarma ekleniyormus, diger turlu her seferinde bunu yapistirman gerekiyordu..
//19.05.2024
///////////////////////////////////////////////////////
// code combiner and developer @ Mustafa Özbakır mozbakir
// thank all other code owners 
strategy('mge-auto okx', pyramiding=3,close_entries_rule ="FIFO" , use_bar_magnifier = false ,process_orders_on_close=false,calc_on_order_fills = false,calc_on_every_tick= false,format=format.price, overlay=true,  default_qty_type=strategy.percent_of_equity , default_qty_value=100, initial_capital=50, currency=currency.USD, commission_value=0.05, commission_type=strategy.commission.percent)
//Fiyat Tick hesabi
RoundToTick( _price) => math.round(_price/syminfo.mintick)*syminfo.mintick
open_fiyat = RoundToTick(open)
close_fiyat = RoundToTick(close)
high_fiyat = RoundToTick(high)
low_fiyat = RoundToTick(low)
hlc3_fiyat = RoundToTick(hlc3)
var float percenval_most_indikator_long = 0.
var float percenval_most_indikator_short = 0.
var float ikinci_giris_long = 0.
var float ikinci_giris_short = 0.
percenval_most_indikator_long := input.float(defval=3.4, minval=0, step=0.1, title='most percent long') / 100 //değeri 0,034 1000 üzerinden
percenval_most_indikator_short := input.float(defval=3.4, minval=0, step=0.1, title='most percent short') / 100
slen_long = input.int(defval=20, title='Long Fiyat MA Period', minval=2)

slen_short = input.int(defval=20, title='Short Fiyat MA Period', minval=2)





sabit_tp_yl = percenval_most_indikator_long / 2 //input.float(defval = 1.9       , title = "_long Sabit Kar-aL Long (%)"   , step=0.1, minval=0.1) / 100
sabit_tp_ys = percenval_most_indikator_short / 2 //input.float(defval = 1.9       , title = "_short Sabit Kar-aL Short (%)" , step=0.1, minval=0.1) / 100



ikinci_giris_long := 0.009//(percenval_most_indikator_long) - 0.009 //input.float(defval=0.8, minval=0, step=0.1, title='2.Long Fiyat % Kac Düştüğünde',tooltip = 'İlk pozisyon girişi botun %50 bütçesi ile açılır. İlk açılış fiyatı % kaç düşerse geri kalan %50bütçe ile 2. giriş yapılsın?') / 100
ikinci_giris_short := 0.009//(percenval_most_indikator_short) - 0.009//input.float(defval=0.8, minval=0, step=0.1, title='2.Short Fiyat % Kac Yükseldiğinde',tooltip = 'İlk pozisyon girişi botun %50 bütçesi ile açılır. İlk açılış fiyatı % kaç yükselirse geri kalan %50bütçe ile 2. giriş yapılsın?') / 100
//risk_trail_stop = input.float(defval=1.8, minval=0, step=0.1, title='Trail StopLoss % Kar Çarpanı') 

//takipli_sloss_yl = sabit_tp_yl * risk_trail_stop
//takipli_sloss_ys = sabit_tp_ys * risk_trail_stop
//takipli_sloss_yl = input.float(defval = 3.8       , title = "_long Takipli Stop-loss Long (%)"   , step=0.1, minval=0.1) / 100
//takipli_sloss_ys = input.float(defval = 3.8       , title = "_short Takipli Stop-loss Short (%)" , step=0.1, minval=0.1) / 100
sabit_loss_yl = percenval_most_indikator_long//input.float(defval = 1.9       , title = "_long zarar (%)"   , step=0.1, minval=0.1) / 100
sabit_loss_ys = percenval_most_indikator_short//input.float(defval = 1.9       , title = "_short zarar (%)" , step=0.1, minval=0.1) / 100
vwap_gosterge_filtre_long_most = input.bool(true,'Vwap MOST Long filtre => Aktif / Değil', inline="rc2")
vwap_gosterge_secimi_long_most = input.bool(true,'Vwap MOST Long => rsi / cci', inline="rc2")
vwap_gosterge_filtre_short_most = input.bool(true,'Vwap MOST Short filtre => Aktif / Değil', inline="rc3")
vwap_gosterge_secimi_short_most = input.bool(true,'Vwap MOST Short => rsi / cci', inline="rc3")

stop_loss_secimi_long = input.bool(true,'Long Zarar => Sabit / Takipli', inline="rc3")
stop_loss_secimi_short = input.bool(true,'Short Zarar => Sabit / Takipli', inline="rc3")


//slen = 20//input.int(defval=20, title='MA Period', minval=1)

//////////////////////___trade_gunleri_long__//////////////////////////////////////////////
InSession_long (sessionTimes_long , sessionTimeZone_long =syminfo.timezone) =>
    not na(time(timeframe.period, sessionTimes_long , sessionTimeZone_long ))
// Create the session and string inputs
sessionInput = "0000-2359"//input.session("0000-2345", title="Session Times")//, group="Trading Session") 
// Create the session string
//weekdays_long = "Long Günleri"
sadece_yer_icin_long = input.bool(defval=false, title="L_Gün :", inline="dL1")
on_mon_long = input.bool(defval=true, title="Psi", inline="dL1")
on_tue_long = input.bool(defval=true, title="S", inline="dL1")
on_wed_long = input.bool(defval=true, title="Ç", inline="dL1")
on_thu_long = input.bool(defval=true, title="P", inline="dL1")
on_fri_long = input.bool(defval=true, title="C", inline="dL1")
on_sat_long = input.bool(defval=true, title="Csi", inline="dL1")
on_sun_long = input.bool(defval=true, title="P", inline="dL1")

session_weekdays_long = ':'
if on_sun_long
    session_weekdays_long := session_weekdays_long + "1"
if on_mon_long
    session_weekdays_long := session_weekdays_long + "2"
if on_tue_long
    session_weekdays_long := session_weekdays_long + "3"
if on_wed_long
    session_weekdays_long := session_weekdays_long + "4"
if on_thu_long
    session_weekdays_long := session_weekdays_long + "5"
if on_fri_long
    session_weekdays_long := session_weekdays_long + "6"
if on_sat_long
    session_weekdays_long := session_weekdays_long + "7"
tradingSession_long  = sessionInput + session_weekdays_long//":" + daysInput_long 
// Highlight background of bars inside the specified session
bgcolor(InSession_long (tradingSession_long ) ? na : color.new(color.teal, 80))
trade_yap_zaman_long  = InSession_long(tradingSession_long ) ? true : false
//////////////////////___trade_gunleri_long__bitti___/////////////////////////////////////////////////
/////////////////___trade_gunleri_short__//////////////////////////////////////////////////////
InSession_short (sessionTimes_short , sessionTimeZone_short =syminfo.timezone) =>
    not na(time(timeframe.period, sessionTimes_short , sessionTimeZone_short ))
//weekdays_short = "Short Günleri"
sadece_yer_icin_short = input.bool(defval=false, title="S_Gün :", inline="ds1")
on_mon_short = input.bool(defval=true, title="Psi", inline="ds1")
on_tue_short = input.bool(defval=true, title="S", inline="ds1")
on_wed_short = input.bool(defval=true, title="Ç", inline="ds1")
on_thu_short = input.bool(defval=true, title="P", inline="ds1")
on_fri_short = input.bool(defval=true, title="C", inline="ds1")
on_sat_short = input.bool(defval=true, title="Csi", inline="ds1")
on_sun_short = input.bool(defval=true, title="P", inline="ds1")

session_weekdays_short = ':'
if on_sun_short
    session_weekdays_short := session_weekdays_short + "1"
if on_mon_short
    session_weekdays_short := session_weekdays_short + "2"
if on_tue_short
    session_weekdays_short := session_weekdays_short + "3"
if on_wed_short
    session_weekdays_short := session_weekdays_short + "4"
if on_thu_short
    session_weekdays_short := session_weekdays_short + "5"
if on_fri_short
    session_weekdays_short := session_weekdays_short + "6"
if on_sat_short
    session_weekdays_short := session_weekdays_short + "7"
tradingSession_short  = sessionInput + session_weekdays_short//":" + daysInput_short 
// Highlight background of bars inside the specified session
bgcolor(InSession_short (tradingSession_short ) ? na :color.new(color.purple, 80) )
trade_yap_zaman_short  = InSession_short(tradingSession_short ) ? true : false
/////////////////___trade_gunleri_short__bitti//////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////
Amount_1a = input.float(51, "1. Giris %Bütce", minval = 0.01, inline = "31")//, group = ALERTGRP_CRED) //pozisyon_1_yuzde
Amount_2a = input.float(49, "2. Giris %Bütce", minval = 0.01, inline = "31")//, group = ALERTGRP_CRED) //pozisyon_2_yuzde
okx_bot_butcesi = input.int(50,'Okx Bot Bütcesi $', inline = "bb1")
okx_bot_kaldirac = input.int(2,'Okx Bot Kaldirac x', inline = "bb1")

/////////////////////////////////////

OpenDirection  = input.string(defval="BIRLIKTE", title="ISLEM SECIMI", options=["BIRLIKTE", "LONG", "SHORT"])

///////////////////////////////////////////////////////////////////////

Zlema_Func(src, length) =>
    zxLag = length / 2 == math.round(length / 2) ? length / 2 : (length - 1) / 2
    zxEMAData = src + src - src[zxLag]
    ZLEMA = ta.ema(zxEMAData, length)
    ZLEMA
fiyat_zlema = Zlema_Func(close_fiyat,20)
fiyat_alma =ta.alma(close_fiyat,96,8,0.6185)//ta.roc(fiyat_alma2,20) //math.sum(ta.roc(fiyat_alma2,1),1) == -3 and math.sum(ta.roc(fiyat_alma3,1),1) == -2
plot(fiyat_alma,'Fiyat Alma ',color.yellow)  
//////////////////////////////////////////

cro_anatrend= ta.crossover(fiyat_zlema,fiyat_alma)//ta.crossover(anatrend_fiyat, mtf_fiyat_alma)
cru_anatrend= ta.crossunder(fiyat_zlema,fiyat_alma)//ta.crossunder(anatrend_fiyat, mtf_fiyat_alma)
direction_anatrend = 0
direction_anatrend := cro_anatrend ? 1 : cru_anatrend ? -1 : direction_anatrend[1]

//////////////////////////////////////////
vwap_cci_Length = 20//input.int(20, minval=1)
vwap_sma_Length = 9//input.int(9, minval=1)
vwap_cci = ta.cci(ta.vwap(close_fiyat[1]),vwap_cci_Length)
vwap_rsi = ta.rsi(ta.vwap(close_fiyat[1]),vwap_cci_Length)
vwap_sma_gosterge_cci = ta.sma(vwap_cci,vwap_sma_Length)  // Most momentum icin
vwap_sma_gosterge_rsi = ta.sma(vwap_rsi,vwap_sma_Length) // Most momentum icin

vwap_gosterge_cci = vwap_sma_gosterge_cci
vwap_gosterge_rsi = vwap_sma_gosterge_rsi
vwap_gosterge_long_most = vwap_gosterge_secimi_long_most ? vwap_gosterge_rsi : vwap_gosterge_cci
vwap_gosterge_short_most = vwap_gosterge_secimi_short_most ? vwap_gosterge_rsi : vwap_gosterge_cci 
vwap_long_most = vwap_gosterge_secimi_long_most ? (vwap_gosterge_long_most > 70) : (vwap_gosterge_long_most > 50) 
vwap_short_most = vwap_gosterge_secimi_short_most ? (vwap_gosterge_short_most < 30) and not(vwap_gosterge_short_most < 10)  : (vwap_gosterge_short_most < -50)

///////////////////////////////////


//calculation of the most trend price
/////////////////////////////////////
averprice_long = Zlema_Func(close_fiyat, slen_long)//averprice//input(close)
averprice_short = Zlema_Func(close_fiyat, slen_short)
//plot(plot_goster_fiyat ? averprice : na ,title = 'fiyat')

////////////////////////////////////
exMov_indikator_long = averprice_long
fark_indikator_long = exMov_indikator_long * percenval_most_indikator_long //* 0.01
longStop_indikator_long = exMov_indikator_long - fark_indikator_long
longStopPrev_indikator_long = nz(longStop_indikator_long[1], longStop_indikator_long)
longStop_indikator_long := exMov_indikator_long > longStopPrev_indikator_long ? math.max(longStop_indikator_long, longStopPrev_indikator_long) : longStop_indikator_long
shortStop_indikator_long = exMov_indikator_long + fark_indikator_long
shortStopPrev_indikator_long = nz(shortStop_indikator_long[1], shortStop_indikator_long)
shortStop_indikator_long := exMov_indikator_long < shortStopPrev_indikator_long ? math.min(shortStop_indikator_long, shortStopPrev_indikator_long) : shortStop_indikator_long
dir_indikator_long = 1
dir_indikator_long := nz(dir_indikator_long[1], dir_indikator_long)
dir_indikator_long := dir_indikator_long == -1 and exMov_indikator_long > shortStopPrev_indikator_long ? 1 : dir_indikator_long == 1 and exMov_indikator_long < longStopPrev_indikator_long ? -1 : dir_indikator_long
MOST_indikator_long = dir_indikator_long == 1 ? longStop_indikator_long : shortStop_indikator_long
cro_indikator_long = ta.crossover(exMov_indikator_long, MOST_indikator_long)
cru_indikator_long = ta.crossunder(exMov_indikator_long, MOST_indikator_long)
direction_indikator_long = 0
direction_indikator_long := cro_indikator_long ? 1 : cru_indikator_long ? -1 : direction_indikator_long[1]
colorM_indikator_long = direction_indikator_long == 1 ? color.rgb(14, 241, 52) : direction_indikator_long == -1  ? color.red : color.rgb(59, 248, 255)
plot( MOST_indikator_long, color = colorM_indikator_long, linewidth=3, title='MOST_indikator_long')
//plot(exMov_indikator_long, color=colorM_indikator_long, linewidth=2, title='exMov_indikator_long')
////////////////////////////
exMov_indikator_short = averprice_short
fark_indikator_short = exMov_indikator_short * percenval_most_indikator_short //* 0.01
longStop_indikator_short = exMov_indikator_short - fark_indikator_short
longStopPrev_indikator_short = nz(longStop_indikator_short[1], longStop_indikator_short)
longStop_indikator_short := exMov_indikator_short > longStopPrev_indikator_short ? math.max(longStop_indikator_short, longStopPrev_indikator_short) : longStop_indikator_short
shortStop_indikator_short = exMov_indikator_short + fark_indikator_short
shortStopPrev_indikator_short = nz(shortStop_indikator_short[1], shortStop_indikator_short)
shortStop_indikator_short := exMov_indikator_short < shortStopPrev_indikator_short ? math.min(shortStop_indikator_short, shortStopPrev_indikator_short) : shortStop_indikator_short
dir_indikator_short = 1
dir_indikator_short := nz(dir_indikator_short[1], dir_indikator_short)
dir_indikator_short := dir_indikator_short == -1 and exMov_indikator_short > shortStopPrev_indikator_short ? 1 : dir_indikator_short == 1 and exMov_indikator_short < longStopPrev_indikator_short ? -1 : dir_indikator_short
MOST_indikator_short = dir_indikator_short == 1 ? longStop_indikator_short : shortStop_indikator_short
cro_indikator_short= ta.crossover(exMov_indikator_short, MOST_indikator_short)
cru_indikator_short= ta.crossunder(exMov_indikator_short, MOST_indikator_short)
direction_indikator_short = 0
direction_indikator_short := cro_indikator_short ? 1 : cru_indikator_short ? -1 : direction_indikator_short[1]
colorM_indikator_short = direction_indikator_short == 1 ? color.rgb(14, 241, 52) : direction_indikator_short == -1  ? color.red : color.rgb(59, 248, 255)
plot( MOST_indikator_short, color=colorM_indikator_short, linewidth=3, title='MOST_indikator_short')
//plot(exMov_indikator_short, color=colorM_indikator_short, linewidth=2, title='exMov_indikator_short')

/////////////////////////////////

trend_yonu_oto = input.bool(true,'Ana Trend Indikator Pozisyon Sekli (Yonu Devam Eden - Tersi Tekli) => Auto / Manuel', inline="rb")
indikator_long_sekli = input.bool(true,'Indikator Long Manuel => Devam Eden / Tekli', inline="rc")
indikator_short_sekli = input.bool(true,'Indikator Short Manuel => Devam Eden / Tekli', inline="rc") 
longCondition_most_indikator = (indikator_long_sekli == true and not(trend_yonu_oto == true)) or (trend_yonu_oto == true and direction_anatrend == 1) ? direction_indikator_long == 1 and not(low <= MOST_indikator_long): cro_indikator_long and not(low <= MOST_indikator_long)//ta.crossover(averprice, trendprice) //and (averprice[1] < trendprice[1]) //and ( close[1] < averprice[1])
shortCondition_most_indikator = (indikator_short_sekli == true and not(trend_yonu_oto == true)) or (trend_yonu_oto == true and direction_anatrend == -1) ? direction_indikator_short == -1 and not(high >= MOST_indikator_short): cru_indikator_short and not(high >= MOST_indikator_short)//ta.crossunder(averprice , trendprice_short) //and (averprice[1] > trendprice_short[1]) //and ( close[1] > averprice[1])
//////////////////////////////
////////////////////////////
//longCondition_most_indikator = cro_indikator_long//(indikator_long_sekli == true and not(trend_yonu_oto == true)) or (trend_yonu_oto == true and direction_anatrend == 1) ? direction_indikator_long == 1 : cro_indikator_long//ta.crossover(averprice, trendprice) //and (averprice[1] < trendprice[1]) //and ( close[1] < averprice[1])
//shortCondition_most_indikator = cru_indikator_short// or (direction_indikator_short == -1 and ta.crossunder(open,MOST_indikator_short))//(indikator_short_sekli == true and not(trend_yonu_oto == true)) or (trend_yonu_oto == true and direction_anatrend == -1) ? direction_indikator_short == -1 : cru_indikator_short//ta.crossunder(averprice , trendprice_short) //and (averprice[1] > trendprice_short[1]) //and ( close[1] > averprice[1])
//////////////////////////////

//////////////////////////////
tahmin_uzunlugu_1 = 20//input.int(5,title =' 1=' , minval=1,inline='tu')
tahmin_uzunlugu_2 = 40//input.int(8,title =' 2=' , minval=1,inline='tu')
tahmin_uzunlugu_3 = 96//input.int(20,title =' 3=' , minval=1,inline='tu')
//tahmin_kaynak_secimi = ' close '// input.string(' close ',title="TOlası Tepe/Dip Fiyat Kaynak", options=[' close ', ' Zlema '])
tahmin_kaynak_fiyat = close_fiyat// tahmin_kaynak_secimi == ' close ' ? close : Zlema_Func(close,8)
fonk_tepe_dip_tahmin(string gozuksunmu,float tahmin_kaynak_fiyat,string tepe_dip,int tahmin_uzunluk,int gosterge_yeri) =>
    sitil_shape = tepe_dip == "tepe" ? shape.triangledown : tepe_dip == "dip" ? shape.triangleup : na
    sitil_label = tepe_dip == "tepe" ? label.style_triangledown : tepe_dip == "dip" ? label.style_triangleup : na
    //philo = input.string("Lows", "Highs or Lows?", options=["Highs", "Lows"])
    linecolor = color.gray//input.color(color.new(color.gray,0), "Label/Line Color")
    ptransp = 33//input.int(33, "Radar Transparency", minval=0, maxval=100)
    ltransp = 100//input.int(100, "Line Transparency", minval=0, maxval=100)
    n = bar_index

    // Input/2 (Default 5) Length Pivot Cycle
    hcol =  tepe_dip == "tepe" ?color.purple : color.green//input.color(color.purple, "Half Cycle Color", inline="hc")
    cych = tahmin_uzunluk//input.int(5, "Length", inline="hc")
    labh = true//input.bool(true, "Label?", inline="hc")
    labhf = true//input.bool(true, "Forecast?", inline="hc")
    plh = tepe_dip == "tepe" ? ta.pivothigh(tahmin_kaynak_fiyat,cych, cych) : ta.pivotlow(tahmin_kaynak_fiyat,cych, cych) // Define a PL or PH based on L/H Switch in settings
    plhy = tepe_dip == "tepe" ? gosterge_yeri : -(math.abs(gosterge_yeri)) // Position the pivot on the Y axis of the oscillator
    plhi = ta.barssince(plh) // Bars since pivot occured?
    plhp = plhi>cych // Bars since pivot occured greater than cycle length?
    lowhin = tepe_dip == "tepe" ? ta.highest(tahmin_kaynak_fiyat, cych*2) : ta.lowest(tahmin_kaynak_fiyat, cych*2) // Highest/Lowest for the cycle
    lowh = ta.barssince(plh)>cych ? lowhin : na // If the barssince pivot are greater than cycle length, show the uncomnfirmed "pivot tracker"
    //plot(plhy, "Half Cycle Radar Line", color=plhp?hcol:color.new(linecolor,ltransp), offset=(cych*-1), display=display.none) // Cycle detection lines v1
    //plotshape(plh ? plhy : na, "Half Cycle Confirmed", style=sitil_shape, location=location.absolute, color=hcol, size = size.tiny, offset=(cych*-1)) // Past Pivots
    //plotshape(lowh ? plhy : na, "Half Cycle Radar", style=shape.circle, location=location.absolute, color=color.new(hcol, ptransp), size = size.tiny, offset=(cych*-1), show_last=1, display=display.none) // AKA the "Tracker/Radar" v1
    // LuxAlgo pivot average calculation used for the forecast
    barssince_ph = 0
    ph_x2 = ta.valuewhen(plh, n - cych, 1) // x values for pivot
    if plh
        barssince_ph := (n - cych) - ph_x2 // if there is a pivot, then BarsSincePivot = (BarIndex - Cycle Length) - x values for pivot
    avg_barssince_ph = ta.cum(barssince_ph) / ta.cum(math.sign(barssince_ph)) // AvgBarsSincePivot = Sum of the BarsSincePivot divided by (Sum of the number of signs of BarsSincePivot, AKA the number of BarsSincePivots)
    // Draw a diamond forecast label and forecast range line
    tooltiph = "? Pivot Cycle: " + str.tostring(cych) + " bars" +
     "\n⏱ Last Pivot: " + str.tostring(plhi + cych) + " bars ago" + 
     "\n? Average Pivot: " + str.tostring(math.round(avg_barssince_ph)) + " bars" + 
     "\n? Next Pivot: " + str.tostring(math.round(avg_barssince_ph)-(plhi + cych)) + " bars" + 
     "\n? Range: +/- " + str.tostring(math.round(avg_barssince_ph/2)) + " bars"
    var label fh = na
    var line lh = na
    if  labhf and gozuksunmu == "gozuksun"
        fh := label.new(n + math.min((math.round(avg_barssince_ph) - (plhi+cych)), 500), y=plhy, size=size.tiny, style=sitil_label, color=color.new(hcol,ptransp),tooltip =tooltiph) 
        label.delete(fh[1])
        lh := line.new(x1=n + math.min(math.round((avg_barssince_ph - (plhi+cych))-(avg_barssince_ph/2)), 500), x2=n + math.min(math.round((avg_barssince_ph - (plhi+cych))+(avg_barssince_ph/2)), 500), y1=plhy, y2=plhy, color=color.new(hcol,ptransp))
        line.delete(lh[1]) 
    var label ch = na // Create a label
    if  labh and gozuksunmu == "gozuksun"// Define the label
        ch := label.new(bar_index, y=plhy, text=str.tostring(cych), size=size.small, style=label.style_label_left, color=color.new(color.white,100), textcolor=color.new(plhp?hcol:linecolor,0), tooltip=tooltiph) 
        label.delete(ch[1])
    int sonraki_pivot = math.round(avg_barssince_ph)-(plhi + cych)
    [sonraki_pivot]
[tepe_1_uzaklik] = fonk_tepe_dip_tahmin('',tahmin_kaynak_fiyat,'tepe',tahmin_uzunlugu_1,50)
[tepe_2_uzaklik] = fonk_tepe_dip_tahmin('',tahmin_kaynak_fiyat,'tepe',tahmin_uzunlugu_2,100)
[tepe_3_uzaklik] = fonk_tepe_dip_tahmin('',tahmin_kaynak_fiyat,'tepe',tahmin_uzunlugu_3,150)
[dip_1_uzaklik] = fonk_tepe_dip_tahmin('',tahmin_kaynak_fiyat,'dip',tahmin_uzunlugu_1,50)
[dip_2_uzaklik] = fonk_tepe_dip_tahmin('',tahmin_kaynak_fiyat,'dip',tahmin_uzunlugu_2,100)
[dip_3_uzaklik] = fonk_tepe_dip_tahmin('',tahmin_kaynak_fiyat,'dip',tahmin_uzunlugu_3,150)
gelecek_tepe_adet = 0
gelecek_tepe_adet := tepe_1_uzaklik > 0 ? gelecek_tepe_adet + 1 : gelecek_tepe_adet
gelecek_tepe_adet := tepe_2_uzaklik > 0 ? gelecek_tepe_adet + 1 : gelecek_tepe_adet
gelecek_tepe_adet := tepe_3_uzaklik > 0 ? gelecek_tepe_adet + 1 : gelecek_tepe_adet
gelecek_tepe_uzaklik_toplami = 0
gelecek_tepe_uzaklik_toplami := tepe_1_uzaklik > 0 ? gelecek_tepe_uzaklik_toplami + tepe_1_uzaklik : gelecek_tepe_uzaklik_toplami
gelecek_tepe_uzaklik_toplami := tepe_2_uzaklik > 0 ? gelecek_tepe_uzaklik_toplami + tepe_2_uzaklik : gelecek_tepe_uzaklik_toplami
gelecek_tepe_uzaklik_toplami := tepe_3_uzaklik > 0 ? gelecek_tepe_uzaklik_toplami + tepe_3_uzaklik : gelecek_tepe_uzaklik_toplami

//tepe_xo_text_sayac = str.tostring(gelecek_tepe_adet)//"1. kosul sayısı : " + str.tostring(kss7) + "\n\2. Kosul Sayisi : "  + str.tostring(kss14) + "\n\3. Kosul sayisi : " + str.tostring(kss21) + "\n\En yuksek Dongu sayısına sahip kosul -kontrol amacli- : " +str.tostring(istedigim_rsi) + "\n\En yuksek Dongu sayısına sahip kosul degeri -kontrol amacli- : " +str.tostring(istedigim_rsi_deger)
//tepe_l_sayac = label.new(x = bar_index-10, y = high, style = label.style_label_left, text = tepe_xo_text_sayac,color=color.green,textcolor = color.white)
//label.delete(tepe_l_sayac[1])
//tepe_u_xo_text_sayac = str.tostring(gelecek_tepe_uzaklik_toplami)//"1. kosul sayısı : " + str.tostring(kss7) + "\n\2. Kosul Sayisi : "  + str.tostring(kss14) + "\n\3. Kosul sayisi : " + str.tostring(kss21) + "\n\En yuksek Dongu sayısına sahip kosul -kontrol amacli- : " +str.tostring(istedigim_rsi) + "\n\En yuksek Dongu sayısına sahip kosul degeri -kontrol amacli- : " +str.tostring(istedigim_rsi_deger)
//tepe_u_l_sayac = label.new(x = bar_index, y = low, style = label.style_label_left, text = tepe_u_xo_text_sayac,color=color.red,textcolor = color.white)
//label.delete(tepe_u_l_sayac[1])
gelecek_dip_adet = 0
gelecek_dip_adet := dip_1_uzaklik > 0 ? gelecek_dip_adet + 1 : gelecek_dip_adet
gelecek_dip_adet := dip_2_uzaklik > 0 ? gelecek_dip_adet + 1 : gelecek_dip_adet
gelecek_dip_adet := dip_3_uzaklik > 0 ? gelecek_dip_adet + 1 : gelecek_dip_adet
gelecek_dip_uzaklik_toplami = 0
gelecek_dip_uzaklik_toplami := dip_1_uzaklik > 0 ? gelecek_dip_uzaklik_toplami + dip_1_uzaklik : gelecek_dip_uzaklik_toplami
gelecek_dip_uzaklik_toplami := dip_2_uzaklik > 0 ? gelecek_dip_uzaklik_toplami + dip_2_uzaklik : gelecek_dip_uzaklik_toplami
gelecek_dip_uzaklik_toplami := dip_3_uzaklik > 0 ? gelecek_dip_uzaklik_toplami + dip_3_uzaklik : gelecek_dip_uzaklik_toplami
//dip_xo_text_sayac = str.tostring(gelecek_dip_adet)//"1. kosul sayısı : " + str.tostring(kss7) + "\n\2. Kosul Sayisi : "  + str.tostring(kss14) + "\n\3. Kosul sayisi : " + str.tostring(kss21) + "\n\En yuksek Dongu sayısına sahip kosul -kontrol amacli- : " +str.tostring(istedigim_rsi) + "\n\En yuksek Dongu sayısına sahip kosul degeri -kontrol amacli- : " +str.tostring(istedigim_rsi_deger)
//dip_l_sayac = label.new(x = bar_index-5, y = high, style = label.style_label_left, text = dip_xo_text_sayac,color=color.aqua,textcolor = color.white)
//label.delete(dip_l_sayac[1])
//dip_u_xo_text_sayac = str.tostring(gelecek_dip_uzaklik_toplami)//"1. kosul sayısı : " + str.tostring(kss7) + "\n\2. Kosul Sayisi : "  + str.tostring(kss14) + "\n\3. Kosul sayisi : " + str.tostring(kss21) + "\n\En yuksek Dongu sayısına sahip kosul -kontrol amacli- : " +str.tostring(istedigim_rsi) + "\n\En yuksek Dongu sayısına sahip kosul degeri -kontrol amacli- : " +str.tostring(istedigim_rsi_deger)
//dip_u_l_sayac = label.new(x = bar_index+5, y = low, style = label.style_label_left, text = dip_u_xo_text_sayac,color=color.gray,textcolor = color.white)
//label.delete(dip_u_l_sayac[1])
olasi_long_ihtimali = ((gelecek_tepe_adet > 0) and (gelecek_tepe_uzaklik_toplami > 0)) and ((gelecek_tepe_adet > gelecek_dip_adet) and (gelecek_tepe_uzaklik_toplami > gelecek_dip_uzaklik_toplami)) ? true : false
olasi_short_ihtimali = ((gelecek_dip_adet > 0) and (gelecek_dip_uzaklik_toplami > 0)) and ((gelecek_tepe_adet < gelecek_dip_adet) and (gelecek_tepe_uzaklik_toplami < gelecek_dip_uzaklik_toplami)) ? true : false
gelecek_long_tahmini_aktif = input.bool(false,'gelecek long tahmini aktif')
gelecek_short_tahmini_aktif = input.bool(false,'gelecek short tahmini aktif')
////////////////////////////////////////
//pozisyon seçimi
//OpenDirection  = input.string(defval="BIRLIKTE", title="ISLEM SECIMI", options=["BIRLIKTE", "LONG", "SHORT"])
open_all        = OpenDirection == "BIRLIKTE" 
open_all_longs  = OpenDirection != "SHORT"
open_all_shorts = OpenDirection != "LONG"

longaktif       = bool(na)
shortaktif      = bool(na)

longaktif       := open_all ? true : open_all_longs ? true  : open_all_shorts ? false : na
shortaktif      := open_all ? true : open_all_longs ? false : open_all_shorts ? true  : na

//Long-Short entry conditions....
/////////////////////////////////////////////////////////////////


////////////____backtest__zaman__baslangic__//////////////////
group_backtest = "Backtest Tarih Aralığı"
stday = input.int(defval=4, title='start Day', minval=1, maxval=31,group = group_backtest)
stmon = input.int(defval=1, title='start Month', minval=1, maxval=12,group = group_backtest)
styear = input.int(defval=2024, title='start Year', minval=2000,group = group_backtest)
fnday = input.int(defval=1, title='Finish Day', minval=1, maxval=31,group = group_backtest)
fnmon = input.int(defval=1, title='finish Month', minval=1, maxval=12,group = group_backtest)
fnyear = input.int(defval=2030, title='finish Year', minval=2000,group = group_backtest)
starttime = timestamp(styear, stmon, stday, 00, 00)
finishtime = timestamp(fnyear, fnmon, fnday, 23, 59)
backtest() =>
    time >= starttime and time <= finishtime ? true : false
////////////____backtest__zaman__bitti__///////////////////

indikator_long = longCondition_most_indikator

if vwap_gosterge_filtre_long_most
    indikator_long := (vwap_long_most) and indikator_long

if gelecek_long_tahmini_aktif
    indikator_long := (olasi_long_ihtimali == true) and indikator_long

indikator_short = shortCondition_most_indikator

if vwap_gosterge_filtre_short_most
    indikator_short := (vwap_short_most) and indikator_short

if gelecek_short_tahmini_aktif
    indikator_short := (olasi_short_ihtimali == true) and indikator_short

long_giris_baslangic = indikator_long and longaktif == true and (trade_yap_zaman_long ==true) and not(strategy.position_size > 0) //(strategy.position_size == 0) //and
short_giris_baslangic = indikator_short and shortaktif == true and (trade_yap_zaman_short ==true) and not(strategy.position_size < 0) //and //(strategy.position_size == 0)


long_pozisyon_giris = long_giris_baslangic[1]
short_pozisyon_giris = short_giris_baslangic[1]

var float long_pozisyon_giris_fiyati = 0.
var float short_pozisyon_giris_fiyati = 0.
long_pozisyon_giris_fiyati := ta.valuewhen(long_pozisyon_giris and not(str.contains(strategy.opentrades.entry_id(0), "L1") or str.contains(strategy.opentrades.entry_id(0), "L2") or str.contains(strategy.opentrades.entry_id(0), "L3") or str.contains(strategy.opentrades.entry_id(0), "S1") or str.contains(strategy.opentrades.entry_id(0), "S2") or str.contains(strategy.opentrades.entry_id(0), "S3")),close_fiyat,0)
short_pozisyon_giris_fiyati := ta.valuewhen(short_pozisyon_giris and not(str.contains(strategy.opentrades.entry_id(0), "L1") or str.contains(strategy.opentrades.entry_id(0), "L2") or str.contains(strategy.opentrades.entry_id(0), "L3") or str.contains(strategy.opentrades.entry_id(0), "S1") or str.contains(strategy.opentrades.entry_id(0), "S2") or str.contains(strategy.opentrades.entry_id(0), "S3")),close_fiyat,0)

var float sabit_tp_long_fiyat = 0.
var float sabit_tp_short_fiyat = 0.
sabit_tp_long_fiyat   := long_pozisyon_giris_fiyati * (1 + sabit_tp_yl)
sabit_tp_short_fiyat  := short_pozisyon_giris_fiyati * (1 - sabit_tp_ys)
var float sabit_loss_long_fiyat = 0.
var float sabit_loss_short_fiyat = 0.
sabit_loss_long_fiyat   := long_pozisyon_giris_fiyati * (1 - sabit_loss_yl)
sabit_loss_short_fiyat  := short_pozisyon_giris_fiyati * (1 + sabit_loss_ys)


////////////////////////////////////////
//Takip stop kodu (TRAILING STOP CODE)

traillongStopPrice  = 0., trailshortStopPrice = 0.

traillongStopPrice := if (strategy.position_size > 0)
    long_stopValue  = low_fiyat * (1 - sabit_loss_yl )
    math.max(long_stopValue , traillongStopPrice[1])
else
    0

trailshortStopPrice := if (strategy.position_size < 0)
    short_stopValue = high_fiyat * (1 + sabit_loss_ys)
    math.min(short_stopValue, trailshortStopPrice[1])
else
    999999
//Takip stop kodu BITTI (TRAILING STOP CODE)

stop_loss_long_fiyat = stop_loss_secimi_long ?  sabit_loss_long_fiyat : traillongStopPrice
stop_loss_short_fiyat = stop_loss_secimi_short ?  sabit_loss_short_fiyat : trailshortStopPrice

var float Long_2_giris_fiyati = 0.
Long_2_giris_fiyati := stop_loss_long_fiyat * (1 + ikinci_giris_long)//strategy.position_size > 0 and (str.contains(strategy.opentrades.entry_id(0), "L1")) ? strategy.opentrades.entry_price(strategy.opentrades - 1) * (1 - ikinci_giris_long) : na//sonra bir değişken olarak bakabiliriz.
//var float Long_3_giris_fiyati = 0.
//Long_3_giris_fiyati := most_long_oldugunda_fiyat * (1 - 0.015)
var float Short_2_giris_fiyati = 0.
Short_2_giris_fiyati := stop_loss_short_fiyat * (1 - ikinci_giris_short)//strategy.position_size < 0 and (str.contains(strategy.opentrades.entry_id(0), "S1")) ? strategy.opentrades.entry_price(strategy.opentrades - 1) * (1 + ikinci_giris_short) : na // * (1 + ikinci_girisler)
//var float Short_3_giris_fiyati = 0.
//Short_3_giris_fiyati :=  most_short_oldugunda_fiyat * (1 + 0.015)
/////___qty__miktari_____/////
//Amount_1 = input.float(51, "Amount İlk Pozisyon", minval = 0.01, inline = "31")//, group = ALERTGRP_CRED) //pozisyon_1_yuzde
//Amount_2 = input.float(49, "Amount 2. Giris", minval = 0.01, inline = "31")//, group = ALERTGRP_CRED) //pozisyon_2_yuzde
//RoundToTick( _price) => math.round(_price/syminfo.mintick)*syminfo.mintick
Amount_1_long = (indikator_long_sekli == true and not(trend_yonu_oto == true)) or (trend_yonu_oto == true and direction_anatrend == 1) ? Amount_1a / 2 : Amount_1a
Amount_1_short = (indikator_short_sekli == true and not(trend_yonu_oto == true)) or (trend_yonu_oto == true and direction_anatrend == -1) ? Amount_1a / 2 : Amount_1a
kontrakt_buyuklugu_long_1 = (indikator_long_sekli == true and not(trend_yonu_oto == true)) or (trend_yonu_oto == true and direction_anatrend == 1) ? (((okx_bot_butcesi*(Amount_1a/100))  * okx_bot_kaldirac) / RoundToTick(long_pozisyon_giris_fiyati)) / 2 : ((okx_bot_butcesi*(Amount_1a/100))  * okx_bot_kaldirac) / RoundToTick(long_pozisyon_giris_fiyati)
//math.round(((okx_bot_butcesi*(Amount_1/100))  * okx_bot_kaldirac) / long_pozisyon_giris_fiyati)
kontrakt_buyuklugu_short_1 = (indikator_short_sekli == true and not(trend_yonu_oto == true)) or (trend_yonu_oto == true and direction_anatrend == -1) ? (((okx_bot_butcesi*(Amount_1a/100))  * okx_bot_kaldirac) / RoundToTick(short_pozisyon_giris_fiyati)) / 2 : ((okx_bot_butcesi*(Amount_1a/100))  * okx_bot_kaldirac) / RoundToTick(short_pozisyon_giris_fiyati)
//math.round(((okx_bot_butcesi*(Amount_1/100))  * okx_bot_kaldirac) / short_pozisyon_giris_fiyati)

Amount_2_long = (indikator_long_sekli == true and not(trend_yonu_oto == true)) or (trend_yonu_oto == true and direction_anatrend == 1) ? Amount_2a : Amount_2a / 2 
Amount_2_short = (indikator_short_sekli == true and not(trend_yonu_oto == true)) or (trend_yonu_oto == true and direction_anatrend == -1) ? Amount_2a : Amount_2a / 2 
kontrakt_buyuklugu_long_2 = (indikator_long_sekli == true and not(trend_yonu_oto == true)) or (trend_yonu_oto == true and direction_anatrend == 1) ? (((okx_bot_butcesi*(Amount_2a/100))  * okx_bot_kaldirac) / RoundToTick(long_pozisyon_giris_fiyati)) : (((okx_bot_butcesi*(Amount_2a/100))  * okx_bot_kaldirac) / RoundToTick(long_pozisyon_giris_fiyati)) / 2
//math.round(((okx_bot_butcesi*(Amount_2/100))  * okx_bot_kaldirac) / long_pozisyon_giris_fiyati)
kontrakt_buyuklugu_short_2 = (indikator_short_sekli == true and not(trend_yonu_oto == true)) or (trend_yonu_oto == true and direction_anatrend == -1) ? (((okx_bot_butcesi*(Amount_2a/100))  * okx_bot_kaldirac) / RoundToTick(short_pozisyon_giris_fiyati)) : (((okx_bot_butcesi*(Amount_2a/100))  * okx_bot_kaldirac) / RoundToTick(short_pozisyon_giris_fiyati)) / 2
//math.round(((okx_bot_butcesi*(Amount_2/100))  * okx_bot_kaldirac) / short_pozisyon_giris_fiyati)


////////////_____okx_borsa_ayar__///////////////////
var ALERTGRP_CRED = "OKX Perpetual-Futures Ayar"
signalToken = "C3sPzbAmZnMpCDnePJziYTF1QNh/Q/VCHcdHIkPc4LU/0HrMGIv1In3dk3O9yLrbDMjqMHkZClQxSZqIUJpdgg=="//input("", "Signal Token", inline = "11", group = ALERTGRP_CRED)
OrderType = "market"//input.string("market", "Order Type", options = ["market", "limit"], inline = "21", group = ALERTGRP_CRED)
OrderPriceOffset = 0//input.float(0, "Order Price Offset", minval = 0, maxval = 100, step = 0.01, inline = "21", group = ALERTGRP_CRED)
InvestmentType = "percentage_investment"//input.string("margin", "Investment Type", options = ["margin", "contract", "percentage_balance", "percentage_investment"], inline = "31", group = ALERTGRP_CRED)
//Amount_1 = input.float(51, "Amount İlk Pozisyon", minval = 0.01, inline = "31", group = ALERTGRP_CRED) //pozisyon_1_yuzde
//Amount_2 = input.float(49, "Amount 2. Giris", minval = 0.01, inline = "31", group = ALERTGRP_CRED) //pozisyon_2_yuzde

getOrderAlertMsgEntry(action, instrument, signalToken, orderType, orderPriceOffset, investmentType, amount) =>
    str = '{'
    str := str + '"action": "' + action + '", '
    str := str + '"instrument": "' + instrument + '", '
    str := str + '"signalToken": "' + signalToken + '", '
    //str := str + '"timestamp": "' + str.format_time(timenow, "yyyy-MM-dd'T'HH:mm:ssZ", "UTC+0") + '", '
    str := str + '"timestamp": "' + '{{timenow}}' + '", '
    str := str + '"orderType": "' + orderType + '", '
    str := str + '"orderPriceOffset": "' + str.tostring(orderPriceOffset) + '", '
    str := str + '"investmentType": "' + investmentType + '", '
    str := str + '"amount": "' + str.tostring(amount) + '"'
    str := str + '}'
    str

getOrderAlertMsgExit(action, instrument, signalToken) =>
    str = '{'
    str := str + '"action": "' + action + '", '
    str := str + '"instrument": "' + instrument + '", '
    str := str + '"signalToken": "' + signalToken + '", '
    str := str + '"timestamp": "' + '{{timenow}}' + '", '
    str := str + '}'
    str
buyAlertMsgExit = getOrderAlertMsgExit(action = 'EXIT_LONG', instrument = syminfo.ticker, signalToken = signalToken)
buyAlertMsgEntry_1 = getOrderAlertMsgEntry(action = 'ENTER_LONG', instrument = syminfo.ticker, signalToken = signalToken, orderType =  OrderType, orderPriceOffset =  OrderPriceOffset, investmentType =  InvestmentType, amount = Amount_1_long)
buyAlertMsgEntry_2 = getOrderAlertMsgEntry(action = 'ENTER_LONG', instrument = syminfo.ticker, signalToken = signalToken, orderType =  OrderType, orderPriceOffset =  OrderPriceOffset, investmentType =  InvestmentType, amount = Amount_2_long)
sellAlertMsgExit = getOrderAlertMsgExit(action = 'EXIT_SHORT', instrument = syminfo.ticker, signalToken = signalToken)
sellAlertMsgEntry_1 = getOrderAlertMsgEntry(action = 'ENTER_SHORT', instrument = syminfo.ticker, signalToken = signalToken, orderType =  OrderType, orderPriceOffset =  OrderPriceOffset, investmentType =  InvestmentType, amount = Amount_1_short)
sellAlertMsgEntry_2 = getOrderAlertMsgEntry(action = 'ENTER_SHORT', instrument = syminfo.ticker, signalToken = signalToken, orderType =  OrderType, orderPriceOffset =  OrderPriceOffset, investmentType =  InvestmentType, amount = Amount_2_short)
////////////_____okx_borsa_ayar_bitti_____///////////////////


if backtest()
////________________________pozisyon__________girislersi______________________///////
    if long_giris_baslangic and str.contains(strategy.opentrades.entry_id(0), "S1") or str.contains(strategy.opentrades.entry_id(0), "S2") //and (zarar_sonrasi_yeni_gun == true)
        strategy.close('S1',comment = "L-B S-Ex_O",immediately = true,alert_message = sellAlertMsgExit)
        strategy.close('S2',comment = "L-B S-Ex_O",immediately = true)//alarm mesaji tek yeter mi? canlı test
        
    if (long_pozisyon_giris)
        strategy.entry('L1', strategy.long,comment='Gir Long_1',alert_message =buyAlertMsgEntry_1,qty=kontrakt_buyuklugu_long_1)//,comment = '{"symbol":"{{ticker}}","side":"{{strategy.order.action}}","qty":"{{strategy.order.contracts}}","price":"{{close}}","signalId":"f4e95251-7896-4f","uid":"6e6d9668de5c60acecd733524ff66c5edac3c1fe65933ef0abf358b369a2f666"}')
    
    if short_giris_baslangic and str.contains(strategy.opentrades.entry_id(0), "L1") or str.contains(strategy.opentrades.entry_id(0), "L2") //and (zarar_sonrasi_yeni_gun == true)
        strategy.close('L1',comment = "S-B L-Ex_O",immediately = true,alert_message = buyAlertMsgExit)
        strategy.close('L2',comment = "S-B L-Ex_O",immediately = true)//alarm mesaji tek yeter mi? canlı test

    if (short_pozisyon_giris) //and (zarar_sonrasi_yeni_gun == true)
        strategy.entry('S1', strategy.short,comment='Gir Short_1',alert_message =sellAlertMsgEntry_1,qty=kontrakt_buyuklugu_short_1)//qty=kontrakt_buyuklugu_short)//,comment = '{"symbol":"{{ticker}}","side":"{{strategy.order.action}}","qty":"{{strategy.order.contracts}}","price":"{{close}}","signalId":"f4e95251-7896-4f","uid":"6e6d9668de5c60acecd733524ff66c5edac3c1fe65933ef0abf358b369a2f666"}')
    ////________________________pozisyon____cikislari______________________//////////

    if (strategy.position_size > 0) and str.contains(strategy.opentrades.entry_id(0), "L1") and ta.crossunder(low_fiyat, Long_2_giris_fiyati) //and not(ta.crossunder(low, Long_3_giris_fiyati)) and not( ta.crossunder(low, Long_4_giris_fiyati))
        strategy.entry('L2', strategy.long,comment='Gir Long_2',alert_message =buyAlertMsgEntry_2,qty=kontrakt_buyuklugu_long_2)
    if (strategy.position_size > 0) and (short_giris_baslangic)
        strategy.close('L1',comment = "S-B L-Ex_O",immediately = true,alert_message = buyAlertMsgExit)
        strategy.close('L2',comment = "S-B L-Ex_O",immediately = true)
    if (strategy.position_size > 0) and not(short_giris_baslangic)//and (low <= traillongStopPrice) or (high >= sabit_tp_long_fiyat) or (pozisyon_short)
        strategy.exit('xL1', from_entry = 'L1',comment='EXIT Long_1-Li/St',alert_message = buyAlertMsgExit, limit = sabit_tp_long_fiyat, stop = stop_loss_long_fiyat)//,qty=21)
        strategy.exit('xL2', from_entry = 'L2',comment='EXIT Long_2-Li/St',alert_message = buyAlertMsgExit, limit = sabit_tp_long_fiyat, stop = stop_loss_long_fiyat)//,qty=22)
        //strategy.exit('xL3', from_entry = 'L3',comment='EXIT Long_3-Li/St',alert_message = buyAlertMsgExit, limit = sabit_tp_long_fiyat, stop = traillongStopPrice)//,qty=22)
    
    if (strategy.position_size < 0) and str.contains(strategy.opentrades.entry_id(0), "S1") and ta.crossover(high_fiyat, Short_2_giris_fiyati) //and not(ta.crossunder(low, Long_3_giris_fiyati)) and not( ta.crossunder(low, Long_4_giris_fiyati))
        strategy.entry('S2', strategy.short,comment='Gir Short_2',alert_message =sellAlertMsgEntry_2,qty=kontrakt_buyuklugu_short_2)
    if (strategy.position_size < 0) and (long_giris_baslangic)
        strategy.close('S1',comment = "L-B S-Ex_O",immediately = true,alert_message = sellAlertMsgExit)
        strategy.close('S2',comment = "L-B S-Ex_O",immediately = true)
    if (strategy.position_size < 0) and not(long_giris_baslangic)//and (low <= traillongStopPrice) or (high >= sabit_tp_long_fiyat) or (pozisyon_short)
        strategy.exit('xS1', from_entry = 'S1',comment='EXIT Short_1-Li/St',alert_message = sellAlertMsgExit, limit = sabit_tp_short_fiyat, stop = stop_loss_short_fiyat)//,qty=21)
        strategy.exit('xS2', from_entry = 'S2',comment='EXIT Short_2-Li/St',alert_message = sellAlertMsgExit, limit = sabit_tp_short_fiyat, stop = stop_loss_short_fiyat)//,qty=22)
        //strategy.exit('xS3', from_entry = 'S3',comment='EXIT Short_3-Li/St',alert_message = sellAlertMsgExit, limit = sabit_tp_short_fiyat, stop = trailshortStopPrice)//,qty=22)



sabit_tp_long_plot =  plot((strategy.position_size > 0) ? sabit_tp_long_fiyat : na, color=color.lime, style=plot.style_linebr, title="S-KA ½ Long")
takipli_stop_long_plot =  plot( (strategy.position_size > 0) ? stop_loss_long_fiyat : na, color=color.red, style=plot.style_linebr, title="T-SL ½ Long")
sabit_tp_short_plot =  plot((strategy.position_size < 0) ? sabit_tp_short_fiyat : na, color=color.lime, style=plot.style_linebr, title="S-KA ½ Short")
takipli_stop_short_plot =  plot( (strategy.position_size < 0) ? stop_loss_short_fiyat : na, color=color.red, style=plot.style_linebr, title="T-SL ½ Short")
//

```

> Detail

https://www.fmz.com/strategy/452357

> Last Modified

2024-05-24 17:28:39
