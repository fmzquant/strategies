
> Name

DMI-测试范例

> Author

小小梦





> Source (javascript)

``` javascript
/*backtest
start: 2019-06-03 00:00:00
end: 2019-07-03 00:00:00
period: 1h
exchanges: [{"eid":"Huobi","currency":"BTC_USDT","balance":10000,"stocks":3}]
*/

// 指标函数
function ADX(MDI, PDI, adx_period) {
    if(typeof(MDI) == "undefined" || typeof(PDI) == "undefined"){
        return false 
    }

    if(MDI.length < 10 || PDI.length < 10){
        return false 
    }

    /*
    DX = abs(DIPlus-DIMinus) / (DIPlus+DIMinus)*100
    ADX = sma(DX, len)
    */

    var dx = []
    for(var i = 0; i < MDI.length; i++){
        if(!MDI[i] || !PDI[i]){
            continue
        }
        var dxValue = Math.abs((PDI[i] - MDI[i])) / (PDI[i] + MDI[i]) * 100
        var obj = {
            Close : dxValue,
        }
        dx.push(obj)
    }

    if(dx.length < adx_period){
        return false
    }

    var adx = talib.SMA(dx, adx_period)

    return adx
}

function DMI(records, pdi_period, mdi_period, adxr_period, adx_period) {    
    var recordsHLC = []
    for(var i = 0; i < records.length ; i++){
        var bar = {
            High : records[i].High,
            Low : records[i].Low, 
            Close : records[i].Close,
        }
        recordsHLC.push(bar)
    }
    
    var m_di = talib.MINUS_DI(recordsHLC, mdi_period) 
    var p_di = talib.PLUS_DI(recordsHLC, pdi_period)

    var adx = ADX(m_di, p_di, adx_period)
    
    // ADXR=（当日的ADX+前n日的ADX）÷2
    var n = 0
    var adxr = []
    for (var j = 0 ; j < adx.length; j++) {
        if (typeof(adx[j]) == "number") {
            n++
        }
        
        if (n >= adxr_period) {
            var currAdxr = (adx[j] + adx[j - adxr_period]) / 2
            adxr.push(currAdxr)
        } else {
            adxr.push(NaN)
        }
    }
    
    return [m_di, p_di, adx, adxr]
}



function main() {
    while(1){
        var records = exchange.GetRecords()
        var ret = DMI(records, 14, 14, 14, 14)
        var preTime = records[records.length - 2].Time
        $.PlotRecords(records, "K")
        $.PlotLine("m_di", ret[0][ret[0].length - 2], preTime)
        $.PlotLine("p_di", ret[1][ret[1].length - 2], preTime)
        $.PlotLine("adx", ret[2][ret[2].length - 2], preTime)
        $.PlotLine("adxr", ret[3][ret[3].length - 2], preTime)
        
        Sleep(1000)
    }
}
```

> Detail

https://www.fmz.com/strategy/154050

> Last Modified

2019-07-03 13:56:18
