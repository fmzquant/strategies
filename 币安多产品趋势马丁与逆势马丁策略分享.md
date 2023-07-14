
> Name

币安多产品趋势马丁与逆势马丁策略分享

> Author

高频量化

> Strategy Description

策略定制 vx:18826683356
策略来源：FMZ网站
由于比较多人找我写马丁类型的策略。
那么我在网站上找了一个可以运行的分享给大家。
希望对大家投资活动有所帮助
实盘测试可以跑起来
私有地址: https://www.fmz.com/robot/1fa0aeff0dfdd66645a198f28766aa0c

策略特性：
1.趋势开单
2.逆势补仓
3.带有磨损解套
4.套利自动划转现货



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|OpType|0|操作类型: 做多|做空|自动: 做多|做空|多空双开|
|M|20|杠杆倍数|
|P|100|下单价值|
|IsAuto|false|启用趋势|
|IsHt|true|启用回调|
|Z|true|回撤止盈触发阀值(%)|
|K4|8|利润回撤止盈百分比(%)|
|E1|0.6|1-2补仓间距|
|E2|true|3-4补仓间距|
|E3|1.5|5-6补仓间距|
|E4|2|6+补仓间距|
|HcK4|8|回调补仓百分比(%)|
|C1|0.5|保本平仓线|
|longAddRate|true|多单加仓倍数|
|shortAddRate|true|空单加仓倍数|
|Jt|true|是否自动解套|
|maxLAC|10|多单磨损仓|
|maxSAC|10|空单磨损仓|
|Zs|false|是否止损|
|ZsLong|false|单币浮亏多单止损|
|ZsShort|false|单币浮亏空单止损|
|T0|600|转账/清仓阀值|
|T1|100|转账/清仓值|
|S|10|轮询时间(s)|




|Button|Default|Description|
|----|----|----|
|清空日志|__button__|清空日志|
|一键平仓|__button__|一键平仓|
|重置收益|__button__|重置收益|
|转到合约|100|转到合约|
|转到现货|100|转到现货|


> Source (javascript)

``` javascript
/*
 * @Author: top.brids 
 * @Date: 2022-02-13 22:12:34 
 * @Last Modified by: top.brids
 * @Last Modified time: 2022-02-14 17:01:14
 * @Last Remark: 策略定制 vx:18826683356
 */

let isOk = false;
let isBinance = false;
let SymbolsEx = [];
let button0 = [];
let stoplist = [];
let listpft = [];
let listpft2 = [];
let Qs = [];
let doLong = false;
let doShort = false;
let long1 = false;
let short1 = false;
let qsL = false;
let qsS = false;
let followCoins = [];
let exs = "";
let trade_info = {};
let loop_start2 = Date.now();

let acc = null;
let list1 = [];
let list2 = [];
let longAddCount = [];
let shortAddCount = [];
let lSubP = [];
let sSubP = [];
let mlist = 0;
let initMacd30 = { isSame: null, flag: '', coin: '' }
//2
let init_Balance = null;
let FSTTime = null;
//3
let k = 0;
//4
let BV1 = 0;
let CV1 = 0;
//5
let n1 = 0;
let account1 = null;
let position1 = null;
//6
let walletbalance = 0;
let walletB = 0;
let unrealizedProfit = 0;
let pft = 0;
let ir = 0;

//获取合约面值
function GetCtVal(coin1) {
    let coin = `${coin1.split('_')[0]}-${coin1.split('_')[1]}-SWAP`;
    let ctVal = 1;
    SymbolsEx.map((v, i) => {
        if (v.instId == coin) {
            ctVal = Number(v.ctVal);
        }
    });
    return ctVal;
}
//获取交易所精度 算首仓
function accuracyOk() {
    exchanges[k].SetContractType('swap');
    let coin = '';
    let coin1 = _C(exchanges[k].GetCurrency);
    coin = `${coin1.split('_')[0]}-${coin1.split('_')[1]}-SWAP`;
    let ticker1 = _C(exchanges[k].GetTicker)
    let quantityPrecision = 0;
    account1 = _C(exchanges[k].GetAccount)
    let minSz = 0;
    let ctVal = 1;
    SymbolsEx.map((v, i) => {
        if (v.instId == coin) {
            quantityPrecision = Number(v.lotSz);//下单数量精度
            minSz = Number(v.minSz) * Number(v.ctVal);
            ctVal = Number(v.ctVal);
        }
    });
    n1 = _N(P / ticker1.Last, quantityPrecision)
    let msg = ''
    if (n1 <= 0 || n1 < minSz) {
        n1 = 0;
        msg = `当前下单面值可开单个数${n1},${coin}=>最小下单数量:${minSz}`
    }

    n1 = _N(n1 / ctVal, 0)
    let data = { coin: coin1, amount: n1, msg: msg }
    Log(coin, '下单价值', P, 'U', '开单张数', n1, '合约面值', ctVal)
    return data;
}
//binance
function accuracyBinance() {
    exchanges[k].SetContractType('swap');
    let coin = '';
    let coin1 = _C(exchanges[k].GetCurrency);
    coin = coin1.split('_')[0] + coin1.split('_')[1];
    let ticker1 = _C(exchanges[k].GetTicker)
    let quantityPrecision = 0;
    account1 = _C(exchanges[k].GetAccount)
    SymbolsEx.map((v, i) => {
        if (v.symbol == coin) {
            quantityPrecision = v.quantityPrecision;
        }
    });
    n1 = _N(P / ticker1["Last"], quantityPrecision)
    let msg = ''
    if (n1 <= 0) {
        msg = `${coin},当前下单面值可开单个数${n1}`
    }
    let data = { coin: coin1, amount: n1, msg: msg }
    Log(coin, n1, '下单价值', P, 'U', '开单个数', n1)
    return data;
}
//
function table() {
    account1 = _C(exchange.GetAccount)
    let pos = []
    account1.Info.positions.map(v => {
        if (Number(v.positionAmt) != 0) {
            pos.push(v)
        }
    })
    //USDT保证金余额
    let totalMarginBalance = 0;
    let walletbalance = 0;
    unrealizedProfit = 0;
    //获取账户基本信息
    position1 = _C(exchange.GetPosition)
    if (isOk) {
        totalMarginBalance = account1.Info.data[0].details[0].cashBal;
        walletbalance = account1.Info.data[0].details[0].disEq;
        unrealizedProfit = account1.Info.data[0].details[0].upl;
    }
    if (isBinance) {
        totalMarginBalance = account1.Info.totalMarginBalance;
        walletbalance = account1.Info.totalWalletBalance;
        unrealizedProfit = account1.Info.totalUnrealizedProfit;
    }
    let toxh = _G('ToXh') == null ? 0 : _G('ToXh');
    let toHy = _G('ToHy') == null ? 0 : _G('ToHy');
    let lsAmount = _G("lsAmount") == null ? 0 : _G("lsAmount");
    let fee = _N(lsAmount * 0.01 * 0.075, 4);

    pft = _N((parseFloat(walletbalance) - parseFloat(init_Balance) + parseFloat(toxh) - parseFloat(toHy)), 6);
    //table2内容, USDT
    let NOWTime = _D() //当前时间
    let profit_ratio = 0
    if (init_Balance != 0) {
        profit_ratio = ((parseFloat(walletbalance) + toxh - parseFloat(init_Balance)) / parseFloat(init_Balance)) * 100
    }

    ///两个表格的选项
    let tab1 = {
        "type": "table",
        "title": "账户信息",
        "cols": ["初始资金", "钱包余额", "保证金余额", "划转到现货", "划转到合约", "全部未实现盈亏", "杠杆倍数", "全部净利润", "总收益率", "交易流水", "手续费", "循环延时"],
        "rows": []
    }
    let tabc = {
        "type": "table",
        "title": "交易对信息",
        "cols": ["币种名称", "趋势", "开仓价格", "持仓方向", "持仓数量", "持仓价值", "未实现盈亏", "L | S | I ", "操作"],
        "rows": []
    }
    let tab2 = {
        "type": "table",
        "title": "时间",
        "cols": ["初始时间", "当前时间"],
        "rows": []
    }
    let tab4 = {
        "type": "table",
        "title": "联系方式",
        "cols": ["微信", "QQ", "Telegram", "说明"],
        "rows": []
    }
    let jieshao1 = ''
    let jieshao2 = '[合作添加备注FMZ]'
    let str = "✱策略 #32CD32"
    let str2 = "✱实盘风险自担 #007FFF"
    //往表格里加内容
    tab1.rows.push([`${_N(parseFloat(init_Balance), 6)}U`, `${_N(parseFloat(walletbalance), 6)}U`, `${_N(parseFloat(totalMarginBalance), 6)}U`, `${toxh}U`, `${toHy}U`, `${_N(parseFloat(unrealizedProfit), 6)}U`, `${M}`, `${pft}U`, `${_N(profit_ratio, 6)}%`, `${lsAmount}U`, `${fee}U`, `${trade_info.loop_delay}ms #FF0000`])
    tab2.rows.push([`${FSTTime}`, `${NOWTime}`])
    tab4.rows.push([`${jieshao1}`, "", "https://", `${jieshao2}`])
    for (let i = 0; i < pos.length; i++) {
        let v = pos[i];
        let ir = followCoins.indexOf(v.symbol);
        let qs = Qs[ir] == "Long" ? "Long #00FF00" : Qs[ir] == "Short" ? "Short #FF0000" : "震荡中 #3299cc"
        button0[i] = { "type": "button", "name": "平仓", "cmd": `${v.symbol}:平仓:${v.positionSide}:${v.positionAmt}`, "description": "平仓" }
        let pc = 0;
        let pc2 = 0;
        let tj = 0;
        if (ir != -1) {
            lSubP[ir] = _N(lSubP[ir], 4)
            tj = lSubP[ir] > 0 ? `${lSubP[ir]} #00FF00` : `${lSubP[ir]} #FF0000`;
            pc = _N(list1[ir], 4)
            pc2 = _N(list2[ir], 4)
        }
        tabc.rows.push([v.symbol, qs, _N(Number(v.entryPrice), 4), v.positionSide == "LONG" ? `${v.positionSide}#32CD32` : `${v.positionSide}#FF0000`, Math.abs(Number(v.positionAmt)), `${_N(Number(v.initialMargin), 2)}U[${v.leverage}]X`, Number(v.unrealizedProfit) < 0 ? `${_N(Number(v.unrealizedProfit), 4)} #FF0000` : `${_N(Number(v.unrealizedProfit), 4)} #32CD32`, `${pc} | ${pc2} | ${tj}`, button0[i]])
    }
    //打印栏
    LogStatus("`" + JSON.stringify(tab2) + "`\n" + "`" + JSON.stringify(tab1) + "`\n" + "`" + JSON.stringify(tabc) + "`\n" + "`" + JSON.stringify(tab4) + "`\n" + "策略启动时间:" + FSTTime + "\n" + str + "\n" + str2)
}
//
function CalLsAmount(amount, price) {
    let lsUsdt = parseFloat(amount) * parseFloat(price) * 2;
    let lsAmount = _G("lsAmount") == null ? 0 : _G("lsAmount");
    lsAmount += lsUsdt;
    lsAmount = _N(lsAmount, 4)
    _G("lsAmount", lsAmount)
}
//
function Coverall() {
    account1 = _C(exchange.GetAccount)
    if (isOk) {
        walletbalance = account1.Info.data[0].details[0].cashBal;
        unrealizedProfit = account1.Info.data[0].details[0].upl;
    }
    if (isBinance) {
        walletbalance = account1.Info.totalWalletBalance;
        unrealizedProfit = account1.Info.totalUnrealizedProfit;
    }
    for (let i = 0; i < exchanges.length; i++) {
        exchanges[i].SetContractType("swap")
        let _position1 = _C(exchanges[i].GetPosition)
        let position1 = []
        let sPos = "";
        let lPos = "";
        for (let i = 0; i < _position1.length; i++) {
            let v = _position1[i];
            if (v.Type == 0) {
                lPos = v;
            }
            if (v.Type == 1) {
                sPos = v;
            }
        }
        if (lPos != "") {
            position1.push(lPos)
        }
        if (sPos != "") {
            position1.push(sPos)
        }
        if (position1.length == 1) {
            if (position1[0]["Type"] == 0) {
                exchanges[i].SetDirection("closebuy")
                exchanges[i].Sell(-1, position1[0].Amount)
                let ticker1 = _C(exchanges[i].GetTicker)
                CalLsAmount(position1[0].Amount, ticker1.Last)
            }
            if (position1[0]["Type"] == 1) {
                exchanges[i].SetDirection("closesell")
                exchanges[i].Buy(-1, position1[0].Amount)
                let ticker1 = _C(exchanges[i].GetTicker)
                CalLsAmount(position1[0].Amount, ticker1.Last)
            }
        }
        if (position1.length == 2) {
            exchanges[i].SetDirection("closebuy")
            exchanges[i].Sell(-1, position1[0].Amount)
            let ticker1 = _C(exchanges[i].GetTicker)
            CalLsAmount(position1[0].Amount, ticker1.Last)
            exchanges[i].SetDirection("closesell")
            exchanges[i].Buy(-1, position1[1].Amount)
            CalLsAmount(position1[1].Amount, ticker1.Last)
        }
    }
    _G('lSubP', null);
    _G('sSubP', null);
    _G('acc', null);
    _G('listpft', null);
    _G('listpft2', null)
    _G('list1', null);
    _G('list2', null);
    _G('mlist', null);
    _G('longAddCount', null);
    _G('shortAddCount', null);
    Log('您的账户已经全部清仓@')
}
//
function CancelOrderAll(e) {
    let orders = e.GetOrders()
    if (orders.length > 0) {
        for (let i = 0; i < orders.length; i++) {
            let order = orders[i];
            e.CancelOrder(order.Id)
        }
        Log("撤销所有未成功订单")
    }
}
//
//
function GetE(ir, type) {
    let count = 0;
    let rate = E1;
    if (type == 0) {
        count = longAddCount[ir]
    }
    if (type == 1) {
        count = longAddCount[ir]
    }
    if (count > 0 && count < 2) {
        rate = E1
    } else if (count >= 2 && count < 4) {
        rate = E2
    }
    else if (count >= 4 && count < 6) {
        rate = E3
    }
    else if (count >= 6) {
        rate = E4
    } else {
        rate = E1
    }
    rate = rate * 0.01;
    return rate;
}
//
//trade
function trade() {
    let currency = _C(exchanges[ir].GetCurrency)
    position1 = _C(exchanges[ir].GetPosition)
    let ticker1 = _C(exchanges[ir].GetTicker)
    let ctVal = 1;

    let quantityPrecision = 0;
    if (isBinance) {
        let _currency = currency.split("_")[0] + currency.split("_")[1]
        SymbolsEx.map((v, i) => {
            if (v.symbol == _currency) {
                quantityPrecision = v.quantityPrecision;
            }
        });
    }
    if (!IsAuto || OpType == 0 || OpType == 1) {
        long1 = true;
        short1 = true;
    }
    if (OpType == 0) {
        doLong = true;
    } else if (OpType == 1) {
        doShort = true;
    } else {
        if (IsAuto) {
            //趋势判断
            if (Date.now() - loop_start2 > 60000) {
                loop_start2 = Date.now();
                let r = exchanges[ir].GetRecords(PERIOD_M1)
                let kdj = TA.KDJ(r, 9, 3, 3)
                let k = kdj[0][kdj[0].length - 1];
                let k2 = kdj[0][kdj[0].length - 2];
                let d = kdj[1][kdj[1].length - 1];
                let d2 = kdj[1][kdj[1].length - 2];
                let emaFast = TA.EMA(r, 7);
                let emaSlow = TA.EMA(r, 12);
                let kdj2 = TA.KDJ(r, 9, 3, 3)
                let k3 = kdj2[0][kdj2[0].length - 1];
                let d3 = kdj2[1][kdj2[1].length - 1];
                qsL = emaFast[emaFast.length - 1] > emaSlow[emaSlow.length - 1] && k3 > d3;
                qsS = emaFast[emaFast.length - 1] < emaSlow[emaSlow.length - 1] && k3 < d3;
                doLong = qsL;
                doShort = qsS;
                let boll = TA.BOLL(r, 75, 2)
                let upLine = boll[0][boll[0].length - 1]
                let downLine = boll[2][boll[2].length - 1]
                if (ticker1.Last >= upLine) {
                    long1 = k2 <= d2 && k > d
                } else if (ticker1.Last <= downLine) {
                    short1 = k2 >= d2 && k < d
                } else {
                    long1 = true;
                    short1 = true;
                }
            }
        } else {
            doLong = true;
            doShort = true;
        }
    }
    Qs[ir] = IsAuto ? doLong ? "Long" : doShort ? "Short" : "" : ""
    //止损
    if (Zs) {
        if (position1.length == 2) {
            if (ZsLong != 0 && position1[0].Profit < -ZsLong && longAddCount[ir] >= maxLAC) {
                exchanges[ir].SetDirection('closebuy')
                exchanges[ir].Sell(-1, position1[0].Amount)
                CalLsAmount(position1[0].Amount, ticker1.Last)
                list1[ir] = 0
                _G('list1', list1)
                longAddCount[ic] = 0;
                _G('longAddCount', longAddCount)
                lSubP[ir] = 0;
                _G('lSubP', lSubP);
                Log(currency, '多单止损 卖出平多 清仓')
                LogProfit(pft)
            }
            if (ZsShort != 0 && position1[1].Profit < -ZsShort && shortAddCount[ir] >= maxSAC) {
                exchanges[ir].SetDirection('closesell')
                exchanges[ir].Buy(-1, position1[1].Amount)
                CalLsAmount(position1[1].Amount, ticker1.Last)
                list2[ir] = 0
                _G('list2', list2)
                shortAddCount[ir] = 0;
                _G('shortAddCount', shortAddCount)
                sSubP[ir] = 0;
                _G('sSubP', sSubP);
                Log(currency, '空单止损 买入平空 清仓')
                LogProfit(pft)
            }
        }
        if (position1.length == 1) {
            if (ZsLong != 0 && position1[0].Type == 0) {
                if (position1[0].Profit < -ZsLong && longAddCount[ir] >= maxLAC) {
                    exchanges[ir].SetDirection('closebuy')
                    exchanges[ir].Sell(-1, position1[0].Amount)
                    CalLsAmount(position1[0].Amount, ticker1.Last)
                    list1[ir] = 0
                    _G('list1', list1)
                    longAddCount[ic] = 0;
                    _G('longAddCount', longAddCount)
                    lSubP[ir] = 0;
                    _G('lSubP', lSubP);
                    Log(currency, '多单止损 卖出平多 清仓')
                    LogProfit(pft)
                }
            }
            if (ZsShort != 0 && position1[0].Type == 1) {
                if (position1[0].Profit < -ZsShort && shortAddCount[ir] >= maxSAC) {
                    exchanges[ir].SetDirection('closesell')
                    exchanges[ir].Buy(-1, position1[0].Amount)
                    CalLsAmount(position1[0].Amount, ticker1.Last)
                    list2[ir] = 0
                    _G('list2', list2)
                    shortAddCount[ir] = 0;
                    _G('shortAddCount', shortAddCount)
                    sSubP[ir] = 0;
                    _G('sSubP', sSubP);
                    Log(currency, '空单止损 买入平空 清仓')
                    LogProfit(pft)
                }
            }
        }
    }
    //解套

    //保本平仓

    //大周期上升
    if (doLong && longAddCount[ir] < maxLAC) {
        if (position1.length == 0) {
            //1分钟金叉开多
            if (long1) {
                exchanges[ir].SetDirection('buy')
                exchanges[ir].Buy(-1, acc[ir])
                list1[ir] = ticker1.Last;
                _G('list1', list1)
                Log(currency, '进场开多,首单进场价格1:', list1[ir])
                LogProfit(pft)
            }
        }
        if (position1.length > 0) {
            // 只持有1单
            if (position1.length == 1) {
                // 只持有多单
                if (position1[0].Type == 0) {
                    if ((position1[0].Profit + lSubP[ir]) > 0.01 * Z * ticker1.Last * position1[0].Amount * ctVal) {
                        listpft[ir].push(position1[0].Profit)
                        _G('listpft', listpft)
                        let maxpft = Math.max(...listpft[ir])
                        if (position1[0].Profit < (1 - 0.01 * K4) * maxpft) {
                            exchanges[ir].SetDirection('closebuy')
                            exchanges[ir].Sell(-1, position1[0].Amount)
                            CalLsAmount(position1[0].Amount, ticker1.Last)
                            listpft[ir] = []
                            _G('listpft', listpft)
                            longAddCount[ir] = 0;
                            _G('longAddCount', longAddCount);
                            list1[ir] = 0
                            _G('list1', list1)
                            lSubP[ir] = 0;
                            _G('lSubP', lSubP);
                            Log(currency, '止盈信号达到1:', K4, ',平多止盈')
                            LogProfit(pft)
                            return;
                        }
                    }
                    //金叉给多单补仓
                    if (position1[0].Profit < 0) {
                        if (list1[ir].Price == 0 || list1[ir] == undefined) {
                            list1[ir] = position1[0].Price
                        }
                        if (ticker1.Last < (1 - GetE(ir, 0)) * list1[ir]) {
                            listpft[ir].push(position1[0].Profit)
                            _G('listpft', listpft)
                            let maxpft = Math.min(...listpft[ir])
                            if (position1[0].Profit > (1 - 0.01 * HcK4) * maxpft) {
                                exchanges[ir].SetDirection('buy')
                                let amount = acc[ir] * Math.pow(2, longAddCount[ir])
                                exchanges[ir].Buy(-1, amount);
                                list1[ir] = ticker1.Last;
                                _G('list1', list1)
                                longAddCount[ir] = longAddCount[ir] + 1;
                                _G('longAddCount', longAddCount);
                                Log(`1.${currency},补仓信号${HcK4},多单补仓,补仓价格:${list1[ir]},补仓次数:${longAddCount[ir]}`)
                                LogProfit(pft)
                            }
                        }
                    }
                }
                //只持有空单
                if (position1[0].Type == 1) {
                    //1分钟金叉开多
                    if (long1) {
                        exchanges[ir].SetDirection('buy')
                        exchanges[ir].Buy(-1, acc[ir])
                        list1[ir] = ticker1.Last;
                        _G('list1', list1)
                        Log(currency, '进场开多,首单进场价格2:', list1[ir])
                        LogProfit(pft);
                    }
                    //空单补仓
                    if (position1[0].Profit < 0) {
                        if (list2[ir].Price == 0 || list2[ir] == undefined) {
                            list2[ir] = position1[0].Price
                        }
                        if (ticker1.Last > (1 + 3 * GetE(ir, 1)) * list2[ir]) {
                            listpft2[ir].push(position1[0].Profit)
                            _G('listpft2', listpft2)
                            let maxpft2 = Math.min(...listpft2[ir])
                            if (position1[0].Profit > (1 - 0.01 * HcK4) * maxpft2) {
                                exchanges[ir].SetDirection('sell')
                                let amount = acc[ir] * Math.pow(2, shortAddCount[ir])
                                exchanges[ir].Sell(-1, amount)
                                list2[ir] = ticker1.Last;
                                _G('list2', list2)
                                shortAddCount[ir] = shortAddCount[ir] + 1;
                                _G('shortAddCount', shortAddCount);
                                Log(`${currency},补仓信号${HcK4},空单补仓,补仓价格:${list2[ir]},补仓次数:${shortAddCount[ir]}`)
                                LogProfit(pft)
                            }
                        }
                    } else {
                        //空单止盈
                        if ((position1[0].Profit + sSubP[ir]) > 0.01 * C1 * ticker1.Last * position1[0].Amount * ctVal) {
                            exchanges[ir].SetDirection('closesell')
                            exchanges[ir].Buy(-1, position1[0].Amount)
                            CalLsAmount(position1[0].Amount, ticker1.Last)
                            list2[ir] = 0
                            _G('list2', list2)
                            shortAddCount[ir] = 0;
                            _G('shortAddCount', shortAddCount);
                            sSubP[ir] = 0;
                            _G('sSubP', sSubP);
                            Log(currency, '空单盈利,平空止盈1')
                            LogProfit(pft);
                        }
                    }
                }
            }
            if (position1.length == 2) {
                //多单模块
                if ((position1[0].Profit + lSubP[ir]) > 0.01 * Z * ticker1.Last * position1[0].Amount * ctVal) {
                    listpft[ir].push(position1[0].Profit)
                    _G('listpft', listpft)
                    let maxpft = Math.max(...listpft[ir])
                    if (position1[0].Profit < (1 - 0.01 * K4) * maxpft) {
                        exchanges[ir].SetDirection('closebuy')
                        exchanges[ir].Sell(-1, position1[0].Amount)
                        CalLsAmount(position1[0].Amount, ticker1.Last)
                        listpft[ir] = []
                        _G('listpft', listpft)
                        longAddCount[ir] = 0;
                        _G('longAddCount', longAddCount);
                        lSubP[ir] = 0;
                        _G('lSubP', lSubP);
                        list1[ir] = 0
                        _G('list1', list1)
                        Log(currency, '止盈信号达到2:', K4, ',平多止盈')
                        LogProfit(pft)
                    }
                } else {
                    //金叉给多单补仓
                    if (position1[0].Profit < 0) {
                        if (list1[ir] == 0 || list1[ir] == undefined) {
                            list1[ir] = position1[0].Price
                        }
                        if (ticker1.Last < (1 - GetE(ir, 0)) * list1[ir]) {
                            listpft[ir].push(position1[0].Profit)
                            _G('listpft', listpft)
                            let maxpft = Math.min(...listpft[ir])
                            if (position1[0].Profit > (1 - 0.01 * HcK4) * maxpft) {
                                exchanges[ir].SetDirection('buy')
                                let amount = acc[ir] * Math.pow(2, longAddCount[ir])
                                exchanges[ir].Buy(-1, amount)
                                list1[ir] = ticker1.Last;
                                _G('list1', list1)
                                longAddCount[ir] = longAddCount[ir] + 1;
                                _G('longAddCount', longAddCount);
                                Log(`2.${currency},补仓信号${HcK4},多单补仓,补仓价格:${list1[ir]},补仓次数:${longAddCount[ir]}`)
                                LogProfit(pft)
                            }
                        }
                    }
                }
                //空单补仓
                if (position1[1].Profit < 0) {
                    if (list2[ir] == 0 || list2[ir] == undefined) {
                        list2[ir] = position1[1].Price
                    }
                    if (ticker1.Last > (1 + 3 * GetE(ir, 1)) * list2[ir]) {
                        listpft2[ir].push(position1[1].Profit)
                        _G('listpft2', listpft2)
                        let maxpft2 = Math.min(...listpft2[ir])
                        if (position1[1].Profit > (1 - 0.01 * HcK4) * maxpft2) {
                            exchanges[ir].SetDirection('sell')
                            let amount = acc[ir] * Math.pow(2, shortAddCount[ir]);
                            exchanges[ir].Sell(-1, amount)
                            list2[ir] = ticker1.Last;
                            _G('list2', list2)
                            shortAddCount[ir] = shortAddCount[ir] + 1;
                            _G('shortAddCount', shortAddCount);
                            Log(`${currency},补仓信号${HcK4},空单补仓,补仓价格:${list2[ir]},补仓次数:${shortAddCount[ir]}`)
                            LogProfit(pft)
                        }
                    }
                } else {
                    if ((position1[1].Profit + sSubP[ir]) > 0.01 * C1 * ticker1.Last * position1[1].Amount * ctVal) {
                        exchanges[ir].SetDirection('closesell')
                        exchanges[ir].Buy(-1, position1[1].Amount)
                        CalLsAmount(position1[1].Amount, ticker1.Last)
                        list2[ir] = 0
                        _G('list2', list2)
                        shortAddCount[ir] = 0;
                        _G('shortAddCount', shortAddCount);
                        sSubP[ir] = 0
                        _G('sSubP', sSubP);
                        Log(currency, '空单盈利,平空止盈2')
                        LogProfit(pft)
                    }
                }
            }
        }
    }
    //大周期下降
    if (doShort && shortAddCount[ir] < maxSAC) {
        if (position1.length == 0) {
            //1分钟死叉开空
            if (short1) {
                exchanges[ir].SetDirection('sell')
                exchanges[ir].Sell(-1, acc[ir])
                list2[ir] = ticker1.Last;
                _G('list2', list2)
                Log(currency, '进场开空,首单进场价格1:', list2[ir])
                LogProfit(pft)
            }
        }
        if (position1.length > 0) {
            // 只持有1单
            if (position1.length == 1) {
                // 只持有空
                if (position1[0].Type == 1) {
                    if ((position1[0].Profit + sSubP[ir]) > 0.01 * Z * ticker1.Last * position1[0].Amount * ctVal) {
                        listpft2[ir].push(position1[0].Profit)
                        _G('listpft2', listpft2)
                        let maxpft2 = Math.max(...listpft2[ir])
                        if (position1[0].Profit < (1 - 0.01 * K4) * maxpft2) {
                            exchanges[ir].SetDirection('closesell')
                            exchanges[ir].Buy(-1, position1[0].Amount)
                            CalLsAmount(position1[0].Amount, ticker1.Last)
                            Log(currency, '止盈信号1:', K4, ',平空止盈')
                            LogProfit(pft)
                            listpft2[ir] = []
                            _G('listpft2', listpft2)
                            shortAddCount[ir] = 0;
                            _G('shortAddCount', shortAddCount);
                            sSubP[ir] = 0;
                            _G('sSubP', sSubP);
                            list2[ir] = 0
                            _G('list2', list2)
                        }
                    } else {
                        //死叉给空单补仓
                        if (position1[0].Profit < 0) {
                            if (list2[ir] == 0 || list2[ir] == undefined) {
                                list2[ir] = position1[0].Price
                            }
                            if (ticker1.Last > (1 + GetE(ir, 1)) * list2[ir]) {
                                listpft2[ir].push(position1[0].Profit)
                                _G('listpft2', listpft2)
                                let maxpft2 = Math.min(...listpft2[ir])
                                if (position1[0].Profit > (1 - 0.01 * HcK4) * maxpft2) {
                                    exchanges[ir].SetDirection('sell')
                                    let amount = acc[ir] * Math.pow(2, shortAddCount[ir]);
                                    exchanges[ir].Sell(-1, amount)
                                    list2[ir] = ticker1.Last;
                                    _G('list2', list2)
                                    shortAddCount[ir] = shortAddCount[ir] + 1;
                                    _G('shortAddCount', shortAddCount);
                                    Log(`1.${currency},补仓信号${HcK4},空单补仓,补仓价格:${list2[ir]},补仓次数:${shortAddCount[ir]}`)
                                    LogProfit(pft)
                                }
                            }
                        }
                    }
                }
                //只持有多单
                if (position1[0].Type == 0) {
                    //1分钟死叉开空
                    if (short1) {
                        exchanges[ir].SetDirection('sell')
                        exchanges[ir].Sell(-1, acc[ir])
                        list2[ir] = ticker1.Last;
                        _G('list2', list2)
                        Log(currency, '进场开空,首单进场价格2:', list2[ir])
                        LogProfit(pft)
                    }
                    //多单补仓
                    if (position1[0].Profit < 0) {
                        if (list1[ir] == 0 || list1[ir] == undefined) {
                            list1[ir] = position1[0].Price
                        }
                        if (ticker1.Last < (1 - 3 * GetE(ir, 0)) * list1[ir]) {
                            listpft[ir].push(position1[0].Profit)
                            _G('listpft', listpft)
                            let maxpft = Math.min(...listpft[ir])
                            if (position1[0].Profit > (1 - 0.01 * HcK4) * maxpft) {
                                exchanges[ir].SetDirection('buy')
                                let amount = acc[ir] * Math.pow(2, longAddCount[ir]);
                                exchanges[ir].Buy(-1, amount);
                                list1[ir] = ticker1.Last;
                                _G('list1', list1)
                                longAddCount[ir] = longAddCount[ir] + 1;
                                _G('longAddCount', longAddCount);
                                Log(`${currency},补仓信号${HcK4},多单补仓,补仓价格:${list1[ir]},补仓次数:${longAddCount[ir]}`)
                                LogProfit(pft)
                            }
                        }
                    } else {
                        if ((position1[0].Profit + lSubP[ir]) > 0.01 * C1 * ticker1.Last * position1[0].Amount * ctVal) {
                            exchanges[ir].SetDirection('closebuy')
                            exchanges[ir].Sell(-1, position1[0].Amount)
                            CalLsAmount(position1[0].Amount, ticker1.Last)
                            list1[ir] = 0
                            _G('list1', list1)
                            longAddCount[ir] = 0;
                            _G('longAddCount', longAddCount);
                            lSubP[ir] = 0;
                            _G('lSubP', lSubP);
                            Log(currency, `多单盈利,平多止盈1`)
                            LogProfit(pft)
                        }
                    }
                }
            }
            if (position1.length == 2) {
                //空单模块
                if ((position1[1].Profit + sSubP[ir]) > 0.01 * Z * ticker1.Last * position1[1].Amount * ctVal) {
                    listpft2[ir].push(position1[1].Profit)
                    _G('listpft2', listpft2)
                    let maxpft2 = Math.max(...listpft2[ir])
                    if (position1[1].Profit < (1 - 0.01 * K4) * maxpft2) {
                        exchanges[ir].SetDirection('closesell')
                        exchanges[ir].Buy(-1, position1[1].Amount)
                        CalLsAmount(position1[1].Amount, ticker1.Last)
                        Log(currency, '止盈信号:', K4, ',平空止盈')
                        LogProfit(pft)
                        listpft2[ir] = []
                        _G('listpft2', listpft2)
                        shortAddCount[ir] = 0;
                        _G('shortAddCount', shortAddCount);
                        sSubP[ir] = 0;
                        _G('sSubP', sSubP);
                        list2[ir] = 0
                        _G('list2', list2)
                    }
                } else {
                    //死叉给空单补仓
                    if (position1[1].Profit < 0) {
                        if (list2[ir] == 0 || list2[ir] == undefined) {
                            list2[ir] = position1[1].Price
                        }
                        if (ticker1.Last > (1 + GetE(ir, 1)) * list2[ir]) {
                            listpft2[ir].push(position1[1].Profit)
                            _G('listpft2', listpft2)
                            let maxpft2 = Math.min(...listpft2[ir])
                            if (position1[1].Profit > (1 - 0.01 * HcK4) * maxpft2) {
                                exchanges[ir].SetDirection('sell')
                                let amount = acc[ir] * Math.pow(2, shortAddCount[ir]);
                                exchanges[ir].Sell(-1, amount)
                                list2[ir] = ticker1.Last;
                                _G('list2', list2)
                                shortAddCount[ir] = shortAddCount[ir] + 1;
                                _G('shortAddCount', shortAddCount);
                                Log(`2.${currency},补仓信号${HcK4},空单补仓,补仓价格:${list2[ir]},补仓次数:${shortAddCount[ir]}`)
                                LogProfit(pft)
                            }
                        }
                    }
                }
                //多单补仓
                if (position1[0].Profit < 0) {
                    if (list1[ir] == 0 || list1[ir] == undefined) {
                        list1[ir] = position1[0].Price
                    }
                    if (ticker1.Last < (1 - 3 * GetE(ir, 0)) * list1[ir]) {
                        listpft[ir].push(position1[0].Profit)
                        _G('listpft', listpft)
                        let maxpft = Math.min(...listpft[ir])
                        if (position1[0].Profit > (1 - 0.01 * HcK4) * maxpft) {
                            exchanges[ir].SetDirection('buy')
                            let amount = acc[ir] * Math.pow(2, longAddCount[ir]);
                            exchanges[ir].Buy(-1, amount)
                            list1[ir] = ticker1.Last;
                            _G('list1', list1)
                            longAddCount[ir] = _N(parseFloat(longAddCount[ir]), 0) + 1;
                            _G('longAddCount', longAddCount);
                            Log(`${currency},补仓信号${HcK4},多单补仓,补仓价格:${list1[ir]},补仓次数:${longAddCount[ir]}`)
                            LogProfit(pft)
                        }
                    }
                } else {
                    if ((position1[0].Profit + lSubP[ir]) > 0.01 * C1 * ticker1.Last * position1[0].Amount * ctVal) {
                        exchanges[ir].SetDirection('closebuy')
                        exchanges[ir].Sell(-1, position1[0].Amount)
                        CalLsAmount(position1[0].Amount, ticker1.Last)
                        list1[ir] = 0
                        _G('list1', list1)
                        longAddCount[ir] = 0;
                        _G('longAddCount', longAddCount);
                        lSubP[ir] = 0;
                        _G('lSubP', lSubP);
                        Log(currency, `多单盈利,平多止盈2`)
                        LogProfit(pft)
                    }
                }
            }
        }
    }
}
//
function mainBefor() {
    exchange.SetContractType("swap");
    account1 = exchange.GetAccount();
    if (isOk) {
        let exchangeInfo = exchange.IO("api", "GET", "/api/v5/public/instruments?instType=SWAP");
        SymbolsEx = exchangeInfo.data;
        walletbalance = account1.Info.data[0].details[0].disEq;
    }
    if (isBinance) {
        let exchangeInfo = exchange.IO("api", "GET", `/fapi/v1/exchangeInfo`, ``, ``)
        SymbolsEx = exchangeInfo.symbols;
        walletbalance = account1.Info.totalWalletBalance;
    }
    if (_G('init_Balance') && _G('FSTTime')) {
        Log('成功读取上次进度!')
        init_Balance = _G('init_Balance')
        FSTTime = _G('FSTTime')
    } else {
        Log('程序第一次运行，保存初始资金数据!#3299cc')
        if (isOk) {
            init_Balance = account1.Info.data[0].details[0].disEq;
        }
        if (isBinance) {
            init_Balance = account1.Info.totalWalletBalance;
        }
        FSTTime = _D()
        _G('init_Balance', init_Balance)
        _G('FSTTime', FSTTime)
    }
    if (!IsHt) {
        K4 = 0;
        HcK4 = 0;
    }
    if (_G('lSubP') && _G('sSubP') && _G('acc') && _G('listpft') && _G('listpft2') && _G('list1') && _G('list2') && _G('mlist')) {
        acc = _G('acc')
        listpft = _G('listpft')
        listpft2 = _G('listpft2')
        list1 = _G('list1')
        list2 = _G('list2')
        longAddCount = _G('longAddCount')
        shortAddCount = _G('shortAddCount')
        lSubP = _G('lSubP')
        sSubP = _G('sSubP')
        mlist = _G('mlist')
    } else {
        acc = []
        _G('acc', acc)
        listpft = []
        listpft2 = []
        list1 = []
        list2 = []
        shortAddCount = []
        longAddCount = []
        lSubP = []
        sSubP = []
        mlist = T0
        for (let i = 0; i < 100; i++) {
            listpft.push([])
            listpft2.push([])
            longAddCount.push([])
            longAddCount[i] = 0
            shortAddCount.push([])
            shortAddCount[i] = 0
            lSubP.push([])
            lSubP[i] = 0;
            sSubP.push([])
            sSubP[i] = 0;
            list1.push(0)
            list2.push(0)

        }
        _G('listpft', listpft)
        _G('listpft2', listpft2)
        if (!_G('longAddCount')) {
            _G('longAddCount', longAddCount)
        } else {
            longAddCount = _G('longAddCount')
        }
        if (!_G('shortAddCount')) {
            _G('shortAddCount', shortAddCount)
        } else {
            shortAddCount = _G('shortAddCount')
        }
        _G('list1', list1)
        _G('list2', list2)
        _G('mlist', mlist)
        _G('lSubP', lSubP)
        _G('sSubP', sSubP)
    }
    for (let i = 0; i < exchanges.length; i++) {
        k = i
        let data = null;
        if (isOk) {
            data = accuracyOk()
        }
        if (isBinance) {
            data = accuracyBinance()
        }
        acc.push(n1)
        _G('acc', acc)
        if (data.amount <= 0) {
            stoplist.push(data)
        }
    }
}
//-----------------------------------------------------------
//主函数
//-----------------------------------------------------------
function main() {
    let eName = exchange.GetName();
    isOk = eName.indexOf("OKCoin") != -1;
    isBinance = eName.indexOf("Binance") != -1;
    if (!isBinance) {
        throw "该策略只支持币安"
    }
    if (isBinance) {
        let ret = exchange.IO("api", "GET", "/fapi/v1/positionSide/dual")
        if (!ret.dualSidePosition) {
            let ret1 = exchange.IO("api", "POST", "/fapi/v1/positionSide/dual", "dualSidePosition=true") //更改为双向持仓位
            Log(ret1)
        }
    }
    followCoins = [];
    for (let i = 0; i < exchanges.length; i++) { //交易产品数
        let coin = exchanges[i].GetCurrency(); //合约
        let _coin = coin.split('_');  //分割
        let c = _coin[0] + _coin[1];  //合成如ADAUSDT
        followCoins.push(c)
        exs += c;  //作用如果修改了产品，把原来的记录清零
    }
    Log("run coins:", followCoins)
    let exlengths = _G('exlengths')
    if (exlengths == null) {
        _G('exlengths', exs)
    } else {
        if (exlengths != exs) {
            _G('lSubP', null);
            _G('sSubP', null);
            _G('acc', null);
            _G('listpft', null);
            _G('listpft2', null)
            _G('list1', null);
            _G('list2', null);
            _G('mlist', null);
            _G('exlengths', exs)
            Log(`exs changed...${exs}`)
        }
    }
    if (isOk) {
        longAddRate = _N(longAddRate, 0)
        shortAddRate = _N(shortAddRate, 0)
    }
    for (let i = 0; i < exchanges.length; i++) {
        button0.push(0)
        Qs[i] = "";
        exchanges[i].SetContractType('swap')
        exchanges[i].SetMarginLevel(M)
    }
    mainBefor()
    while (true) {
        let loop_start = Date.now();
        try {
            table()
            for (let i = 0; i < exchanges.length; i++) {
                ir = i;
                trade()
                Sleep(1000)
            }
            if (isBinance) {
                mlist = T0;
            }
            if (isOk) {
                walletB = account1.Info.data[0].details[0].cashBal;
            }
            if (isBinance) {
                walletB = account1.Info.totalWalletBalance + account1.Info.totalUnrealizedProfit;
            }
            if (walletB > mlist) {
                if (isOk) {
                    mlist += T1
                    _G('mlist', mlist)
                    Log('下次阀值更新为:', mlist)
                }
                if (isBinance) {
                    let amount = T1;
                    if (amount > 5) {
                        let timestamp = new Date().getTime();
                        let base = "https://api.binance.com"
                        exchange.SetBase(base)
                        let res = exchange.IO("api", "POST", "/sapi/v1/futures/transfer", `asset=USDT&amount=${amount}&type=2&timestamp=${timestamp}`, "")
                        Log('划转到现货', res, amount)
                        let toxh = _G('ToXh') == null ? 0 : _G('ToXh')
                        toxh += amount
                        _G('ToXh', toxh)
                        base = "https://fapi.binance.com"
                        exchange.SetBase(base)
                    }
                }
                Log('盈利达到设定值,全部清仓')
                Coverall()
            }
            let cmd = GetCommand()  //获取按键
            if (cmd) {
                arr = cmd.split(':')
                if (arr[0] == '一键平仓') {
                    Coverall()
                    Sleep(100000000000)
                }
                if (arr[1] == '0') {
                    let a = parseInt(arr[0])
                    currency = exchanges[a].GetCurrency()
                    let data = { coin: currency, amount: n1, msg: '手动停止' }
                    stoplist.push(data)
                    Log('当前停止的币对:', currency)
                }
                if (arr[0] == '转到合约') {
                    if (isBinance) {
                        let amount = parseInt(arr[1]);
                        let timestamp = new Date().getTime();
                        let base = "https://api.binance.com"
                        exchange.SetBase(base)
                        let res = exchange.IO("api", "POST", "/sapi/v1/futures/transfer", `asset=USDT&amount=${amount}&type=1&timestamp=${timestamp}`, "")
                        Log('现货划转到合约', res, amount)
                        let toHy = _G('ToHy') == null ? 0 : _G('ToHy')
                        toHy += amount
                        _G('ToHy', toHy)
                        base = "https://fapi.binance.com"
                        exchange.SetBase(base)
                    } else {
                        Log('OK暂不支持划转')
                    }
                }
                if (arr[0] == '转到现货') {
                    if (isBinance) {
                        let amount = parseInt(arr[1]);
                        let timestamp = new Date().getTime();
                        let base = "https://api.binance.com"
                        exchange.SetBase(base)
                        let res = exchange.IO("api", "POST", "/sapi/v1/futures/transfer", `asset=USDT&amount=${amount}&type=2&timestamp=${timestamp}`, "")
                        Log('合约划转到现货', res, amount)
                        let toxh = _G('ToXh') == null ? 0 : _G('ToXh')
                        toxh += amount
                        _G('ToXh', toxh)
                        base = "https://fapi.binance.com"
                        exchange.SetBase(base)
                    } else {
                        Log('OK暂不支持划转')
                    }
                }
                if (arr[1] == '平仓') {
                    let ic = followCoins.indexOf(arr[0]);
                    if (ic > -1) {
                        let amount = Number(arr[3]);
                        exchanges[ic].SetContractType("swap")
                        if (arr[2] == 'LONG') {
                            exchanges[ic].SetDirection("closebuy")
                            let ticker1 = _C(exchanges[ic].GetTicker)
                            exchanges[ic].Sell(-1, amount)
                            CalLsAmount(amount, ticker1.Last)
                            longAddCount[ic] = 0;
                            _G('longAddCount', longAddCount)
                            lSubP[ir] = 0;
                            _G('lSubP', lSubP);
                            list1[ic] = 0
                            _G('list1', list1)
                        }
                        if (arr[2] == 'SHORT') {
                            exchanges[ic].SetDirection("closesell")
                            exchanges[ic].Buy(-1, amount)
                            let ticker1 = _C(exchanges[ic].GetTicker)
                            CalLsAmount(amount, ticker1.Last)
                            shortAddCount[ic] = 0;
                            _G('shortAddCount', shortAddCount)
                            sSubP[ir] = 0;
                            _G('sSubP', sSubP);
                            list2[ic] = 0
                            _G('list2', list2)
                        }
                        LogProfit(pft)
                    } else {
                        Log(arr[0], "该交易对未监听请去交易所平仓")
                    }
                }
                if (arr[0] == '清空日志') {
                    LogReset()
                    Log('日志已经清空')
                }
                if (arr[0] == '重置收益') {
                    _G(null)
                    LogReset()
                    stoplist = [];
                    LogProfitReset()
                    mainBefor()
                    Log('已重置收益')
                }
            }
        } catch (e) {
            Log('系统error', e);
            Sleep(S *1000)
        }
        trade_info.loop_delay = Date.now() - loop_start;
    }
}
```

> Detail

https://www.fmz.com/strategy/348791

> Last Modified

2022-09-14 17:22:12
