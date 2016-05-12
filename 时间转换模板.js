/*
策略出处: https://www.botvs.com/strategy/14517
策略名称: 时间转换模板
策略作者: 小小梦
策略描述:

###把毫秒级的时间转换成 直观的 时间显示,比如 把 Record.Time 时间戳 （毫秒数） 和  Trade.Time   转换为 正常时间。也可以用于获取当前时间，如 传入参数为： new Date() 就显示当前时间。


参数      默认值    描述
------  -----  ---------------
isShow  false  是否在转换时输出转换后的时间。
*/

/*
-- 策略引用该模板以后直接用 $.Test() 调用此方法
-- main 函数在策略中不会触发, 只做为模板调试的入口
*/
$.getTimeByNormal = function(time) {
    if(typeof( time ) == "object" ){
        time = time.getTime();
        return getTimeByNormal(time);
    }else if(typeof( time ) == "number" ){
        return getTimeByNormal(time);
    }
    throw "时间转换模板导出函数传入参数类型错误！，请传入Date 类型 或 毫秒数";
};

function getTimeByNormal(time){
    var timeByNormal = new Date();
    timeByNormal.setTime(time);
    var strTime = timeByNormal.toString();
    if(isShow === true){
        Log("getTimeByNormal转换为：",strTime);
    }
    return strTime;
}

//测试
function main() {
    var time1 = $.getTimeByNormal( new Date() );
    Log("当前时间time1：",time1);
    Sleep(1000 * 60);
    var time3 = (new Date()).getTime();
    Log("毫秒级时间：",time3,"转换");
    var time2 =  $.getTimeByNormal( time3 );
    Log("转换后的时间：",time2);
    Log("new Date:",typeof(new Date()));
    Log("number :",typeof(12355554875425));
    //var str = "ssadfgg";
    //var returnStr = $.getTimeByNormal(str);    //传入一个 错误类型   字符串 实验下。。
    //Log("参数传入字符串：",returnStr);
    var records = exchange.GetRecords();
    while(!records || records.length < 10){
        records = exchange.GetRecords();
        Sleep(1000);
    }
    for(var i = 0; i < records.length; i++){
        Log(records[i],"时间转换：i:",i,"---",getTimeByNormal(records[i].Time));
    }
}
