
> Name

HFT高频订单流因子

> Author

发明者量化

> Strategy Description


一个入门级订单流高频alpha因子, 可以做为市商策略的最优买卖定价距离参考, 信号归一为[-1, 1], 趋向1表示买方市场,趋向-1则是卖方市场, 策略会实时绘制因子值与最后成交价
策略使用OKX与币安期货websocket接口接收计算, 下图是指标效果, 可以看出有一定的有效性, 公开给高频入门的量化爱好者

 ![IMG](https://www.fmz.com/upload/asset/a89668d3b0189c8902.png) 
 
 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|QSize|100|QSize|


> Source (javascript)

``` javascript
let _chart = Chart({
    subtitle: {
        text: "Market Status",
    },
    yAxis: [{
        height: "60%",
        lineWidth: 1,
        title: {
            text: 'Close',
        },
        opposite: true,
        labels: {
            align: "right",
            x: -3,
        }
    }, {
        title: {
            text: 'Alpha',
        },
        top: "60%",
        height: "20%",
        offset: 0,
        lineWidth: 1
    }, {
        title: {
            text: 'Vol',
        },
        top: "80%",
        height: "20%",
        offset: 0,
        lineWidth: 1
    }],

    series: [{
        name: 'Last',
        lineWidth: 1,
        data: [],
        id: 'primary',
        tooltip: {
            xDateFormat: '%Y-%m-%d %H:%M:%S'
        },
        yAxis: 0
    }, {
        type: 'column',
        lineWidth: 2,
        name: 'Alpha',
        data: [],
        yAxis: 1,
        color: 'green',
        zones: [{
            value: 0,
            color: 'red'
        }]
    }, {
        lineWidth: 1,
        type: 'area',
        color: '#257ed4',
        name: 'Vol',
        data: [],
        yAxis: 2
    }],
})

function calc_alpha(trades) {
    let tick_sell_vol = 0
    let tick_buy_vol = 0
    let last_buy_vol = 0
    let last_sell_vol = 0
    let rightPos = Math.ceil(trades.length * 0.382)
    trades.forEach(function(trade, idx) {
        if (trade.side == 'buy') {
            if (idx >= rightPos) {
                last_buy_vol += trade.qty
            }
            tick_buy_vol += trade.qty
        } else {
            if (idx >= rightPos) {
                last_sell_vol += trade.qty
            }
            tick_sell_vol += trade.qty
        }
    })

    let tanh = function(x) {
        // return [-1, 1]
        return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x))
    }

    let positive_ratio = last_buy_vol / tick_sell_vol
    let negative_ratio = last_sell_vol / tick_buy_vol
    let trade_ratio = 0
    if (positive_ratio > negative_ratio) {
        trade_ratio = tanh(positive_ratio)
    } else {
        trade_ratio = tanh(-negative_ratio)
    }
    return _N(trade_ratio, 3)
}

let _trades = []
let _vol = 0

function onTick(ctx, event) {
    if (event.trades) {
        event.trades.forEach(function(trade) {
            _vol += trade.qty
            _trades.push(trade)
            if (_trades.length > QSize) {
                _trades.shift()
            }
        })
        if (_trades.length >= QSize) {
            let val = calc_alpha(_trades)
            _chart.add(0, [event.ts, _trades[_trades.length-1].price])
            _chart.add(1, [event.ts, val])
            _chart.add(2, [event.ts, _vol])
            _vol = 0
        }
    }
}

function main() {
    _chart.reset()
    let ct = exchange.SetContractType("swap")
    let debug = false
    let useMargin = false
    let okxAccessKey = ""
    let okxPhrase = ""
    let ctx = $.NewWSS(exchange, function(ws, e) {
        let msg = null
        if (e.GetName() == 'Futures_OKCoin') {
            msg = {
                op: "subscribe",
                args: []
            }
            let instId = ct.InstrumentID
            msg.args.push({
                channel: "books5",
                instId: instId
            })
            msg.args.push({
                channel: "trades",
                instId: instId
            })
        } else {
            msg = {
                method: "SUBSCRIBE",
                params: [],
                id: "1"
            }
            let symbol = e.GetCurrency().replace('_', '').toLowerCase()
            msg.params.push(symbol + "@aggTrade")
            msg.params.push(symbol + "@depth20@100ms")
        }
        ws.write(JSON.stringify(msg))
        Log("subscribe", msg, "channel")
        LogStatus("Ready")
    }, onTick, debug, useMargin, okxAccessKey, okxPhrase)

    while (true) {
        ctx.poll()
        EventLoop(1000)
    }
}
```

> Detail

https://www.fmz.com/strategy/392784

> Last Modified

2023-03-24 17:22:54
