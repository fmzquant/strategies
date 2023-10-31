
> Name

分享-ATR为例均值计算中容错教程

> Author

作手君TradeMan

> Strategy Description

为回馈FMZ平台与社区，进行策略&代码&思路&模板的分享

简介：
详细的均值计算步骤，以ATR为例。
包含指标调用、数据点不足容错、意外数据错误容错等细节
策略的重要是细节的把握。

欢迎合作交流，共同学习进步~
v：haiyanyydss



> Source (javascript)

``` javascript
var arecords = _C(exchange.GetRecords, 300);
var time = arecords[arecords.length - 1].Time
var nowtime = time;
var atremaarr = [];
var Onoff = 0;

function main() {
    while (true) {
        //这里开始    把这段放循环里   
        var Num = 50; //可以改，几根的平均值
        var records = _C(exchange.GetRecords, 300);
        var atr = TA.EMA(records, 9)
        nowtime = records[records.length - 1].Time
        if (nowtime > time || Onoff == 0) {
            atr = atr.slice(atr.length - (20 + Num));
            for (var i = 0; i < (atr.length - Num); i++) { //(atr.length-Num) 长度减掉周期 比如500根 前50根是不准的平均值 这里就取450
                var atremTEMP = 0; //计算求和的，初始设置为0
                for (var j = 0; j < Num; j++) { //求和
                    atrTEMP = atr[i + j] > 0 ? atr[i + j] : 0; //剔除意外数据 ，大于O 取值，小于O 或者其他情况取值O
                    atremTEMP += atrTEMP;
                }
                atremaarr.push(atremTEMP / Num); //把平均值P到数组
            }
            time = nowtime;
            Onoff += 1;
            Log("计算第：", Onoff, "次。");
        }
        //这里结算    把这段放循环里
        Sleep(3000)
        Log("最后一根：", _N(atremaarr[atremaarr.length - 1], 2)) //拿值
        //Log("最后第二根：", _N(atremaarr[atremaarr.length-2],2))
    }
}

```

> Detail

https://www.fmz.com/strategy/396764

> Last Modified

2023-02-09 09:48:42
