/*
策略出处: https://www.botvs.com/strategy/35986
策略名称: 转换任意K线周期
策略作者: 小小梦
策略描述:

示例策略
- 转换基础K线为任意K线周期
- 暂时不支持 秒级别
测试版本，如有BUG ，问题 欢迎留言。


参数                默认值           描述
----------------  ------------  -------
UI_NewCycleForMS  1000*60*60*2  合成周期毫秒数
*/

// K线周期合成  扩展为 根据基础K线 合成 为任意周期。
var cloneObj = function(obj) {                             // 深拷贝 对象函数
    var str, newobj = obj.constructor === Array ? [] : {};
    if (typeof obj !== 'object') {
        return;
    } else if (JSON) {
        str = JSON.stringify(obj);                         //系列化对象
            newobj = JSON.parse(str);                      //还原
    } else {
        for (var i in obj) {
            newobj[i] = typeof obj[i] === 'object' ?
                cloneObj(obj[i]) : obj[i];
        }
    }
    return newobj;
};

var DAY = 0;
var HOURS = 1;
var MINUTES = 2;
var isFirstFind = true;
var FirstStamp = null;

function GetDHM(objTime, BaseCycle, NewCycleForMS){
    var ret = [];
    if(BaseCycle % (1000 * 60 * 60 * 24) === 0){
        ret[0] = objTime.getDate();
        ret[1] = DAY;
    }else if(BaseCycle % (1000 * 60 * 60) === 0){
        ret[0] = objTime.getHours();
        ret[1] = HOURS;
    }else if(BaseCycle % (1000 * 60) === 0){
        ret[0] = objTime.getMinutes();
        ret[1] = MINUTES;
    }
    if(NewCycleForMS % (1000 * 60 * 60 * 24) === 0){
        ret[2] = DAY;
    }else if(NewCycleForMS % (1000 * 60 * 60) === 0){
        ret[2] = HOURS;
    }else if(NewCycleForMS % (1000 * 60) === 0){
        ret[2] = MINUTES;
    }
    return ret;
}

function SearchFirstTime(ret, BaseCycle, NewCycleForMS){
    if(ret[1] === DAY && ret[2] === DAY){ 
        var array_day = [];
        for(var i = 1 ; i < 29; i += (NewCycleForMS / BaseCycle)){
            array_day.push(i);
        }
        for(var j = 0 ; j < array_day.length; j++ ){
            if(ret[0] === array_day[j]){
                return true;
            }
        }
    }else if(ret[1] === HOURS && ret[2] === HOURS){
        var array_hours = [];
        for(var i = 0 ; i < 24; i += (NewCycleForMS / BaseCycle)){
            array_hours.push(i);
        }
        for(var j = 0 ; j < array_hours.length ; j++){
            if(ret[0] === array_hours[j]){
                return true;
            }
        }
    }else if(ret[1] === MINUTES && ret[2] === MINUTES){
        var array_minutes = [];
        for(var i = 0; i < 60; i += (NewCycleForMS / BaseCycle)){
            array_minutes.push(i);
        }
        for(var j = 0; j < array_minutes.length; j++){
            if(ret[0] === array_minutes[j]){
                return true;
            }
        }
    }else{
        throw "目标周期与基础周期不匹配！目标周期毫秒数：" + NewCycleForMS + " 基础周期毫秒数: " + BaseCycle;
    }
}

function Calc_High(AssRecords, n, BaseCycle, NewCycleForMS){
    var max = AssRecords[n].High;
    for(var i = 1 ; i < NewCycleForMS / BaseCycle; i++){
        max = Math.max(AssRecords[n + i].High, max);
    }
    return max;
}

function Calc_Low(AssRecords, n, BaseCycle, NewCycleForMS){
    var min = AssRecords[n].Low;
    for(var i = 1 ; i < NewCycleForMS / BaseCycle; i++){
        min = Math.min(AssRecords[n + i].Low, min);
    }
    return min;
}

function AssembleRecords(records, NewCycleForMS) {
    var AssRecords = records.slice(0); // 深拷贝
    var AfterAssRecords = [];
    
    if(!records || records.length < 2){
        throw (!records) ? "传入的records参数为 错误" + records : "基础K线长度小于2";
    }
    var BaseCycle = records[records.length - 1].Time - records[records.length - 2].Time;
    if(NewCycleForMS % BaseCycle !== 0){
        throw "目标周期‘" + NewCycleForMS + "’不是 基础周期 ‘" + BaseCycle + "’ 的整倍数，无法合成！";
    }
    if(NewCycleForMS / BaseCycle > records.length){
        throw "基础K线数量不足，请检查是否基础K线周期过小！";
    }

    // 判断时间戳, 找到 基础K线  相对于 目标K线的起始时间。
    var objTime = new Date();
    for (var i = 0; i < AssRecords.length; i++) {
        objTime.setTime(AssRecords[i].Time);
        var ret = GetDHM(objTime, BaseCycle, NewCycleForMS); 
        
        if (isFirstFind === true && SearchFirstTime(ret, BaseCycle, NewCycleForMS) === true) {
            FirstStamp = AssRecords[i].Time;
            for (j = 0; j < i; j++) {
                AssRecords.shift();        // 把目标K线周期前不满足合成的数据排除。
            }
            isFirstFind = false;
            break;                         // 排除后跳出
        }else if(isFirstFind === false){
            if((AssRecords[i].Time - FirstStamp) % NewCycleForMS === 0){
                for (j = 0; j < i; j++) {
                    AssRecords.shift();    // 把目标K线周期前不满足合成的数据排除。
                }
                break;
            }
        }
    }
    var BarObj = {                         // 定义一个 K线柱结构
        Time: 0,
        Open: 0,
        High: 0,
        Low: 0,
        Close: 0,
        Volume: 0,
    };
    var n = 0;
    for (n = 0; n < AssRecords.length - (NewCycleForMS / BaseCycle); n += (NewCycleForMS / BaseCycle)) {     // 合成
        /*
        {
        Time    :一个时间戳, 精确到毫秒，与Javascript的 new Date().getTime() 得到的结果格式一样
        Open    :开盘价
        High    :最高价
        Low :最低价
        Close   :收盘价
        Volume  :交易量
        }
        */
        BarObj.Time = AssRecords[n].Time;
        BarObj.Open = AssRecords[n].Open;
        BarObj.High = Calc_High(AssRecords, n, BaseCycle, NewCycleForMS); 
        BarObj.Low =  Calc_Low(AssRecords, n, BaseCycle, NewCycleForMS); 
        BarObj.Close = AssRecords[n + (NewCycleForMS / BaseCycle) - 1].Close;
        BarObj.Volume = AssRecords[n + (NewCycleForMS / BaseCycle) - 1].Volume;
        AfterAssRecords.push(cloneObj(BarObj));
    }
    
    BarObj.Time = AssRecords[n - (NewCycleForMS / BaseCycle)].Time + NewCycleForMS;  // 最后一根时间不能变，
    BarObj.Open = AssRecords[n].Open;
    BarObj.Close = AssRecords[AssRecords.length - 1].Close;
    BarObj.Volume = AssRecords[AssRecords.length - 1].Volume;
    var max = AssRecords[n].High;
    var min = AssRecords[n].Low;
    for(var index_n = n + 1 ;index_n < AssRecords.length; index_n++){
        max = Math.max(max, AssRecords[index_n].High);
        min = Math.min(min, AssRecords[index_n].Low);
    }
    BarObj.High = max;
    BarObj.Low = min;
    AfterAssRecords.push(cloneObj(BarObj));

    return AfterAssRecords;
}

function main() {                                                    // 测试代码
    var records = exchange.GetRecords();
    while (!records || records.length < 24) {
        records = exchange.GetRecords();
    }
    
    // 处理界面参数，  如果写到自己的策略里面 可以参考下
    var Num_UI_NewCycleForMS = 1;
    var arrayNum = UI_NewCycleForMS.split("*");
    for(var indexNum = 0 ; indexNum < arrayNum.length ; indexNum++){
        Num_UI_NewCycleForMS = Num_UI_NewCycleForMS * Number(arrayNum[indexNum]);
    }
    Log("自定义周期毫秒时间为：", Num_UI_NewCycleForMS);
    

    while(true){
        records = _C(exchange.GetRecords);
        // Log("原始K线数据：长度", records.length, "数据：", records);
        records = AssembleRecords(records, Num_UI_NewCycleForMS);        // 第一个参数是 基础K线， 第二个参数是 要转换的周期的 毫秒数， 1000 * 60 * 20 就是 转换为 20分钟
        // Log("转换后K线数据：长度", records.length, "数据：", records);
        $.PlotRecords(records, 'BTC');
        // throw "stop"; // ceshi
        Sleep(1000);
    }
}
