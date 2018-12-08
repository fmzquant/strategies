
> 策略名称

使用画线类库画K线以及均线图表范例

> 策略作者

小小梦



> 策略参数



|参数|默认值|描述|
|----|----|----|
|MaCyc|10|均线参数|


> 源码 (javascript)

``` javascript
var PreBarTime = 0
function PlotMA_Kline(records, param, isFirst){
    var ma = TA.MA(records, param)
    $.PlotRecords(records, "K")
    if(isFirst){
        for(var i = records.length - 1; i >= 0; i--){
            if(ma[i] !== null){
                $.PlotLine("ma", ma[i], records[i].Time)
            }
        }
        PreBarTime = records[records.length - 1].Time
    } else {
        if(PreBarTime !== records[records.length - 1].Time){
            $.PlotLine("ma", ma[ma.length - 2], records[records.length - 2].Time)
            PreBarTime = records[records.length - 1].Time
        }
        $.PlotLine("ma", ma[ma.length - 1], records[records.length - 1].Time)
    }


}

function main(){
    var maCyc = MaCyc
    var isFirst = true

    while(1){
        var records = exchange.GetRecords()
        if(records && records.length > maCyc){
            PlotMA_Kline(records, maCyc, isFirst)
            isFirst = false
        }
        Sleep(1000)
    }
}
```

> 策略出处

https://www.fmz.com/strategy/125770

> 更新时间

2018-11-12 11:39:09
