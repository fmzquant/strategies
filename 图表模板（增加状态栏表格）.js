/*
策略出处: https://www.botvs.com/strategy/20967
策略名称: 图表模板（增加状态栏表格）
策略作者: 小小梦
策略描述:

图表模板


参数              默认值    描述
--------------  -----  --------
indicatorsName  指标轴1   指标轴
indicators_1    指标1    指标1
indicators_2    指标2    指标2
Interval        500    间隔（毫秒）
isOpenRightY    true   是否开启右边Y轴
lineType        line   指标线类型
*/

/*
这个是一个图表模板，详细用法见广场帖子。
*/
//----------------------------------图表模块----------------------------------------------------------------
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
            opposite: isOpenRightY  //生成右边Y轴  ceshi
       }
    ],
    series: [//系列
        {type:'candlestick',yAxis:0,name:'K',id:'KLine',data:[]},
        {type:'flags',onSeries:'KLine',data:[]},
        {name:indicators_1,type:lineType,yAxis:isOpenRightY?1:0,data:[]},
        {name:indicators_2,type:lineType,yAxis:isOpenRightY?1:0,data:[]}
        //{name:indicators_1,type:'spline',yAxis:1,data:[]},
        //{name:indicators_2,type:'spline',yAxis:1,data:[]}
        ]                  
};
var chart = Chart(ChartObj);
var isFirst = true;
var preRecordTime = 0;
var lastRecordsTime = 0;
var title = exchange.GetName();
var subtitle = indicators_1+"、"+indicators_2+"指标走势";
function Draw(records){
    var strState = "";
    var fcolor = "";
    var msg = "";
    while(!records || records.length < 5){
        records = exchange.GetRecords();
        //LogStatus("获取K线中...records.length:",records === null ? "records is null" : records.length);
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
    //chart.update(ChartObj); //测试取消
    //chart.reset(500); //测试取消
}
function SignOP(time,price,amount,state,message){
    var msg = "";
    var fcolor = ""; // ceshi
    var strState = "";//ceshi
    msg = "均价："+price+"币数："+amount;
    switch(state){
        case 3:strState = "自定义信息";fcolor = "black";msg = message;break;
        case 1:strState = "开多仓";fcolor = "red";break;
        case 2:strState = "开空仓";fcolor = "green";break;
        case 0:strState = "平仓";fcolor = "blue";break;
    }
    chart.add(1, {x:time, color: fcolor , shape: 'flag', title: strState, text: msg});
}
//----------------------------------图表模块over------------------------------------------------------------
//----------------------------------状态栏表格模块-----------------------------------------------------------
var TV = null; //表格对象，控制表格内容。
var objTable = null;//用于显示表格的对象。
function CreateObjectString(cols,rows){
    var i = cols;// column 列
    var j = rows;// row    行
    var firstCols = 'a';
    var charValue = 0;
    var firstName = ""; //对象字符串成员的字母部分
    var lastName = "";  //对象字符串成员的数字部分
    var strMember = ""; //对象字符串成员
    var objStr = "";//返回的字符串
    if(i > 26){
        throw "ERROR column must less 26";
    }
    var strHead = '{';
    var strEnd = '}';
    for(var n = 0 ; n < j; n++){
        //处理行
        for(var m = 0 ; m < i; m++){
            //处理列 处理 abc , 数字=n
            charValue = firstCols.charCodeAt();//取字符的编码
            firstName = String.fromCharCode(charValue + m);
            lastName = n;
            if(n === j - 1 && m === i - 1 ){
                strMember = '"' + firstName + lastName + '"' + ':' + '""';
            }else{
                strMember = '"' + firstName + lastName + '"' + ':' + '""' + ',';
            }
            objStr += strMember;
        }
    }
    objStr = strHead + objStr + strEnd;
    return objStr;
}

var g_cols = 0;
var g_rows = 0;
$.TableInit = function(cols,rows){
    g_cols = cols;
    g_rows = rows;
    var str = CreateObjectString(cols,rows);//生成 TV对象 字符串
    TV = JSON.parse(str); // 解析字符串生成 TV对象
    var tableString = CreateTableString(cols,rows);//生成表格对象字符串
    objTable = JSON.parse(tableString);//解析表格对象字符串
    LogStatus("当前时间：" + (new Date()) + "\n" + "`" + JSON.stringify(objTable) + "`");//初次显示 表格对象到 状态栏
    //ConnectDate(cols,rows);//初次链接数据 
    return TV;//返回 TV对象
};
function ConnectDate(cols,rows){//关联函数
    //处理cols 
    var i = 0;//控制 objTable.cols
    for(var unit1 in TV){
        if(i < cols){
            objTable.cols[i] = TV[unit1];
        }else{
            break;
        }
        i++;
    }
    //处理rows
    var m = 0;//m控制 第几行
    var n = 0;//n控制 第几个
    var o = 1;//跳过cols 部分的计数
    for(var unit2 in TV){
        if( o <= cols){
            o++;
            continue;
        }
        if(n >= cols){
            n = 0;
            m++;
        }
        objTable.rows[m][n] = TV[unit2];
        n++;
    }
}
function CreateTableString(cols,rows){
    var strHead = '{';
    var strEnd = '}';
    var srtTable_type = ' "type": "table",';
    var strTable_title = ' "title": "运行信息",';
    var strTable_cols_begin = ' "cols" : [';
    var strTable_cols_end = '],';
    var strTable_rows_begin = ' "rows" : [';
    var strTable_rows_end = ']';
    var strCols = "";
 
    var length = 0;
    for(var y in TV){// 获得 TV对象的 成员个数
        length++;
    }
    
    var i = 1;
    for(var x in TV){// 初始化 strCols 
        if(i >= cols){
            strCols += '"' + "TV." + x + '"' ;
            break;
        }else{
            strCols += '"' + "TV." + x + '"' + ',';
        }
        i++;
    }

    i = 1;//控制循环 一行cols 后重置的计数
    var n = 1; //用于最后一次 不加 都好的 计数
    var m = 1; //用于跳过cols 部分的计数
    var strRowsUnit = "";
    var strRows = "";
    length = length - cols;
    for(var z in TV){
        if(m <= cols){//跳过 表格cols 部分
            m++;
            continue;
        }

        if(i >= cols){
            strRowsUnit += '"' + "TV." + z + '"' ;
            i = 1;//重置i
            if(n < length){
                strRowsUnit = '[' + strRowsUnit + ']' + ',';
            }else if(n === length){
                strRowsUnit = '[' + strRowsUnit + ']';
            }
            strRows += strRowsUnit;
            strRowsUnit = "";//重置
        }else{
            strRowsUnit += '"' + "TV." + z + '"' + ',';
            i++;
        }
        n++;
    }
    var tableString = strHead + srtTable_type + strTable_title + strTable_cols_begin + strCols + strTable_cols_end + strTable_rows_begin + strRows + strTable_rows_end + strEnd;
    return tableString;
}
$.UpdateLogStatus = function(msg) { //更新状态栏 
    //列用ABC表示，行用0123表示
    ConnectDate(g_cols,g_rows);//链接数据
    LogStatus("当前时间：" + (new Date()) + "msg:" + msg +  "\n" + "`" + JSON.stringify(objTable) + "`");//更新状态栏
};
//----------------------------------状态栏表格模块over-------------------------------------------------------
//----------------------------------导出函数----------------------------------------------------------------
$.SignOP = function(time,price,amount,state,message){//该函数作用是在策略运行时，在K线图表上标记“开多仓”，“开空仓”，“平仓” 的位置。
    //参数time: 在策略中使用此函数的时间，一般用(new Date()).getTime() ,  price:这个参数是在标签上显示 价格（多空平）, amount:这个参数是在标签上显示 数量(成交) ,state: 这个参数是用来控制标记的类型，state = 1开多 ，2开空 ，0 平仓
    if(arguments.length < 4){
        Log("SignOP 函数 必须传入4个参数 ： time、price、amount、state");
        return;
    }
    if(typeof(message) === "undefined"){
        message = "";
    }
    SignOP(time,price,amount,state,message);
};
$.Draw = function(records){
    Draw(records);
};
$.AddZhiBiao = function(zhibiao_Array,records,index){//该函数是在图表上添加指标线，zhibiao_Array：这个参数是指标数据（数组），records:产生指标数据的 原始K线数据，index:指标线的编号，从1开始递增
    if(records[records.length - 1].Time === lastRecordsTime){
        chart.add([index+1,[records[records.length - 1].Time,zhibiao_Array[zhibiao_Array.length - 1]],-1]);
    }else{
        chart.add([index+1,[records[records.length - 2].Time,zhibiao_Array[zhibiao_Array.length - 2]],-1]);
        chart.add([index+1,[records[records.length - 1].Time,zhibiao_Array[zhibiao_Array.length - 1]]]);
        //lastRecordsTime = records[records.length - 1].Time; //测试 取消
    }
    //chart.update(ChartObj); //测试取消
};
$.UpdateChart = function(records){//更新图表，每次添加指标线，添加标签 后需要更新 才有效。 records： K线原始数据
    if(records[records.length - 1].Time !== lastRecordsTime){
        lastRecordsTime = records[records.length - 1].Time;
    }
    chart.update(ChartObj);
    chart.reset(500);//默认 保留500个K线
};
//----------------------------------导出函数over-----------------------------------------------------------
//测试
function main(){
    ///*测试图表功能
    var i = 0;
    var records = exchange.GetRecords();
    while(!records || records.length < 5){
        records = exchange.GetRecords();
        Sleep(500);
    }
    var zhibiao = [1,2,3,5,6,4,1,21,5];//ceshi
    var zhibiao2 = [11,22,44,57,8,77,5];
    
    //$.SignOP((new Date()).getTime(),null,null,3,"自定义信息标记到图表上");// 测试标记 自定义信息 到图表上
    while(i < 500){
        Draw(records);
        if(i===20){
            //Sleep(60*60*1000);
            SignOP((new Date()).getTime(),2900,1,1);
            $.SignOP((new Date()).getTime(),null,null,3,"自定义信息标记到图表上");// 测试标记 自定义信息 到图表上
        }
        //zhibiao.shift();
        //zhibiao.push(zhibiao[zhibiao.length - 1] + 1);//ceshi
        //Log("ceshi"); //ceshi
        $.AddZhiBiao(zhibiao,records,1);
        //$.AddZhiBiao(zhibiao2,records,2);
        //Log("ceshi"); //ceshi

        //Draw(records);
        //Log("ceshi1"); //ceshi
        Sleep(200);
        records = exchange.GetRecords();
        $.UpdateChart(records);//更新图表
        i++;
    }
    //*/
    /*测试状态栏表格功能*/
    var cols = 6;//列 设置一个变量 代表 列
    var rows = 4;//行 设置一个变量 代表 行
    $.TableInit(cols,rows); //初始化  状态栏  会显示  各个单元格的 坐标
    ///*
    for(var x in TV){
        TV[x] = "lalala";// 全部单元格写成 lalala
    }
    //更新表格 显示  lalala, 表头 数据不能重复 ，否则显示不出来。
    /*
    TV.a0 = "a0";
    TV.b0 = "b0";
    TV.c0 = "c0";
    TV.d0 = "d0";
    TV.e0 = "e0";
    TV.f0 = "f0";//先把 表头数据写成不一样的
    */
    $.UpdateLogStatus(cols,rows);//更新 状态栏表格

    ///*
    //怎么在 表格里面写入数据呢？
    var num = 100;
    var text = "文本：测试表格文本";
    var obj = {name:"对象",age:"19",sex:"girl"};
    var array = ["数组",22,33,54];
    TV.a1 = num;
    TV.c2 = text;
    TV.b3 = obj;
    TV.b0 = array;

    $.UpdateLogStatus(cols,rows);//再次更新 状态栏表格
    //*/
}
/*修改
1、增加了是否开启右边坐标轴
2、增加参数  lineType :  spline  /   line
*/
