/*
策略出处: https://www.fmz.com/strategy/79351
策略名称: 商品期货跟单系统
策略作者: Hukybo
策略描述:



*/

var arr = [];

//下单
function trade(symbol, type, unit) {
    var acc = _C(exchanges[0].GetAccount).Balance; //主账户
    for (var i = 1; i < exchanges.length; i++) {
        var ac = _C(exchanges[i].GetAccount).Balance; //子账户
        var dw = Math.floor(unit / (acc / ac)); //按资金比例下单
        if (dw < 1) {
            Log(i, ' 号账户资金不足');
            continue;
        }
        var mp = _C(exchanges[i].GetPosition); //子持仓
        var npm = $.NewPositionManager(exchanges[i]);
        if (type == 11) {
            npm.OpenLong(symbol, dw);
            Log(i, ' 号账户：', symbol, '：多开：', dw, ' 张');
        } else if (type == -11) {
            npm.OpenShort(symbol, dw);
            Log(i, ' 号账户：', symbol, '：空开：', dw, ' 张');
        } else if (type == 10 || type == -10) {
            for (var v = 0; v < mp.length; v++) {
                if (mp[v].ContractType == symbol) {
                    npm.Cover(symbol, dw);
                    if (type == 10) {
                        Log(i, ' 号账户：', symbol, '：多平：', dw, ' 张');
                    } else {
                        Log(i, ' 号账户：', symbol, '：空平：', dw, ' 张');
                    }
                }
            }
        } else if (type == 100 || type == -100) {
            for (var k = 0; k < mp.length; k++) {
                if (mp[k].ContractType == symbol) {
                    npm.Cover(symbol, mp[k].Amount);
                    Log(i, ' 号账户：', symbol, '：全平');
                }
            }
        }
    }
}

//匹配
function Comparison(arr) {
    for (var x in arr[1]) {
        if (arr[0][x]) {
            if (arr[1][x].Type == arr[0][x].Type) {
                if (arr[1][x].Amount - arr[0][x].Amount > 0) {
                    if (arr[1][x].Type == "多") {
                        trade(x, 11, arr[1][x].Amount - arr[0][x].Amount); //多头加仓
                    } else if (arr[1][x].Type == "空") {
                        trade(x, -11, arr[1][x].Amount - arr[0][x].Amount); //空头加仓
                    }
                } else if (arr[1][x].Amount - arr[0][x].Amount < 0) {
                    if (arr[1][x].Type == "多") {
                        trade(x, 10, arr[0][x].Amount - arr[1][x].Amount); //多头减仓
                    } else if (arr[1][x].Type == "空") {
                        trade(x, -10, arr[0][x].Amount - arr[1][x].Amount); //空头减仓
                    }
                }
            } else {
                if (arr[1][x].Type == "多") {
                    trade(x, -100, arr[0][x].Amount);
                    trade(x, 11, arr[1][x].Amount); //空头反手为多头
                } else if (arr[1][x].Type == "空") {
                    trade(x, 100, arr[0][x].Amount);
                    trade(x, -11, arr[1][x].Amount); //多头反手为空头
                }
            }
        } else {
            if (arr[1][x].Type == "多") {
                trade(x, 11, arr[1][x].Amount); //多开
            } else if (arr[1][x].Type == "空") {
                trade(x, -11, arr[1][x].Amount); //空开
            }
        }
    }
    for (var y in arr[0]) {
        if (!arr[1][y]) {
            if (arr[0][y].Type == "多") {
                trade(y, 100, arr[0][y].Amount); //多平
            } else if (arr[0][y].Type == "空") {
                trade(y, -100, arr[0][y].Amount); //空平
            }
        }
    }
}

//数据处理
function data() {
    var mp = _C(exchanges[0].GetPosition);
    var allDic = {};
    for (var v = 0; v < mp.length; v++) {
        var name = mp[v].ContractType;
        allDic[name] = {};
        allDic[name]["Amount"] = mp[v].Amount;
        var bs = "";
        if (mp[v].Type == 0 || mp[v].Type == 2) {
            bs = "多"
        } else {
            bs = "空"
        }
        allDic[name]["Type"] = bs;
    }
    arr.push(allDic);
    if (arr.length > 2) {
        arr.shift();
        Comparison(arr);
    }
}

function main() {
    for (var i = 0; i < exchanges.length; i++) {
        if (exchanges[i].GetName() !== 'Futures_CTP') {
            throw '只支持 CTP ！请检查第 ' + i + ' 个账户'
        }
    }
    SetErrorFilter("not login|ready|初始化");
    while (true) {
        if (exchanges[0].IO("status")) {
            data();
            LogStatus("开盘时间，与交易服务器连接成功。")
        } else {
            LogStatus("\n警告! 与交易服务器连接断开", "#DF0101", "\n", "\n未登录状态或该交易所已经闭市。", "#DF0101");
        }
        Sleep(100);
    }
}
