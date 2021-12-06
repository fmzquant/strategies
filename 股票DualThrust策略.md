
> 策略名称

股票DualThrust策略

> 策略作者

雨幕

> 策略描述

### 股票DualThrust策略

最近发明者量化交易平台支持了富途证券，进一步增加了一个可以实战程序化交易、量化交易的市场。有很多古老的策略可以拿出来玩一玩，最起码可以测试一下模拟盘交易，毕竟国内股票市场程序化、量化这些技术还都是大机构、大庄家的工具。我们小散能体验一把股票市场的自动化交易还是很令人兴奋的~！

注册富途证券，开户后即可使用模拟盘，详细帖子可以参考：https://www.fmz.cn/bbs-topic/6270

接下来就要讲一下非常经典的策略了Dual Thrust，这个策略是小编我在FMZ.COM学习程序化交易交易入门的第一个策略。在FMZ.COM上这个策略有很多版本，例如：商品期货版本，数字货币版本等，以及各种不同编程语言的版本。为什么这个策略比较适合入门呢？因为这个策略涵盖了策略开发的很多方面，诸如策略图表，实时状态信息显示，数据处理，交易逻辑设计等等。并且策略并不复杂，代码也不难懂。本文讲解的这个「股票版Dual Thrust策略」移植自商品期货版的DualThrust策略。
...

https://www.fmz.cn![IMG](https://www.fmz.cn/upload/asset/161e33fd8a4040845f2f.png)

https://www.fmz.cn![IMG](https://www.fmz.cn/upload/asset/174ef4a218e34eaf999e.png)

#### 策略目前仅为测试版，仅为交流学习，实盘可以自行修改优化。

策略相关文章： https://www.fmz.cn/digest-topic/6289

### 更新

- 2020.12.14 
  增加对于服务器时区不同的判断、调整。
  ```
  function newDate() {
      var timezone = 8                                //目标时区时间，东八区
      var offset_GMT = new Date().getTimezoneOffset() // 本地时间和格林威治的时间差，单位为分钟
      var nowDate = new Date().getTime()              // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
      var targetDate = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000)
      return targetDate
  }
  ```
  
  

> 策略参数



|参数|默认值|描述|
|----|----|----|
|IsReset|false|是否重置日志|
|StrIds|["600519.SH", "600121.SH"]|股票代码列表|
|KS|0.5|上轨系数|
|KX|0.5|下轨系数|
|NPeriod|4|周期|
|AmountOP|100|交易量|


> 源码 (javascript)

``` javascript
var Ids = []            //  ["600519.SH", "600121.SH"]    
var _Symbols = [] 
var STATE_IDLE = 0
var STATE_LONG = 1
var SlideTick = 2
var StatusMsg = ""
var _Chart = null 
var _ArrChart = []
var Interval = 1000
var ArrStateStr = ["空闲", "多仓"]

function newDate() {
    var timezone = 8                                //目标时区时间，东八区
    var offset_GMT = new Date().getTimezoneOffset() // 本地时间和格林威治的时间差，单位为分钟
    var nowDate = new Date().getTime()              // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
    var targetDate = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000)
    return targetDate
}


function GetPosition(e, contractTypeName) {
    var allAmount = 0
    var allProfit = 0
    var allFrozen = 0
    var posMargin = 0
    var price = 0
    var direction = null
    positions = _C(e.GetPosition)
    for (var i = 0; i < positions.length; i++) {
        if (positions[i].ContractType != contractTypeName) {
            continue
        }
        if (positions[i].Type == PD_LONG) {
            posMargin = positions[i].MarginLevel
            allAmount += positions[i].Amount
            allProfit += positions[i].Profit
            allFrozen += positions[i].FrozenAmount
            price = positions[i].Price
            direction = positions[i].Type
        }
    }
    if (allAmount === 0) {
        return null
    }
    return {
        MarginLevel: posMargin,
        FrozenAmount: allFrozen,
        Price: price,
        Amount: allAmount,
        Profit: allProfit,
        Type: direction,
        ContractType: contractTypeName,
        CanCoverAmount: allAmount - allFrozen
    }
}

function Buy(e, contractType, opAmount, insDetail) {
    var initPosition = GetPosition(e, contractType)
    var isFirst = true
    var initAmount = initPosition ? initPosition.Amount : 0
    var positionNow = initPosition
    if(opAmount % insDetail.LotSize != 0) {
        throw "每手数量不匹配"
    }
    while (true) {
        var needOpen = opAmount
        if (isFirst) {
            isFirst = false
        } else {
        	Sleep(Interval*20)
            positionNow = GetPosition(e, contractType)
            if (positionNow) {
                needOpen = opAmount - (positionNow.Amount - initAmount)
            }
            Log("positionNow:", positionNow, "needOpen:", needOpen)// 测试
        }
        if (needOpen < insDetail.LotSize || needOpen % insDetail.LotSize != 0) {
            break
        }
        var depth = _C(e.GetDepth)
        // 需要检测是否涨跌停
        var amount = needOpen
        e.SetDirection("buy")
        var orderId = e.Buy(depth.Asks[0].Price + (insDetail.PriceSpread * SlideTick), amount, contractType, 'Ask', depth.Asks[0])
        // CancelPendingOrders
        while (true) {
            Sleep(Interval*20)
            var orders = _C(e.GetOrders)
            if (orders.length === 0) {
                break
            }
            for (var j = 0; j < orders.length; j++) {
                e.CancelOrder(orders[j].Id)
                if (j < (orders.length - 1)) {
                    Sleep(Interval*20)
                }
            }
        }
    }
    var ret = null
    if (!positionNow) {
        return ret
    }
    ret = positionNow
    return ret
}

function Sell(e, contractType, lots, insDetail) {
    var initAmount = 0
    var firstLoop = true
    if(lots % insDetail.LotSize != 0) {
        throw "每手数量不匹配"
    }
    while (true) {
        var n = 0
        var total = 0
        var positions = _C(e.GetPosition)
        var nowAmount = 0
        for (var i = 0; i < positions.length; i++) {
            if (positions[i].ContractType != contractType) {
                continue
            }
            nowAmount += positions[i].Amount
        }
        if (firstLoop) {
            initAmount = nowAmount
            firstLoop = false
        }
        var amountChange = initAmount - nowAmount
        if (typeof(lots) == 'number' && amountChange >= lots) {
            break
        }

        for (var i = 0; i < positions.length; i++) {
            if (positions[i].ContractType != contractType) {
                continue
            }
            var amount = positions[i].Amount
            var depth
            var opAmount = 0
            var opPrice = 0
            if (positions[i].Type == PD_LONG) {
                depth = _C(e.GetDepth)
                // 需要检测是否涨跌停
                opAmount = amount
                opPrice = depth.Bids[0].Price - (insDetail.PriceSpread * SlideTick)
            }
            if (typeof(lots) === 'number') {
                opAmount = Math.min(opAmount, lots - (initAmount - nowAmount))
            }
            if (opAmount > 0) {
                if (positions[i].Type == PD_LONG) {
                    e.SetDirection("closebuy")
                    e.Sell(opPrice, opAmount, contractType, "平仓", 'Bid', depth.Bids[0])
                }
                n++
            }
            // break to check always
            if (typeof(lots) === 'number') {
                break
            }
        }
        if (n === 0) {
            break
        }
        while (true) {
            Sleep(Interval*20)
            var orders = _C(e.GetOrders)
            if (orders.length === 0) {
                break
            }
            for (var j = 0; j < orders.length; j++) {
                e.CancelOrder(orders[j].Id)
                if (j < (orders.length - 1)) {
                    Sleep(Interval*20)
                }
            }
        }
    }
}

/*
1、9:15-9:25为开盘集合竞价；
2、9:30-11：30，13:00-14:57为连续竞价阶段；
3、14:57-15:00为收盘集合竞价。
*/
function IsTrading() {
    var now = newDate()            // 使用 newDate() 代替 new Date() 因为服务器时区问题
    var day = now.getDay()
    var hour = now.getHours()
    var minute = now.getMinutes()
    StatusMsg = "非交易时段"

    if (day === 0 || day === 6) {
        return false
    }

    if((hour == 9 && minute >= 30) || (hour == 11 && minute < 30) || (hour > 9 && hour < 11)) {
    	// 9:30-11：30
        StatusMsg = "交易时段"
        return true 
    } else if (hour >= 13 && hour < 15) {
    	// 13:00-15:00
        StatusMsg = "交易时段"
        return true 
    }
    
    return false 
}

function init () {
    Ids = JSON.parse(StrIds)
    for (var i = 0 ; i < Ids.length ; i++) {
        _Symbols[i] = {}
        _Symbols[i].ContractTypeName = Ids[i]
        _Symbols[i].NPeriod = NPeriod
        _Symbols[i].Ks = KS
        _Symbols[i].Kx = KX
        _Symbols[i].AmountOP = AmountOP
        _Symbols[i].State = STATE_IDLE
        _Symbols[i].LastBarTime = 0
        _Symbols[i].UpTrack = 0
        _Symbols[i].DownTrack = 0
        _Symbols[i].ChartIndex = i 
        _Symbols[i].Status = ""
        _Symbols[i].Pos = null 
        _Symbols[i].ChartCfg = {
            __isStock: true,
            title: {
                text: Ids[i] 
            },
            yAxis: {
                plotLines: [{
                    value: 0,
                    color: 'red',
                    width: 2,
                    label: {
                        text: '上轨',
                        align: 'center'
                    },
                }, {
                    value: 0,
                    color: 'green',
                    width: 2,
                    label: {
                        text: '下轨',
                        align: 'center'
                    },
                }]
            },
            series: [{
                type: 'candlestick',
                name: '当前周期',
                id: 'primary',
                data: []
            }]
        }
        _ArrChart.push(_Symbols[i].ChartCfg)
    }
    _Chart = Chart(_ArrChart)
    _Chart.reset()
}

function DualThrustProcess (symbols) {
    for (var i = 0 ; i < symbols.length ; i++) {
        var contractTypeName = symbols[i].ContractTypeName
        var NPeriod = symbols[i].NPeriod
        var Ks = symbols[i].Ks
        var Kx = symbols[i].Kx
        var AmountOP = symbols[i].AmountOP

        // 切换为当前 symbol 参数的合约
        var insDetail = _C(exchange.SetContractType, contractTypeName)
        symbols[i].InstrumentName = insDetail.InstrumentName
        // 判断是不是交易状态
        if (!insDetail.IsTrading || !IsTrading()) {
            continue
        }
        
        // 判断K线长度
        var records = exchange.GetRecords()
        Sleep(3000)
        var ticker = exchange.GetTicker()
        Sleep(3000)
        var depth = exchange.GetDepth()
        if (!records || records.length <= NPeriod) {
            StatusMsg = "Calc Bars..."
            continue
        }

        if (!ticker) {
            continue
        }

        if (!depth || depth.Bids[0].Amount == 0 || depth.Asks[0].Amount == 0) {
            // 标记涨跌停
            symbols[i].Status = "涨跌停"
            continue
        }
        symbols[i].Status = "正常交易"

        var Bar = records[records.length - 1]
        var index = symbols[i].ChartIndex
        if (symbols[i].LastBarTime !== Bar.Time) {
            var HH = TA.Highest(records, NPeriod, 'High')
            var HC = TA.Highest(records, NPeriod, 'Close')
            var LL = TA.Lowest(records, NPeriod, 'Low')
            var LC = TA.Lowest(records, NPeriod, 'Close') 
            var Range = Math.max(HH - LC, HC - LL)

            symbols[i].UpTrack = _N(Bar.Open + (Ks * Range))
            symbols[i].DownTrack = _N(Bar.Open - (Kx * Range)) 

            if (symbols[i].LastBarTime > 0) {
                var PreBar = records[records.length - 2]
                _Chart.add(index, [PreBar.Time, PreBar.Open, PreBar.High, PreBar.Low, PreBar.Close], -1)
            } else {
                for (var j = Math.min(records.length, NPeriod * 3); j > 1; j--) {
                    var b = records[records.length - j]
                    _Chart.add(index, [b.Time, b.Open, b.High, b.Low, b.Close])
                }
            }
            _Chart.add(index, [Bar.Time, Bar.Open, Bar.High, Bar.Low, Bar.Close])
            symbols[i].ChartCfg.yAxis.plotLines[0].value = symbols[i].UpTrack
            symbols[i].ChartCfg.yAxis.plotLines[1].value = symbols[i].DownTrack
            symbols[i].ChartCfg.subtitle = {
                text: '上轨: ' + symbols[i].UpTrack + '  下轨: ' + symbols[i].DownTrack
            }
            _Chart.update(_ArrChart)
            symbols[i].LastBarTime = Bar.Time
        } else {
        	_Chart.add(index, [Bar.Time, Bar.Open, Bar.High, Bar.Low, Bar.Close], -1)
        }

        // 检测持仓
        var pos = GetPosition(exchange, contractTypeName)
        symbols[i].Pos = pos
        var posAmount = pos ? pos.Amount : 0

        // 同步持仓状态
        if (symbols[i].State == STATE_IDLE && posAmount > 0) {
            symbols[i].State = STATE_LONG
        } else if (symbols[i].State == STATE_LONG && posAmount == 0) {
            symbols[i].State = STATE_IDLE
        }

        if (symbols[i].State === STATE_IDLE) {
            if (Bar.Close >= symbols[i].UpTrack) {
                Log(contractTypeName, "开多仓")
                // 开仓操作
                Buy(exchange, contractTypeName, AmountOP, ticker.Info)
                symbols[i].State = STATE_LONG
            }
        }    

        if (symbols[i].State === STATE_LONG && pos && AmountOP <= pos.CanCoverAmount) {
            if (Bar.Close <= symbols[i].DownTrack) {
                Log(contractTypeName, "平多仓")
                // 平仓操作
                Sell(exchange, contractTypeName, AmountOP, ticker.Info)
                symbols[i].State = STATE_IDLE
            }
        }
    }
}

function main(){
    if(IsReset) {
        LogReset(1)
    }
	
	SetErrorFilter("market not ready")
	exchange.SetPrecision(3, 0)
    if(IsVirtual() || exchange.GetCurrency() != "STOCK" || exchange.GetName() != "Futures_Futu") {
        throw "不支持"
    }

    while(true){
    	var tbl = {
    		"type" : "table",
    		"title": "信息",
    		"cols": ["InstrumentName", "ContractTypeName", "NPeriod", "Ks", "Kx", "AmountOP", "State" ,"LastBarTime" ,"UpTrack" ,"DownTrack", "Status", "State"],
    		"rows": [], 
    	}
    	for(var i = 0 ; i < _Symbols.length; i++) {
            tbl.rows.push([_Symbols[i].InstrumentName, _Symbols[i].ContractTypeName, _Symbols[i].NPeriod, _Symbols[i].Ks, _Symbols[i].Kx, _Symbols[i].AmountOP, _Symbols[i].State, _Symbols[i].LastBarTime, _Symbols[i].UpTrack, _Symbols[i].DownTrack, _Symbols[i].Status, ArrStateStr[_Symbols[i].State]])
    	}
    	var tblPos = {
    		"type" : "table", 
    		"title" : "持仓", 
    		"cols" : ["名称", "价格", "数量", "盈亏", "类型", "冻结数量", "可平量"], 
    		"rows" : [],
    	}
    	for (var j = 0 ; j < _Symbols.length; j++) {
    		if(_Symbols[j].Pos) {
                tblPos.rows.push([_Symbols[j].Pos.ContractType, _Symbols[j].Pos.Price, _Symbols[j].Pos.Amount, _Symbols[j].Pos.Profit, _Symbols[j].Pos.Type, _Symbols[j].Pos.FrozenAmount, _Symbols[j].Pos.CanCoverAmount])
    		}
    	}
        LogStatus(_D(), StatusMsg, "\n`" + JSON.stringify([tbl, tblPos]) + "`")
        DualThrustProcess(_Symbols)
        Sleep(1000)
    }
}
```

> 策略出处

https://www.fmz.cn/strategy/238425

> 更新时间

2021-10-26 10:33:04
