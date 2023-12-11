
> Name

TradingView策略信号下单机器人-币安版

> Author

高频量化



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|IsMarketOrder|false|是否使用市价单|
|QuotePrecision|3|下单价格精度|
|BasePrecision|3|下单量精度|
|Ct||期货合约代码|




|Button|Default|Description|
|----|----|----|
|buy|0.01|测试买入|
|sell|0.01|测试卖出|
|long|0.01|测试做多|
|short|0.01|测试做空|
|cover_long|0.01|测试平多|
|cover_short|0.01|测试平空|


> Source (javascript)

``` javascript
/*
- 交互命令字符串格式
  action:amount
  action: buy , sell , long , short , cover_long , cover_short, spk , bpk
- 交易所类型
  eType变量取值: 0 spot , 1 futures

- TV文档链接
  https://www.tradingview.com/pine-script-docs/en/v4/Quickstart_guide.html
  https://cn.tradingview.com/chart/8xfTuX7F/

- TV webhook 发送请求
  https://www.fmz.com/api/v1?access_key=xxx&secret_key=yyyy&method=CommandRobot&args=[186515,"action:amount"]

- 引用类库
  引用数字货币交易类库
*/

// 参数
//var IsMarketOrder = true 
var QuotePrecision = 3
var BasePrecision = 3

// 期货参数
var Ct = "swap"
//exchange.SetContractType("swap")        // 设置为永续合约
//exchange.SetCurrency("BTC_USDT")

// 全局变量
var BUY = "buy"
var SELL = "sell"
var LONG = "long"
var SHORT = "short"
var COVER_LONG = "cover_long"
var COVER_SHORT = "cover_short"
var SPK = "spk"
var BPK = "bpk"


//------------------- 添加
const accountInformation = { //账号信息
    type: 'table',
    title: '账号信息',
    cols: ['初始余额', '钱包余额 ', '保证金余额', '可用保证金', '已用保证金', '总收益', '收益率'], //列表头
    rows: null //列表数组   
};

const binanceFundingRate = { //持仓单数组
    type: 'table',
    title: '币安U本位持仓单',
    cols: ['交易对', '交易方向 ', '开仓量', '开仓价格', '持仓价值', '杠杆', '占用保证金', '持仓盈利'], //列表头
    rows: null //列表数组
};


initialPrincipalUsdt = null //初始本金/usdt
revenueUsdt = 0 //曲线


//--------------------------------------
//账号信息
//--------------------------------------
function accountInformationfunction() {
    exchange.SetContractType("swap"); // 设置为永续合约 swap / quarter/
    var Currency = exchange.GetCurrency()
    exchange.SetCurrency(Currency) //切换产品访问的是U本位的账号信息
    var account = _C(exchange.GetAccount)

    _CDelay(2000 * 60)
    if (!account) {
        Log("没有获取资产")
        return
    }
    
    if (initialPrincipalUsdt==null ) {
        initialPrincipalUsdt = account.Info.totalWalletBalance //获取加载的时候，净值记录为开始余额
        _G("initialPrincipalUsdt", initialPrincipalUsdt) //获取保存的数据
        if (initialPrincipalUsdt == 0) {
            Log("USDT合约中没有资产")
            return
        }
    }
    /*API 
    "totalInitialMargin": "0.00000000",  // 以USD计价的所需起始保证金总额
    "totalMaintMargin": "0.00000000",  // 以USD计价的维持保证金总额
    "totalWalletBalance": "126.72469206",   // 以USD计价的账户总余额
    "totalUnrealizedProfit": "0.00000000",  // 以USD计价的持仓未实现盈亏总额
    "totalMarginBalance": "126.72469206",  // 以USD计价的保证金总余额
    "totalPositionInitialMargin": "0.00000000",  // 以USD计价的持仓所需起始保证金(基于最新标记价格)
    "totalOpenOrderInitialMargin": "0.00000000",  // 以USD计价的当前挂单所需起始保证金(基于最新标记价格)
    "totalCrossWalletBalance": "126.72469206",  // 以USD计价的全仓账户余额
    "totalCrossUnPnl": "0.00000000",    // 以USD计价的全仓持仓未实现盈亏总额
    "availableBalance": "126.72469206",       // 以USD计价的可用余额
    "maxWithdrawAmount": "126.72469206"     // 以USD计价的最大可转出余额
    */

    InitialBalance = Number(initialPrincipalUsdt)
    WalletBalance = account.Info.totalWalletBalance
    marginBalance = account.Info.totalCrossWalletBalance
    FreeMargin = account.Info.availableBalance
    UsedMargin = account.Info.totalMaintMargin
   
    TotalRevenue = Number(WalletBalance) - Number(InitialBalance)
    Yield1 = TotalRevenue / InitialBalance
    yield1 = Number(Yield1)
    Yield = (yield1 * 100).toFixed(2) + "%"
    //封装在数组中
    revenueUsdt = Number(TotalRevenue)

    accountInformation.rows = [] //置空
    //'初始余额',  '钱包余额 ',  '保证金余额', '可用保证金', '已用保证金', '总收益', '收益率'
    accountInformation.rows[0] = [InitialBalance, WalletBalance, marginBalance, FreeMargin, UsedMargin, TotalRevenue, Yield]

}

//--------------------------------------
//持仓单数组
//--------------------------------------
function binanceFundingRatefunction() { //持仓单数组
    binanceFundingRate.rows = []
    exchange.SetContractType("swap"); // 设置为永续合约，注意币本位和USDT本位都存在永续
    var y = 0 //判断没有改产品也可以

    for (var i = 0; i < exchanges.length; i++) {
        exchange.SetCurrency(exchanges[i].GetCurrency()) //切换产品
        //-------------------------------------------------------
        var position = _C(exchange.GetPosition) //获取账号持仓情况
       // Log("position", position)
        _CDelay(1000 * 2 * 60)
        //币本位不一样的跨期合约放在一个数组。永续与之不一样
        if (position) {
            for (var iii = 0; iii < position.length; iii++) {
                if (exchange.GetContractType() == position[iii].ContractType) { //为什么要判断，因为跨期合约的持仓，都放在一起了
                    binanceFundingRate.rows[y] = [position[iii].Info.symbol, position[iii].Type == 0 ? "BUY" : "SELL", position[iii].Amount,
                        position[iii].Price, position[iii].Amount * position[iii].Price,
                        position[iii].MarginLevel, position[iii].Margin, position[iii].Profit
                    ]
                    y++
                }
            }
        }

    }

}


//--------------------------------------
//主函数
//--------------------------------------

function main() {
    // 清空日志，如不需要，可以删除
    //LogReset(1)

    // 设置精度
    exchange.SetPrecision(QuotePrecision, BasePrecision)

    // 识别期货还是现货
    var eType = 0
    var eName = exchange.GetName() //交易所名称 如：Futures_Binance
    var patt = /Futures_/
    if (patt.test(eName)) { //判断是否带有Futures_     期货交易的话设置合约为永续  Ct = "swap"
        Log("添加的交易所为期货交易所：", eName, "#FF0000")
        eType = 1
        if (Ct == "") {
            throw "Ct 合约设置为空"
        } else {
            Log(exchange.SetContractType(Ct), "设置合约：", Ct, "#FF0000")
        }
    } else {
        Log("添加的交易所为现货交易所：", eName, "#32CD32")
    }


    //测试持仓函数
    var position3 = exchange.GetPosition()
    if (position3.length == 0) {
        Log("机器人首次启动,正在对交易所进行全面检查", "#33CD33")
        Log(exchange.GetLabel(), "账户信息初始化完成：交易所没有持仓单子，一切正常", "#0000FF")
        Log("机器人已就绪! !等待信号! !", "#0000FF")
    }
    if (position3.length > 0) {
        Log("机器人首次启动,正在对交易所进行全面检查", "#33CD33")
        Log(exchange.GetLabel(), "账户信息初始化完成:交易所检查异常，有单子持仓,　请确认! ! !,", "持有仓位种类", position3.length, "(种)", "持仓数量:", position3[0].Amount, "(张/币)", "持仓方向:", position3[0].Type, "(0代表多单/1代表空单)", "#0000FF")
        Log("机器人已就绪! ! 等待信号中! ! !", "#0000FF")
    }

    var lastMsg = ""
    var position = _C(exchange.GetPosition)
    var acc = _C(exchange.GetAccount)
    //LogProfit(acc.Balance)
    //LogProfit(acc.Balance, '&')
    //LogProfit(acc.Stocks)
    //var acc = exchange.GetAccount
    Log(acc);

    var count = 0 //记录循环次数
    if(initialPrincipalUsdt==null){
       initialPrincipalUsdt = _G("initialPrincipalUsdt") //获取保存的数据
    }


    while (true) {
        var cmd = GetCommand()

        if (!cmd) {
            //Log("没有接收到cmd命令：", cmd, "#FF0000")
            //continue
        }

        if (cmd) {
            // 检测交互命令
            Log("接收到来自TradingView的警报信号", cmd, "#32CD32")
            Log("开始执行本次信号循环处理!", "#32CD32")

            lastMsg = "命令:" + cmd + "时间:" + _D()
            var arr = cmd.split(":")
            if (arr.length != 2) {
                Log("cmd信息有误：", cmd, "(请确认开仓或平仓的命令是否正确)", "#FF0000")
                continue
            }

            var action = arr[0]
            var amount = parseFloat(arr[1])
            //var amount = 0.01 //等号后面合约张数的数量
            //Log(action, amount)
            //Log("电报群共享的为FMZ第一版本的机器人代码，仅供学习用，如需完美对接电报群里播报信号的TradingView策略或想要更多优质TV策略的请联系群主18664029094", "#0000FF")
            //Log("微信 tian-qi-666 或电报群 //t.me/tq16889 或Bilbil视频上搜索：收益14500%策略详细使用方法或500U账户如何用复利下单全自动交易", "#FF0000")
            //Log("TradingView策略如何对接到发明者（FMZ)量化机器人的？发明者如何依据TV的信号对币安或OKEX等交易所进行全自动开仓平仓做单的？ ", "#0000FF")
            //现货处理逻辑
            if (eType == 0) {
                if (action == BUY) {
                    var buyInfo = IsMarketOrder ? exchange.Buy(-1, amount) : $.Buy(amount)
                    Log("buyInfo:", buyInfo)
                } else if (action == SELL) {
                    var sellInfo = IsMarketOrder ? exchange.Sell(-1, amount) : $.Sell(amount)
                    Log("sellInfo:", sellInfo)
                } else {
                    Log("现货交易所不支持！", "#FF0000")
                }
                //期货处理逻辑
            } else if (eType == 1) {
                var tradeInfo = null
                var ticker = _C(exchange.GetTicker)

                if (action == LONG) {
                    Log("开多:", amount, "#32CD32")
                    //如果发过来的是long:0.01指令，那就平空，同时执行开多命令
                    //exchange.SetDirection("closesell")
                    //var tradeInfo1 = IsMarketOrder ? exchange.Buy(-1, amount) : exchange.Buy(ticker.Sell, amount)
                    //exchange.SetDirection("buy")
                    //var tradeInfo2 = IsMarketOrder ? exchange.Buy(-1, amount) : exchange.Buy(ticker.Sell, amount)
                    //tradeInfo = [tradeInfo1, tradeInfo2]                    
                    exchange.SetDirection("buy")
                    tradeInfo = IsMarketOrder ? exchange.Buy(-1, amount) : exchange.Buy(ticker.Sell, amount)
                    Log("本次信号处理完毕!!! 等待接受新的信号!!!", "#0000FF")

                } else if (action == SHORT) {
                    Log("开空:", amount, "#32CD32")
                    //如果发过来的是short:0.01指令，那就平多，同时执行做空命令
                    //exchange.SetDirection("closebuy")
                    //var tradeInfo1 = IsMarketOrder ? exchange.Sell(-1, amount) : exchange.Sell(ticker.Buy, amount)
                    //exchange.SetDirection("sell")
                    //var tradeInfo2 = IsMarketOrder ? exchange.Sell(-1, amount) : exchange.Sell(ticker.Buy, amount)
                    //tradeInfo = [tradeInfo1, tradeInfo2]                    
                    exchange.SetDirection("sell")
                    tradeInfo = IsMarketOrder ? exchange.Sell(-1, amount) : exchange.Sell(ticker.Buy, amount)
                    Log("本次信号处理完毕!!! 等待接受新的信号!!!", "#0000FF")

                } else if (action == COVER_LONG) {
                    Log("平多单:", amount, "#32CD32")

                    //增加是否有持仓情况判断
                    // 依次取回数据获取的结果
                    var account = _C(exchange.GetAccount)
                    if (!ticker || !account) {
                        Log(exchange.GetLabel(), "：获取交易数据异常，先不下单，跳过。", "@")
                        continue
                    }
                    // 获取持仓情况
                    var position = exchange.GetPosition()
                    // if (position_size != 0)
                    // Log(exchanges[i].GetLabel(), "的持仓数量为：", position_size)
                    if (position.length == 0) {
                        Log(exchange.GetLabel(), "：没有持仓，不做平仓.")
                        Log("本次信号处理完毕!!! 等待接受新的信号!!!", "#0000FF")
                        continue

                    }

                    //如果发过来的是cover_long:2指令，那就平多，同时平空
                    //exchange.SetDirection("closebuy")
                    //var tradeInfo1 = IsMarketOrder ? exchange.Sell(-1, amount) : exchange.Sell(ticker.Buy, amount)
                    //exchange.SetDirection("closesell")
                    //var tradeInfo2 = IsMarketOrder ? exchange.Buy(-1, amount) : exchange.Buy(ticker.Sell, amount)
                    //tradeInfo = [tradeInfo1, tradeInfo2]                    
                    exchange.SetDirection("closebuy")
                    tradeInfo = IsMarketOrder ? exchange.Sell(-1, amount) : exchange.Sell(ticker.Buy, amount)
                    Log("本次信号处理完毕!!! 等待接受新的信号!!!", "#0000FF")

                } else if (action == COVER_SHORT) {
                    Log("平空单:", amount, "#32CD32")

                    //增加是否有持仓情况判断
                    // 依次取回数据获取的结果
                    var account1 = _C(exchange.GetAccount)
                    if (!ticker || !account1) {
                        Log(exchange.GetLabel(), "：获取交易数据异常，先不下单，跳过。", "@")
                        continue
                    }
                    // 获取持仓情况
                    var position1 = exchange.GetPosition()
                    // if (position_size != 0)
                    // Log(exchanges[i].GetLabel(), "的持仓数量为：", position_size)
                    if (position1.length == 0) {
                        Log(exchange.GetLabel(), "：没有持仓，不做平仓.")
                        Log("本次信号处理完毕!!! 等待接受新的信号!!!", "#0000FF")
                        continue
                    }

                    //如果发过来的是cover_short:0.01指令，那就平多，同时平空
                    //exchange.SetDirection("closebuy")
                    //var tradeInfo1 = IsMarketOrder ? exchange.Sell(-1, amount) : exchange.Sell(ticker.Buy, amount)
                    //exchange.SetDirection("closesell")
                    //var tradeInfo2 = IsMarketOrder ? exchange.Buy(-1, amount) : exchange.Buy(ticker.Sell, amount)
                    //tradeInfo = [tradeInfo1, tradeInfo2]                    
                    exchange.SetDirection("closesell")
                    tradeInfo = IsMarketOrder ? exchange.Buy(-1, amount) : exchange.Buy(ticker.Sell, amount)
                    Log("本次信号处理完毕!!! 等待接受新的信号!!!", "#0000FF")

                } else if (action == SPK) { // 卖出平多仓，卖出开空仓
                    exchange.SetDirection("closebuy")
                    var tradeInfo1 = IsMarketOrder ? exchange.Sell(-1, amount) : exchange.Sell(ticker.Buy, amount)
                    exchange.SetDirection("sell")
                    var tradeInfo2 = IsMarketOrder ? exchange.Sell(-1, amount) : exchange.Sell(ticker.Buy, amount)
                    tradeInfo = [tradeInfo1, tradeInfo2]

                } else if (action == BPK) { // 买入平空仓，买入开多仓
                    exchange.SetDirection("closesell")
                    var tradeInfo1 = IsMarketOrder ? exchange.Buy(-1, amount) : exchange.Buy(ticker.Sell, amount)
                    exchange.SetDirection("buy")
                    var tradeInfo2 = IsMarketOrder ? exchange.Buy(-1, amount) : exchange.Buy(ticker.Sell, amount)
                    tradeInfo = [tradeInfo1, tradeInfo2]

                } else {
                    Log("期货交易所不支持！", "#FF0000")
                }
                if (tradeInfo) {
                    Log("tradeInfo:", tradeInfo)
                }
            } else {
                throw "eType error, eType:" + eType
            }
            acc = _C(exchange.GetAccount)
        }

        /*   //原来有
        var tbl = {
            type: "table",
            title: "状态信息",
            cols: ["数据"],
            rows: []
        }
        tbl.rows.push([JSON.stringify(acc)])
        LogStatus(_D(), eName, "上次接收到的命令：", lastMsg, "\n", "`" + JSON.stringify(tbl) + "`")
       */

        if (count % 100 == 0) {
            //展示持仓与挂单信息
            // binanceOrderRate()
            // FirmOfferIncome()
            accountInformationfunction() //账号信息
            binanceFundingRatefunction() //持仓单数组

            //一小时才记录一次    
            if (count % 600 == 0) {
                LogProfit(revenueUsdt, '&') //资金曲线
            }
        }


        LogStatus("上次接收到的命令：", lastMsg, "\n",
            '\n`' + JSON.stringify("最后更新时间：" + _D()) + '`\n' +
            '\n`' + JSON.stringify([accountInformation]) + '`\n' +
            '\n`' + JSON.stringify([binanceFundingRate]) + '`\n'
        ); //栏目框展示


        count++
        _G("initialPrincipalUsdt", initialPrincipalUsdt) //获取保存的数据
        Sleep(1000)
    }
}
```

> Detail

https://www.fmz.com/strategy/379174

> Last Modified

2022-08-23 10:25:06
