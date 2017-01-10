/*
策略出处: https://www.botvs.com/strategy/15498
策略名称: 从第三方获取K线 (商品期货版) Rev. 161216
策略作者: 数·狂
策略描述:

如果在策略开始时必须获取足够多的K线，使用本模板则可从第三方直接获得指定合约的历史K线数据。
Update 20160810：支持和讯数据源。（推荐！注意：K线周期支持1、5、15、30、60<分钟>和1440<日线>、10080<周线>）
Update 20160615：支持新浪财经数据源。
注意：
仅适用于实盘交易。
作者不保证第三方数据准确性和程序正确性，仅供学习参考。

*/

$.BTRecords = function(instrument, timeframe, size, includeLastBar) {
    var info;
    var record = [];
    if (!size) size = 1;
    if (!timeframe) timeframe = 1;
    var fsize = size;
    var now = new Date();
    var to = Math.floor(now / 1000 / (timeframe * 60)) * (timeframe * 60);
    var from = to - fsize * timeframe * 60;
    do {
        try {
            info = JSON.parse(HttpQuery('https://www.botvs.com/chart/history?detail=true&symbol=' + instrument + '&resolution=' + timeframe + '&from=' + from + '&to=' + to));
            if (info && info.records) {
                info = info.records;
            } else {
                Log("获取K线时发生错误: 网络错误");
                return null;
            }
        } catch (e) {
            Log("获取K线时发生错误: 不完整的JSON数据");
            return null;
        }
        fsize = fsize * 2;
        from = to - fsize * timeframe * 60;
    } while (info.length < size + (!includeLastBar));
    for (var i = info.length - size - (!includeLastBar); i < info.length - (!includeLastBar); i++) {
        record.push({
            "Time": info[i][0] * 1000,
            "Open": info[i][1],
            "High": info[i][2],
            "Low": info[i][3],
            "Close": info[i][4],
            "Volume": info[i][5]
        });
    }
    return record;
};

$.SNRecords = function(instrument, timeframe, size, includeLastBar) {
    var info;
    var record = [];
    // if (!size) size = 1;
    if (!timeframe) timeframe = 1;
    var pInst = instrument.toUpperCase();
    if (pInst[pInst.length - 4] != '1') {
        pInst = pInst.slice(0, pInst.length - 3) + '1' + pInst.slice(pInst.length - 3);
    }
    try {
        info = JSON.parse(HttpQuery('http://stock2.finance.sina.com.cn/futures/api/json.php/IndexService.getInnerFuturesMiniKLine' + timeframe + 'm?symbol=' + pInst));
        if (!info) {
            Log("获取K线时发生错误: 网络错误或合约不存在");
            return null;
        }
    } catch (e) {
        Log("获取K线时发生错误: 不完整的JSON数据");
        return null;
    }
    for (var i = (includeLastBar ? 0 : 1); i < size + (includeLastBar ? 0 : 1); i++) {
        record.push({
            "Time": Date.parse(info[i][0]) - timeframe * 60000 - 8 * 3600000,
            "Open": Number(info[i][1]),
            "High": Number(info[i][2]),
            "Low": Number(info[i][3]),
            "Close": Number(info[i][4]),
            "Volume": Number(info[i][5])
        });
    }
    return record.reverse();
};
var instList = [{
    "xchg": "SHFE",
    "inst": ["fu", "ru", "wr"]
}, {
    "xchg": "SHFE2",
    "inst": ["ag", "au"]
}, {
    "xchg": "SHFE3",
    "inst": ["al", "bu", "cu", "hc", "ni", "pb", "rb", "sn", "zn"]
}, {
    "xchg": "CZCE",
    "inst": ["cf", "fg", "lr", "ma", "oi", "pm", "ri", "rm", "rs", "sf", "sm", "sr", "ta", "wh", "zc"]
}, {
    "xchg": "DCE",
    "inst": ["a", "b", "bb", "c", "cs", "fb", "i", "j", "jd", "jm", "l", "m", "p", "pp", "v", "y"]
}];

$.HXRecords = function(instrument, timeframe, size, includeLastBar) {
    var info;
    var record = [];
    var now = new Date();
    if (!size) size = 1;
    if (!timeframe) timeframe = 1;
    var pInst = instrument.toLowerCase();
    if (pInst[pInst.length - 4] != '1') {
        pInst = pInst.slice(0, pInst.length - 3) + '1' + pInst.slice(pInst.length - 3);
    }
    var filtered = instList.filter(function(xchg) {
        return xchg.inst.indexOf(pInst.slice(0, pInst.length - 4)) != -1;
    });
    var xchg = filtered.length ? filtered[0].xchg : null;
    if (!xchg) {
        Log("获取K线时发生错误: 找不到合约");
        return null;
    }
    var tf = (timeframe == 1 ? 0 : 
              timeframe == 5 ? 1 : 
              timeframe == 15 ? 2 : 
              timeframe == 30 ? 3 : 
              timeframe == 60 ? 4 :
              timeframe == 1440 ? 5 :
              timeframe == 10080 ? 6 : -1);
    if (tf < 0) {
        Log("获取K线时发生错误: K线周期不正确");
        return null;
    }
    var getTimestr = function(date) {
        var yyyy = date.getFullYear();
        var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return "".concat(yyyy).concat(mm).concat(dd).concat(hh).concat(min).concat(ss);
    };
    var getDate = function(timestr) {
        var str = timestr.toString();
        var y = str.substr(0, 4);
        var mo = str.substr(4, 2) - 1;
        var d = str.substr(6, 2);
        var h = str.substr(8, 2);
        var min = str.substr(10, 2);
        var sec = str.substr(12, 2);
        return new Date(y, mo, d, h, min, sec);
    };

    var timestr = getTimestr(new Date(now.getFullYear(), now.getMonth(), now.getDate()+1));
    try {
        var resp = HttpQuery('http://webftcn.hermes.hexun.com/shf/kline?code=' + xchg + pInst + '&start=' + timestr + '&number=-' + size + '&type=' + tf);
        info = JSON.parse(resp.slice(1, resp.length - 2));
        if (info && info.Data) {
            info = info.Data;
        } else {
            Log("获取K线时发生错误: 网络错误");
            return null;
        }
    } catch (e) {
        Log("获取K线时发生错误: 不完整的JSON数据");
        return null;
    }
    for (var i = 0; i < info[0].length - (!includeLastBar); i++) {
        record.push({
            "Time": getDate(info[0][i][0]).valueOf(),
            "Open": info[0][i][2] / info[4],
            "High": info[0][i][4] / info[4],
            "Low": info[0][i][5] / info[4],
            "Close": info[0][i][3] / info[4],
            "Volume": info[0][i][6]
        });
    }
    return record;
};

function main() {
    Log(exchange.GetName());
    var rec = $.BTRecords('rb1705', 5, 100); // 从BotVS获取螺纹钢1705的5分钟K线, 100条, 不含最后一条Bar
    if (rec) Log(rec.length, rec[rec.length - 1]);
    rec = $.SNRecords('MA705', 60, 100, true); // 从新浪财经获取甲醇705的1小时K线, 100条, 含最后一条Bar
    if (rec) Log(rec.length, rec[rec.length - 1]);
    rec = $.HXRecords('i1705', 15, 100, true); // 从和讯获取铁矿石1705的15分钟K线, 100条, 含最后一条Bar
    if (rec) Log(rec.length, rec[rec.length - 1]);
    rec = $.BTRecords('i1705', 15, 100, true); // BotVS数据对比
    if (rec) Log(rec.length, rec[rec.length - 1]);
    rec = $.SNRecords('i1705', 15, 100, true); // 新浪财经数据对比
    if (rec) Log(rec.length, rec[rec.length - 1]);
}
