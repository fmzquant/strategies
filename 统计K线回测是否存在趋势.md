
> Name

统计K线回测是否存在趋势

> Author

小草

> Strategy Description

这个策略主要是想从回测数据中考察是否可以根据前面涨跌情况，预测接下来的涨跌。具体如下：如果5根K线中，出现4个或5个上涨，那么下一根是否更趋向于上涨，该策略将统计出上涨的频率。当然也已更改策略的参数统计其它上涨或下跌的情况。在几天的回测时间内，策略运行的还可以，但是回测周期较长时，比如从本月13号到现在，就会出现混乱，不清楚原因。



> Source (javascript)

``` javascript
function adjustFloat(v) {

    return Math.floor(v*1000)/1000;
}
function main(){
    var arr=[0,0,0,0,0,0];//总共考察六根K线，用前五个的结果去预测第六个，可以自由选择
    var appear=0;         //模式的出现次数
    var fit=0;            //第六根K线的结果符合预期
    var diff=0;           //预定模式出现后，第六根的收盘价和开盘价之差。
    while(true){
    var records=exchange.GetRecords();
    i=records.length-1;
    if(i>1&&(records[i].Close-records[i].Open>0)){
        arr.push(1);
        arr.shift();      //把最近一个K线的插入数组末尾，删去元素一以保持长度不变。上涨插入1，否则插入0
    }
    if(i>1&&!(records[i].Close-records[i].Open>0)){
        arr.push(0);
        arr.shift();
    }
    if(i>5){
        var count=0;
        for(k=0;k<5;k++){
            if(arr[k]<1){
                count++;   //前5根K线上涨的个数
            }
        }
        if(count<2){       //设定需要多少个上涨K线，在这里要求四个或五个。
            appear++;      //所需模式出现一次
            diff+=(records[i].Close-records[i].Open);//统计第六根，也是最近一根的差价和
            if(arr[5]<1){  //这里所期望的结果是上涨，也可以写成其它的
                fit++;     //期待结果出现一次
                Log("出现模式次数",appear,"符合预计次数",fit,"所占比例",adjustFloat(fit/appear),"差价之和",adjustFloat(diff));
                LogProfit(adjustFloat(fit/appear));   //把比例输出为收益曲线
            }
        }
    }
    Sleep(300000);       //间隔时间，应与所选K线周期相同？这里是5分钟
    }
}
```

> Detail

https://www.fmz.com/strategy/1125

> Last Modified

2014-10-28 19:32:09
