
> 策略名称

JS版本Dual Thrust

> 策略作者

BotVs@太极

> 策略描述

JS版本Dual Thrust



> 源码 (javascript)

``` javascript
// botvs@505d17ec1da140d9467374ae4c1ad024
//==========================================
//API: Chart 函数使用的简单例子（画图功能）
var chart = { // 这个 chart 在JS 语言中 是对象， 在使用Chart 函数之前我们需要声明一个配置图表的对象变量chart。
  __isStock: true,                                    // 标记是否为一般图表，有兴趣的可以改成 false 运行看看。
  tooltip: {xDateFormat: '%Y-%m-%d %H:%M:%S, %A'},    // 缩放工具
  title : { text : '差价分析图'},                       // 标题
  rangeSelector: {                                    // 选择范围
      buttons:  [{type: 'hour',count: 1, text: '1h'}, {type: 'hour',count: 3, text: '3h'}, {type: 'hour', count: 8, text: '8h'}, {type: 'all',text: 'All'}],
      selected: 0,
      inputEnabled: false
  },
  xAxis: { type: 'datetime'},                         // 坐标轴横轴 即：x轴， 当前设置的类型是 ：时间
  yAxis : {                                           // 坐标轴纵轴 即：y轴， 默认数值随数据大小调整。
      title:{text: '差价'},                           // 标题
      opposite:false,                                // 是否启用右边纵轴
  },
  series : [                                          // 数据系列，该属性保存的是 各个 数据系列（线， K线图， 标签等..）
      {name:"上轨:",id:"0",color:'#778899',dashStyle:'shortdash',data:[]},  // 索引为0， data 数组内存放的是该索引系列的 数据
      {name:"周期开盘价:",id:"1",color:'#32CD32',data:[]}, // 索引为1，设置了dashStyle : 'shortdash' 即：设置 虚线。
      {name:"下轨:",id:"2",color:'#303030',dashStyle:'shortdash',data:[]},
      {name:"当前价:",id:"3",color:'#FF3030',data:[]},
      //RGB颜色对照表  http://www.114la.com/other/rgb.htm
  ]
};
//==========================================
function Highest(records, attr, n) {   //最高
    var v = 0;
    for (var pos = records.length - n; pos < records.length; pos++) {
        v = Math.max(v, records[pos][attr]);
    }
    return v;
}

function Lowest(records, attr, n) {  //最低
    var v = -1;
    for (var pos = records.length - n; pos < records.length; pos++) {
        if (v == -1) {
            v = records[pos][attr];
        } else {
            v = Math.min(v, records[pos][attr]);
        }
    }
    return v;
}

var NPeriod=7;   //N的周期
var Ks=0.5;   //上轨系数
var Kx=0.5;   //下轨系数
var ObjChart = Chart(chart);  // 调用 Chart 函数，初始化 图表。
ObjChart.reset();           // 清空
function onTick(e){
    var Records =_C(e.GetRecords); //返回一个K线历史, K线周期在创建机器人时指定
    var Bar = Records[Records.length-1];  //当前周期
    var HH = Highest(Records, 'High', NPeriod);  //最高价-最高价－HH
    var HC = Highest(Records, 'Close', NPeriod); //收盘价-最高价－HC
    var LL = Lowest(Records, 'Low', NPeriod);    //最低价-最低价－LL
    var LC = Lowest(Records, 'Close', NPeriod);  //收盘价-最低价－LC

    Log("HH:",HH,"HC:",HC,"LL:",LL,"LC:",LC);

    var Range = 0;
    if ((HH - LC) >= (HC - LL)) {
        Range = HH - LC;
    } else {
        Range = HC - LL;
    }

    var BuyPosition = Bar.Open + (Ks * Range);
    var SellPosition = Bar.Open - (Kx * Range);
    //========================
    var Ticker_Last=e.GetTicker().Last //最后成交价
    Log(BuyPosition,"-",Bar.Open,"-",SellPosition);
    //画线
    var nowTime = new Date().getTime(); //获取时间戳，
    ObjChart.add([0, [nowTime,BuyPosition]]); //上轨
    //ObjChart.add([1, [nowTime,Bar.Open]]); //触发值
    ObjChart.add([2, [nowTime,SellPosition]]); //下轨
    ObjChart.add([3, [nowTime,Ticker_Last]]); //当前价格
    ObjChart.update(chart);  // 更新图表以显示出来。
    //========================



/*
    var Account=_C(e.GetAccount);   //账户余额
    //判断是否具备开仓条件
    if (parseFloat(Account.Balance)>=8000){
        Log(Account);
        Log(Account.Stocks);
        Buy(e,1);
    }

    //判断是否具备平仓条件
    if (parseFloat(Account.Stocks)>=1){
        Log(Account);
        Log(Account.Stocks);
        Sell(e,1);
    }
*/
}

function main() {
    Log("策略启动");
    while(true) {
        onTick(exchanges[0]);
        Sleep(1000);
    }
}

```

> 策略出处

https://www.fmz.com/strategy/36100

> 更新时间

2017-02-18 17:25:01
