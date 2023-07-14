
> Name

使用画线类库画K线以及均线图表范例

> Author

小小梦



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|MaCyc|10|均线参数|


> Source (javascript)

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

> Detail

https://www.fmz.com/strategy/125770

> Last Modified

2018-11-12 11:39:09
