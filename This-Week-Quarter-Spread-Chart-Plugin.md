
> Name

This-Week-Quarter-Spread-Chart-Plugin

> Author

小草

> Strategy Description

Plots the spread between the quarterly contract and the current-week contract for hedging analysis.

The plugin can be launched from the trading terminal with one click, is free to use, and is convenient for manual trading. Detailed introduction: https://www.fmz.com/digest-topic/5051

> Source (javascript)

``` javascript

var chart = { 
    __isStock: true,    
    title : { text : '差价分析图'},                     
    xAxis: { type: 'datetime'},                 
    yAxis : {                                        
        title: {text: '差价'},                   
        opposite: false,                             
    },
    series : [                    
        {name : "diff", data : []}, 

    ]
}
function main() {
    exchange.SetContractType('quarter')
    var recordsA = exchange.GetRecords(PERIOD_M5)
    exchange.SetContractType('this_week')
    var recordsB = exchange.GetRecords(PERIOD_M5)
    
    for(var i=0;i<Math.min(recordsA.length,recordsB.length);i++){
        var diff = recordsA[recordsA.length-Math.min(recordsA.length,recordsB.length)+i].Close - recordsB[recordsB.length-Math.min(recordsA.length,recordsB.length)+i].Close
        chart.series[0].data.push([recordsA[recordsA.length-Math.min(recordsA.length,recordsB.length)+i].Time, diff])
    }
    return chart
}
```

> Detail

https://www.fmz.com/strategy/187755

> Last Modified

2020-03-24 10:52:17
