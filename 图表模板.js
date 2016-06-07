/*
策略出处: https://www.botvs.com/strategy/15524
策略名称: 图表模板
策略作者: 小小梦
策略描述:

图表模板


参数              默认值    描述
--------------  -----  ------
indicatorsName  指标轴1   指标轴
indicators_1    指标1    指标1
indicators_2    指标2    指标2
Interval        500    间隔（毫秒）
*/

/*
这个是一个图表模板，详细用法见广场帖子。

*/
//图表
var ChartObj = {//画图
    tooltip: {xDateFormat: '%Y-%m-%d %H:%M:%S, %A'},
    chart: { zoomType:'x',panning:true },//图表类型  
    title: { text: title}, //标题
    rangeSelector: {
            buttons:  [{type: 'hour',count: 1, text: '1h'}, {type: 'hour',count: 3, text: '3h'}, {type: 'hour', count: 8, text: '8h'}, {type: 'all',text: 'All'}],
            selected: 0,
            inputEnabled: false
        },
    subtitle: {text: subtitle},//副标题
    xAxis:{type: 'datetime'},
    yAxis: [{
            title: {text: 'K线'},//标题
            style: {color: '#4572A7'},//样式 
            opposite: false  //生成右边Y轴
        },
       {
            title:{text: indicatorsName},
            opposite: true  //生成右边Y轴  ceshi
       }
    ],
    series: [//系列
        {type:'candlestick',yAxis:0,name:'K',id:'KLine',data:[]},
        {type:'flags',onSeries:'KLine',data:[]},
        {name:indicators_1,type:'spline',yAxis:1,data:[]},
        {name:indicators_2,type:'spline',yAxis:1,data:[]}
        ]                  
};
var chart = Chart(ChartObj);
var isFirst = true;
var preRecordTime = 0;
var title = exchange.GetName();
var subtitle = indicators_1+"、"+indicators_2+"指标走势";
function Draw(records){
    var strState = "";
    var fcolor = "";
    var msg = "";
    while(!records || records.length < 5){
        records = exchange.GetRecords();
        LogStatus("获取K线中...records.length:",records === null ? "records is null" : records.length);
        Sleep(Interval);
    }
    if(isFirst === true){
        chart.reset();
        isFirst = false;
        preRecordTime = records[records.length - 1].Time;
    }
    if(preRecordTime === records[records.length - 1].Time){
        chart.add([0,[records[records.length - 1].Time,records[records.length - 1].Open,records[records.length - 1].High,records[records.length - 1].Low,records[records.length - 1].Close ],-1]);
    }else{
        //更新前一柱
        chart.add([0,[records[records.length - 2].Time,records[records.length - 2].Open,records[records.length - 2].High,records[records.length - 2].Low,records[records.length - 2].Close ],-1]);

        chart.add([0,[records[records.length - 1].Time,records[records.length - 1].Open,records[records.length - 1].High,records[records.length - 1].Low,records[records.length - 1].Close ]]);
       
        preRecordTime = records[records.length - 1].Time;
    }
    chart.update(ChartObj);
    chart.reset(500);
}
function SignOP(time,price,amount,state){
    var msg = "";
    msg = "均价："+price+"币数："+amount;
    switch(state){
        case 1:strState = "开多仓";fcolor = "red";break;
        case 2:strState = "开空仓";fcolor = "green";break;
        case 0:strState = "平仓";fcolor = "blue";break;
    }
    chart.add(1, {x:time, color: fcolor , shape: 'flag', title: strState, text: msg});
}
$.SignOP = function(time,price,amount,state){
    if(arguments.length < 4){
        Log("SignOP 函数 必须传入4个参数 ： time、price、amount、state");
        return;
    }
    SignOP(time,price,amount,state);
};
$.Draw = function(records){
    Draw(records);
};
//ceshi
function main(){
    var i = 0;
    var records = exchange.GetRecords();
    
    while(i < 50000){
        if(i===2000){
            //Sleep(60*60*1000);
            SignOP((new Date()).getTime(),2900,1,1);
        }
        Draw(records);
        Sleep(20000);
        records = exchange.GetRecords();
        i++;
    }
}
