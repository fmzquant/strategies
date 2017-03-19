/*
策略出处: https://www.botvs.com/strategy/36026
策略名称: 图表界面信息展示实例1
策略作者: 太极
策略描述:

11111111

*/

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
      {name:"交易所0",id:"0,Buy",color:'#FF3030',data:[]},  // 索引为0， data 数组内存放的是该索引系列的 数据
      {name:"交易所1",id:"1,Buy",dashStyle:'shortdash',data:[]}, // 索引为1，设置了dashStyle : 'shortdash' 即：设置 虚线。
      {name:"交易所2",id:"2,Buy",color:'#912CEE',data:[]},
      //RGB颜色对照表  http://www.114la.com/other/rgb.htm
  ]
};
//==========================================
//获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear()+seperator1+month+seperator1+strDate+" "+date.getHours()+seperator2+date.getMinutes()+seperator2+date.getSeconds();
    return currentdate;
}


function main() {
//==========================================
    //画图   https://www.botvs.com/bbs-topic/581
    var ObjChart = Chart(chart);  // 调用 Chart 函数，初始化 图表。
    ObjChart.reset();           // 清空
    while(true){
        var nowTime = new Date().getTime();   //获取时间戳，
        var Buy_0 = _C(exchanges[0].GetTicker).Buy;  //获取平台0行情数据 买一价
        var Buy_1 = _C(exchanges[1].GetTicker).Buy; //获取平台1行情数据 买一价
        var Buy_2 = _C(exchanges[2].GetTicker).Buy; //获取平台2行情数据 买一价
        ObjChart.add([0, [nowTime,Buy_0]]); // 用时间戳作为X值， 买一价 作为Y值 传入 索引0 的数据序列。
        ObjChart.add([1, [nowTime,Buy_1]]); // 同上。
        ObjChart.add([2, [nowTime,Buy_2]]); // 同上。
        ObjChart.update(chart);                  // 更新图表以显示出来。
        Sleep(2000);
    }
//==========================================

}

