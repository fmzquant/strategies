
> Name

斐波那契数列策略

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
/*
本策略仅供学习使用，用于实盘后果自负 
*/
/*backtest
start: 2017-06-26 00:00:00
end: 2022-02-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

var n = 1 //初始下单数
var MarginLevel = 50 //合约杠杆 
var profit = 1//期望收益 ，不能小于手续费 
var bet=1.1


//取随机数 
function sum(m, n) {　　
    var num = Math.floor(Math.random() * (m - n) + n);　　
    return num;
}

function main() {
    exchange.SetContractType("swap")
    exchange.SetMarginLevel(MarginLevel)
    var position = []
    while (true) {
        position = exchange.GetPosition()
        if (position.length == 0) {
            //取随机数0、1作为方向
            var redom = sum(2, 0)
            Log(redom)
            if (redom == 0) {
                n=0.001
                exchange.SetDirection("sell")
                exchange.Sell(-1, n, "开空")
            }
            if (redom == 1) {
                n=0.001
                exchange.SetDirection("buy")
                exchange.Buy(-1, n, "开多")
            }

        }
        if (position.length > 0) {

            if (position[0].Type == 0) {
                //盈利大于期望 
                if (position[0].Profit > profit) {
                    exchange.SetDirection("closebuy")
                    exchange.Sell(-1, position[0].Amount)
                }
                //负盈利大于保证金 则加仓

                if (position[0].Profit < position[0].Margin * -1) {
              function  fibonacci( n){

        if (n == 1 || n == 2) {             //特殊情况，分开讨论
            return 1;
        }
        if (n > 2) {
            return fibonacci(n - 1) + fibonacci(n - 2);     //递归调用
        }
        return -1;              //如果输入错误的n，一律返回-1
    }
                    
                    exchange.SetDirection("buy")
                    exchange.Buy(-1, n)
                }
            }
            if (position[0].Type == 1) {
                if (position[0].Profit > profit) {
                    exchange.SetDirection("closesell")
                    exchange.Buy(-1, position[0].Amount)
                }
                if (position[0].Profit < position[0].Margin * -1) {
                    
                    function    fibonacci( n){

        if (n == 1 || n == 2) {             //特殊情况，分开讨论
            return 1;
        }
        if (n > 2) {
            return fibonacci(n - 1) + fibonacci(n - 2);     //递归调用
        }
        return -1;              //如果输入错误的n，一律返回-1
    }
                    
                    exchange.SetDirection("sell")
                    exchange.Sell(-1, n)
                    
                }
            }
            Sleep(60000)
        }
    }

}
        
```

> Detail

https://www.fmz.com/strategy/353314

> Last Modified

2022-05-14 06:32:26
