
> Name

简单马丁格尔多空加仓倍率修改

> Author

Zer3192

> Strategy Description

！！！！！！！温馨提示，本策略仅供学习使用，用于实盘必定爆仓！！！！！！！！！！
！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
简单马丁格尔
原理就是输了加倍，直到赢到期望的收益为止
因为是回测用的，所有下单都是市价单，实盘没跑过！！

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|LongAmount|150|多单初始下单量|
|ShortAmount|100|空单初始下单量|
|MarginLevel|50|设置杠杆|
|profit|0.5|多单期望收益|
|profits|0.4|空单期望收益|
|longbet|1.1|开多倍率|
|shortbet|true|开空倍率|
|SetContractType|swap|永续合约|
|short|true|做空|
|long|false|做多|
|StopProfit|5|止盈百分比|
|StopLoss|6|止损百分比|


> Source (javascript)

``` javascript
/*backtest
start: 2017-06-26 00:00:00
end: 2022-02-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/
var m =LongAmount //初始下单数
var n = ShortAmount //初始下单数
var MarginLevel1 =MarginLevel  //合约杠杆
var SetContractType1=SetContractType // 合约类型
var longprofit = profit //期望收益 ，多单不能小于手续费
var shortprofits = profits//期望收益 ，空单不能小于手续费
var longbet1 =longbet //开多倍率
var shortbet2=shortbet //开空倍率
StopProfit /=StopProfit ;
StopLoss /=StopLoss ;
//取随机数 
function sum(m, n) {　　
    var num = Math.floor(Math.random() * (m - n) + n);　　
    return num;
}

function main(){
    while(true){
LogProfit(exchange.GetAccount().Balance)
        Sleep(2000)
    }
}
function main() {
    exchange.SetContractType(SetContractType1)
    exchange.SetMarginLevel(MarginLevel1)
    var position = []
    while (true) { 
         position = exchange.GetPosition()
        if (position.length == 0) {
            //取随机数0、1作为方向
            var redom = sum(2, 0)
            Log(redom)
            redom=0==short //做空
            if (redom == 0) {
                n=ShortAmount
                exchange.SetDirection("sell")
                exchange.Sell(-1, n, "开空")
            }
            redom=1==long //做多
            if (redom == 1) {
                m=LongAmount
                exchange.SetDirection("buy")
                exchange.Buy(-1, m, "开多")
            }
        }
        if (position.length > 0) {

            if (position[0].Type == 0) {
                //多头盈利大于期望 
                if (position[0].Profit >profit) {
                    exchange.SetDirection("closebuy")
                    exchange.Sell(-1, position[0].Amount)
                    let redom = Math.random()
                    if (redom < 0.5) { 
                     m=LongAmount
                    exchange.SetDirection("buy")
                    exchange.Buy(-1, m, "平多头开多头头寸")    
                }
             }  
                //多头负盈利大于保证金 则加仓

                if (position[0].Profit <position[0].Margin * -1) {
                    longbet1=longbet
                    m=m*longbet
                    exchange.SetDirection("buy")
                    exchange.Buy(-1, position[0].Amount=m)
               }
            }
                  //空头盈利大于期望 
            if (position[0].Type == 1) {
                if (position[0].Profit > profits) {
                    exchange.SetDirection("closesell")
                    exchange.Buy(-1, position[0].Amount)
                    let redom = Math.random()
                   if (redom > 0.5) {  
                     n=ShortAmount
                    exchange.SetDirection("sell")
                    exchange.Sell(-1, n, "平空头开空头头寸")  
              }
          }
                  //空头负盈利大于保证金 则加仓
                if (position[0].Profit <position[0].Margin * -1 ) {
                    shortbet2=shortbet
                    n=n*shortbet
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

https://www.fmz.com/strategy/356471

> Last Modified

2022-06-19 12:12:05
