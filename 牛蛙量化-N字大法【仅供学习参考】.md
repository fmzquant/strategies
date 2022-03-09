
> 策略名称

牛蛙量化-N字大法【仅供学习参考】

> 策略作者

wkc19891-team

> 策略描述

# 118量化
## 对接合作写策略
## 使用我们策略，首月付费150U，次月按收益分成

`详细咨询 联系微信 cfzs118`

### 稳中求胜

## 注意:

1. 大资金可深入合作
2. 实盘已接，低收益=低风险, 高收益=高风险, 大家根据自身实际情况, 设定运行参数
3. 加v备注来意

> 策略参数



|参数|默认值|描述|
|----|----|----|
|Assets|1000|本金|
|OpRate|5|单向最高仓位比例|
|OpType|0|开仓方向: 做多|做空|多空都开|
|MarginLevel|20|杠杆大小|
|StopLossProfit|50|止损百分比|
|StopProfit|50|止赢比例|
|StopProfitReturnRate|20|止赢回调|
|RepairRate|50|补仓比例|
|RepairReturnRate|10|补仓回调|
|MaxLoss|6|补仓次数|
|Interval|true|轮询间隔(秒)|
|SubAmount|10|滑落差额|


> 源码 (javascript)

``` javascript
/*
 * @Author: top.brids 
 * @Date: 2022-02-13 22:12:34 
 * @Last Modified by: top.brids
 * @Last Modified time: 2022-02-14 17:01:14
 * @Last Remark: 策略定制 vx:wkc19891
 */

// 参数
let ReverseRate = 1;//加仓倍数

let AddCounter = { buy: 0, sell: 0 };

let tbl = {
    type: "table",
    title: "持仓",
    cols: ["交易所", "交易员_币种", "杠杆", "多仓", "空仓", "未实现盈亏", "账户资产", "可用余额"],
    rows: []
}
// 期货参数
let Ct = "swap"

function getPosAmount(pos, ct) {
    let longPosAmount = 0
    let shortPosAmount = 0
    let profit = 0;
    let symbol = "";
    if (pos.ContractType == ct && pos.Type == PD_LONG) {
        longPosAmount = pos.Amount
        symbol = pos.Info.symbol
        profit = pos.Profit
    } else if (pos.ContractType == ct && pos.Type == PD_SHORT) {
        shortPosAmount = pos.Amount
        profit = pos.Profit
        symbol = pos.Info.symbol
    }
    return { long: longPosAmount, short: shortPosAmount, profit: profit, symbol: symbol }
}

function FindAndDel(target, array) {
    const rowNum = array.length;
    if (!rowNum) {
        return -1;
    }
    const colNum = array[0].length;
    for (let i = 0; i < rowNum; i++) {
        for (let j = 0; j < colNum; j++) {
            if (array[i][j] == target) {
                tbl.rows.splice(i, 1);
                return i;
            }
        }
    }
    return -1;
}
//打印状态栏
function PrintStatus() {
    _.each(exchanges, function (e) {
        let position = _C(e.GetPosition);
        let fixed_balance = 0;
        let unrealized_pnl = 0;
        let pos = getPosAmount(position, Ct)
        let acc = _C(e.GetAccount)
        let coin = "";
        if (e.GetName() == 'Futures_Bitget') {
            coin = acc.Info.symbol
            unrealized_pnl = acc.Info.unrealized_pnl;
            fixed_balance = acc.Info.fixed_balance;
        } else {
            coin = e.SetContractType(Ct).InstrumentID
            if (position.length > 0) {
                unrealized_pnl = position[0].Profit
                fixed_balance = acc.Balance + unrealized_pnl
            }

        }
        FindAndDel(`${e.GetLabel()}_${coin}`, tbl.rows)
        tbl.rows.push([e.GetName(), `${e.GetLabel()}_${coin}`, MarginLevel, pos.long, pos.short, unrealized_pnl, fixed_balance, acc.Balance])
    })
    LogStatus(_D(), "\n`" + JSON.stringify(tbl) + "`")
}

//获取账户信息
function GetAccount(e) {
    let account = _C(e.GetAccount);
    return account.Balance;
}
//获取盘口信息
function GetTicker(e) {
    let ticker = _C(e.GetTicker);
    return ticker;
}
//持仓信息
function MyGetPosition(e, orderType) {
    let positions = _C(e.GetPosition);
    if (typeof (orderType) == 'undefined') {
        return positions;
    }
    for (let i = 0; i < positions.length; i++) {
        if (positions[i].Type == orderType) {
            return positions[i];
        }
    }
    return null;
}
//开单
function Trade(e, tradeType, tradeAmount) {
    let nowPosition = null;
    let tradeFunc = tradeType == ORDER_TYPE_BUY ? e.Buy : e.Sell;
    e.SetDirection(tradeType == ORDER_TYPE_BUY ? "buy" : "sell");
    tradeFunc(-1, tradeAmount);
    Sleep(300)
    nowPosition = MyGetPosition(e, tradeType);
    return nowPosition;
}

function onexit() {
    // _G(null);
    Log("Exit");
}

//计算当前价与持仓加比率 超过7% 启动移动止盈  低于50% 止损
function CalculatorN(type, nowPrice, myPrice, coin, lable) {
    let rate = 0;
    if (type == ORDER_TYPE_BUY) {
        rate = (nowPrice - myPrice) * MarginLevel / myPrice;
        rate = _N(rate, 4);
        Log(`${coin}_${lable} =>当前价与持仓加比率 超过${StopProfit * 100}% 启动移动止盈=>`, "当前价:", nowPrice, "持仓价:", myPrice, "盈亏比率:", _N(rate * 100, 4), "%", "#32CD32");
    } else {
        rate = (nowPrice - myPrice) * MarginLevel / myPrice * -1;
        rate = _N(rate, 4);
        Log(`${coin}_${lable} =>当前价与持仓加比率 超过${StopProfit * 100}% 启动移动止盈=>`, "当前价:", nowPrice, "持仓价:", myPrice, "盈亏比率:", _N(rate * 100, 4), "%", "#FF0000");
    }

    return rate;
}

//计算回落
function CalculatorSliceN(type, nowPrice, maxPrice, myPrice, coin, lable) {
    let rate = 0;
    if (type == ORDER_TYPE_BUY) {
        // （最高价-开仓价）*20 / 开仓价  -（当前价-开仓价）*20 / 开仓价>=回落比率 则回落止盈
        rate = (maxPrice - myPrice) * MarginLevel / myPrice - (nowPrice - myPrice) * MarginLevel / myPrice;
        rate = _N(rate, 4);
        Log(`${coin}_${lable} =>计算最新价格回落幅度 超过${StopProfitReturnRate * 100}% 平仓=>`, "当前价:", nowPrice, "最高价:", maxPrice, "持仓价:", myPrice, "回落幅度:", _N(rate * 100, 4), "%", "#32CD32");

    } else {
        // （最低价-开仓价）*20*-1/ 开仓价 -（当前价-开仓价）*20*-1/开仓价>=回落比率 则止盈
        rate = (maxPrice - myPrice) * MarginLevel * -1 / myPrice - (nowPrice - myPrice) * MarginLevel * -1 / myPrice;
        rate = _N(rate, 4);
        Log(`${coin}_${lable} =>计算最新价格回落幅度 超过${StopProfitReturnRate * 100}% 平仓=>`, "当前价:", nowPrice, "最低价:", maxPrice, "持仓价:", myPrice, "回落幅度:", _N(rate * 100, 4), "%", "#FF0000");
    }

    return rate;
}

function H1Action(e) {
    let action = '';
    let records = e.GetRecords(PERIOD_H1)
    let ma90 = TA.MA(records, 90)
    let ema10 = TA.EMA(records, 10)
    let ma90price1 = _N(ma90[ma90.length - 2], 4)
    let ma90price2 = _N(ma90[ma90.length - 1], 4)

    let ema10price1 = _N(ema10[ema10.length - 2], 4)
    let ema10price2 = _N(ema10[ema10.length - 1], 4)
    if ((ma90price1 > ema10price1 && ma90price2 < ema10price2) || (ma90price1 < ema10price1 && ma90price2 < ema10price2)) {
        //上穿 保持上方
        action = 'buy'
    } else {
        action = 'sell'
    }
    return action;
}

function M5Action(e) {
    let action = '';
    let records = e.GetRecords(PERIOD_M5)
    let ma90 = TA.MA(records, 90)
    let ema10 = TA.EMA(records, 10)
    let ma90price1 = _N(ma90[ma90.length - 2], 4)
    let ma90price2 = _N(ma90[ma90.length - 1], 4)

    let ema10price1 = _N(ema10[ema10.length - 2], 4)
    let ema10price2 = _N(ema10[ema10.length - 1], 4)
    if ((ma90price1 > ema10price1 && ma90price2 < ema10price2) || (ma90price1 < ema10price1 && ma90price2 < ema10price2)) {
        //上穿 保持上方
        action = 'buy'
    } else {
        action = 'sell'
    }
    return action;
}
function ExMessageIsOp3(e, v, price, lable) {
    let kdata = { addBuyCount: 0, addSellCount: 0, isCanOp: false, action: "", ma90Price: 0, nowPrice: 0 };
    let records = e.GetRecords(PERIOD_M5)
    let ma90 = TA.MA(records, 90)
    let ema10 = TA.EMA(records, 10)
    let ma90price1 = _N(ma90[ma90.length - 3], 4)
    let ma90price2 = _N(ma90[ma90.length - 2], 4)

    let ema10price1 = _N(ema10[ema10.length - 3], 4)
    let ema10price2 = _N(ema10[ema10.length - 2], 4)
    if ((ma90price1 > ema10price1 && ma90price2 < ema10price2) || (ma90price1 < ema10price1 && ma90price2 < ema10price2)) {
        //上穿 保持上方
        kdata.action = 'buy'

    } else {
        kdata.action = 'sell'
    }
    if (kdata.action == 'buy') {
        //价格回踩到ema90附近开多
        let count = _G(`${v}_${lable}_buy_flag_count`);
        if (price <= (ma90price2 - SubAmount)) {
            if (count == null) {
                _G(`${v}_${lable}_buy_flag_count`, 0)
                count = 0
            } else {
                count += 1;
                _G(`${v}_${lable}_buy_flag_count`, count)
            }
        }
        kdata.addBuyCount = count;
        kdata.isCanOp = count == 1 ? true : false
        // let seconds = new Date().getSeconds();
        // if (seconds % 15 == 0) {
        //     Log(v, lable, "当前方向=>", kdata.action, "当前价格:", price, "ma90价格:", ma90price2, "ema10价格:", ema10price2, "触碰次数:", count == null ? 0 : count, "#32CD32")
        // }
        Log(v, "当前方向=>", kdata.action, "当前价格:", price, "ma90价格:", ma90price2, "ema10价格:", ema10price2, "触碰次数:", count == null ? 0 : count, "#32CD32")
    } else {
        //价格回调到ema90附近开空
        let count = _G(`${v}_${lable}_sell_flag_count`);
        if (price >= (ma90price2 + SubAmount)) {
            if (count == null) {
                _G(`${v}_${lable}_sell_flag_count`, 0)
                count = 0
            } else {
                count += 1;
                _G(`${v}_${lable}_sell_flag_count`, count)
            }
        }
        kdata.addSellCount = count;
        kdata.isCanOp = count == 1 ? true : false

        // let seconds = new Date().getSeconds();
        // if (seconds % 15 == 0) {
        //     Log(v, lable, "当前方向=>", kdata.action, "当前价格:", price, "ma90价格:", ma90price2, "ema10价格:", ema10price2, "触碰次数:", count == null ? 0 : count, "#ffaa11")
        // }
        Log(v, "当前方向=>", kdata.action, "当前价格:", price, "ma90价格:", ma90price2, "ema10价格:", ema10price2, "触碰次数:", count == null ? 0 : count, "#ffaa11")
    }
    kdata.ma90Price = ma90price2;
    kdata.nowPrice = price;
    return kdata;
}
function ExMessageIsOp(e, v, price, lable) {
    let kdata = { addBuyCount: 0, addSellCount: 0, isCanOp: false, action: "", ma90Price: 0, nowPrice: 0 };
    let records = e.GetRecords(PERIOD_M5)
    let ma90 = TA.MA(records, 90)
    let ema10 = TA.EMA(records, 10)
    let ma90price1 = _N(ma90[ma90.length - 2], 4)
    let ma90price2 = _N(ma90[ma90.length - 1], 4)

    let ema10price1 = _N(ema10[ema10.length - 2], 4)
    let ema10price2 = _N(ema10[ema10.length - 1], 4)
    if ((ma90price1 > ema10price1 && ma90price2 < ema10price2) || (ma90price1 < ema10price1 && ma90price2 < ema10price2)) {
        //上穿 保持上方
        kdata.action = 'buy'

    } else {
        kdata.action = 'sell'
    }
    if (kdata.action == 'buy') {
        //价格回踩到ema90附近开多
        let count = _G(`${v}_${lable}_buy_flag_count`);
        if (price <= (ma90price2 - SubAmount)) {
            if (count == null) {
                _G(`${v}_${lable}_buy_flag_count`, 1)
                count = 1
            } else {
                count += 1;
                _G(`${v}_${lable}_buy_flag_count`, count)
            }
        }
        kdata.addBuyCount = count;
        kdata.isCanOp = count == 1 ? true : false
        // let seconds = new Date().getSeconds();
        // if (seconds % 15 == 0) {
        //     Log(v, lable, "当前方向=>", kdata.action, "当前价格:", price, "ma90价格:", ma90price2, "ema10价格:", ema10price2, "触碰次数:", count == null ? 0 : count, "#32CD32")
        // }
        Log(v, "当前方向=>", kdata.action, "当前价格:", price, "ma90价格:", ma90price2, "ema10价格:", ema10price2, "触碰次数:", count == null ? 0 : count, "#32CD32")
    } else {
        //价格回调到ema90附近开空
        let count = _G(`${v}_${lable}_sell_flag_count`);
        if (price >= (ma90price2 + SubAmount)) {
            if (count == null) {
                _G(`${v}_${lable}_sell_flag_count`, 1)
                count = 1
            } else {
                count += 1;
                _G(`${v}_${lable}_sell_flag_count`, count)
            }
        }
        kdata.addSellCount = count;
        kdata.isCanOp = count == 1 ? true : false

        // let seconds = new Date().getSeconds();
        // if (seconds % 15 == 0) {
        //     Log(v, lable, "当前方向=>", kdata.action, "当前价格:", price, "ma90价格:", ma90price2, "ema10价格:", ema10price2, "触碰次数:", count == null ? 0 : count, "#ffaa11")
        // }
        Log(v, "当前方向=>", kdata.action, "当前价格:", price, "ma90价格:", ma90price2, "ema10价格:", ema10price2, "触碰次数:", count == null ? 0 : count, "#ffaa11")
    }
    kdata.ma90Price = ma90price2;
    kdata.nowPrice = price;
    return kdata;
}

//开单建仓
function OpOrder(e, coin, lable) {
    let ticker = GetTicker(e);
    let data = FristOpAmount(ticker.Last);
    if (data._opAmount <= 0) {
        Log("仓位太小...", data._opAmount)
        return;
    }
    let kdata = ExMessageIsOp(e, coin, ticker.Last, lable)

    let action = kdata.action;
    let isCanOp = kdata.isCanOp;
    //
    let isCanBuy = false;
    let isCanSell = false;
    if (OpType == 0) {
        //多
        isCanBuy = true;
    } else if (OpType == 1) {
        isCanSell = true;
    } else if (OpType == 2) {
        let _action = H1Action(e);
        if (_action == 'buy') {
            isCanBuy = true;
        } else {
            isCanSell = true;
        }
        if (action != _action) {
            isCanOp = false;
        }

    }
    if (action == "buy" && isCanOp && isCanBuy) {
        let isPos = MyGetPosition(e, ORDER_TYPE_BUY);
        if (isPos == null) {
            Log("下单最大张数", data.amount, "首仓张数", data._opAmount, "总加仓次数", MaxLoss, "加仓倍数", data.count, "#32CD32");
            let pos = Trade(e, ORDER_TYPE_BUY, data._opAmount);
            if (!pos) {
                Log("出师不利, 开仓失败...1", pos);
                return;
            } else {
                Log("开多仓完成", "均价:", pos.Price, "数量:", pos.Amount);
            }
        }
    } else {
        if (isCanOp && isCanSell) {
            let isPos = MyGetPosition(e, ORDER_TYPE_SELL);
            if (isPos == null) {
                Log("下单最大张数", data.amount, "首仓张数", data._opAmount, "总加仓次数", MaxLoss, "加仓倍数", data.count, "#ff0000");
                let pos = Trade(e, ORDER_TYPE_SELL, data._opAmount);
                if (!pos) {
                    Log("出师不利, 开仓失败...2", pos);
                    return;
                } else {
                    Log("开空仓完成", "均价:", pos.Price, "数量:", pos.Amount);
                }
            }
        }
    }
    return kdata;
}

//首单张数
function FristOpAmount(price) {
    let _opAmount = 0;
    let count = MaxLoss <= 0 ? 1 : MaxLoss;
    let amount = (Assets * OpRate * MarginLevel) / price;
    let quantityPrecision = 3;
    amount = _N(amount, quantityPrecision);
    _opAmount = amount / count;
    let length = _opAmount > 1 ? 0 : 3;
    _opAmount = _N(_opAmount, length)
    return { _opAmount: _opAmount, amount: amount, count: count };
}

function _ComputerBuyOrSellCount(totalAmount, price) {
    let count = 0;
    let data = FristOpAmount(price);
    let _totalAmount = data._opAmount;
    count = _N(totalAmount / _totalAmount, 0)
    return count;
}
//由持仓算加仓次数
function ComputerBuyOrSellCount(pos, coin) {
    let count = _ComputerBuyOrSellCount(pos.Amount, pos.Price);
    if (pos.Type == ORDER_TYPE_BUY) {
        AddCounter.buy = count;
        // Log(coin, " =>当前多仓持有:", pos.Amount, "张", " 多仓加仓次数:" + AddCounter.buy, "#32CD32")
    } else {
        AddCounter.sell = count;
        // Log(coin, " =>当前空仓持有:", pos.Amount, "张", " 空仓加仓次数:" + AddCounter.sell, "#ff0000")
    }
    return count;
}


function onTick(exchanges) {
    // 初始配置
    for (let i = 0; i < exchanges.length; i++) {
        let e = exchanges[i];
        let eName = e.GetName()
        let patt = /Futures_/
        if (patt.test(eName)) {
            if (Ct == "") {
                throw "Ct 合约设置为空"
            } else {
                Log(e.SetContractType(Ct), "设置合约：", Ct, e.GetLabel(), "#32CD32")
            }
        } else {
            throw "该策略仅支持期货交易所..."
        }
        e.SetMarginLevel(MarginLevel);
        let accBalance = GetAccount(e);
        if (accBalance < Assets) {
            throw "配置金额大于账户余额..."
        }
    }

    while (true) {
        try {
            //检查止盈单
            for (let i = 0; i < exchanges.length; i++) {
                let e = exchanges[i];
                let contractType = e.SetContractType(Ct);
                let coin = contractType.instrument;
                let lable = e.GetLabel();
                let positions = e.GetPosition();

                let m5Action = M5Action(e)
                if (m5Action == 'buy') {
                    if (positions.length > 0 && positions.length <= 1) {
                        let type = positions[0].Type
                        if (type != 0) {
                            _G(`${coin}_${lable}_buy_flag_count`, null);
                        } else {
                            _G(`${coin}_${lable}_sell_flag_count`, null);
                        }
                    }
                    else if (positions.length <= 0) {
                        _G(`${coin}_${lable}_sell_flag_count`, null);
                        _G(`${coin}_${lable}_buy_flag_count`, null);
                    }
                } else {
                    if (positions.length > 0 && positions.length <= 1) {
                        let type = positions[0].Type
                        if (type != 1) {
                            _G(`${coin}_${lable}_sell_flag_count`, null);
                        } else {
                            _G(`${coin}_${lable}_buy_flag_count`, null);
                        }
                    }
                    else if (positions.length <= 0) {
                        _G(`${coin}_${lable}_sell_flag_count`, null);
                        _G(`${coin}_${lable}_buy_flag_count`, null);
                    }
                }

                OpOrder(e, coin, lable, m5Action);
                PrintStatus()
                for (let i = 0; i < positions.length; i++) {
                    let position = positions[i];
                    let ticker = GetTicker(e);
                    //当超过n%后 启动 自动止盈
                    let _coin = coin;
                    //算当前加仓次数
                    let count = ComputerBuyOrSellCount(position, _coin);
                    if (!_G(`t_${_coin}_${lable}`)) {
                        let rate = CalculatorN(position.Type, ticker.Last, position.Price, _coin, lable);
                        if (rate >= StopProfit) {
                            _G(`t_${_coin}_${lable}`, true)
                        }
                        else if (rate < -RepairRate && count < MaxLoss) {
                            //补仓回调 回调买入
                            let minPrice = 0;
                            ticker = GetTicker(e);
                            //补仓回调
                            if (!_G(`minprice_${_coin}_${lable}`)) {
                                _G(`minprice_${_coin}_${lable}`, position.Price)
                                minPrice = position.Price;
                            } else {
                                if (position.Type == ORDER_TYPE_BUY) {
                                    minPrice = Math.min(_G(`minprice_${_coin}_${lable}`), ticker.Last);
                                } else {
                                    minPrice = Math.max(_G(`minprice_${_coin}_${lable}`), ticker.Last);
                                }
                                _G(`minprice_${_coin}_${lable}`, minPrice)
                            }
                            let sliceN = CalculatorSliceN(position.Type, ticker.Last, minPrice, position.Price, _coin, lable);
                            if (sliceN >= RepairReturnRate) {
                                //市价补仓
                                if (position.Type == ORDER_TYPE_BUY) {
                                    let holdAmount = position.Amount;
                                    e.SetDirection("buy");
                                    e.Buy(-1, holdAmount);
                                    _G(`minprice_${_coin}_${lable}`, null)
                                } else {
                                    let holdAmount = position.Amount;
                                    e.SetDirection("sell");
                                    e.Sell(-1, holdAmount);
                                    _G(`minprice_${_coin}_${lable}`, null)
                                }
                            }
                            continue;
                        }
                        else if (rate < -StopLossProfit && count >= MaxLoss) {
                            if (position.Type == ORDER_TYPE_BUY) {
                                //买单止损
                                let holdPrice = position.Price;
                                let holdAmount = position.Amount;
                                let msg = "持仓价: " + holdPrice + " 平仓数量: " + holdAmount;
                                e.SetDirection("closebuy");
                                e.Sell(-1, holdAmount, msg);
                                // _G(`${coin}_${lable}_buy_flag_count`, null)
                                let _accountBalance = GetAccount(e);
                                LogProfit(_accountBalance);
                            } else {
                                //算出止损
                                let holdPrice = position.Price;
                                let holdAmount = position.Amount;
                                let msg = "持仓价: " + holdPrice + " 平仓数量: " + holdAmount;
                                e.SetDirection("closesell");
                                e.Buy(-1, holdAmount, msg);
                                // _G(`${coin}_${lable}_sell_flag_count`, null)
                                let _accountBalance = GetAccount(e);
                                LogProfit(_accountBalance);
                            }
                            continue;
                        }
                        else {
                            continue;
                        }
                    }
                    let maxPrice = 0;
                    ticker = GetTicker(e);
                    //止赢回调
                    if (!_G(`maxprice_${_coin}_${lable}`)) {
                        _G(`maxprice_${_coin}_${lable}`, position.Price)
                        maxPrice = position.Price;
                    } else {
                        if (position.Type == ORDER_TYPE_BUY) {
                            maxPrice = Math.max(_G(`maxprice_${_coin}_${lable}`), ticker.Last);
                        } else {
                            maxPrice = Math.min(_G(`maxprice_${_coin}_${lable}`), ticker.Last);
                        }
                        _G(`maxprice_${_coin}_${lable}`, maxPrice)
                    }
                    let sliceN = CalculatorSliceN(position.Type, ticker.Last, maxPrice, position.Price, _coin, lable);
                    if (sliceN >= StopProfitReturnRate) {
                        //市价平仓
                        if (position.Type == ORDER_TYPE_BUY) {
                            let holdAmount = position.Amount;
                            e.SetDirection("closebuy");
                            e.Sell(-1, holdAmount);
                            _G(`t_${_coin}_${lable}`, null);
                            _G(`maxprice_${_coin}_${lable}`, null);
                            // _G(`${coin}_${lable}_buy_flag_count`, null)
                            let _accountBalance = GetAccount(e);
                            LogProfit(_accountBalance);
                        } else {
                            let holdAmount = position.Amount;
                            e.SetDirection("closesell");
                            e.Buy(-1, holdAmount);
                            _G(`t_${_coin}_${lable}`, null);
                            _G(`maxprice_${_coin}_${lable}`, null);
                            // _G(`${coin}_${lable}_sell_flag_count`, null)
                            let _accountBalance = GetAccount(e);
                            LogProfit(_accountBalance);
                        }
                    }
                }
                Sleep(1000)
            }
        } catch {
            Log("system...error...")
        }
    }
}
function timestampTotime(timestamp) {
    let timestamp4 = new Date(timestamp);//直接用 new Date(时间戳) 格式转化获得当前时间
    let time = timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8)
    return time
}
let kzData = { maxPrice: 0, minPrice: 0, upK: 0, upK1: 0, downK: 0, downK1: 0 };
function main() {
    LogReset(1)
    Log("N字启动监听", "#FF0000")
    while (true) {
        //检查止盈单
        for (let i = 0; i < exchanges.length; i++) {
            let e = exchanges[i];
            let contractType = e.SetContractType(Ct);
            let coin = contractType.instrument;
            let records = e.GetRecords(PERIOD_H1)
            let ticker = _C(e.GetTicker);
            kzData.maxPrice = kzData.minPrice = ticker.Last;
            for (let j = 20; j > 0; j--) {
                let r = records[records.length - j];
                let r1 = records[records.length - j - 1];
                Log(coin, '=>', "第", 21 - j, "根K", '=>', 'Time:', timestampTotime(r.Time), 'High:', r.High, 'Low:', r.Low)
                kzData.maxPrice = Math.max(r1.High, kzData.maxPrice);
                kzData.minPrice = Math.min(r1.Low, kzData.minPrice);


                if (r.High > r1.High && r.Low >= kzData.minPrice) {
                    // kzData.downK = 0;
                    if (r1.High != kzData.maxPrice && r.High > kzData.maxPrice) {
                        kzData.upK += kzData.upK1;
                        kzData.upK1 = 0;
                    } else {
                        kzData.upK += 1;
                    }
                } else if (r.High > r1.High && r.Low < kzData.minPrice) {
                    kzData.upK = 0;
                }
                else if (r.High < r1.High && r.Low >= kzData.minPrice) {
                    kzData.upK1 += 1;
                    kzData.downK1 += 1;
                }
                else if (r.High < r1.High && r.Low < kzData.minPrice) {
                    kzData.upK = 0;
                    if (r1.Low != kzData.minPrice && r.Low < kzData.minPrice) {
                        kzData.downK += kzData.downK1;
                        kzData.downK1 = 0;
                    } else {
                        kzData.downK += 1;
                    }
                }

            }
            Log('涨K',kzData.upK,'跌K',kzData.downK)
            Sleep(5000)
        }
        Sleep(5000)
    }
}
```

> 策略出处

https://www.fmz.com/strategy/295701

> 更新时间

2022-02-26 23:28:43
