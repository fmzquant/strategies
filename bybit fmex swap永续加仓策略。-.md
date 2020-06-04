
> 策略名称

bybit fmex swap永续加仓策略。-

> 策略作者

古力十段

> 策略描述

//参数可以根据需要自由调整。策略的本质是跟踪k线的抵扣价判断多空，简单来说是通过均线的转折，实时检测信号
//注册新账户，欢迎用我的注册连接：https://www.bytick.com/zh-CN/register/?affiliate_id=7586&language=en&group_id=0&group_type=2
//该链接提供对接三方诸多策略。/
//基本原理：若k线持续上行，则持续加仓，直到最大仓位。/

//若long：不适合空头行情，但下跌中不会持续增加多仓。/
//若short：不适合多头行情，但上涨中不会持续加仓。

//注意重点，多空也可以两个账户一起开.

//其他策略购买请咨询:weixin:ying5737
//需要自己对接交易所./模拟账户先行测试.注意风险自负


// 日线级别，或周线级别，我们以日线为例子，
// 检测ma5ma10,k线收盘价在ma5,ma10之上，且ma5上行(判断为昨日k线收盘价＞往前数第5根k收盘价)，则每日开盘挂单或直接买入500u，持续上行，持续加仓。
// 加仓，若上涨中出现两连阴线，则第三日买入500u加仓。每个两连阴单独统计。

// 卖出，k线三连涨减仓1000u。(或k线四连涨减仓2000u)
// 一直循环。
// 策略运行，13天(或21天)，自动停止，平仓或清仓仓位和订单。
// 最大持仓5000u大于该仓位只减仓。

上图：

https://wx1.sinaimg.cn/mw1024/c5775633ly1gbsjvtrgnhj20m80dmmxy.jpg
https://wx1.sinaimg.cn/mw1024/c5775633ly1gbsjvty48uj21hc0u077o.jpg
https://wx2.sinaimg.cn/mw1024/c5775633ly1gbsjvu4iipj20lr0h775f.jpg

# 中频单边趋势策略
## 监测变量
1. 快MA
2. 慢MA
3. 收盘价
## 配置参数
1. 单次下单量Amount
2. 单次减仓量CloseAmount
3. 最大持仓量MaxPosition
## 做多
### 必要条件
1. k线收盘价大于快MA与慢MA
2. 且快MA上行(判断为昨日k线收盘价大于往前数第5根k收盘价)
### 下单
1. 三连阳，减仓CloseAmount
2. 两连阴，加仓Amount。也就是出现两连阴会下单2*Amount
3. 正常情况，开单Amount
### 限制
1. 最大持仓量大于MaxPosition则不开单
### 退出
1. 运行N根K线之后退出

## 做空
### 必要条件
1. k线收盘价小于快MA与慢MA
2. 且快MA上行(判断为昨日k线收盘价小于往前数第N(快MA周期)根k收盘价)
### 下单
1. 三连阴，减仓CloseAmount
2. 两连阳，加仓Amount。也就是出现两连阴会下单2*Amount
3. 正常情况，开单Amount
### 限制
1. 最大持仓量大于MaxPosition则不开单
### 退出
1. 运行N根K线之后退出
## 注意事项
1. 程序会每次会获取账户的持仓信息做为策略的持仓量
2. 请绑定fmz微信，程序会重要的地方推送微信
3. 
## 参数
1. 快MA周期
2. 慢MA周期	
3. 轮询间隔(ms)	
4. 多空选择
5. 杠杆大小: 0表示全仓模式
6. 合约类型: 目前fmex只支持swap，只能填写swap。回测时可用OKEx回测，此处可设置为this_week, this_month等
7. 单次减仓量。达到减仓条件时，一次减仓量
8. 最大持仓(u)
9. API基地址。可设置为https://api.fmex.com，或https://api.testnet.fmex.com
10. 策略K数退出. 策略运行多少个K线后正常退出
11. 策略主动退出时是否清仓。
12. 是否需要交互。策略在满足退出条件后，正常退出时。如果需要交互，则会等待人工干预等命令。如果不需要，则程序直接退出了
13. 是否吃单。勾选，则下单是市价单，不勾选，则是挂单，买单挂在买一，卖单挂在卖一
14. 连续阳(阴)K线数(做多时，连续阳线)。减仓信号，如做多时，连续阳线，减仓
15. 连续阴(阳)K线数(做多时，连续阴线)。连续阴(阳)K线数(做多时，连续阴线)	
16. 是否是震荡行情。勾选是震荡行情
## 交互
**交互只有在`是否需要交互`时有效**
**交互是在策略正常退出时进行交互**
1. 继续。继续是策略复位，重新运行相同的参数
2. 停止。策略停止退出
3. 切换策略行情后继续.切换行情为震荡或趋势后继续运行，是交互1'继续'的一种扩展

> 策略参数



|参数|默认值|描述|
|----|----|----|
|fastMaPeriod|5|快MA周期|
|slowMaPeriod|10|慢MA周期|
|interval|1000|轮询间隔(ms)|
|direction|0|多空选择: 做多|做空|
|marginLevel|false|杠杆大小|
|contractType|swap|合约类型（默认永续）|
|amount|500|单次下单/加仓量(u)|
|closeAmount|1000|单次减仓量(u)|
|maxHoldAmount|5000|最大持仓(u)|
|baseUrl|https://api.bybit.com|API基地址|
|runNBars|13|策略K数退出|
|isCleanPosition|true|策略主动退出时是否清仓|
|enableCommand|true|是否需要交互|
|isTaker|true|是否吃单|
|maxSameDirKNum|3|连续n阳(阴)K线数(做多时，连续阳线减仓）|
|maxOppositeDirKNum|2|连续阴(阳)K线数(做多时，连续阴线加仓)|
|isShock|false|是否是震荡行情|




|按钮|默认值|描述|
|----|----|----|
|继续|__button__|是否继续|
|停止|__button__|是否停止|
|切换策略行情|0|切换策略行情后继续: 震荡|趋势|


> 源码 (javascript)

``` javascript

/*
# 中频单边趋势策略
## 监测变量
1. 快MA
2. 慢MA
3. 收盘价
## 配置参数
1. 单次下单量Amount
2. 单次减仓量CloseAmount
3. 最大持仓量MaxPosition
## 做多
### 必要条件
1. k线收盘价大于快MA与慢MA
2. 且快MA上行(判断为昨日k线收盘价大于往前数第5根k收盘价)
### 下单
1. 三连阳，减仓CloseAmount
2. 两连阴，加仓Amount。也就是出现两连阴会下单2*Amount
3. 正常情况，开单Amount
### 限制
1. 最大持仓量大于MaxPosition则不开单
### 退出
1. 运行N根K线之后退出

## 做空
### 必要条件
1. k线收盘价小于快MA与慢MA
2. 且快MA下行(判断为昨日k线收盘价小于往前数第N(快MA5周期)根k收盘价)
### 下单
1. 三连阴，减仓CloseAmount
2. 两连阳，加仓Amount。也就是出现两连阴会下单2*Amount
3. 正常情况，开单Amount
### 限制
1. 最大持仓量大于MaxPosition则不开单
### 退出
1. 运行N根K线之后退出
## 注意事项
1. 程序会每次会获取账户的持仓信息做为策略的持仓量
2. 请绑定fmz微信，程序会重要的地方推送微信
## 参数
1. 快MA周期
2. 慢MA周期	
3. 轮询间隔(ms)	
4. 多空选择
5. 杠杆大小: 0表示全仓模式
6. 合约类型: 目前fmex只支持swap，只能填写swap。回测时可用OKEx回测，此处可设置为this_week, this_month等
7. 单次减仓量。达到减仓条件时，一次减仓量
8. 最大持仓(u)
9. API基地址。可设置为https://api.fmex.com，或测试网https://api.testnet.fmex.com
10. 策略K数退出. 策略运行多少个K线后正常退出
11. 策略主动退出时是否清仓。
12. 是否需要交互。策略在满足退出条件后，正常退出时。如果需要交互，则会等待人工干预等命令。如果不需要，则程序直接退出了
13. 是否吃单。勾选，则下单是市价单，不勾选，则是挂单，买单挂在买一，卖单挂在卖一
14. 连续阳(阴)K线数(做多时，连续阳线)。减仓信号，如做多时，连续阳线，减仓
15. 连续阴(阳)K线数(做多时，连续阴线)。连续阴(阳)K线数(做多时，连续阴线)	
16. 是否是震荡行情。勾选是震荡行情
## 交互
**交互只有在`是否需要交互`时有效**
**交互是在策略正常退出时进行交互**
1. 继续。继续是策略复位，重新运行相同的参数
2. 停止。策略停止退出
3. 切换策略行情后继续.切换行情为震荡或趋势后继续运行，是交互1'继续'的一种扩展
*/
////////////////// params ////////////////////////
//var fastMaPeriod = 5
//var slowMaPeriod = 10
//var direction = 做多|做空
//var interval = 1000
//var amount = 500
//var maxHoldAmount = 5000
//var closeAmount = 1000
//var runNBars = 13
//var marginLevel = 0
//var contractType = 'swap'
//var enableCommand = false
//var isTaker = true
//var maxOppositeDirKNum = 2
//var maxSameDirKNum = 3
//var isShock = false
////////////////// variable ////////////////////////

var makeLong = direction == 0 ? true:false
var startTime = null
var holdAmount = 0
var lastBar = null
var yinxianCnt = 0
var yangxianCnt = 0
var lastClose = 0
var last5thClose = 0
var fastMa = []
var slowMa = []
var barCnt = 0
var localIsShock = false
////////////////////////////////////////////////
var PreBarTime = 0
var isFirst = true

function PlotMA_Kline(records){
    $.PlotRecords(records, 'K')
    if(fastMa.length == 0) {
        fastMa = TA.MA(records, fastMaPeriod)
    }
    if(slowMa.length == 0) {
        slowMa = TA.MA(records, slowMaPeriod)
    }
    if(isFirst){
        $.PlotFlag(records[records.length - 1].Time, 'Start', 'STR')
        for(var i = records.length - 1; i >= 0; i--){
            if(fastMa[i] !== null){
                $.PlotLine('ma'+fastMaPeriod, fastMa[i], records[i].Time)
            }
            if(slowMa[i] !== null){
                $.PlotLine('ma'+slowMaPeriod, slowMa[i], records[i].Time)
            }
        }
        PreBarTime = records[records.length - 1].Time
        isFirst = false
    } else {
        if(PreBarTime !== records[records.length - 1].Time){
            $.PlotLine('ma'+fastMaPeriod, fastMa[fastMa.length - 2], records[fastMa.length - 2].Time)
            $.PlotLine('ma'+slowMaPeriod, slowMa[slowMa.length - 2], records[slowMa.length - 2].Time)
            PreBarTime = records[records.length - 1].Time
        }
        $.PlotLine('ma'+fastMaPeriod, fastMa[fastMa.length - 1], records[fastMa.length - 1].Time)
        $.PlotLine('ma'+slowMaPeriod, slowMa[slowMa.length - 1], records[slowMa.length - 1].Time)
}
}

function init () {
    if (fastMaPeriod > slowMaPeriod) {
        throw '快MA周期 > 慢MA周期, 请检查设置'
    }
    Log('快MA周期	    :'  + fastMaPeriod)
    Log('慢MA周期	    :' + slowMaPeriod)
    Log('轮询间隔(ms)   :' + interval)
    Log('是否是震荡策略  :' + (isShock?'是':'否'))
    Log('多空选择	    :' + (direction == 0 ? '多':'空'))
    Log('杠杆大小	    :' + (marginLevel == 0 ? '全仓':marginLevel))
    Log('连续阳(阴)K线数(做多时，连续阳线)数   :' + maxSameDirKNum)
    Log('连续阴(阳)K线数(做多时，连续阴线)   :' + maxOppositeDirKNum)
    Log('运行多少根K后退出   :' + runNBars)
    startTime = new Date()
    localIsShock = isShock
}

function onexit() {
    Log('退出')
}

function onerror() {
    Log('出错退出')
}

function openLong(ex, openAmount) {
    if (holdAmount + openAmount <= maxHoldAmount) {
        Log('已持仓: ' + holdAmount + ', 加仓:' + openAmount)
        ex.SetDirection('buy')
        if(isTaker) {
            ex.Buy(-1, openAmount, '吃单')
            holdAmount += openAmount
        } else {
            var ticker = _C(ex.GetTicker)
            if(ticker == null) {
                return false
            }
            ex.Buy(ticker.Buy, openAmount, '挂单')
        }
        return true
    } else {
        Log('持仓('+holdAmount+') 过多，不加仓')
        return false
    }
}

function closeLong(ex, closeAmount) {
    if (holdAmount >= closeAmount) {
        Log('已持仓: ' + holdAmount + ', 减仓:' + closeAmount)
        ex.SetDirection('closebuy')
        ex.Sell(-1, closeAmount)
        holdAmount -= closeAmount
        return true
    } else {
        Log('持仓('+holdAmount+') 过少，不减仓')
        return false
    }
}

function openShort(ex, openAmount) {
    if (holdAmount + openAmount <= maxHoldAmount) {
        Log('已持仓: ' + holdAmount + ', 加仓:' + openAmount)
        ex.SetDirection('sell')
        if(isTaker) {
            ex.Sell(-1, openAmount, '吃单')
            holdAmount += openAmount
        } else {
            var ticker = _C(ex.GetTicker)
            if(ticker == null) {
                return false
            }
            ex.Sell(ticker.Sell, openAmount, '挂单')
        }
        return true
    } else {
        Log('持仓('+holdAmount+') 过多，不加仓')
        return false
    }
}

function closeShort(ex, closeAmount) {
    if (holdAmount >= closeAmount) {
        Log('已持仓: ' + holdAmount + ', 减仓:' + closeAmount)
        ex.SetDirection('closesell')
        ex.Buy(-1, closeAmount)
        holdAmount -= closeAmount
        return true
    } else {
        Log('持仓('+holdAmount+') 过少，不减仓')
        return false
    }
}

function cancelOrders(ex) {
    Log('取消所有挂单')
    while(true) {
        var orders = _C(ex.GetOrders)
        if (orders.length == 0) {
            break
        }
        for(var i = 0; i < orders.length;i++) {
            ex.CancelOrder(orders[i].Id)
        }
    }
}

function updatePosition(ex) {
    var pos = ex.GetPosition()
    if(typeof(pos) === 'undefined' || pos === null || 
        pos.length == 0 || typeof(pos[0].Type) == 'undefined'  || typeof(pos[0].Amount) == 'undefined' ) {
        return
    }
    Log('仓位信息:' + (pos[0].Type == 0?'多仓,   ':'空仓,  ') + JSON.stringify(pos))
    if(pos.length>0){
        holdAmount = pos[0].Amount
        // if(pos[0].Type == 0){ //多仓
        //     ordersInfo.pos = pos[0].Amount
        // }else{
        //     ordersInfo.pos = -pos[0].Amount
        // }
    }
}

function longStrategy(ex, records) {
    var lastSecondBar = records[records.length-2]

    if ((   lastSecondBar.Close > fastMa[fastMa.length - 2] && 
            lastSecondBar.Close > slowMa[slowMa.length - 2] && 
            lastSecondBar.Close > records[records.length - 2 - fastMaPeriod].Close
        ) || localIsShock){
            var openAmount = amount
            if (lastSecondBar.Close < lastSecondBar.Open) {
                yinxianCnt += 1
                yangxianCnt = 0
            } else if (lastSecondBar.Close > lastSecondBar.Open){
                yinxianCnt = 0
                yangxianCnt += 1
            } else {
                yangxianCnt = 0
                yinxianCnt = 0
            }

            if (yinxianCnt >= maxOppositeDirKNum) {
                Log('两连阴')
                openAmount += amount
                yinxianCnt = 0
            }

            if (yangxianCnt >= maxSameDirKNum) {
                Log('三连阳')
                yangxianCnt = 0
                Log('准备减仓')
                if(closeLong(ex, closeAmount)){
                    $.PlotFlag(records[records.length - 1].Time, 'closeLong', 'CL')
                }
            } else {
                Log('准备开仓')
                if(localIsShock) {
                    openAmount -= amount
                }
                if(openLong(ex, openAmount)){
                    $.PlotFlag(records[records.length - 1].Time, 'openLong', 'OL')
                }
            }
    }
}

function shortStrategy(ex, records) {
    var lastSecondBar = records[records.length-2]

    if ((   lastSecondBar.Close < fastMa[fastMa.length - 2] && 
            lastSecondBar.Close < slowMa[slowMa.length - 2] && 
            lastSecondBar.Close < records[records.length - 2 - fastMaPeriod].Close
        ) || localIsShock){
            var openAmount = amount
            if (lastSecondBar.Close < lastSecondBar.Open) {
                yinxianCnt += 1
                yangxianCnt = 0
            } else if (lastSecondBar.Close > lastSecondBar.Open){
                yinxianCnt = 0
                yangxianCnt += 1
            } else {
                yangxianCnt = 0
                yinxianCnt = 0
            }

            if (yangxianCnt >= maxOppositeDirKNum) {
                Log('两连阳')
                yangxianCnt = 0
                openAmount += amount
            } 

            if (yinxianCnt >= maxSameDirKNum) {
                Log('三连阴')
                yinxianCnt = 0
                Log('准备减仓')
                if(closeShort(ex, closeAmount)){
                    $.PlotFlag(records[records.length - 1].Time, 'closeShort', 'CS')
                }
            } else {
                Log('准备开仓')
                if(localIsShock) {
                    openAmount -= amount
                }
                if(openShort(ex, openAmount)){
                    $.PlotFlag(records[records.length - 1].Time, 'openShort', 'OS')
                }
            }
    }
}

function onBar (ex) {
    var records = _C(ex.GetRecords)
    if (records === null || records.length < slowMaPeriod) {
        return 
    }
    if (lastBar == null) {
        lastBar = records[records.length-1]
    }
    
    if (lastBar.Time == records[records.length-1].Time) {
        return
    }
    lastBar = records[records.length-1]
    updatePosition(ex)
    PlotMA_Kline(records)
    barCnt += 1

    var lastSecondBar = records[records.length-2]
    fastMa = TA.MA(records, fastMaPeriod)
    slowMa = TA.MA(records, slowMaPeriod)
    lastClose = lastSecondBar.Close
    last5thClose = records[records.length - 2 - 5].Close

    Log('收盘价:' +lastSecondBar.Close + 
    ', 前第5个收盘价:' +records[records.length - 2 - 5].Close + 
    ', 快MA:' + _N(fastMa[fastMa.length - 2]) +
    ', 慢MA:' + _N(slowMa[slowMa.length - 2]))
    if (makeLong) {
        longStrategy(ex, records)
    } else {
        shortStrategy(ex, records)
    }
}

function runLife(ex) {
    // var pass = new Date() - startTime
    if (barCnt >= runNBars) {
        if(isCleanPosition) {
            Log('已运行'+barCnt+'K周期,结束，取消订单，清仓#ff0000@')
            cancelOrders(ex)
            updatePosition(ex)
            $.PlotFlag(lastBar.Time, 'Exit', 'EXT')
            
            if (makeLong) {
                closeLong(ex, holdAmount)
            } else {
                closeShort(ex, holdAmount)
            }    
        } else {
            Log('已运行'+barCnt+'K周期,结束，不取消订单，不清仓#ff0000@')
            updatePosition(ex)
            $.PlotFlag(lastBar.Time, 'Exit', 'EXT')
        }
        return true
    } else {
        return false
    }
}

function status() {
    var table = {
        type: 'table',
        title: '信息',
        cols: [
            '运行K数',
            '持仓量',
            '阳线',
            '阴线',
            '收盘价',
            '前第5个收盘价',
            'MA'+fastMaPeriod,
            'MA'+slowMaPeriod,
        ],
        rows: []
      }
      table.rows.push([
            barCnt,
            holdAmount,
            yangxianCnt,
            yinxianCnt,
            lastClose,
            last5thClose,
            fastMa.length == 0 ? 0 : _N(fastMa[fastMa.length - 2]),
            slowMa.length == 0 ? 0 : _N(slowMa[slowMa.length - 2])
      ])
    LogStatus(
        '现在时间:' +_D() +
        '\n启动时间:' +startTime +
        '\n`' +
        JSON.stringify(table)+
        '`\n' +
        '\n托管者版本:' +Version() +
        '\n联系Wechat:ying5737#00ff00' +
        '\nWechat: ying5737info#ff000f'
      )

}

function reset() {
    holdAmount = 0
    lastBar = null
    yinxianCnt = 0
    yangxianCnt = 0
    lastClose = 0
    last5thClose = 0
    fastMa = []
    slowMa = []
    barCnt = 0
}

function main () {
    var ex = exchanges[0]

    Log('开工   '+ex.GetName())
 //   if(ex.GetName() != 'Futures_FMex' && !IsVirtual()) {
  //      throw '仅仅支持FMex'
  //  }
    Log('基地址  ' + baseUrl)
    if(!IsVirtual()){
        ex.IO('base', baseUrl) //切换基地址，方便切换实盘和模拟盘，实盘地址：https://api.fmex.com
    }
    ex.SetTimeout(1000);
    _CDelay(500)
    ex.SetContractType(contractType)
    ex.SetMarginLevel(marginLevel)
    updatePosition(ex)
    while (true) {
        try {
            if(!IsVirtual() && runLife(ex)) {
                if((typeof(GetCommand) == 'function') && enableCommand){
                    Log('等待指令, 继续 | 停止 #ff0000@')
                    while (true) {
                        var cmd = GetCommand()
                        if (cmd) {
                            Log('收到指令: '+cmd)
                            switch(cmd) {
                                case '停止':
                                    Log('停止, 退出!#ff0000@')
                                    return
                                case '继续':
                                    reset()
                                    Log('继续, 复位，开工!#ff0000@')
                                    break
                                case '切换策略行情:0':
                                    reset()
                                    localIsShock = true
                                    Log('切换策略行情为震荡行情继续, 复位，开工!#ff0000@')
                                    break
                                case '切换策略行情:1':
                                    reset()
                                    localIsShock = false
                                    Log('切换策略行情为趋势行情继续, 复位，开工!#ff0000@')
                                    break
                            }
                            if (cmd == '停止'){
                                Log('停止, 退出!#ff0000@')
                                return
                            } else if (cmd == '继续') {
                                reset()
                                Log('继续, 复位，开工!#ff0000@')
                                break
                            }
                        }
                        updatePosition(ex)
                        status()
                        Sleep(1000)
                    }
                } else {
                    Log('停止, 退出!#ff0000@')
                    return
                }
            }
            onBar(ex)
            status()
        } catch(e) {
            Log('出错了:'+e+', 请及时处理#ff0000@')
        }
        Sleep(interval)
    }
}

```

> 策略出处

https://www.fmz.com/strategy/205469

> 更新时间

2020-06-03 12:11:29
