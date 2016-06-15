/*
策略出处: https://www.botvs.com/strategy/15498
策略名称: 从第三方获取K线 (商品期货版)
策略作者: 数·狂
策略描述:

如果在策略开始时必须获取足够多的K线，使用本模板则可从第三方直接获得指定合约的历史K线数据。
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
            "Time": Date.parse(info[i][0])-timeframe*60000-8*3600000,
            "Open": info[i][1],
            "High": info[i][2],
            "Low": info[i][3],
            "Close": info[i][4],
            "Volume": info[i][5]
        });
    }
    return record.reverse();
};

function main() {
    Log(exchange.GetName());
    var rec = $.BTRecords('rb1610', 5, 100); // 从BotVS获取螺纹钢1610的5分钟K线, 100条, 不含最后一条Bar
    if (rec) Log(rec.length, rec[rec.length - 1]);
    rec = $.SNRecords('MA609', 60, 100, true); // 从新浪财经获取甲醇609的1小时K线, 100条, 含最后一条Bar
    if (rec) Log(rec.length, rec[rec.length - 1]);
}
