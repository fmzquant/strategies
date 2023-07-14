
> Name

简单马丁格尔合约倍率加强版

> Author

Zer3192

> Strategy Description

！！！！！！！温馨提示，本策略仅供学习使用，用于实盘必定爆仓！！！！！！！！！！
！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
简单马丁格尔
原理就是输了加倍，直到赢到期望的收益为止
因为是回测用的，所有下单都是市价单，实盘没跑过！！



> Source (javascript)

``` javascript
/*backtest
start: 2017-06-26 00:00:00
end: 2022-02-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"XXX_USDT"}]
*/

var symbols = ["BTC_USDT", "LTC_USDT", "EOS_USDT", "ETH_USDT"]
var buyValue = 1000
function main(){
  for(var i=0;i<symbols.length;i++){
      exchange.SetCurrency(symbols[i])
      var ticker = exchange.GetTicker()
      var amount = _N(buyValue/ticker.Sell, 3)
      exchange.Buy(ticker.Sell, amount)
      Sleep(1000)
  }
}
function main(){
    while(true){
        var ticker = exchange.GetTicker()
        var account = exchange.GetAccount()
        var price = ticker.Buy
        var stocks = account.Stocks + account.FrozenStocks
        var balance = account.Balance + account.FrozenBalance
        var value = stocks*price + balance
        Log('Account value is: ', value)
        LogProfit(value)
        Sleep(3000)//sleep 3000ms(3s), A loop must has a sleep, or the rate-limit of the exchange will be exceed
        //when run in debug tool, add a break here
    }
}
function main(){
    while(true){
        Log(exchange.GetAccount().Balance)
        Sleep(2000)
    }
}
var tradeHistory = {buyData:{amount:0, money:0}, sellData:{amount:0, money:0}, a:0, b:0, c:0, d:0, total:0}
var updateB = 0
var lastNet = 0
var updateD = 0
if(_G('tradeHistory')){
    tradeHistory = _G('tradeHistory')
}
function getDepth(){
    var asks = []
    var bids = []
    var temp = 0
    var depth = JSON.parse(HttpQuery('https://api.binance.com/api/v1/depth?symbol=BTCUSDT'))
    if(!depth){
        return false
    }
    depth.bids.reverse()
    for(i=0;i<depth.bids.length;i++){
        temp += parseFloat(depth.bids[i][1])
    }
    for(i=0;i<depth.bids.length;i++){
        temp -= parseFloat(depth.bids[i][1])
        bids.push([parseFloat(depth.bids[i][0]), temp])
    }
    temp = 0
    for(i=0;i<depth.asks.length;i++){
        temp += parseFloat(depth.asks[i][1])
        asks.push([parseFloat(depth.asks[i][0]), temp])
    }
    return {asks:asks,bids:bids}
    
}
var chartA = {
    __isStock: false,
    extension: {
        layout: 'single',
        col: 6, // 指定宽度占的单元值, 总值 为12
        height: 500,
    },
    title: {
        text: '成交量分布图'
    },
    xAxis: [{
        title: { text: 'Data' },
        alignTicks: false
    }, {
        title: { text: 'Histogram' },
        alignTicks: false,
        opposite: true
    }],

    yAxis: [{
        title: { text: 'Data' }
    }, {
        title: { text: 'Histogram' },
        opposite: true
    }],

    series: [{
        name: 'Histogram',
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 's1',
        zIndex: -1
    },{
        name: 'Data',
        type: 'scatter',
        data: [],
        id: 's1',
        marker: {
            radius: 1.5
        }
    }]
};
var chartB = {
    extension: {
        layout: 'single', // 不参于分组，单独显示, 默认为分组 'group'
        col: 6,
        height: 300, // 指定高度
    },
    credits: {
        enabled: false
    },
    title: {
        text: '净买入资金'
    },
    xAxis: {
        type: 'datetime'
    },
    series: [{
        name: '净买入',
        type: 'column',
        data: []
    }],
}
var chartC = {
    extension: {
        layout: 'single', // 不参于分组，单独显示, 默认为分组 'group'
        col: 6,
        height: 300,      // 指定高度        // 指定宽度占的单元值, 总值 为12
    },
    title: {
        text: '成交价'
    },
    xAxis: {
        type: 'datetime'
    },
    series: [{
        name: 'last',
        data: [],
    }]
}
var chartD = {
    __isStock: false,
    extension: {
        layout: 'single', // 不参于分组，单独显示, 默认为分组 'group'
        col: 6,
        height: 500,      // 指定高度        // 指定宽度占的单元值, 总值 为12
    },
    chart: {
        type: 'area',
        zoomType: 'xy'
    },
    title: {
        text: 'BTC-USDT深度'
    },
    xAxis: {
        minPadding: 0,
        maxPadding: 0,
        plotLines: [{
            color: '#888',
            value: 0.1523,
            width: 1,
            label: {
                text: 'Actual price',
                rotation: 90
            }
        }],
        title: {
            text: 'Price'
        }
    },
    yAxis: [{
        min:0,
        lineWidth: 1,
        gridLineWidth: 1,
        title: null,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: 'inside',
        labels: {
            align: 'left',
            x: 8
        }
    }, {
        opposite: true,
        linkedTo: 0,
        lineWidth: 1,
        gridLineWidth: 0,
        title: null,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: 'inside',
        labels: {
            align: 'right',
            x: -8
        }
    }],
    plotOptions: {
        area: {
            fillOpacity: 0.2,
            lineWidth: 1,
            step: 'center'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
        valueDecimals: 2
    },
    series: [{
        name: 'Bids',
        data: [],
        color: '#03a7a8'
    }, {
        name: 'Asks',
        data: [],
        color: '#fc5857'
    }]
};
var chartE = {
    __isStock: false,
    extension: {
        layout: 'single', // 不参于分组，单独显示, 默认为分组 'group'
        col: 6,
        height: 500,      // 指定高度        // 指定宽度占的单元值, 总值 为12
    },
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: '成交数量<br>分布<br>',
        align: 'center',
        verticalAlign: 'middle',
        y: 40
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '110%'
        }
    },
    series: [{
        type: 'pie',
        name: '占比',
        innerSize: '50%',
        data: []
    }]
}
var chartF = {
    extension: {
        layout: 'single', // 不参于分组，单独显示, 默认为分组 'group'
        col: 6,
        height: 300,      // 指定高度        // 指定宽度占的单元值, 总值 为12
    },
    title: {
        text: '总净买入'
    },
    xAxis: {
        type: 'datetime'
    },
    series: [{
        name: 'last',
        data: [],
    }]
}
var chart = Chart([chartB,chartC,chartD,chartA,chartF,chartE]);
//chart.reset()
function main() {
    var client = Dial("wss://stream.binance.com:9443/ws/" + 'btcusdt' + "@trade", 60)
    var updateTime = new Date().getTime()
    while(true){
        var trade = JSON.parse(client.read())
        if(trade.m){
            tradeHistory.sellData.amount += parseFloat(trade.q)
            tradeHistory.sellData.money += parseFloat(trade.q) * parseFloat(trade.p)
        }else{
            tradeHistory.buyData.amount += parseFloat(trade.q)
            tradeHistory.buyData.money += parseFloat(trade.q) * parseFloat(trade.p)
        }
        var buyNet = _N(tradeHistory.buyData.money - tradeHistory.sellData.money, 3)
        var tradeAmount = _N(parseFloat(trade.q),2)>1 ? 1 : _N(parseFloat(trade.q),2)
        if(parseFloat(trade.q)<0.01){
            tradeHistory.a += 1
        }else if(parseFloat(trade.q)<0.1){
            tradeHistory.b += 1
        }else if(parseFloat(trade.q)<1){
            tradeHistory.c += 1
        }else{
            tradeHistory.d += 1
        }
        tradeHistory.total +=1
        chartE.series[0].data = [
            ['小于0.01', _N(tradeHistory.a/tradeHistory.total,4)],
            ['小于0.1', _N(tradeHistory.b/tradeHistory.total,4)],
            ['小于1', _N(tradeHistory.c/tradeHistory.total,4)],
            ['大于1', _N(tradeHistory.d/tradeHistory.total,4)],
        ]
        if(tradeAmount>0.01){
            while(chartA.series[1].data.length>2000){
                chartA.series[1].data.shift()
            }
            chartA.series[1].data.push(tradeAmount)
        }
        if(Date.now() - updateB > 60*1000){
            chart.add(0,[Date.now(), _N(buyNet-lastNet,2)])
            lastNet = buyNet
            updateB = Date.now()
            chart.add(1, [Date.now(), _N(parseFloat(trade.p),2)])
            chart.add(6, [Date.now(), _N(buyNet,2)])
        }else{
            chart.add(0, [Date.now(), _N(buyNet-lastNet,2)], -1)
            chart.add(1, [Date.now(), _N(parseFloat(trade.p),2)], -1)
            chart.add(6, [Date.now(), _N(buyNet,2)],-1)
        }
        if(Date.now() - updateD > 6*1000){
            var depth = getDepth()
            if(!depth){
                continue
            }
            chartD.series[0].data = depth.bids
            chartD.series[1].data = depth.asks
            updateD = Date.now()
        }
        chart.update([chartB,chartC,chartD,chartA,chartF,chartE])
    }
        
}
function main() {
    transferToMain(100);
}

// 从U本位合约钱包向现货钱包划转指定数量的USDT
function transferToMain(amount){
    var ret = null;
    if (isOKexExchange()) {
        let param = "ccy=USDT" + "&from=18" + "&amt=" + amount.toString() + "&to=6";
        ret = exchange.IO("api", "POST", "/api/v5/asset/transfer", param);
    } else if (isBinanceExchange()) {
        let time = UnixNano() / 1000000;
        let param = "type=UMFUTURE_MAIN" + "&asset=USDT" + "&amount=" + amount.toString() + "&timestamp=" + time.toString();
        exchange.SetBase('https://api.binance.com');
        ret = exchange.IO("api", "POST", "/sapi/v1/asset/transfer", param);
        exchange.SetBase('https://fapi.binance.com');
    } else {
        Log("资金划转失败，不支持的交易所！");
    }
    if (ret) {
        Log("已经从合约划转到现货账户: ", amount, " USDT");
        return true;
    } else {
        Log("资金划转失败！");
        return false;
    }
}

// 判断是否币安交易所
function isBinanceExchange() {
    if (exchange.GetName() == "Futures_Binance") {
        return true;
    }
    return false;
}

// 判断是否OKEX交易所
function isOKexExchange() {
    if (exchange.GetName() == "Futures_OKCoin") {
        return true;
    }
    return false;
}
var n =$//初始下单数
var MarginLevel = 50 //合约杠杆 
var profit = 0.5 //期望收益 ，不能小于手续费 
var bet = 1.5//倍率
initialFunds =10000 // 初始资金
var funds = initialFunds  // 实时资金


//取随机数 
function sum(m, n) {　　
    var num = Math.floor(Math.random() * (m - n) + n);　　
    return num;
}
function main(){
    if (exchange.GetName() !== 'Futures_Binance') 
        throw "只支持Binance期货";
    }
 


function main() {
    var ret = exchange.IO("api", "POST", "/fapi/v1/positionSide/dual", "dualSidePosition=true")
    // ret : {"code":200,"msg":"success"}
    Log(ret)
}
function main() {
exchange.SetContractType("swap")
    exchange.SetMarginLevel(MarginLevel)
    if (exchange.GetPosition().length > 0) {
        throw "策略启动前不能有持仓."
    }
    var position = []
    while (true) {
        
        position = exchange.GetPosition()
        if (position.length == 0) {
            //取随机数0,1作为方向
            var redom = sum(0,2)
            Log(redom)
            if (redom == 0,1,1,2,3,5,8,13,21,33,55,89) {
                
                n=0.001
                exchange.SetDirection("sell")
                exchange.Sell(-1, n, "开空")
            }
            if (redom == 144,233,377,610,987,1597,2584,4181,6765,10946,17711,28657,46368 ) {
                
                n=0.002
                exchange.SetDirection("buy")
                exchange.Buy(-1, n, "开多")
            }
            if (redom == 0) {
                n=0.001
                exchange.SetDirection("sell")
                exchange.Sell(-1, n, "开空")
                
            }
            
            if (redom == 1) {
                
                n=0.002
                exchange.SetDirection("buy")
                exchange.Buy(-1, n, "开多")
            }
            }
            if (position.length > 0) {

            if (position[0].Type == 0) {
                //盈利大于期望 
                if (position[0].Profit > profit) {
                    Amount=position[0].Amount
                    exchange.SetDirection("closebuy")
                    exchange.Sell(-1, position[0].Amount)
                    Log(profit)
                    LogProfit (position[0].Amount+profit+funds)
                }
                //负盈利大于保证金 则加仓

                if (position[0].Profit < position[0].Margin * -2) {
                   n=n * bet
                    exchange.SetDirection("buy")
                    exchange.Buy(-1, position[0].Amount=n)
                    }
            }
            if (position[0].Type == 1) {
                if (position[0].Profit > profit) {
                    Amount=position[0].Amount
                    exchange.SetDirection("closesell")
                    exchange.Buy(-1, position[0].Amount)
                    Log(profit)
                    LogProfit (position[0].Amount+profit+funds)
                }
                if (position[0].Profit < position[0].Margin * -2) {
                    n = n * bet
                    exchange.SetDirection("sell")
                    exchange.Sell(-1, position[0].Amount=n)
                     }
            }
            Sleep(60000)
        }
    }
  }




    
           
                    
                       
                          
                        
                        
                               
```

> Detail

https://www.fmz.com/strategy/352037

> Last Modified

2022-03-26 20:21:22
