/*
策略出处: https://www.botvs.com/strategy/36195
策略名称: js R-Breaker
策略作者: 太极
策略描述:

R-Breaker

*/

NPeriod=2 //周期
f1=0.47   //中轨上下顶部区间系数
f2=0.07   //中轨上下区间系数
f3=0.25   //上下轨系数

//==========================================
//API: Chart 函数使用的简单例子（画图功能）
var chart = { // 这个 chart 在JS 语言中 是对象， 在使用Chart 函数之前我们需要声明一个配置图表的对象变量chart。
  __isStock: true,                                    // 标记是否为一般图表，有兴趣的可以改成 false 运行看看。
  tooltip: {xDateFormat: '%Y-%m-%d %H:%M:%S, %A'},    // 缩放工具
  title : { text : '行情分析图'},                       // 标题
  rangeSelector: {                                    // 选择范围
      buttons:  [{type: 'hour',count: 1, text: '1h'}, {type: 'hour',count: 3, text: '3h'}, {type: 'hour', count: 8, text: '8h'}, {type: 'all',text: 'All'}],
      selected: 0,
      inputEnabled: false
  },
  xAxis: { type: 'datetime'},                         // 坐标轴横轴 即：x轴， 当前设置的类型是 ：时间
  yAxis : {                                           // 坐标轴纵轴 即：y轴， 默认数值随数据大小调整。
      title:{text: '行情演算'},                        // 标题
      opposite:false,                                // 是否启用右边纵轴
  },
  series : [                                          // 数据系列，该属性保存的是 各个 数据系列（线， K线图， 标签等..）
      {name:"0X",id:"0",color:'#FF83FA',data:[]},
      {name:"1X",id:"1",color:'#FF3E96',dashStyle:'shortdash',data:[]},
      {name:"2X",id:"2",color:'#FF0000',data:[]},

      {name:"3X",id:"3",color:'#7D26CD',dashStyle:'shortdash',data:[]}, //

      {name:"4X",id:"4",color:'#2B2B2B',data:[]},
      {name:"5X",id:"5",color:'#707070',dashStyle:'shortdash',data:[]},
      {name:"6X",id:"6",color:'#778899',data:[]},

      {name:"7X",id:"7",color:'#0000CD',data:[]},

      //RGB颜色对照表  http://www.114la.com/other/rgb.htm
  ]
};

/*
//Pivot Points策略
chart["series"][0]["name"]="阻力3:";
chart["series"][1]["name"]="阻力2:";
chart["series"][2]["name"]="阻力1:";

chart["series"][3]["name"]="枢轴点:";

chart["series"][4]["name"]="支撑位1:";
chart["series"][5]["name"]="支撑位2:";
chart["series"][6]["name"]="支撑位3:";
chart["series"][6]["name"]="当前价格:";
*/
///*
//R-Breaker策略
chart["series"][0]["name"]="Bbreak_A1:";
chart["series"][1]["name"]="Ssetup_A2:";
chart["series"][2]["name"]="Senter_A3:";

chart["series"][4]["name"]="Benter_B1:";
chart["series"][5]["name"]="Sbreak_B2:";
chart["series"][6]["name"]="Bsetup_B3:";
chart["series"][7]["name"]="当前价格:";
//*/


var ObjChart = Chart(chart);  // 调用 Chart 函数，初始化 图表。
ObjChart.reset();           // 清空
function onTick(e){
        var records = _C(e.GetRecords);  //返回一个K线历史
        var ticker = _C(e.GetTicker);    //返回一个Ticker结构
        var account = _C(e.GetAccount);  //返回主交易所账户信息

        var High = TA.Highest(records, NPeriod, 'High'); //最高价
        var Close = TA.Lowest(records, NPeriod, 'Close');       //收盘价
        var Low = TA.Lowest(records, NPeriod, 'Low');   //最低价

        /*
        //Pivot Points策略
        //A上 7235 A中 7259 A下 7275 B上 7195 B中 7155 B下 7179
        Pivot = (High+Close+Low)/3 //枢轴点

        var Senter=High+2*(Pivot-Low)  //阻力3
        var Ssetup=Pivot+(High-Low)  //阻力2
        var Bbreak=2*Pivot-Low  //阻力1

        var Benter=2*Pivot-High  //支撑位1
        var Sbreak=Pivot-(High-Low)  //支撑位2
        var Bsetup=Low-2*(High-Pivot)  //支撑位3
        //画线
        var nowTime = new Date().getTime(); //获取时间戳，
        ObjChart.add([0, [nowTime,_N(Senter,3)]]); //阻力3
        ObjChart.add([1, [nowTime,_N(Ssetup,3)]]); //阻力2
        ObjChart.add([2, [nowTime,_N(Bbreak,3)]]); //阻力1

        ObjChart.add([3, [nowTime,_N(Pivot,3)]]); //枢轴点

        ObjChart.add([4, [nowTime,_N(Benter,3)]]);  //支撑位1
        ObjChart.add([5, [nowTime,_N(Sbreak,3)]]);  //支撑位2
        ObjChart.add([6, [nowTime,_N(Bsetup,3)]]);  //支撑位3

        ObjChart.add([7, [nowTime,_N(ticker.Last,3)]]); //最后成交价

        ObjChart.update(chart);  // 更新图表以显示出来。
        */


        ///*
        //R-Breaker策略
        //A上 7261.46 A中 7246.76 A下 7228.68 B上 7204.48 B中 7187.96 B下 7173.26
        var Ssetup = High + f1 * (Close - Low);  //A中
        var Bsetup = Low - f1 * (High - Close);  //B下

        var Bbreak = Ssetup + f3 * (Ssetup - Bsetup);  //A上
        var Senter = ((1 + f2) / 2) * (High + Close) - f2 * Low;  //A下

        var Benter = ((1 + f2) / 2) * (Low + Close) - f2 * High;  //B上
        var Sbreak = Bsetup - f3 * (Ssetup - Bsetup);  //B中
        //画线
        var nowTime = new Date().getTime(); //获取时间戳，
        ObjChart.add([0, [nowTime,_N(Bbreak,3)]]); //A上
        ObjChart.add([1, [nowTime,_N(Ssetup,3)]]); //A中
        ObjChart.add([2, [nowTime,_N(Senter,3)]]); //A下

        //ObjChart.add([3, [nowTime,_N(Pivot,3)]]); //枢轴点

        ObjChart.add([4, [nowTime,_N(Benter,3)]]);  //B上
        ObjChart.add([5, [nowTime,_N(Sbreak,3)]]);  //B中
        ObjChart.add([6, [nowTime,_N(Bsetup,3)]]);  //B下

        ObjChart.add([7, [nowTime,_N(ticker.Last,3)]]); //最后成交价

        ObjChart.update(chart);  // 更新图表以显示出来。
        //*/

        Log('A上',_N(Bbreak,3),'A中',_N(Ssetup,3),'A下',_N(Senter,3),'B上',_N(Benter,3),'B中',_N(Bsetup,3),'B下',_N(Sbreak,3));
}



function main() {
    Log("策略启动");
    while(true){
        onTick(exchanges[0]);
        Sleep(1000);
    }
}




