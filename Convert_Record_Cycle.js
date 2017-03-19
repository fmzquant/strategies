/*
策略出处: https://www.botvs.com/strategy/37678
策略名称: Convert_Record_Cycle
策略作者: jxc6698
策略描述:

# 得到指定周期的蜡烛图 线数据

如有BUG ，问题 欢迎留言


参数                默认值           描述
----------------  ------------  -------
UI_NewCycleForMS  1000*60*60*2  合成周期毫秒数
*/

/**
*   author: jcx
*   date:   3/10/2017
*/
/**
*   修改自小小梦的"转换任意K线周期" 模板，支持设置任意的周期大小，支持输入ticker
*   时间设置必须是当前提供的 records[]周期的整数倍才有意义（在程序中没有检查）
*   
*
*  考虑到在getrecords() 返回的最后一个数据可能会改变．
*   1. 可以在main函数中循环　　从0 到 < length-1  
*   2. 或者是当前处理方法，在AddKLine方法中，使用timeAfOrEq()，允许最后一个时段的值更新
*       (隐含要求添加kline records　按照时间顺序)
*
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

/**
*   NeWCycleForMS: 新的周期
*   n            : 每次返回的 蜡烛records数组大小
*/
var DefaultN = 10
function AssembleRecords(NewCycleForMS, n) {
    var self = {}
    self.NewCycleForMS = NewCycleForMS;
    self.curBars = []       // 用来存储 最近 n 个蜡烛对象
    n = parseInt(n)         // 存储每次返回的蜡烛数量
    if (n*1 === n)
        self.n = n
    else
        self.n = DefaultN
    // 临时变量
    self.tmp = {lasttime: 0}

    self.timeAf = function (time1, time2) {
        return time1 < time2
    }
    self.timeAfOrEq = function (time1, time2) {
        return time1 <= time2
    }
    self.inSameKLine = function (time1, time2) {
        if (parseInt(time1/self.NewCycleForMS) === 
            parseInt(time2/self.NewCycleForMS)) {
            return true
        }
        return false;
    }
    self.getKlineStartTime = function (time) {
        return time - time%self.NewCycleForMS
    }
    self.newBarObj = function (time, v) {
        var value = 0;
        value = v
        return {                         // 定义一个 K线柱结构
            Time: time,
            Open: value,
            High: value,
            Low: value,
            Close: value,
            Volume: 0
        }
    }
    self.updateNewBar = function(time, defaultvalue) {
        var barobj;
        if (self.curBars.length == 0) {
            barobj = self.newBarObj(self.getKlineStartTime(time), 
                defaultvalue)
            self.curBars.push(barobj)
        } else if(!self.inSameKLine(self.curBars[self.curBars.length-1].Time,
            time) ) {
            barobj = self.newBarObj(self.getKlineStartTime(time),
                defaultvalue)
            self.curBars.push(barobj)
        }
            
        if (self.curBars.length > n+2) {
            self.curBars.shift()
        }
        return self.curBars[self.curBars.length-1];
    }
    self.AddTicker = function (ticker) {
        var barobj;
//      ticker should passed as time order
        barobj = self.updateNewBar(ticker.Time, ticker.Last);

        if (!self.timeAfOrEq(self.barobj[self.barobj.length-1].Time, 
            cker.Time)) {
            return;
        }        
        if (barobj.High < ticker.High)
            barobj.High = ticker.High
        if (barobj.Low > ticker.Low)
            barobj.Low = ticker.Low
        barobj.Close = ticker.Last
//        barobj.Volume += ticker.Volume
    }
    self.AddKLine = function (klinerecord) {
        var barobj;        

        // must use <=, when stepping into new record, last record may change
        if (!self.timeAfOrEq(self.tmp.lasttime, 
            klinerecord.Time)) {
            return
        }
        barobj = self.updateNewBar(klinerecord.Time, klinerecord.Open)
        self.tmp.lasttime = klinerecord.Time

        if (barobj.High < klinerecord.High) {
            barobj.High = klinerecord.High
        }
        if (barobj.Low > klinerecord.Low)
            barobj.Low = klinerecord.Low
        barobj.Close = klinerecord.Close
        barobj.Volume += klinerecord.Volumn
    }
    self.GetKline = function () {
        var len = self.curBars.length;
        return self.curBars.slice(len-self.n);
    }

    return self;
}

//  测试代码
function main() {
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
    
    // 第一个参数是 基础K线， 第二个参数是 要转换的周期的 毫秒数， 1000 * 60 * 20 就是 转换为 20分钟
    obj = AssembleRecords(Num_UI_NewCycleForMS, 5);      



    while(true){
        records = _C(exchange.GetRecords);
        
        for (var i=0;i<records.length;i++) {
            obj.AddKLine(records[i])
        }

        newrecords = obj.GetKline()
        $.PlotRecords(newrecords, 'BTC');

        // throw "stop"; // ceshi
        Sleep(1000);
    }
}
