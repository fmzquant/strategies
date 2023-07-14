
> Name

CTA策略之商品期货简易马丁格尔

> Author

Zer3192

> Strategy Description

#### 一、摘要
马丁格尔策略最早起源于18世纪的法国，不过那个时候它多被用于赌桌上面，之后没过多久就在欧洲广为人知。理论上这是一种胜率接近于100%的策略，直到现在在很多交易市场都有它的身影，如：外汇、期货及数字货币市场。然而它真地靠谱吗？它真的就是传说中的战无不胜吗？本篇就创建一个商品期货简易马丁格尔策略加以论证。

#### 二、马丁格尔策略原理
马丁格尔既不是交易策略，也不是交易机制，而是一种资金管理方式。其原理很简单：交易者每次亏损一定额度，就把下一次下单量加倍，直到盈利时把下单量恢复到初始值。如此一来，只需要盈利一次，不仅可以收回之前的亏损，还能获得第一次下单量的收益。显而易见这是一个逆势翻倍加仓的资金管理方式。

现假设有一枚正反两面一样重的硬币，不断的抛硬币，出现正面和反面的概率约等于50%，接下来我们用抛这枚硬币打赌，最初的下注金额是1元，如果出现正面赢1元，如果出现反面赔1元。理论上，硬币出现正反的概率是一样的，因为每次出现的结果相互独立不受影响，即50%。

根据马丁策略原理，每次赔钱时就把下注金额调整为上次下注金额的2倍，只需要赢一次就可以挽回之前的所有损失。但当连续亏损时，也将会输得一无所有。如果本金只有10元，第一次下注1元，出现反面亏损1元，账户余额为9元；第二次下注2元，出现反面亏损2元，账户余额为7元；第三次下注4元，出现反面亏损4元，账户余额为3元；这时就没有足够的资金下注了。

#### 三、策略回测
- 回测开始日期：2015-06-01
- 回测结束日期：2021-04-01
- 数据品种：菜粕指数
- 数据周期：日线
- 滑点：开平仓各2跳

**回测配置**
 ![IMG](https://www.fmz.com/upload/asset/39df3d9ffd96e830c2f4.png) 
**回测绩效**
 ![IMG](https://www.fmz.com/upload/asset/3a0b9d36caf93df156c0.png) 
**资金曲线**
 ![IMG](https://www.fmz.com/upload/asset/3992048c1b248823b8e0.png) 
**日志信息**
 ![IMG](https://www.fmz.com/upload/asset/3979363f6bf790113495.png) 

#### 四、马丁格尔策略升级
马丁格尔策略最大的风险是市场一直处于单边行情，如果交易者的持仓方向与市场方向背道而驰，那么积累起来的头寸是非常恐怖的。如果交易者的初始资金是1万元，亏损时以2倍加仓，那么只需要连续亏损7次就会爆仓。但如果把倍投改为1.5，情况就会好很多，连续亏损12次才会爆仓；如果把倍投改为1.1，则需要连续亏损49次才会爆仓。因为占用的资金量比较小，操作起来风险相对变小了。

 ![IMG](https://www.fmz.com/upload/asset/390720a08054ffca4d39.png) 

上图是一个倍投数和资金投入比例图，由此可见采用较低的倍投数，所占用的资金非常小，策略抗风险能力就越强，所以为确保资金安全，实盘建议使用低倍投数，建议在实盘之前计算好倍投数，最好是能扛连续亏损十几次的倍投数。


#### 五、总结
交易概率既是交易本质，没有人敢保证每次下单百分之百盈利。可以说当你用绝佳的理由和时机下单时，风险其实就已经存在了。马丁格尔策略尤其适用于趋势行情，只要交易者能够合理判断趋势，沿着趋势进行的方向开仓，并设置好风险回报比，也能获得非常稳健的回报。



> Source (javascript)

``` javascript
/*backtest
start: 2015-06-01 00:00:00
end: 2022-04-01 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_usdt"}]
*/

MarginLevel =20//合约杠杆 
unit =0.015//初始下单量
profits =1//盈亏间距
bei =1//倍率



function main() {
    exchange.SetContractType("swap")
    exchange.SetMarginLevel(MarginLevel)
    while (true) {
        let depth = exchange.GetDepth();
        if (!depth) return;
        let ask = depth.Asks[0].Price==-1;
        let bid = depth.Bids[0].Price==-1;
        let position = exchange.GetPosition()
        if (position.length == 0) {
            let redom = Math.random()
            unit =0.015
            if (redom > 0.5) {
                exchange.SetDirection("sell")
                exchange.Sell(-1, unit, "开空")
            }
            if (redom < 0.5 ) {
                exchange.SetDirection("buy")
                exchange.Buy(-1, unit, "开多")
            }
        }
        if (position.length > 0) {
            let type = position[0].Type;
            let profit = position[0].Profit;
            let amount = position[0].Amount;
            if (type == 0) {
                if (profit > profits) {
                    exchange.SetDirection("closebuy")
                    exchange.Sell(-1, amount, "多头止盈，当前盈利：" + profit)
                      unit = 0.015
                }       
            
                if (profit <-profits ) {
                    unit = unit * bei
                    exchange.SetDirection("buy")
                    exchange.Buy(-1, unit, "多头加仓，当前盈利：" + profit)
                }
            }
        
        
            if (type == 1) {
                if (profit > profits) {
                    exchange.SetDirection("closesell")
                    exchange.Buy(-1, amount, "空头止盈，当前盈利：" + profit)
                    unit = 0.015
            }
                    
                
                if (profit < -profits) {
                    unit = unit * bei
                    exchange.SetDirection("sell")
                    exchange.Sell(-1, unit, "空头加仓，当前盈利：" + profit)
                }
            
              }
          } 

        Sleep(1000 )
    }
}



```

> Detail

https://www.fmz.com/strategy/275287

> Last Modified

2022-04-05 07:47:26
