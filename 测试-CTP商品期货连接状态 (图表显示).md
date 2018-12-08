
> 策略名称

测试-CTP商品期货连接状态 (图表显示)

> 策略作者

小小梦

> 策略描述

测试CTP商品期货连接状态
1、图标显示

> 策略参数



|参数|默认值|描述|
|----|----|----|
|testContractType|MA701|测试的合约类型|


> 源码 (javascript)

``` javascript
//获取多个品种的信息  SR', 'CF', 'RM', 'MA', 'PTA', 'ZC', 'FG', 'IO

var ChartCfg = {
    __isStock: true,
    title: {
        text: 'CTP商品期货 交易所连接状态记录'
    },
    xAxis:{type: 'datetime'},
    yAxis: {
        //tickInterval: 1,
        //tickAmount: 3,
        max: 1.5,
        min: -1.5,
        plotLines: [{
            value: 0,
            color: 'red',
            width: 5,
            label: {
                text: '已连接',
                align: 'center'
            },
        }, {
            value: 0,
            color: 'green',
            width: 5,
            label: {
                text: '未连接',
                align: 'center'
            },
        }]
    },
    series: [{
        type: 'line',
        name: '连接状态',
        id: 'state',
        data: []
    }, {
        type: 'flags',
        onSeries: 'state',
        data: [],
    }]
};



var ContractArray = ['SR701', 'CF701', 'RM701', 'MA701', 'ZC701', 'FG701']; //
function GetSomeContractMarketInfo(ContractArray){
    var array = []; //储存获取的信息
    _.each(ContractArray,function(ContractType){
        exchange.SetContractType(ContractType);
        array.push({TypeName : ContractType ,ticker : exchange.GetTicker()});
    });
    
    for(var i = 0 ; i < array.length; i++){
        Log(array[i]);
    }
    return array;
}

var table = null;
function main() {
    Log("测试CTP商品期货连接状态");
    SetErrorFilter("login|ready");
    //初始化图表
    table = $.TableInit(3,6);
    table.a0 = "实时状态:exchange.IO('status') ↓";
    table.b0 = "test ContractType ↓";
    table.c0 = "infomation ↓";
    table.b2 = "ticker ↓#FF0000";
    table.b4 = "records[-1] ↓#FF0000";
    table.c2 = "Account ↓#FF0000";
    
    //初始化 图
    chart = Chart(ChartCfg);
    ChartCfg.yAxis.plotLines[0].value = 1.1;
    ChartCfg.yAxis.plotLines[1].value = -1.1;
    chart.reset();
    
    var state = null;
    var isAlert = false;
    var ConnectAlert = false;
    var info = exchange.SetContractType(testContractType);//设置合约
    Log("info:",info);
    exchange.IO("mode",0);//设置行情 为立即返回模式
    var lastState = null;
    while(true){
        state = exchange.IO("status");
        if((state === true && lastState === false)){
            info = exchange.SetContractType(testContractType);
            while(info === null){
                state = exchange.IO("status");
                info = exchange.SetContractType(testContractType);
                //LogStatus("state:",state,"lastState:",lastState,"info:",info,"   登录 ，重新 设置 合约类型！");
                table.a1 = state;
                table.b1 = testContractType;
                table.c1 = "等待登录 ，重新 设置 合约类型。";
                if(state === false && lastState === true){
                    chart.add(0,[(new Date()).getTime(),-1]);
                }else if(state === true && lastState === false){
                    chart.add(0,[(new Date()).getTime(),1]);
                }
                chart.update(ChartCfg);
                Sleep(1000 * 60);
            }
        }
        if(state === true){
            var ticker = exchange.GetTicker();
            var records = exchange.GetRecords();
            //LogStatus("exchange.IO('status') `s state is:",state,"\n",ticker,"\n",records?records[records.length - 1] : records,"\n",exchange.GetAccount(),"\n",new Date(),"\n",info);
            table.a1 = state;
            table.b1 = testContractType;
            table.b3 = ticker;
            if(records === null){
                table.b5 = "null";
            }else if(records.length > 0){
                table.b5 = records[records.length - 1];
                table.c1 = "records.length:" + records.length;
            }
            table.c3 = exchange.GetAccount();
            if(ConnectAlert === false){
                Log("state:",state,"info:",info,"#99CC32");
                ConnectAlert = true;
            }
            //LogStatus("exchange.IO('status') `s state is:",state);
            //GetSomeContractMarketInfo(ContractArray);
            isAlert = false;
        }else{
            //LogStatus("exchange.IO('status') `s state is:",state,"time:",new Date(),"\n",info);
            table.a1 = state;
            if(isAlert === false){
                Log("state:",state,"info:",info,"#FF0000");
                Log("CTP商品期货测试微信提醒！state:" + state + "@");
                info = null;
                isAlert = true;
            }
            ConnectAlert = false;
        }
        //Log(exchange.IO("status"));
        //Log("ceshi");
        //记录状态到图表
        if(state === false && lastState === true){
            chart.add(0,[(new Date()).getTime(),-1]);
        }else if(state === true && lastState === false){
            chart.add(0,[(new Date()).getTime(),1]);
        }
        
        chart.update(ChartCfg);
        $.UpDateLogStatus("time:" + (new Date())); //更新 状态栏 图表内容
        lastState = state; //当前状态更新到上次状态
        Sleep(1000 * 5);
    }
}
```

> 策略出处

https://www.fmz.com/strategy/22838

> 更新时间

2018-06-05 14:04:34
